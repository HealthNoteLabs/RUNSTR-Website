import { Container, Card } from "@/components/ui";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-[var(--background-card)]/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">Simple </span>
            <span className="text-[var(--accent)]">Pricing</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start free and upgrade when you&apos;re ready for the full experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="relative">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Free
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[var(--foreground)]">
                  $0
                </span>
                <span className="text-[var(--text-muted)]">/forever</span>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm mb-6">
              Everything you need to track workouts and join events.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Track unlimited workouts",
                "Join public events",
                "Basic leaderboards",
                "Workout history",
                "Progress tracking",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                >
                  <svg
                    className="w-5 h-5 text-[var(--accent)] flex-shrink-0"
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
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-center text-sm text-[var(--text-muted)]">
              Available now in the App Store
            </div>
          </Card>

          {/* Season Pass */}
          <Card className="relative border-2 border-[var(--accent)]/30">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-[var(--accent)] text-black text-xs font-bold rounded-full uppercase">
                Coming Soon
              </span>
            </div>

            <div className="mb-6 pt-2">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Season Pass
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[var(--accent)]">
                  $10
                </span>
                <span className="text-[var(--text-muted)]">/month</span>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm mb-6">
              Unlock premium features and get the most out of every event.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "20x reward multiplier",
                "Access to exclusive competitions",
                "Unlock additional workout modes",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                >
                  <svg
                    className="w-5 h-5 text-[var(--accent)] flex-shrink-0"
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
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Notify me when available
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
