import { Container, Button } from "@/components/ui";
import { APP_STORE_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />

      <Container className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-card)] border border-[var(--border)] mb-8">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-sm text-[var(--text-secondary)]">
              Free to Start
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-[var(--foreground)]">Run Anywhere</span>
            <br />
            <span className="text-[var(--accent)]">Compete Everywhere</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Virtual challenges you can join from anywhere in the world.
            In-person races to meet the community. One app to track it all.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#events" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Events
            </Button>
            <Button href={APP_STORE_URL} external variant="outline" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-[var(--accent)] font-semibold">Virtual Challenges</div>
              <div className="text-[var(--text-muted)]">Compete from anywhere</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--accent)] font-semibold">In-Person Races</div>
              <div className="text-[var(--text-muted)]">Join the community</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--accent)] font-semibold">Global Leaderboards</div>
              <div className="text-[var(--text-muted)]">See where you rank</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[var(--text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </Container>
    </section>
  );
}
