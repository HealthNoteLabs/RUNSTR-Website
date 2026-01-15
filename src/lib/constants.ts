export const APP_STORE_URL = "https://apps.apple.com/us/app/runstr/id6503943672";
export const GITHUB_URL = "https://github.com/RUNSTR-LLC/RUNSTR";
export const ZAPSTORE_URL = "https://zapstore.dev/apps/naddr1qvzqqqr7pvpzqcgsy8425f5jwsd3yd4me6j5c64f7g96xr9vuvtv82fag5yf5lg0qqwxxmmd9eskummw09kk7atn9ee82mnnw3ezuurjda4x2cm50etju8";

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
    title: "ANONYMOUS",
    description: "No email, no phone number, no user accounts. Just open the app and start moving. Your identity is yours to keep.",
    bullets: [
      "No account required",
      "No email or phone",
      "No personal data collected",
      "Start instantly",
    ],
    icon: "anonymous",
  },
  {
    title: "LOCAL FIRST",
    description: "Your fitness data lives on your device. Nothing leaves your phone unless you choose to join a public leaderboard or competition.",
    bullets: [
      "Data stored on your device",
      "Share only what you choose",
      "Public leaderboards are opt-in",
      "You control your data",
    ],
    icon: "localFirst",
  },
  {
    title: "OPEN SOURCE",
    description: "Every line of code is public. Audit it, fork it, contribute to it. No black boxes, no hidden tracking—just transparent software.",
    bullets: [
      "Code on GitHub",
      "Community-driven",
      "Fully auditable",
      "No hidden tracking",
    ],
    icon: "openSource",
  },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: "Download the App",
    description: "Get RUNSTR free from the App Store. No account needed.",
  },
  {
    step: 2,
    title: "Start Tracking",
    description: "Run, walk, or cycle. All data stays on your device.",
  },
  {
    step: 3,
    title: "Make an Impact",
    description: "Join competitions and contribute to charities with every workout.",
  },
] as const;

export const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#charities", label: "Charities" },
] as const;

export const footerLinks = {
  product: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: GITHUB_URL, label: "GitHub", external: true },
    { href: APP_STORE_URL, label: "App Store", external: true },
  ],
} as const;
