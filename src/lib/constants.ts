export const APP_STORE_URL = "https://apps.apple.com/us/app/runstr/id6753015130";
export const GITHUB_URL = "https://github.com/RUNSTR-LLC/RUNSTR";

export const charities = [
  {
    id: "als",
    name: "ALS Network",
    description: "Fighting ALS through research and patient support. The default reward destination.",
    focus: "Default Cause",
  },
  {
    id: "hrf",
    name: "Human Rights Foundation",
    description: "Promoting and protecting human rights globally.",
    focus: "Human Rights",
  },
] as const;

export const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/#charities", label: "Rewards" },
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
