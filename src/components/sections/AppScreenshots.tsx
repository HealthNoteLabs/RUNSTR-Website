"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

const screenshots = [
  {
    src: "/images/app-screen-1.png",
    alt: "RUNSTR Profile",
    label: "Profile",
  },
  {
    src: "/images/app-screen-4.png",
    alt: "RUNSTR Start Run",
    label: "Start Run",
  },
  {
    src: "/images/app-screen-6.png",
    alt: "RUNSTR Rewards",
    label: "Rewards",
  },
  {
    src: "/images/app-screen-3.png",
    alt: "RUNSTR Events",
    label: "Competitions",
  },
  {
    src: "/images/app-screen-2.png",
    alt: "RUNSTR Social",
    label: "Social",
  },
  {
    src: "/images/app-screen-5.png",
    alt: "RUNSTR History",
    label: "History",
  },
];

export function AppScreenshots() {
  const ref = useScrollReveal(0.05);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="scroll-reveal font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)] mb-4">
              THE APP IN <span className="text-gradient">ACTION</span>
            </h2>
            <p className="scroll-reveal delay-100 text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Clean, dark, and focused on what matters.
            </p>
          </div>

          {/* Screenshots — 6 phones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 max-w-6xl mx-auto">
            {screenshots.map((screenshot, index) => {
              const delayClass = `delay-${(index + 1) * 100}`;
              return (
                <div
                  key={screenshot.src}
                  className={`scroll-reveal-scale ${delayClass} group ${index >= 2 ? "hidden sm:block" : ""} ${index >= 3 ? "sm:hidden md:block" : ""}`}
                >
                  <div
                    className="relative transition-all duration-500 group-hover:-translate-y-3"
                    style={{ marginTop: index % 2 === 1 ? "2rem" : "0" }}
                  >
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 rounded-[2rem] blur-[40px] transition-all duration-500 scale-110" />

                    {/* Phone frame */}
                    <div className="relative bg-[var(--background-card)] rounded-[2rem] p-1.5 border border-[var(--border)] group-hover:border-[var(--accent)]/40 transition-all duration-500 shadow-lg shadow-black/30 group-hover:shadow-[var(--accent)]/10">
                      {/* Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-full z-10" />

                      {/* Screenshot */}
                      <div className="relative aspect-[9/19.5] rounded-[1.5rem] overflow-hidden bg-black">
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                        />
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-center mt-4 text-sm text-[var(--text-muted)] font-medium group-hover:text-[var(--accent)] transition-colors duration-300">
                      {screenshot.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
