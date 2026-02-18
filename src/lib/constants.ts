export const APP_STORE_URL = "https://apps.apple.com/us/app/runstr/id6753015130";
export const GITHUB_URL = "https://github.com/RUNSTR-LLC/RUNSTR";
export const ZAPSTORE_URL = "https://zapstore.dev/apps/naddr1qvzqqqr7pvpzqcgsy8425f5jwsd3yd4me6j5c64f7g96xr9vuvtv82fag5yf5lg0qqwxxmmd9eskummw09kk7atn9ee82mnnw3ezuurjda4x2cm50etju8";
export const DC_5K_URL = "https://runsignup.com/Race/DC/Washington/Runstr5k";

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
    description: "Get RUNSTR from the App Store, GitHub, or Zapstore.",
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
  { href: "/#events", label: "Events" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/#features", label: "Features" },
  { href: "/#charities", label: "Charities" },
  { href: "/sponsor", label: "Sponsors" },
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
    price: 10_000,
    features: [
      "Boosted rewards — 800 sats per qualifying workout",
      "Season III event access",
      "Supporter badge",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 15_000,
    features: [
      "Everything in Supporter",
      "Create Clubs",
      "Create Events",
      "Early access to new features",
    ],
  },
];

export const tierMap: Record<PlanId, TierConfig> = Object.fromEntries(
  tiers.map((t) => [t.id, t]),
) as Record<PlanId, TierConfig>;

export const footerLinks = {
  product: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/contact", label: "Contact" },
    { href: "/sponsor", label: "Become a Sponsor" },
  ],
  resources: [
    { href: GITHUB_URL, label: "GitHub", external: true },
    { href: APP_STORE_URL, label: "App Store", external: true },
  ],
} as const;
