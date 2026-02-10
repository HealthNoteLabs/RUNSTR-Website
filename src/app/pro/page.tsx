"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { nip19 } from "nostr-tools";
import { Header, Footer } from "@/components/layout";
import { Container, Card, Button } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { createInvoice, checkInvoice, disconnectRelay } from "@/lib/nwc";
import type { Invoice } from "@/lib/nwc";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageState = "idle" | "generating" | "payment" | "success";

// ---------------------------------------------------------------------------
// Inner component that reads search params (must be inside Suspense)
// ---------------------------------------------------------------------------

function ProPageInner() {
  const searchParams = useSearchParams();
  const npub = searchParams.get("npub");

  const [state, setState] = useState<PageState>("idle");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      disconnectRelay();
    };
  }, []);

  const handleSubscribe = useCallback(async () => {
    if (!npub || !npubValid) return;

    setState("generating");
    setError(null);

    try {
      const inv = await createInvoice();
      setInvoice(inv);
      setState("payment");

      // Start polling for payment
      pollRef.current = setInterval(async () => {
        try {
          const status = await checkInvoice(inv.paymentHash);
          if (status.isPaid) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = null;
            await activateSubscription(npub);
            setState("success");
          }
        } catch {
          // Polling errors are non-fatal; keep trying
        }
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice");
      setState("idle");
    }
  }, [npub, npubValid]);

  const activateSubscription = async (subscriberNpub: string) => {
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
        plan: "pro",
        expires_at: newExpiry.toISOString(),
        created_at: existing ? undefined : now.toISOString(),
      },
      { onConflict: "npub" },
    );

    setExpiresAt(
      newExpiry.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
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

  // --- Idle state: show benefits + subscribe ---
  if (state === "idle") {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                RUNSTR <span className="text-[var(--accent)]">Pro</span>
              </h1>
              <p className="text-[var(--text-secondary)]">
                Unlock the full RUNSTR experience
              </p>
            </div>

            <Card hover={false} className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                What you get with Pro
              </h2>
              <ul className="space-y-3">
                {[
                  {
                    title: "Create Teams",
                    desc: "Build and manage your own running teams",
                  },
                  {
                    title: "Create Events",
                    desc: "Host competitions and challenge your community",
                  },
                  {
                    title: "Support Development",
                    desc: "Help keep RUNSTR free and open source for everyone",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    </span>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card hover={false} className="text-center mb-6">
              <p className="text-3xl font-bold">
                7,000{" "}
                <span className="text-lg font-normal text-[var(--text-secondary)]">
                  sats / month
                </span>
              </p>
            </Card>

            {error && (
              <p className="text-center text-sm text-[var(--accent)] mb-4">
                {error}
              </p>
            )}

            <Button onClick={handleSubscribe} size="lg" className="w-full">
              Subscribe
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
                You&apos;re on Pro
              </h1>
              <p className="text-[var(--text-secondary)] mb-4">
                Your subscription is active. Head back to the app to start
                creating teams and events.
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
