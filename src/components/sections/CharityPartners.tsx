"use client";

import { Container, Card } from "@/components/ui";
import { charities } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

const rewardDestinations = [
  {
    label: "Your Wallet",
    description: "Keep your earnings",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    ),
  },
  {
    label: "Charity",
    description: "ALS Network, HRF & more",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: "Grassroots Projects",
    description: "Community-driven causes",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    label: "AI Credits",
    description: "Convert via PPQ.AI",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export function CharityPartners() {
  const ref = useScrollReveal(0.1);

  return (
    <section id="charities" className="relative py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-secondary)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div ref={ref} className="relative z-10">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="scroll-reveal font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)] mb-4">
              WHERE REWARDS <span className="text-gradient">GO</span>
            </h2>
            <p className="scroll-reveal delay-100 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              Every workout earns rewards. You choose a single destination.
              Change it anytime. Rewards are funded by sponsors, not Ember.
            </p>
          </div>

          {/* Reward destinations grid */}
          <div className="scroll-reveal delay-200 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {rewardDestinations.map((dest) => (
              <div
                key={dest.label}
                className="group bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-5 text-center hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  {dest.icon}
                </div>
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                  {dest.label}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{dest.description}</p>
              </div>
            ))}
          </div>

          {/* Charity partners */}
          <div className="scroll-reveal delay-300">
            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-8">
              Featured Charities
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {charities.map((charity) => (
                <Card key={charity.id} className="text-center p-8">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">
                    {charity.name}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    {charity.description}
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 rounded-full">
                    {charity.focus}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
