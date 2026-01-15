# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for RUNSTR (www.runstr.club) - an anonymous fitness tracking platform that lets users contribute to charitable causes with every workout. Positioned as a privacy-first alternative to Strava and Nike Run Club.

## Architecture

This is a **Next.js 14 website** with the App Router:

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Deployment**: Static export to GitHub Pages

### File Structure
```
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   ├── globals.css         # Global styles and theme
│   │   ├── privacy/            # Privacy policy page
│   │   └── contact/            # Contact page
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Landing page sections
│   │   └── ui/                 # Reusable UI components
│   └── lib/
│       └── constants.ts        # App store URLs, charity data
├── public/
│   ├── images/                 # Logo, screenshots
│   └── CNAME                   # GitHub Pages domain
├── next.config.ts              # Static export config
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
Card:           #1a1a1a
Accent:         #F5A356 (orange)
Accent Light:   #FFB76B
Text Primary:   #ffffff
Text Secondary: #888888
```

## Content Guidelines

- NO mentions of Bitcoin, Nostr, cryptocurrency, sats, Lightning
- Focus on anonymous fitness tracking and charity contributions
- Position as Strava/Nike Run Club alternative
- Key charities: Human Rights Foundation, ALS Network
