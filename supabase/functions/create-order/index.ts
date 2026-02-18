import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { handleCors, getCorsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabase-admin.ts";
import { createZapriteOrder } from "../_shared/zaprite.ts";
import {
  isValidNpub,
  isValidPlan,
  getPlanPrice,
  getPlanRank,
} from "../_shared/validation.ts";

serve(async (req: Request) => {
  // CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const headers = getCorsHeaders(req);
  headers.set("Content-Type", "application/json");

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const { npub, plan } = await req.json();

    // Validate inputs
    if (!npub || typeof npub !== "string" || !isValidNpub(npub)) {
      return new Response(JSON.stringify({ error: "Invalid npub" }), {
        status: 400,
        headers,
      });
    }

    if (!plan || typeof plan !== "string" || !isValidPlan(plan)) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
        headers,
      });
    }

    // Check existing subscription — block downgrade
    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("plan, expires_at")
      .eq("npub", npub)
      .single();

    if (existing) {
      const isActive =
        existing.expires_at && new Date(existing.expires_at) > new Date();
      if (
        isActive &&
        isValidPlan(existing.plan) &&
        getPlanRank(plan) < getPlanRank(existing.plan)
      ) {
        return new Response(
          JSON.stringify({ error: "Cannot downgrade an active subscription" }),
          { status: 400, headers },
        );
      }
    }

    // Create Zaprite order
    const price = getPlanPrice(plan);
    const order = await createZapriteOrder({
      amount: price,
      currency: "SAT",
      description: `RUNSTR ${plan === "pro" ? "Pro" : "Supporter"} — 1 month`,
      metadata: { npub, plan, source: "runstr-website" },
      redirectUrl: `https://www.runstr.club/pro/?npub=${encodeURIComponent(npub)}&status=success`,
    });

    return new Response(
      JSON.stringify({
        checkoutUrl: order.checkoutUrl,
        orderId: order.id,
      }),
      { status: 200, headers },
    );
  } catch (err) {
    console.error("create-order error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers },
    );
  }
});
