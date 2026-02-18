const ZAPRITE_BASE = "https://api.zaprite.com/v1";

function getApiKey(): string {
  const key = Deno.env.get("ZAPRITE_API_KEY");
  if (!key) throw new Error("ZAPRITE_API_KEY not set");
  return key;
}

function headers(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getApiKey()}`,
  };
}

export interface ZapriteOrderPayload {
  amount: number; // USD cents
  currency: string;
  description: string;
  metadata: Record<string, string>;
  redirectUrl: string;
}

export interface ZapriteOrder {
  id: string;
  checkoutUrl: string;
  status: string;
  metadata?: Record<string, string>;
}

export async function createZapriteOrder(
  payload: ZapriteOrderPayload,
): Promise<ZapriteOrder> {
  const res = await fetch(`${ZAPRITE_BASE}/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency,
      description: payload.description,
      metadata: payload.metadata,
      redirectUrl: payload.redirectUrl,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Zaprite create order failed (${res.status}): ${body}`);
  }

  return res.json();
}

export async function getZapriteOrder(orderId: string): Promise<ZapriteOrder> {
  const res = await fetch(`${ZAPRITE_BASE}/orders/${orderId}`, {
    method: "GET",
    headers: headers(),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Zaprite get order failed (${res.status}): ${body}`);
  }

  return res.json();
}
