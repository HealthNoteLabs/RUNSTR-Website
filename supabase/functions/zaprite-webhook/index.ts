import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { supabaseAdmin } from "../_shared/supabase-admin.ts";
import { getZapriteOrder } from "../_shared/zaprite.ts";
import { isValidNpub, isValidPlan } from "../_shared/validation.ts";
import type { PlanId } from "../_shared/validation.ts";

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  if (bufA.byteLength !== bufB.byteLength) return false;

  // Use crypto.subtle for constant-time comparison
  let result = 0;
  for (let i = 0; i < bufA.byteLength; i++) {
    result |= bufA[i] ^ bufB[i];
  }
  return result === 0;
}

serve(async (req: Request) => {
  // Always return 200 to not reveal endpoint behavior
  const ok = () => new Response("OK", { status: 200 });

  if (req.method !== "POST") return ok();

  try {
    // Verify webhook token
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";
    const secret = Deno.env.get("WEBHOOK_SECRET_TOKEN") ?? "";

    if (!secret || !token || !timingSafeEqual(token, secret)) {
      console.warn("Webhook: invalid token");
      return ok();
    }

    const payload = await req.json();

    // Extract order ID from payload
    const orderId = payload?.id ?? payload?.orderId ?? payload?.order_id;
    if (!orderId || typeof orderId !== "string") {
      console.warn("Webhook: no order ID in payload");
      return ok();
    }

    // Verify order with Zaprite API (defeats spoofing)
    const order = await getZapriteOrder(orderId);

    // Check order is paid
    const paidStatuses = ["paid", "completed", "settled"];
    if (!paidStatuses.includes(order.status?.toLowerCase())) {
      console.log(`Webhook: order ${orderId} status is ${order.status}, skipping`);
      return ok();
    }

    // Validate metadata
    const metadata = order.metadata;
    if (!metadata?.npub || !metadata?.plan || metadata?.source !== "runstr-website") {
      console.warn("Webhook: invalid metadata on order", orderId);
      return ok();
    }

    const { npub, plan } = metadata;

    if (!isValidNpub(npub) || !isValidPlan(plan)) {
      console.warn("Webhook: invalid npub or plan in metadata");
      return ok();
    }

    // Idempotency check
    const { data: processed } = await supabaseAdmin
      .from("processed_orders")
      .select("id")
      .eq("zaprite_order_id", orderId)
      .single();

    if (processed) {
      console.log(`Webhook: order ${orderId} already processed`);
      return ok();
    }

    // Calculate expiry — stack on existing if active
    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("expires_at, plan")
      .eq("npub", npub)
      .single();

    const now = new Date();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    let newExpiry: Date;

    if (existing?.expires_at) {
      const currentExpiry = new Date(existing.expires_at);
      const base = currentExpiry > now ? currentExpiry : now;
      newExpiry = new Date(base.getTime() + thirtyDays);
    } else {
      newExpiry = new Date(now.getTime() + thirtyDays);
    }

    // Determine effective plan (keep higher tier if already on one)
    let effectivePlan: PlanId = plan;
    if (
      existing?.plan &&
      isValidPlan(existing.plan) &&
      existing.expires_at &&
      new Date(existing.expires_at) > now
    ) {
      const planRank: Record<PlanId, number> = { supporter: 0, pro: 1 };
      if (planRank[existing.plan] > planRank[plan]) {
        effectivePlan = existing.plan;
      }
    }

    // Upsert subscriber
    const { error: upsertError } = await supabaseAdmin
      .from("subscribers")
      .upsert(
        {
          npub,
          status: "active",
          plan: effectivePlan,
          expires_at: newExpiry.toISOString(),
          created_at: existing ? undefined : now.toISOString(),
        },
        { onConflict: "npub" },
      );

    if (upsertError) {
      console.error("Webhook: upsert error", upsertError);
      return ok();
    }

    // Record processed order
    await supabaseAdmin.from("processed_orders").insert({
      zaprite_order_id: orderId,
      npub,
      plan,
    });

    console.log(`Webhook: activated ${effectivePlan} for ${npub}, expires ${newExpiry.toISOString()}`);
    return ok();
  } catch (err) {
    console.error("Webhook error:", err);
    return ok();
  }
});
