"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface FeatureSection {
  tag: string;
  title: string;
  titleAccent: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
}

const featureSections: FeatureSection[] = [
  {
    tag: "Track",
    title: "The Home Screen",
    titleAccent: "Is the Tracker",
    description:
      "RUNSTR's home screen is where you actually work out. Pick an activity, hold to start, and the screen becomes a clean, full-screen, distraction-free metrics view. No menus to dig through, nothing in the way.",
    bullets: [
      "Run, walk, cycle, or hike with GPS",
      "Or sync automatically from Apple Health & Health Connect",
      "Full-screen, distraction-free metrics",
      "Earn rewards without ever opening the app",
    ],
    image: "/images/screen-activity.png",
    imageAlt: "RUNSTR Dashboard with Run, Walk, Cycle, and Hike activity picker",
  },
  {
    tag: "Earn",
    title: "Rewards,",
    titleAccent: "Your Way",
    description:
      "Finish a workout and you earn a reward. You decide where it goes: keep it by adding a lightning address, or send it to a cause. By default, rewards support the ALS Network.",
    bullets: [
      "One reward per workout, paid automatically",
      "Keep your rewards with a lightning address",
      "Or give them to a cause — ALS Network by default",
      "No commitment, no complicated setup",
    ],
    image: "/images/screen-rewards.png",
    imageAlt: "RUNSTR Reward Destination screen",
  },
  {
    tag: "Compete",
    title: "Compete",
    titleAccent: "Every Day",
    description:
      "Always-on daily standings rank athletes by their real numbers. See where you land on daily steps and distance, and chase the fastest 5K and 10K. Workouts count automatically.",
    bullets: [
      "Always-on daily leaderboards",
      "Daily steps and distance rankings",
      "Fastest 5K and 10K standings",
      "Ranked by real numbers, updated live",
    ],
    image: "/images/screen-leaderboard.png",
    imageAlt: "RUNSTR Leaderboard showing 5K, 10K, and daily steps standings",
  },
  {
    tag: "Connect",
    title: "Social",
    titleAccent: "Feed",
    description:
      "A lightweight feed of workout posts. Each card shows the athlete, a short caption, and a clean stat block. Like, tip, and comment — a real community pulse without the noise of a full social network.",
    bullets: [
      "Community workout feed",
      "Distance, time, pace, and calories on every post",
      "Like, tip, and comment",
      "Friendly competition, none of the overhead",
    ],
    image: "/images/screen-social.png",
    imageAlt: "RUNSTR Social feed showing community workout posts",
  },
];

function FeatureBlock({
  feature,
  index,
}: {
  feature: FeatureSection;
  index: number;
}) {
  const ref = useScrollReveal(0.1);
  const isReversed = index % 2 === 1;

  return (
    <div ref={ref} className="py-16 md:py-24">
      <Container>
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            isReversed ? "lg:direction-rtl" : ""
          }`}
          style={isReversed ? { direction: "rtl" } : undefined}
        >
          {/* Text side */}
          <div
            className={`${isReversed ? "scroll-reveal-right" : "scroll-reveal-left"}`}
            style={isReversed ? { direction: "ltr" } : undefined}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {feature.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-6">
              <span className="text-[var(--foreground)]">{feature.title} </span>
              <span className="text-gradient">{feature.titleAccent}</span>
            </h2>

            {/* Description */}
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-lg">
              {feature.description}
            </p>

            {/* Bullets */}
            <ul className="space-y-3">
              {feature.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone side */}
          <div
            className={`flex justify-center ${isReversed ? "scroll-reveal-left" : "scroll-reveal-right"} delay-200`}
            style={isReversed ? { direction: "ltr" } : undefined}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-[var(--accent)]/10 rounded-[3rem] blur-[80px] scale-110" />

              {/* Phone */}
              <div className="relative bg-[var(--background-card)] rounded-[2.5rem] p-2 border border-[var(--border)] shadow-2xl shadow-black/50 w-[240px] sm:w-[280px] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[var(--accent)]/20">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                <div className="relative aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-black">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function BuiltForYou() {
  const ref = useScrollReveal(0.1);

  return (
    <div ref={ref} className="py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                Simple
              </span>
            </div>
          </div>

          <h2 className="scroll-reveal delay-100 font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-6">
            <span className="text-[var(--foreground)]">Built to Stay </span>
            <span className="text-gradient">Out of Your Way</span>
          </h2>

          <p className="scroll-reveal delay-200 text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Tap Start and you&apos;re in. No account, no email, no sign-up form.
            The whole app is three icon-only tabs &mdash; home, feed, and
            leaderboard &mdash; on a strict black-and-orange theme, with no
            jargon anywhere. Just one loop: move, earn, see it.
          </p>

          {/* Feature pills */}
          <div className="scroll-reveal delay-300 flex flex-wrap justify-center gap-3">
            {[
              "Tap to Start",
              "No Account Needed",
              "Three Icon Tabs",
              "Dark & Minimal",
              "Move · Earn · Repeat",
              "No Jargon",
            ].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full bg-[var(--background-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export function Features() {
  return (
    <section id="features">
      {/* Section header */}
      <div className="pt-20 pb-8">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)]">
              WHAT&apos;S <span className="text-gradient">INSIDE</span>
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
          </div>
        </Container>
      </div>

      {featureSections.map((feature, index) => (
        <FeatureBlock key={feature.tag} feature={feature} index={index} />
      ))}

      <BuiltForYou />
    </section>
  );
}
