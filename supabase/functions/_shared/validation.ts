import { nip19 } from "https://esm.sh/nostr-tools@2";

export type PlanId = "supporter" | "pro";

const PLAN_CONFIG: Record<PlanId, { price: number; rank: number }> = {
  supporter: { price: 15_000, rank: 0 },
  pro: { price: 21_000, rank: 1 },
};

export function isValidNpub(npub: string): boolean {
  try {
    const decoded = nip19.decode(npub);
    return decoded.type === "npub";
  } catch {
    return false;
  }
}

export function isValidPlan(plan: string): plan is PlanId {
  return plan === "supporter" || plan === "pro";
}

export function getPlanPrice(plan: PlanId): number {
  return PLAN_CONFIG[plan].price;
}

export function getPlanRank(plan: PlanId): number {
  return PLAN_CONFIG[plan].rank;
}
