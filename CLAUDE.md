# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for No Burnout (www.runstr.club) — a brand platform and toolkit for people who work hard and intend to keep working hard, without burning out. No Burnout has three pillars: Articles (strategy writing), Burnout Radio (focus music), and Ember (the fitness app, formerly RUNSTR). The homepage is a brand hub; the Ember app showcase lives at `/ember`. Positioned as a resilience and endurance brand, not a "slow down" brand.

## Architecture

This is a **Next.js 14 website** with the App Router:

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Deployment**: Static export to GitHub Pages

### File Structure
```
/
├── content/
│   └── articles/               # Markdown articles (gray-matter frontmatter)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage — No Burnout brand hub
│   │   ├── globals.css         # Global styles and theme
│   │   ├── articles/           # Article list + [slug] reader pages
│   │   ├── music/              # Burnout Radio coming-soon page
│   │   ├── ember/              # Ember app showcase page
│   │   ├── privacy/            # Privacy policy page
│   │   └── contact/            # Contact page
│   │   # Parked (in repo, removed from nav): leaderboards/, pro/, sponsor/
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Page sections (BrandHero, GoodBurn, PillarCards, Features, etc.)
│   │   └── ui/                 # Reusable UI components (Button, Card, EmailSignup, etc.)
│   └── lib/
│       ├── constants.ts        # App store URLs, nav links, charity data, YouTube URL
│       ├── articles.ts         # Build-time markdown article loader
│       └── validation.ts       # Email validation helper
├── public/
│   ├── images/                 # Logos (no-burnout-logo.png, ember-logo.png), screenshots
│   └── CNAME                   # GitHub Pages domain
├── next.config.ts              # Static export config
├── vitest.config.ts            # Vitest unit test config
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# The build output goes to /out directory
```

## Key Design Principles

1. **Privacy First**: No mention of data collection, emphasize local-first
2. **Charity Focused**: Every workout contributes to charitable causes
3. **Anonymous**: No email, no phone, no personal data required
4. **Open Source**: Code is publicly auditable

## Theme/Colors

```
Background:     #000000 (pure black)
Background Secondary: #0a0a0a
Card:           #1a1a1a
Card Hover:     #2a2a2a
Accent:         #F5A356 (orange)
Accent Light:   #FFB76B
Text Primary:   #ffffff
Text Secondary: #888888
Text Muted:     #666666
Border:         #2a2a2a
```

**STRICT**: Only use these theme colors. No greens, reds, blues, or other colors outside the palette. No colorful emojis — use text or styled elements instead. Status indicators (active, live, completed, error) must use the accent orange or text/muted grays.

## Deployment Notes

GitHub Pages must be configured with `build_type: workflow` (not "legacy"). The deploy workflow (`.github/workflows/deploy.yml`) uses `actions/deploy-pages@v4` to publish the built `out/` directory. If Pages gets switched to legacy mode (serving from branch root), the site will 404 because it serves raw source files instead of the build output. Fix with:

```bash
gh api repos/HealthNoteLabs/RUNSTR-Website/pages -X PUT -f build_type=workflow
```

## Content Guidelines

- Brand: No Burnout (platform). App: Ember (fitness tracker).
- Voice: pro-hard-work, anti-burnout — resilience and endurance, not "slow down." Taglines: "Work hard, last longer." / "Resist the burnout. Go the distance."
- NO mentions of Bitcoin, Nostr, cryptocurrency, sats. "Token economy" is allowed in its behavioral-health sense.
- EXCEPTION: the rewards mechanic on /ember may name a "Lightning address" as the payout setting (rewards go to charity by default, or to the user if they add a Lightning address). This is the only place Lightning is named.
- No colorful emojis; status indicators use accent orange or text/muted grays.
- Three pillars: Articles (writing), Music (Burnout Radio), Ember (app).
