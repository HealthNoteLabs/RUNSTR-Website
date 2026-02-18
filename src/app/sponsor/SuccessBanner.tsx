"use client";

import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui";

const tierLabels: Record<string, string> = {
  community: "Community Sponsor",
  featured: "Featured Sponsor",
};

export function SuccessBanner() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const tier = searchParams.get("tier");

  if (status !== "success") return null;

  const label = tier && tierLabels[tier] ? tierLabels[tier] : "Sponsor";

  return (
    <div className="max-w-2xl mx-auto mb-10">
      <Card hover={false}>
        <div className="text-center py-4">
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
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-[var(--text-secondary)]">
            Your <span className="text-[var(--accent)] font-semibold">{label}</span> payment
            has been received. We&apos;ll be in touch shortly with next steps.
          </p>
        </div>
      </Card>
    </div>
  );
}
