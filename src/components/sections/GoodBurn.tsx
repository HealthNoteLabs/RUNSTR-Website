"use client";

import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function GoodBurn() {
  const ref = useScrollReveal();
  return (
    <section className="relative py-24">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h2 className="scroll-reveal font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-6">
            The good burn vs. burnout
          </h2>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
            Effort that builds you, training that makes you durable, deep work
            that carries you toward something real. That is the good burn, and
            you want more of it.
          </p>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed">
            Depletion that hollows you out with nothing to show for it. That is
            burnout, and it is the enemy. Everything here exists to keep you on
            the right side of that line. Recovery is not retreat. It is what
            makes the hard effort repeatable.
          </p>
        </div>
      </Container>
    </section>
  );
}
