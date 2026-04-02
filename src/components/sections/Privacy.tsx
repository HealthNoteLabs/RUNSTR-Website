"use client";

import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

const otherAppsIssues = [
  "Require email & phone",
  "Track your location 24/7",
  "Sell your data to advertisers",
  "Closed source code",
];

const runstrBenefits = [
  "No personal info needed",
  "Location data stays on device",
  "Zero data selling, ever",
  "100% open source",
];

export function Privacy() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div ref={ref} className="relative z-10">
        <Container>
          <div className="text-center mb-12">
            <h2 className="scroll-reveal font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)] mb-4">
              BETTER THAN <span className="text-gradient">THE REST</span>
            </h2>
            <p className="scroll-reveal delay-100 text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              We don&apos;t sell your data because we don&apos;t collect it.
            </p>
          </div>

          <div className="scroll-reveal delay-200 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Other Apps */}
            <div className="bg-[var(--background-card)] rounded-xl p-6 border border-[var(--text-muted)]/20 group hover:border-[var(--text-muted)]/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-[var(--text-muted)] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Other Fitness Apps
              </h3>
              <ul className="space-y-3">
                {otherAppsIssues.map((issue) => (
                  <li
                    key={issue}
                    className="flex items-center gap-3 text-[var(--text-secondary)]"
                  >
                    <svg
                      className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* RUNSTR */}
            <div className="bg-[var(--background-card)] rounded-xl p-6 border border-[var(--accent)]/40 group hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-[var(--accent)] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                RUNSTR
              </h3>
              <ul className="space-y-3">
                {runstrBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-[var(--text-secondary)]"
                  >
                    <svg
                      className="w-4 h-4 text-[var(--accent)] flex-shrink-0"
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
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
