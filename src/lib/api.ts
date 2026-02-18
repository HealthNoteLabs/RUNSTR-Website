const SUPABASE_FUNCTIONS_URL =
  "https://mofalmnixppnqcvfkveq.supabase.co/functions/v1";

interface CreateOrderResponse {
  checkoutUrl: string;
  orderId: string;
}

interface Subscription {
  plan: string;
  status: string;
  expiresAt: string;
}

interface CheckSubscriptionResponse {
  subscription: Subscription | null;
}

export async function createOrder(
  npub: string,
  plan: string,
): Promise<CreateOrderResponse> {
  const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ npub, plan }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Order creation failed (${res.status})`);
  }

  return res.json();
}

export async function checkSubscription(
  npub: string,
): Promise<Subscription | null> {
  const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/check-subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ npub }),
  });

  if (!res.ok) return null;

  const data: CheckSubscriptionResponse = await res.json();
  return data.subscription;
}
