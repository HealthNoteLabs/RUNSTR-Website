"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

const pillars = [
  {
    href: "/articles",
    title: "The Writing",
    body: "Honest, practical strategy for staying in the fight. How to read the warning signs, build stamina, and push hard without breaking.",
    cta: "Read the strategy",
  },
  {
    href: "/music",
    title: "Burnout Radio",
    body: "Calm but focused lo-fi made to lock into. The soundtrack for deep work, long study sessions, and hard training.",
    cta: "Put on the music",
  },
  {
    href: "/ember",
    title: "Ember",
    body: "A fitness tracker that rewards you for showing up, because conditioning is one of the strongest defenses against burnout.",
    cta: "Get the work in",
  },
];

export function PillarCards() {
  const ref = useScrollReveal();
  return (
    <section id="pillars" className="relative py-24">
      <Container>
        <div ref={ref} className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="scroll-reveal group block p-8 rounded-2xl bg-[var(--background-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <h3 className="font-display text-2xl tracking-wide text-[var(--foreground)] mb-3">
                {p.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {p.body}
              </p>
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] group-hover:text-[var(--accent-light)]">
                {p.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
