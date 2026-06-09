# No Burnout — Website Rebrand Design

**Date:** 2026-06-09
**Status:** Approved (design); pending implementation plan

## Overview

Rebrand the existing RUNSTR website (this Next.js 14 repo, currently serving
runstr.club) into **No Burnout** — an umbrella brand and content platform. The
fitness app that was "RUNSTR" is rebranded to **Ember** and becomes one of three
pillars on the site rather than the entire site.

No Burnout is **pro-hard-work, anti-burnout**: resilience and endurance, not
retreat. The thesis is *the good burn vs. burnout* — sustained effort you can
repeat, versus depletion that hollows you out. Taglines: *"Work hard, last
longer."* and *"Resist the burnout. Go the distance."*

The site consolidates what was going to live on Substack into one editable
platform: writing (articles + newsletter signup), Burnout Radio (music), and the
Ember app.

## Brand & content rules

- **Umbrella brand:** No Burnout. **App:** Ember.
- **No mentions of Nostr or Bitcoin** in any public copy. "Token economy" is
  permitted, used in its behavioral-health sense (an incentive system), not as a
  crypto reference.
- **Honest rewards mechanic** (the one allowed payout detail): every qualifying
  workout earns rewards; by default rewards go to the charity partners; if a user
  adds a **Lightning address**, the rewards go to them instead. "Lightning
  address" is framed as a payout *setting*, not a crypto pitch. This is the only
  place Lightning is named.
- No colorful emoji; status indicators use accent orange or text/muted grays
  (existing CLAUDE.md rule, retained).

## Theme

- **Palette unchanged:** pure black backgrounds + ember-orange accent
  (`#F5A356` / `#FFB76B`). No new colors.
- **Visual direction:** shift from "energy/hype" toward "steady warmth" — soft
  coal-glow radial gradients behind key elements, restrained ember-glow accents,
  calm slow-reveal animations using the existing `useScrollReveal` hook and
  generous spacing. The site should feel the way the lo-fi music sounds.
- The ember motif is the brand made literal: a controlled, sustained coal (the
  good burn) versus a fire that consumes everything and goes to ash (burnout).

## Site map

```
/                 Brand hub — the No Burnout story + 3 pillars + email signup
/articles         Article list (newest first)
/articles/[slug]  Article page (rendered from markdown)
/music            Burnout Radio — "Coming soon" + YouTube channel link
/ember            Ember app showcase (current fitness sections relocated here)
/contact          (footer link)
/privacy          (footer link)
```

**Parked** (kept in repo, removed from navigation, not deleted):
`/leaderboards`, `/pro`, `/sponsor`.

- **Top nav:** Articles · Music · Ember App (with a `New` badge).
- **Footer:** Contact, Privacy, YouTube (youtube.com/@noburnouts), GitHub,
  App Store.

## Components / pages

### Homepage — brand hub (`/`)
Replaces the current app-landing page. Section flow:
1. **Hero** — the manifesto core (condensed from "Work Hard, Last Longer") +
   primary email-signup CTA.
2. **The good burn vs. burnout** — the central framing section.
3. **Three pillar cards** — Articles / Burnout Radio / Ember, each linking to its
   tab.
4. **Email signup**.
5. **Footer**.

The full "Work Hard, Last Longer" article lives at
`/articles/work-hard-last-longer`; the homepage borrows its narrative spine in
condensed form.

### Articles (`/articles`, `/articles/[slug]`)
- Authored as markdown files in `content/articles/*.md`.
- Frontmatter per file: `title`, `date`, `excerpt`, `slug`.
- Build-time read produces:
  - `/articles` — list of article cards (title, date, excerpt), newest first.
  - `/articles/[slug]` — styled long-form reader in the ember theme with generous
    typography.
- A markdown rendering dependency is added (e.g. `react-markdown` with
  `remark-gfm`, or build-time MDX). Choice finalized in the implementation plan;
  must be compatible with `output: export` static builds.
- **First article:** "Work Hard, Last Longer" (full text supplied by the user),
  including the closing 988 crisis-line disclaimer.

### Music (`/music`)
- Branded "Burnout Radio — Coming soon" state with a short description.
- Prominent link to youtube.com/@noburnouts.
- Structured so audio embeds / players can be dropped in later with a small edit.

### Ember app (`/ember`)
- Relocated and rebranded versions of the current sections: hero/app
  screenshots (current images used as placeholders; user will swap later),
  features, **honest rewards section** (charity-by-default / Lightning-address
  payout), charity partners, and download links (App Store / GitHub / Zapstore).
- The nav item carries a `New` badge.

## Data flow — email subscriptions

- Signup form appears on the homepage and the articles area.
- On submit, the email is written to a Supabase `subscribers` table using the
  existing client in `src/lib/supabase.ts`.
- Theme-styled success and error states.
- **Out of scope:** actually sending newsletters — the site only collects
  addresses. A sending tool is chosen later; the list is owned in Supabase and
  exportable.

### Supabase `subscribers` table (new)
- `id` (uuid, pk, default gen)
- `email` (text, unique, not null)
- `created_at` (timestamptz, default now())
- Row-level security / insert policy configured to allow anonymous inserts of
  email only (consistent with the existing public edge-function pattern).

## Rebrand mechanics

A global RUNSTR → No Burnout / Ember pass:
- Site `<title>`, metadata, and Open Graph tags in `src/app/layout.tsx`.
- Header and Footer branding + logo treatment.
- Copy throughout all sections.
- `src/lib/constants.ts` (nav links, footer links, feature/how-it-works copy,
  app store/links).
- Public copy stays crypto-clean everywhere except the single honest "Lightning
  address" payout mention on `/ember`.

## CLAUDE.md update

Revise the repo's `CLAUDE.md` to reflect the new brand:
- Project overview → No Burnout platform with Ember app.
- Content guidelines → No Burnout voice; still **no Bitcoin/Nostr/crypto** in
  public copy, with the explicit, narrow exception that the rewards mechanic on
  `/ember` may name a "Lightning address" as the payout setting.
- Keep theme/palette and deployment rules.

## Deployment / domain

- Keep the current deploy pipeline (`actions/deploy-pages@v4`, static `out/`)
  and the existing `CNAME` (runstr.club) unchanged for now so nothing breaks.
- When a No Burnout domain is ready, swapping the `CNAME` is a one-line change —
  the user will flag when ready.

## Out of scope (YAGNI)

- Newsletter *sending* / email delivery.
- Music hosting, audio players, or embeds (placeholder only).
- Reviving the parked pages (`/leaderboards`, `/pro`, `/sponsor`).
- New Ember app screenshots (user swaps later).
- Article tags, categories, search, pagination, or multi-author support.

## Success criteria

- Top nav shows Articles · Music · Ember App (New); parked pages are unlinked.
- Homepage tells the No Burnout story and routes to the three pillars.
- `/articles` lists articles from markdown; "Work Hard, Last Longer" renders in
  full at its slug with the 988 disclaimer.
- `/music` shows the Coming Soon state and links to the YouTube channel.
- `/ember` shows the rebranded app showcase with the honest rewards section.
- Email signup writes to Supabase and shows themed success/error states.
- No public copy references Bitcoin or Nostr; "Lightning address" appears only in
  the `/ember` rewards explanation.
- `npm run build` produces a working static export.
