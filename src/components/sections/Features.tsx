import { Container, Card } from "@/components/ui";
import { features } from "@/lib/constants";

const icons = {
  free: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  openSource: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  community: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
};

export function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">Why Choose </span>
            <span className="text-[var(--accent)]">RUNSTR?</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Built for athletes who value their privacy and want to make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden group">
              {/* Accent border on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              {/* Icon */}
              <div className="text-[var(--accent)] mb-4">
                {icons[feature.icon as keyof typeof icons]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--foreground)] mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                {feature.description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
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
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
