export const APP_STORE_URL = "https://apps.apple.com/us/app/runstr/id6753015130";
export const GITHUB_URL = "https://github.com/RUNSTR-LLC/RUNSTR";
export const ZAPSTORE_URL = "https://zapstore.dev/apps/naddr1qvzqqqr7pvpzqcgsy8425f5jwsd3yd4me6j5c64f7g96xr9vuvtv82fag5yf5lg0qqwxxmmd9eskummw09kk7atn9ee82mnnw3ezuurjda4x2cm50etju8";
export const DC_5K_URL = "https://runsignup.com/Race/DC/Washington/Runstr5k";
export const YOUTUBE_URL = "https://youtube.com/@noburnouts";

// Zaprite checkout URLs for event sponsorship
export const ZAPRITE_COMMUNITY_SPONSOR_URL = "https://pay.zaprite.com/order/od_yBoaCjHmcU";
export const ZAPRITE_FEATURED_SPONSOR_URL = "https://pay.zaprite.com/order/od_TiQT7tPIRH";

export const charities = [
  {
    id: "hrf",
    name: "Human Rights Foundation",
    description: "Promoting and protecting human rights globally",
    focus: "Human Rights",
  },
  {
    id: "als",
    name: "ALS Network",
    description: "Fighting ALS through research and patient support",
    focus: "Health & Research",
  },
] as const;

export const features = [
  {
    title: "FREE TO USE",
    description: "Start tracking your workouts instantly with zero barriers.",
    bullets: [
      "No account required",
      "No email or phone",
      "No subscription required",
      "Start instantly",
    ],
    icon: "free",
  },
  {
    title: "OPEN SOURCE",
    description: "Every line of code is public and auditable.",
    bullets: [
      "Fully auditable",
      "No hidden tracking",
      "Code on GitHub",
      "No personal data collected",
    ],
    icon: "openSource",
  },
  {
    title: "COMPETITION",
    description: "Compete with athletes worldwide and support important causes.",
    bullets: [
      "Virtual & in-person events",
      "Global leaderboards",
      "Join Teams",
      "Support important causes",
    ],
    icon: "community",
  },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: "Download the App",
    description: "Get Ember from the App Store or GitHub.",
  },
  {
    step: 2,
    title: "Start Tracking",
    description: "Run, walk, cycle, and more.",
  },
  {
    step: 3,
    title: "Make an Impact",
    description: "Join competitions and earn rewards for charity.",
  },
] as const;

export const navLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/music", label: "Music" },
  { href: "/ember", label: "Ember App", badge: "New" },
] as const;

export type PlanId = "supporter" | "pro";

export interface TierConfig {
  id: PlanId;
  name: string;
  price: number; // sats per month
  features: string[];
}

export const tiers: TierConfig[] = [
  {
    id: "supporter",
    name: "Supporter",
    price: 15_000,
    features: [
      "10x rewards boost — 1,000 rewards per qualifying workout",
      "Up to 5 boosted workouts per week",
      "Base rate (100) applies after 5",
      "Season access included",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 21_000,
    features: [
      "Everything in Supporter",
      "Create Clubs",
      "Create Events",
    ],
  },
];

export const tierMap: Record<PlanId, TierConfig> = Object.fromEntries(
  tiers.map((t) => [t.id, t]),
) as Record<PlanId, TierConfig>;

export const footerLinks = {
  product: [
    { href: "/ember", label: "Ember App" },
    { href: "/articles", label: "Articles" },
    { href: "/music", label: "Burnout Radio" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: YOUTUBE_URL, label: "YouTube", external: true },
    { href: GITHUB_URL, label: "GitHub", external: true },
    { href: APP_STORE_URL, label: "App Store", external: true },
  ],
} as const;
