"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { nip19 } from "nostr-tools";
import { Header, Footer } from "@/components/layout";
import { Container, Card, Button } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { createInvoice, checkInvoice, disconnectRelay } from "@/lib/nwc";
import { tiers, tierMap } from "@/lib/constants";
import type { Invoice } from "@/lib/nwc";
import type { PlanId, TierConfig } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageState = "idle" | "generating" | "payment" | "success";

interface ExistingSub {
  plan: PlanId;
  status: string;
  expires_at: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PLAN_RANK: Record<PlanId, number> = { supporter: 0, pro: 1 };

function isValidPlan(v: string | null): v is PlanId {
  return v === "supporter" || v === "pro";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Inner component that reads search params (must be inside Suspense)
// ---------------------------------------------------------------------------

function ProPageInner() {
  const searchParams = useSearchParams();
  const npub = searchParams.get("npub");
  const tierParam = searchParams.get("tier");

  const [selectedTier, setSelectedTier] = useState<PlanId>(
    isValidPlan(tierParam) ? tierParam : "pro",
  );
  const [state, setState] = useState<PageState>("idle");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [existingSub, setExistingSub] = useState<ExistingSub | null>(null);
  const [subLoading, setSubLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Validate npub
  const npubValid = (() => {
    if (!npub) return false;
    try {
      const decoded = nip19.decode(npub);
      return decoded.type === "npub";
    } catch {
      return false;
    }
  })();

  // Fetch existing subscription on mount
  useEffect(() => {
    if (!npub || !npubValid) return;
    setSubLoading(true);
    supabase
      .from("subscribers")
      .select("plan, status, expires_at")
      .eq("npub", npub)
      .single()
      .then(({ data }) => {
        if (data && isValidPlan(data.plan)) {
          setExistingSub(data as ExistingSub);
        }
        setSubLoading(false);
      });
  }, [npub, npubValid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      disconnectRelay();
    };
  }, []);

  // Derived state
  const isExpired =
    existingSub &&
    existingSub.expires_at &&
    new Date(existingSub.expires_at) < new Date();
  const isActive = existingSub && !isExpired;
  const isDowngrade =
    existingSub &&
    !isExpired &&
    PLAN_RANK[selectedTier] < PLAN_RANK[existingSub.plan];

  const ctaLabel = (() => {
    if (!existingSub) return "Subscribe";
    if (isExpired) return "Renew";
    if (PLAN_RANK[selectedTier] > PLAN_RANK[existingSub.plan])
      return "Upgrade to Pro";
    return "Renew";
  })();

  const tier = tierMap[selectedTier];

  const handleSubscribe = useCallback(async () => {
    if (!npub || !npubValid || isDowngrade) return;

    setState("generating");
    setError(null);

    try {
      const inv = await createInvoice(
        tier.price,
        `RUNSTR ${tier.name} — 1 month subscription`,
      );
      setInvoice(inv);
      setState("payment");

      // Start polling for payment
      pollRef.current = setInterval(async () => {
        try {
          const status = await checkInvoice(inv.paymentHash);
          if (status.isPaid) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = null;
            await activateSubscription(npub, selectedTier);
            setState("success");
          }
        } catch {
          // Polling errors are non-fatal; keep trying
        }
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create invoice",
      );
      setState("idle");
    }
  }, [npub, npubValid, isDowngrade, tier, selectedTier]);

  const activateSubscription = async (
    subscriberNpub: string,
    plan: PlanId,
  ) => {
    // Check for existing subscription
    const { data: existing } = await supabase
      .from("subscribers")
      .select("expires_at")
      .eq("npub", subscriberNpub)
      .single();

    const now = new Date();
    let newExpiry: Date;

    if (existing?.expires_at) {
      const currentExpiry = new Date(existing.expires_at);
      // Stack on remaining time if still active
      const base = currentExpiry > now ? currentExpiry : now;
      newExpiry = new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000);
    } else {
      newExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    await supabase.from("subscribers").upsert(
      {
        npub: subscriberNpub,
        status: "active",
        plan,
        expires_at: newExpiry.toISOString(),
        created_at: existing ? undefined : now.toISOString(),
      },
      { onConflict: "npub" },
    );

    setExpiresAt(formatDate(newExpiry.toISOString()));
  };

  const copyInvoice = () => {
    if (!invoice) return;
    navigator.clipboard.writeText(invoice.bolt11);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- No npub or invalid npub ---
  if (!npub || !npubValid) {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <Card hover={false}>
              <h1 className="text-2xl font-bold mb-4">RUNSTR Pro</h1>
              <p className="text-[var(--text-secondary)]">
                {!npub
                  ? "Open this page from the RUNSTR app to subscribe."
                  : "Invalid account identifier. Please try again from the RUNSTR app."}
              </p>
            </Card>
          </div>
        </Container>
      </section>
    );
  }

  // --- Idle state: show tiers + subscribe ---
  if (state === "idle") {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                RUNSTR <span className="text-[var(--accent)]">Pro</span>
              </h1>
              <p className="text-[var(--text-secondary)]">
                Unlock the full RUNSTR experience
              </p>
            </div>

            {/* Status banner */}
            {!subLoading && existingSub && (
              <div className="mb-6 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background-card)] text-center text-sm">
                {isActive ? (
                  <p>
                    You have an active{" "}
                    <span className="font-semibold text-[var(--accent)]">
                      {tierMap[existingSub.plan].name}
                    </span>{" "}
                    subscription — expires{" "}
                    {formatDate(existingSub.expires_at)}
                  </p>
                ) : (
                  <p>
                    Your{" "}
                    <span className="font-semibold text-[var(--accent)]">
                      {tierMap[existingSub.plan].name}
                    </span>{" "}
                    subscription expired on{" "}
                    {formatDate(existingSub.expires_at)}
                  </p>
                )}
              </div>
            )}

            {/* Tier cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {tiers.map((t) => (
                <TierCard
                  key={t.id}
                  tier={t}
                  selected={selectedTier === t.id}
                  onSelect={() => setSelectedTier(t.id)}
                  currentPlan={isActive ? existingSub?.plan : undefined}
                />
              ))}
            </div>

            {/* Downgrade warning */}
            {isDowngrade && (
              <p className="text-center text-sm text-[var(--text-muted)] mb-4">
                You already have a Pro subscription. Downgrading is not
                available.
              </p>
            )}

            {error && (
              <p className="text-center text-sm text-[var(--accent)] mb-4">
                {error}
              </p>
            )}

            <Button
              onClick={handleSubscribe}
              size="lg"
              className="w-full"
              disabled={!!isDowngrade}
            >
              {ctaLabel} — {tier.price.toLocaleString()} sats
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // --- Generating state: loading spinner ---
  if (state === "generating") {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <Card hover={false}>
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                <p className="text-[var(--text-secondary)]">
                  Generating invoice...
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    );
  }

  // --- Payment state: QR code + copy + waiting ---
  if (state === "payment" && invoice) {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Pay Invoice</h1>
              <p className="text-[var(--text-secondary)]">
                Scan the QR code or copy the invoice to your wallet
              </p>
            </div>

            <Card hover={false} className="flex flex-col items-center gap-6">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  value={invoice.bolt11}
                  size={240}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>

              <button
                onClick={copyInvoice}
                className="w-full px-4 py-3 bg-[var(--background-card-hover)] border border-[var(--border)] rounded-lg text-sm font-mono text-[var(--text-secondary)] hover:border-[var(--accent)] transition-colors truncate"
              >
                {copied ? "Copied!" : invoice.bolt11.slice(0, 42) + "..."}
              </button>

              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Waiting for payment</span>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    );
  }

  // --- Success state ---
  return (
    <section className="pt-32 pb-20 min-h-screen">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <Card hover={false}>
            <div className="py-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[var(--accent)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">
                You&apos;re on {tier.name}
              </h1>
              <p className="text-[var(--text-secondary)] mb-4">
                Your subscription is active. Head back to the app to start
                using your new features.
              </p>
              {expiresAt && (
                <p className="text-sm text-[var(--text-muted)]">
                  Active until {expiresAt}
                </p>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Tier selection card
// ---------------------------------------------------------------------------

function TierCard({
  tier,
  selected,
  onSelect,
  currentPlan,
}: {
  tier: TierConfig;
  selected: boolean;
  onSelect: () => void;
  currentPlan?: PlanId;
}) {
  const isCurrent = currentPlan === tier.id;

  return (
    <button
      onClick={onSelect}
      className={`text-left w-full p-5 rounded-xl border-2 transition-colors ${
        selected
          ? "border-[var(--accent)] bg-[var(--background-card)]"
          : "border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--text-muted)]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">{tier.name}</h3>
        {isCurrent && (
          <span className="text-xs px-2 py-0.5 rounded border border-[var(--accent)] text-[var(--accent)]">
            Current
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-4">
        {tier.price.toLocaleString()}{" "}
        <span className="text-sm font-normal text-[var(--text-secondary)]">
          sats / month
        </span>
      </p>
      <ul className="space-y-2">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[var(--accent)] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--text-secondary)]">{f}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page wrapper with Suspense (required for useSearchParams in static export)
// ---------------------------------------------------------------------------

export default function ProPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <section className="pt-32 pb-20 min-h-screen">
              <Container>
                <div className="max-w-lg mx-auto text-center">
                  <Card hover={false}>
                    <div className="flex flex-col items-center gap-4 py-8">
                      <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                      <p className="text-[var(--text-secondary)]">Loading...</p>
                    </div>
                  </Card>
                </div>
              </Container>
            </section>
          }
        >
          <ProPageInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
