"use client";

import { Container, Button, EmailSignup } from "@/components/ui";

export function BrandHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px] animate-orbit" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-[100px] animate-orbit anim-delay-500" />
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <Container className="relative z-10 py-16 text-center">
        <h1 className="animate-fade-in-up mb-6">
          <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight block text-[var(--foreground)]">
            WORK HARD
          </span>
          <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight block text-gradient">
            LAST LONGER
          </span>
        </h1>
        <p className="animate-fade-in-up anim-delay-200 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
          No Burnout is for people who work hard and intend to keep working hard,
          without letting it grind them into the ground. Burnout is the enemy of
          your goals. We help you outlast it.
        </p>
        <div className="animate-fade-in-up anim-delay-400 flex flex-col items-center gap-6">
          <EmailSignup className="mx-auto" />
          <Button href="#pillars" variant="outline" size="md">
            See what&apos;s inside
          </Button>
        </div>
      </Container>
    </section>
  );
}
