import { Container, Card } from "@/components/ui";
import { features } from "@/lib/constants";

const icons = {
  anonymous: (
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  localFirst: (
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
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
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
