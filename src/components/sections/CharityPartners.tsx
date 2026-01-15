import { Container, Card } from "@/components/ui";
import { charities } from "@/lib/constants";

export function CharityPartners() {
  return (
    <section id="charities" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">Support </span>
            <span className="text-[var(--accent)]">Great Causes</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Every workout counts. Choose a charity and contribute with your fitness activity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {charities.map((charity) => (
            <Card key={charity.id} className="text-center p-8">
              {/* Charity icon placeholder */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[var(--accent)]"
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

              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                {charity.name}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {charity.description}
              </p>

              <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 rounded-full">
                {charity.focus}
              </span>
            </Card>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-[var(--text-muted)]">
          ...and many more
        </p>
      </Container>
    </section>
  );
}
