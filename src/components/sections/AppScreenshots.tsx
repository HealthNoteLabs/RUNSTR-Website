import Image from "next/image";
import { Container } from "@/components/ui";

const screenshots = [
  {
    src: "/images/screenshot-profile.png",
    alt: "RUNSTR Profile - Anonymous Athlete",
    label: "Anonymous Profile",
  },
  {
    src: "/images/screenshot-workout.png",
    alt: "RUNSTR Start Workout",
    label: "Start Workout",
  },
  {
    src: "/images/screenshot-history.png",
    alt: "RUNSTR Workout History",
    label: "Track Progress",
  },
  {
    src: "/images/screenshot-leaderboard.png",
    alt: "RUNSTR Leaderboard",
    label: "Compete",
  },
];

export function AppScreenshots() {
  return (
    <section className="py-20 bg-[var(--background-secondary)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">The App in </span>
            <span className="text-[var(--accent)]">Action</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Clean, simple, and focused on what matters: your fitness journey.
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.src}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Phone Frame */}
              <div className="relative bg-[var(--background-card)] rounded-[2rem] p-2 border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-lg group-hover:shadow-[var(--accent)]/10 group-hover:-translate-y-2">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10" />

                {/* Screenshot */}
                <div className="relative aspect-[9/19.5] rounded-[1.5rem] overflow-hidden bg-black">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Label */}
              <p className="text-center mt-4 text-sm text-[var(--text-secondary)] font-medium">
                {screenshot.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
