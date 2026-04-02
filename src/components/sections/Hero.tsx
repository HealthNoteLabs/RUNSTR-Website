"use client";

import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { APP_STORE_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px] animate-orbit" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-[100px] animate-orbit anim-delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[160px] animate-pulse-glow" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-50" />

      <Container className="relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-card)] border border-[var(--border)] mb-8">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">
                Free to Start. No Account Required.
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up anim-delay-200 mb-6">
              <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tight block text-[var(--foreground)]">
                TRACK
              </span>
              <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tight block text-gradient">
                COMPETE
              </span>
              <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tight block text-[var(--foreground)]">
                EARN
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up anim-delay-400 text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-lg leading-relaxed">
              The fitness app that works with whatever you already use.
              Earn rewards, join competitions, and support causes you care
              about without giving up your privacy.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up anim-delay-600 flex flex-col sm:flex-row gap-4">
              <Button href={APP_STORE_URL} external size="lg">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download Free
              </Button>
              <Button href="#features" variant="outline" size="lg">
                See What&apos;s Inside
                <svg
                  className="w-4 h-4 ml-2"
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
              </Button>
            </div>

            {/* Stats row */}
            <div className="animate-fade-in-up anim-delay-800 mt-12 flex gap-8 sm:gap-12">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-[var(--accent)]">24/7</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">Auto-Sync</div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-[var(--accent)]">100%</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">Open Source</div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-[var(--accent)]">0</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">Data Collected</div>
              </div>
            </div>
          </div>

          {/* Right: Floating phone mockup — Profile screen */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right anim-delay-300">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-[var(--accent)]/15 rounded-[3rem] blur-[60px] scale-110 animate-pulse-glow" />

              {/* Phone frame */}
              <div className="relative animate-float">
                <div className="relative bg-[var(--background-card)] rounded-[2.5rem] p-2 border border-[var(--border)] shadow-2xl shadow-[var(--accent)]/10 w-[260px] sm:w-[300px]">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                  <div className="relative aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-black">
                    <Image
                      src="/images/app-screen-1.png"
                      alt="RUNSTR Profile Screen"
                      fill
                      className="object-cover object-top"
                      sizes="300px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge - top right */}
              <div className="absolute -top-4 -right-8 sm:-right-12 animate-fade-in-up anim-delay-700 bg-[var(--background-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--foreground)]">Leaderboard</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Updated live</div>
                  </div>
                </div>
              </div>

              {/* Floating badge - bottom left */}
              <div className="absolute -bottom-4 -left-8 sm:-left-12 animate-fade-in-up anim-delay-1000 bg-[var(--background-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--foreground)]">Earn Rewards</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Every workout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--accent)] rounded-full" />
        </div>
      </div>
    </section>
  );
}
