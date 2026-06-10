# RUNSTR Site Refresh — Simplified Cardio App

**Date:** 2026-06-10
**Status:** Approved (design), pending implementation

## Context

The website was reverted from the "No Burnout" rebrand back to RUNSTR (`main` at `c5ecb00`).
That reverted site, however, describes an *older, larger* RUNSTR: strength training, wellness/
mindfulness tracking, Teams, Clubs, a Daily Spin reward wheel, sats-priced subscription tiers,
and Season II events.

The app has since been **simplified to a cardio-only rewards app**. Confirmed by 5 new
screenshots and a 5-paragraph brand brief. This spec updates the site to match.

## Goals

- Site accurately reflects the simplified cardio app.
- Brand voice: **rewards-forward, technology invisible.**
- Reuse the existing rich/animated design; rewrite copy and swap imagery.

## Decisions (locked)

1. **Scope:** Full site cleanup — not just the homepage.
2. **Technology invisible:** Copy uses only "rewards" and "lightning address". No "Bitcoin",
   "sats", "crypto", or "Nostr" anywhere.
3. **Design:** Keep the existing animated layout/components; rewrite content + swap screenshots.
4. **Remove entirely:** `/pro` page, `/sponsor` page, homepage Events section.
   **Keep:** `/leaderboards`, `/privacy`, `/contact`.
5. **Hero headline:** `MOVE / EARN / REPEAT`, subhead "The cardio app that pays you to move."
6. **Reward Destination screenshot:** use as-is, **top-cropped** (Bitcoin project names at the
   bottom crop off; Strike address `thewildhustle@strike.me` and "PPQ.AI" may remain partially
   visible — accepted).

## The App (ground truth from the brief)

- One loop: complete a Run / Walk / Cycle / Hike — tracked by GPS or auto-synced from Apple
  Health / Health Connect — and earn a reward.
- **Three icon-only tabs:** Dashboard (home), Social feed (chat), Leaderboard (trophy).
- **Dashboard is the tracker:** athlete card (avatar, name, **Earnings** + **Streak** badges),
  activity picker (Run/Walk/Cycle/Hike), one large Start control → full-screen metrics. Corner
  menu holds preferences, full workout history, backup, wallet, password, support.
- **Rewards:** one reward per workout per day, paid automatically by an external service (the
  app only reads payment status, never moves money). Reward Destination screen (reached by
  tapping Earnings): keep rewards via a lightning address, or send to a cause. **ALS Network is
  the default.**
- **Social:** lightweight feed of workout posts — athlete, caption, stat block (distance, time,
  pace, calories); like, tip, comment.
- **Leaderboard:** always-on daily standings (daily steps, distance, 5K, 10K) by real numbers.
- **Philosophy:** small/hard-to-break surface, strict black-and-orange minimalism, no jargon.

## Image Plan

Add 5 new screenshots to `public/images/` (semantic names), replacing the old `app-screen-*`
and `screenshot-*` set:

| Source (Desktop/RUNSTR New App Images) | New filename | Used as |
|---|---|---|
| Screenshot_1781080037 (Dashboard collapsed) | `screen-dashboard.png` | Hero phone |
| Screenshot_1781080130 (Dashboard + activity picker) | `screen-activity.png` | Feature 1 (tracker) |
| Screenshot_1781080073 (Reward Destination) | `screen-rewards.png` | Feature 2 (rewards), top-cropped |
| Screenshot_1781080057 (Leaderboard) | `screen-leaderboard.png` | Feature 3 (compete) |
| Screenshot_1781080046 (Social feed) | `screen-social.png` | Feature 4 (social) |

`logo.png` (RUNSTR ostrich) is retained.

## Homepage Section Plan

1. **Hero** (`Hero.tsx`) — same animated layout. Headline `MOVE / EARN / REPEAT`. Subhead "The
   cardio app that pays you to move. Track a run, walk, cycle, or hike — or let it sync
   automatically — and earn a reward for every workout." Phone = Dashboard. Floating badges →
   **Earnings** and **Streak**. Stats row keeps no-account/privacy framing. CTA: Download Free.
2. **Features** (`Features.tsx`) — 4 blocks:
   - **Track — The Dashboard is the tracker.** Run/Walk/Cycle/Hike; GPS or auto-sync from Apple
     Health / Health Connect; full-screen distraction-free metrics; earn without opening the app.
     Image: activity.
   - **Earn — Rewards, your way.** One reward per workout, paid automatically; keep them with a
     lightning address or send them to a cause; ALS Network by default. Image: rewards.
   - **Compete — Every day.** Always-on daily standings — daily steps, distance, 5K, 10K — ranked
     by real numbers. Image: leaderboard.
   - **Connect — Social feed.** Workout posts with distance/time/pace/calories; like, tip,
     comment; community without the noise. Image: social.
   - **BuiltForYou:** three icon-only tabs, no account, dark & minimal, no jargon. Pills updated.
3. **App-in-action gallery** (`AppScreenshots.tsx`) — 5 phones: Dashboard · Activity · Rewards ·
   Leaderboard · Social.
4. ~~Events~~ — removed.
5. **CharityPartners** — lead with ALS Network as default destination; note other causes.
6. **Privacy** + **CallToAction** — kept, light copy cleanup; remove stale claims.

Section order in `page.tsx`: Hero → Features → AppScreenshots → CharityPartners → Privacy →
CallToAction.

## Cleanup

- **Delete:** `src/app/pro/`, `src/app/sponsor/`, `src/components/sections/Events.tsx` (+ its
  `index.ts` export and `page.tsx` import).
- **`constants.ts`:** remove `tiers`, `tierMap`, `PlanId`, `TierConfig` (pro-only);
  `ZAPRITE_COMMUNITY_SPONSOR_URL`, `ZAPRITE_FEATURED_SPONSOR_URL` (sponsor-only); `DC_5K_URL`
  (events-only); `ZAPSTORE_URL` if unused. Fix the COMPETITION feature "Join Teams" bullet.
  Update `navLinks` (drop Events, Sponsors) and `footerLinks` (drop Become a Sponsor).
- **Header/Footer:** drop removed nav/footer links.
- **CLAUDE.md:** add content-guideline exception — "lightning address" is allowed as the
  keep-your-rewards setting (rewards go to charity by default, or to the user via a lightning
  address); no other crypto terms.

## Tech-Invisibility Guardrail

No "Bitcoin / sats / crypto / Nostr" in any copy. "lightning address" is the only payment-rail
term, used exactly as the app surfaces it.

## Verification

- `npm run build` succeeds (static export, no broken imports/links after deletions).
- Grep the build output / `src` for forbidden terms (bitcoin, sats, crypto, nostr) → none in copy.
- Grep for references to removed routes (`/pro`, `/sponsor`) and removed features (Teams, Clubs,
  Daily Spin, strength, wellness, Season) → none remain.
</content>
</invoke>
