const ALLOWED_ORIGINS = [
  "https://www.runstr.club",
  "https://runstr.club",
];

export function getCorsHeaders(req: Request): Headers {
  const origin = req.headers.get("Origin") ?? "";
  const headers = new Headers();

  if (ALLOWED_ORIGINS.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
  }

  return headers;
}

export function handleCors(req: Request): Response | null {
  const origin = req.headers.get("Origin") ?? "";

  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: ALLOWED_ORIGINS.includes(origin) ? 204 : 403,
      headers: getCorsHeaders(req),
    });
  }

  // Reject non-allowed origins
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response("Forbidden", { status: 403 });
  }

  return null;
}
