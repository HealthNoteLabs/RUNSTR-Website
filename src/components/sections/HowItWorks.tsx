import { Container } from "@/components/ui";
import { howItWorks } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[var(--background-secondary)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">How It </span>
            <span className="text-[var(--accent)]">Works</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get started in seconds. No registration, no hassle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line (hidden on mobile and last item) */}
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent" />
              )}

              <div className="text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--background-card)] border-2 border-[var(--accent)] mb-4">
                  <span className="text-2xl font-bold text-[var(--accent)]">
                    {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
