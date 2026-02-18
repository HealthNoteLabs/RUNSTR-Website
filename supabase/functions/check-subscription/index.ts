import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { handleCors, getCorsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabase-admin.ts";
import { isValidNpub } from "../_shared/validation.ts";

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
    const { npub } = await req.json();

    if (!npub || typeof npub !== "string" || !isValidNpub(npub)) {
      return new Response(JSON.stringify({ error: "Invalid npub" }), {
        status: 400,
        headers,
      });
    }

    const { data, error } = await supabaseAdmin
      .from("subscribers")
      .select("plan, status, expires_at")
      .eq("npub", npub)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ subscription: null }),
        { status: 200, headers },
      );
    }

    return new Response(
      JSON.stringify({
        subscription: {
          plan: data.plan,
          status: data.status,
          expiresAt: data.expires_at,
        },
      }),
      { status: 200, headers },
    );
  } catch (err) {
    console.error("check-subscription error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers },
    );
  }
});
