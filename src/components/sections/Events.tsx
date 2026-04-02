"use client";

import Link from "next/link";
import { Container, Card, Button } from "@/components/ui";
import { APP_STORE_URL } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Events() {
  const ref = useScrollReveal(0.05);

  return (
    <section id="events" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-[var(--background-secondary)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div ref={ref} className="relative z-10">
        <Container>
          <div className="text-center mb-12">
            <h2 className="scroll-reveal font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)] mb-4">
              EVENTS &amp; <span className="text-gradient">COMPETITIONS</span>
            </h2>
            <p className="scroll-reveal delay-100 text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Compete in virtual challenges and in-person races. Daily
              leaderboards track the fastest times and most steps in real time.
            </p>
          </div>

          <div className="scroll-reveal delay-200 max-w-3xl mx-auto space-y-6">
            {/* Season III Coming Soon */}
            <Card className="relative overflow-hidden border-2 border-[var(--accent)]/30 group">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[var(--accent)] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-full md:w-48 h-48 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 rounded-lg group-hover:from-[var(--accent)]/30 transition-all duration-500">
                  <div className="text-center">
                    <div className="font-display text-6xl text-[var(--accent)]">
                      III
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">
                      Season Three
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-3xl text-[var(--foreground)] mb-2">
                    RUNSTR SEASON III
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    The next season of RUNSTR competitions is on the way.
                    Distance challenges, team events, and more. Download the app
                    to be ready when it drops.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button href={APP_STORE_URL} external size="md">
                      Get the App
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Daily Leaderboards */}
            <Link href="/leaderboards" className="block group/card">
              <Card className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                        Live
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-[var(--foreground)] group-hover/card:text-[var(--accent)] transition-colors mb-1">
                      DAILY LEADERBOARDS
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Fastest 5K, 10K, Half Marathon, Marathon &amp; Most Steps
                      updated in real time.
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-[var(--text-muted)] group-hover/card:text-[var(--accent)] group-hover/card:translate-x-1 transition-all flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Card>
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
