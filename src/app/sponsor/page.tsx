import { Suspense } from "react";
import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Container, Card, Button } from "@/components/ui";
import {
  DC_5K_URL,
  ZAPRITE_COMMUNITY_SPONSOR_URL,
  ZAPRITE_FEATURED_SPONSOR_URL,
} from "@/lib/constants";
import { SuccessBanner } from "./SuccessBanner";

export const metadata: Metadata = {
  title: "Sponsor RUNSTR — Events & In-App Visibility",
  description:
    "Put your brand in front of every RUNSTR athlete. Sponsor our in-app rewards or the RUNSTR 5K in Washington DC.",
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const inAppPerks = [
  {
    title: "Rewards Screen Banner",
    description:
      "Your logo and message shown to every active user on the Rewards screen — the most-visited screen in the app.",
  },
  {
    title: "Tappable Link",
    description:
      "Your banner links directly to your website. One tap from workout completion to your landing page.",
  },
  {
    title: "Full Rotation Control",
    description:
      "Weekly or monthly slots. We swap sponsors instantly — no app update required.",
  },
];

const eventTiers = [
  {
    name: "Community Sponsor",
    price: "$500",
    href: ZAPRITE_COMMUNITY_SPONSOR_URL,
    perks: [
      'Logo on race t-shirt (3" x 2")',
      "Shout-out at the start of the race",
      "Featured in social media broadcasts",
      "Logo on RUNSTR website sponsors page",
    ],
  },
  {
    name: "Featured Sponsor",
    price: "$1,000",
    href: ZAPRITE_FEATURED_SPONSOR_URL,
    featured: true,
    perks: [
      'Premium logo on front of race t-shirt (4" x 3")',
      "2 ft x 4 ft banners on the race course",
      "Shout-out at start, finish, and Pubkey DC Brunch",
      "Featured in social media broadcasts",
      "Logo on RUNSTR website sponsors page",
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SponsorPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* ---- Hero ---- */}
        <section className="pb-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-[var(--foreground)]">Sponsor </span>
                <span className="text-[var(--accent)]">RUNSTR</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Put your brand in front of every athlete — in the app and on the
                course. Digital reach meets real-world presence.
              </p>
            </div>
          </Container>
        </section>

        {/* ---- Success banner (shown after Zaprite redirect) ---- */}
        <Suspense fallback={null}>
          <Container>
            <SuccessBanner />
          </Container>
        </Suspense>

        {/* ---- Section 1: In-App Reward Sponsorship ---- */}
        <section className="py-16 border-t border-[var(--border)]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]/30 rounded-full mb-4">
                  Digital
                </span>
                <h2 className="text-3xl font-bold mb-3">
                  In-App Reward Sponsorship
                </h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                  Every workout triggers a reward. Your brand is shown alongside
                  that moment — the highest-engagement touchpoint in the app.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {inAppPerks.map((perk) => (
                  <Card key={perk.title} hover={false}>
                    <h3 className="font-bold text-[var(--foreground)] mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {perk.description}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  Monthly and weekly slots available. Contact us for rates.
                </p>
                <Button href="mailto:dakota.brown@runstr.club" variant="outline">
                  Inquire About In-App Sponsorship
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* ---- Section 2: District 5K Event Sponsorship ---- */}
        <section className="py-16 border-t border-[var(--border)]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]/30 rounded-full mb-4">
                  Live Event
                </span>
                <h2 className="text-3xl font-bold mb-3">
                  RUNSTR 5K — March 15, 2026
                </h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                  Hains Point, Washington DC. 200+ expected participants.
                  During Pubkey DC Brunch weekend. $500 donated to the winning
                  charity.
                </p>
              </div>

              {/* Tier comparison */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {eventTiers.map((tier) => (
                  <Card
                    key={tier.name}
                    hover={false}
                    className={
                      tier.featured
                        ? "border-2 border-[var(--accent)]/40 relative"
                        : ""
                    }
                  >
                    {tier.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--accent)] text-black text-xs font-bold rounded-full uppercase">
                        Best Value
                      </span>
                    )}
                    <div className="text-center mb-6 pt-2">
                      <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                      <p className="text-3xl font-black text-[var(--accent)]">
                        {tier.price}
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[var(--accent)] flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={tier.href}
                      external
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      Sponsor — {tier.price}
                    </Button>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button href={DC_5K_URL} external variant="secondary" size="sm">
                  View Race Details
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* ---- Section 3: Subscriber Tiers (context for sponsors) ---- */}
        <section className="py-16 border-t border-[var(--border)]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">
                  The RUNSTR Audience
                </h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                  RUNSTR athletes earn rewards for every qualifying workout.
                  Free users earn 100 rewards per workout. Subscribers get a
                  10x boost — 1,000 rewards per qualifying workout.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                {/* Free tier */}
                <Card hover={false}>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold mb-1">Free</h3>
                    <p className="text-2xl font-black text-[var(--text-secondary)]">
                      0{" "}
                      <span className="text-sm font-normal">sats / month</span>
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Track workouts",
                      "Global leaderboards",
                      "100 rewards per workout",
                      "One qualifying workout per day",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[var(--text-muted)] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                        </span>
                        <span className="text-[var(--text-secondary)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Supporter tier */}
                <Card hover={false}>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold mb-1">Supporter</h3>
                    <p className="text-2xl font-black text-[var(--accent)]">
                      15,000{" "}
                      <span className="text-sm font-normal text-[var(--text-secondary)]">
                        sats / month
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "1,000 rewards per qualifying workout",
                      "Up to 5 boosted workouts per week",
                      "Base rate (100) after 5",
                      "Season access included",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[var(--accent)] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        </span>
                        <span className="text-[var(--text-secondary)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Pro tier */}
                <Card hover={false} className="border-2 border-[var(--accent)]/40">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold mb-1">Pro</h3>
                    <p className="text-2xl font-black text-[var(--accent)]">
                      21,000{" "}
                      <span className="text-sm font-normal text-[var(--text-secondary)]">
                        sats / month
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Everything in Supporter",
                      "Create Clubs",
                      "Create Events",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[var(--accent)] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        </span>
                        <span className="text-[var(--text-secondary)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto">
                  Qualifying activities: running, walking, cycling, pushups,
                  journal entries, and 5,000+ daily steps. One reward per day
                  max. Your sponsor banner is shown every time a user checks
                  their rewards.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ---- Section 4: CTA / Contact ---- */}
        <section className="py-16 border-t border-[var(--border)]">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-[var(--foreground)]">Ready to </span>
                <span className="text-[var(--accent)]">Partner?</span>
              </h2>
              <p className="text-[var(--text-secondary)] mb-8">
                Whether you want in-app visibility, event presence, or both —
                let&apos;s talk.
              </p>

              <Card hover={false} className="text-left">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-1">
                      Dakota Brown
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                      Founder, RUNSTR
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+17034009110"
                        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-[var(--accent)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        (703) 400-9110
                      </a>
                      <a
                        href="mailto:dakota.brown@runstr.club"
                        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-[var(--accent)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        dakota.brown@runstr.club
                      </a>
                      <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <svg
                          className="w-4 h-4 text-[var(--accent)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                          />
                        </svg>
                        runstr.club
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:justify-center">
                    <Button href="mailto:dakota.brown@runstr.club" className="w-full">
                      Email Us
                    </Button>
                    <Button
                      href={ZAPRITE_COMMUNITY_SPONSOR_URL}
                      external
                      variant="outline"
                      className="w-full"
                    >
                      Pay $500 — Community
                    </Button>
                    <Button
                      href={ZAPRITE_FEATURED_SPONSOR_URL}
                      external
                      variant="outline"
                      className="w-full"
                    >
                      Pay $1,000 — Featured
                    </Button>
                  </div>
                </div>
              </Card>

              <p className="mt-6 text-xs text-[var(--text-muted)]">
                Payments accepted via card, Apple Pay, Google Pay, Cash App, and
                more.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
