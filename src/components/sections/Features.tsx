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
    title: "Any Workout,",
    titleAccent: "Any Way",
    description:
      "Ember tracks more than running. Cardio with full GPS tracking, strength training, wellness, and mindfulness. But you don't have to use Ember's trackers at all.",
    bullets: [
      "Running, walking, cycling, hiking with GPS",
      "Strength: pushups, pull-ups, squats, bench press",
      "Wellness: meditation, breathwork, gratitude",
      "Works with Apple Health, Strava, Garmin, Fitbit",
      "Auto-syncs in the background",
    ],
    image: "/images/app-screen-4.png",
    imageAlt: "Ember Start Run screen with Cardio, Strength, and Wellness tabs",
  },
  {
    tag: "Earn",
    title: "Rewards,",
    titleAccent: "Your Way",
    description:
      "Every qualifying workout earns you rewards. Choose where they go: your wallet, a charity, a grassroots project, or converted into AI credits. Change your destination anytime.",
    bullets: [
      "Rewards funded by sponsors, not Ember",
      "Support ALS Network or Human Rights Foundation",
      "Daily Spin for bonus rewards",
      "No commitment, no complicated setup",
    ],
    image: "/images/app-screen-6.png",
    imageAlt: "Ember Rewards screen with Daily Spin wheel and ALS Network destination",
  },
  {
    tag: "Compete",
    title: "Compete",
    titleAccent: "Every Day",
    description:
      "A built-in daily leaderboard tracks the fastest 5K, 10K, half marathon, and marathon times alongside daily steps rankings, all updated in real time.",
    bullets: [
      "Daily leaderboards for every distance",
      "Featured events and distance challenges",
      "Virtual and in-person competitions",
      "Workouts auto-count toward active boards",
    ],
    image: "/images/app-screen-3.png",
    imageAlt: "Ember Events screen showing Season II Competition and Daily Leaderboards",
  },
  {
    tag: "Connect",
    title: "Social",
    titleAccent: "Feed",
    description:
      "See what the community is up to. Share workouts, follow clubs, and stay connected with athletes around the world. The social tab keeps you in the loop without the noise.",
    bullets: [
      "Community workout feed",
      "Follow clubs and athletes",
      "Share your achievements",
      "Stay motivated with your crew",
    ],
    image: "/images/app-screen-2.png",
    imageAlt: "Ember Social feed showing community workout posts",
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
            Three tabs, dark theme, no gimmicks. Private Mode lets you track
            workouts locally without participating in anything. Whether you&apos;re
            competing for the fastest 5K or logging your evening walk, Ember
            makes sure your effort counts.
          </p>

          {/* Feature pills */}
          <div className="scroll-reveal delay-300 flex flex-wrap justify-center gap-3">
            {[
              "Tap to Start",
              "No Account Needed",
              "Three Simple Tabs",
              "Dark Theme",
              "Private Mode",
              "Works Offline",
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
