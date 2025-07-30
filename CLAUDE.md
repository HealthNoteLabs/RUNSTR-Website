# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for RUNSTR (www.runstr.club) - a fitness platform that allows users to create virtual running clubs, participate in challenges, and earn real money from their fitness activities.

## Architecture

This is a **static HTML website** with no build process or dependencies. The architecture is intentionally simple:

- **Main site**: `index.html` - Complete single-page application with inline CSS and JavaScript
- **Subpages**: `pages/` directory contains individual HTML files for secondary content
- **No framework**: Pure HTML/CSS/JavaScript with no build tools or package managers
- **Self-contained**: All styling and scripts are inline for easy deployment

### File Structure
```
/
├── index.html              # Main website (complete SPA)
├── pages/                  # Secondary pages
│   ├── bug-reports.html
│   ├── coming-soon.html
│   ├── community.html
│   ├── contact.html
│   ├── help.html
│   ├── integrations.html
│   └── system-requirements.html
├── CNAME                   # GitHub Pages domain config
└── README.md              # Project documentation
```

## Development Commands

**Local Development:**
```bash
# No build process required - simply open in browser
open index.html
```

**Testing:**
- No automated tests - manual browser testing only
- Test responsiveness across different screen sizes
- Verify all navigation links work correctly

## Key Design Principles

1. **No Dependencies**: Everything is self-contained HTML files
2. **Inline Assets**: CSS and JavaScript are embedded directly in HTML files
3. **Mobile-First**: Responsive design that works on all devices
4. **Static Deployment**: Can be deployed to any static hosting (GitHub Pages, Netlify, etc.)

## Page Templates

Each page in `pages/` follows a consistent structure:
- Fixed header with RUNSTR branding and navigation
- Main content area with page-specific information
- Footer with links to other sections
- Inline CSS styling matching the main site design
- Responsive layout that adapts to different screen sizes

## Content Updates

When updating content:
- Main website content is in `index.html`
- Secondary pages are in the `pages/` directory
- All styling is inline - no external CSS files
- Maintain consistent branding and design patterns across pages