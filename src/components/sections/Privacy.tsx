import { Container } from "@/components/ui";

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
  return (
    <section className="py-20 bg-[var(--background-secondary)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">Better Than </span>
            <span className="text-[var(--accent)]">The Rest</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            We don&apos;t sell your data because we don&apos;t collect it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Other Apps */}
          <div className="bg-[var(--background-card)] rounded-xl p-6 border border-[var(--text-muted)]/30">
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
          <div className="bg-[var(--background-card)] rounded-xl p-6 border border-[var(--accent)]">
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
    </section>
  );
}
