"use client";

import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Rewards() {
  const ref = useScrollReveal();

  return (
    <section id="rewards" className="relative py-24">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h2 className="scroll-reveal font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-6">
            How rewards work
          </h2>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
            Every qualifying workout earns rewards. Physical conditioning is one
            of the strongest defenses against burnout there is, so Ember is built
            to pull you toward the work, not nag you about it. Log your effort,
            climb the daily leaderboard, earn rewards.
          </p>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed">
            By default, your rewards go to our charity partners, so showing up
            supports a cause automatically. Prefer to keep them? Add a Lightning
            address in the app and your rewards come to you instead. Either way,
            the work counts.
          </p>
        </div>
      </Container>
    </section>
  );
}
