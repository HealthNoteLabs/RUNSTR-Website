# No Burnout Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the RUNSTR website into the No Burnout platform — a brand hub with three pillars (Articles, Burnout Radio/Music, the Ember app) — while keeping the existing black + ember-orange theme.

**Architecture:** Next.js App Router with static export (`output: "export"`). The homepage becomes a brand hub; the old app-landing sections relocate to `/ember`. Articles are authored as markdown files in `content/articles/`, parsed at build time with `gray-matter` and rendered with `react-markdown`. Email signups insert into a Supabase `subscribers` table via the existing anon client. Parked pages (`/leaderboards`, `/pro`, `/sponsor`) stay in the repo but are removed from navigation.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase JS, `gray-matter`, `react-markdown`, `remark-gfm`. Vitest for unit tests on pure logic.

**Testing strategy:** This repo has no existing test harness and is a static marketing site. We add Vitest only for the pure/build-time logic (article loader, email validation) where unit tests have real value. Presentational pages/components are verified with `npm run build` (must produce a clean static export) and a manual `npm run dev` check. Run `npm run lint` before each commit.

**Reference spec:** `docs/superpowers/specs/2026-06-09-no-burnout-rebrand-design.md`

---

## File Structure

**New files:**
- `vitest.config.ts` — Vitest config (node environment)
- `content/articles/work-hard-last-longer.md` — first article
- `src/lib/articles.ts` — build-time markdown loader (list + by-slug)
- `src/lib/articles.test.ts` — unit tests for the loader
- `src/lib/validation.ts` — `isValidEmail` helper
- `src/lib/validation.test.ts` — unit tests for email validation
- `src/components/ui/EmailSignup.tsx` — client signup form (Supabase insert)
- `src/components/sections/BrandHero.tsx` — homepage hero
- `src/components/sections/GoodBurn.tsx` — "good burn vs burnout" section
- `src/components/sections/PillarCards.tsx` — three-pillar cards
- `src/components/sections/Rewards.tsx` — honest rewards section (for /ember)
- `src/app/articles/page.tsx` — article list
- `src/app/articles/[slug]/page.tsx` — article reader
- `src/app/music/page.tsx` — Burnout Radio "coming soon"
- `src/app/ember/page.tsx` — Ember app showcase

**Modified files:**
- `package.json` — add deps + `test` script
- `src/lib/constants.ts` — brand strings, links, nav, footer
- `src/components/layout/Header.tsx` — No Burnout branding + three-pillar nav + New badge
- `src/components/layout/Footer.tsx` — No Burnout branding + YouTube link
- `src/components/ui/index.ts` — export `EmailSignup`
- `src/components/sections/index.ts` — export new sections
- `src/app/layout.tsx` — metadata rebrand
- `src/app/page.tsx` — homepage becomes brand hub
- `CLAUDE.md` — rebrand project overview + content rules

**Untouched (parked, kept in repo, removed from nav only):** `src/app/leaderboards/`, `src/app/pro/`, `src/app/sponsor/`.

---

## Task 1: Add dependencies and Vitest harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install runtime + dev dependencies**

Run:
```bash
npm install gray-matter react-markdown remark-gfm
npm install -D vitest
```
Expected: installs succeed; `package.json` dependencies now include `gray-matter`, `react-markdown`, `remark-gfm`, and devDependencies include `vitest`.

- [ ] **Step 2: Add a `test` script to `package.json`**

In `package.json`, add to the `scripts` block:
```json
"test": "vitest run"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 4: Verify the empty test runner works**

Run: `npm test`
Expected: Vitest runs and reports "No test files found" (exit 0) — confirms config loads.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add markdown deps and vitest harness"
```

---

## Task 2: Email validation helper (TDD)

**Files:**
- Create: `src/lib/validation.ts`
- Test: `src/lib/validation.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/validation.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { isValidEmail } from "./validation";

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("dakota@example.com")).toBe(true);
  });
  it("rejects an address with no @", () => {
    expect(isValidEmail("dakotaexample.com")).toBe(false);
  });
  it("rejects an address with no domain dot", () => {
    expect(isValidEmail("dakota@example")).toBe(false);
  });
  it("rejects empty / whitespace", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
  });
  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  dakota@example.com  ")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- validation`
Expected: FAIL — cannot resolve `./validation` / `isValidEmail` is not a function.

- [ ] **Step 3: Write minimal implementation**

`src/lib/validation.ts`:
```typescript
// Pragmatic email check: one @, a dot in the domain, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- validation`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts src/lib/validation.test.ts
git commit -m "feat: add email validation helper"
```

---

## Task 3: Article markdown loader (TDD)

**Files:**
- Create: `src/lib/articles.ts`
- Test: `src/lib/articles.test.ts`
- Create (fixtures): `content/articles/test-older.md`, `content/articles/test-newer.md` (temporary, deleted in Step 6)

- [ ] **Step 1: Create two fixture markdown files**

`content/articles/test-older.md`:
```markdown
---
title: Older Article
date: 2026-01-01
excerpt: The older one.
---

Older body.
```

`content/articles/test-newer.md`:
```markdown
---
title: Newer Article
date: 2026-02-01
excerpt: The newer one.
---

Newer body.
```

- [ ] **Step 2: Write the failing test**

`src/lib/articles.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { getAllArticles, getArticleBySlug, getAllSlugs } from "./articles";

describe("articles loader", () => {
  it("lists articles newest-first by date", () => {
    const all = getAllArticles();
    const slugs = all.map((a) => a.slug);
    expect(slugs.indexOf("test-newer")).toBeLessThan(slugs.indexOf("test-older"));
  });
  it("derives slug from filename and reads frontmatter", () => {
    const a = getAllArticles().find((x) => x.slug === "test-newer");
    expect(a?.title).toBe("Newer Article");
    expect(a?.excerpt).toBe("The newer one.");
  });
  it("returns full content via getArticleBySlug", () => {
    const a = getArticleBySlug("test-older");
    expect(a?.content.trim()).toBe("Older body.");
  });
  it("returns null for unknown slug", () => {
    expect(getArticleBySlug("does-not-exist")).toBeNull();
  });
  it("getAllSlugs returns every article slug", () => {
    expect(getAllSlugs()).toEqual(expect.arrayContaining(["test-older", "test-newer"]));
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- articles`
Expected: FAIL — cannot resolve `./articles`.

- [ ] **Step 4: Write the implementation**

`src/lib/articles.ts`:
```typescript
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string; // markdown body
}

function readArticleFile(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date ? new Date(data.date).toISOString() : "",
    excerpt: String(data.excerpt ?? ""),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  return getAllSlugs()
    .map((slug) => readArticleFile(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)) // newest first
    .map(({ content: _content, ...meta }) => meta);
}

export function getArticleBySlug(slug: string): Article | null {
  return readArticleFile(slug);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- articles`
Expected: PASS (5 tests).

- [ ] **Step 6: Delete the fixtures and re-run the full suite**

Run:
```bash
rm content/articles/test-older.md content/articles/test-newer.md
npm test
```
Expected: `articles.test.ts` now fails (fixtures gone) — that is expected at this moment. To keep the suite green long-term, the loader logic is proven; mark `articles.test.ts` describe block with `.skip` IF no real article exists yet. Since Task 4 adds the real article immediately after, instead proceed directly to Task 4 and DO NOT commit a red suite. (Commit happens at end of Task 4.)

> Note: Tasks 3 and 4 commit together because the loader's tests depend on real article content existing.

---

## Task 4: First article + loader commit

**Files:**
- Create: `content/articles/work-hard-last-longer.md`
- Modify: `src/lib/articles.test.ts` (point assertions at the real article)

- [ ] **Step 1: Create the first article**

`content/articles/work-hard-last-longer.md`:
```markdown
---
title: Work Hard, Last Longer
date: 2026-06-09
excerpt: Burnout is the most common way ambitious people lose, and almost nobody loses loudly. No Burnout exists to help you outlast it.
---

Burnout does not announce itself. It rarely shows up as a breakdown or a dramatic exit. Most of the time it shows up as a slow erosion: the goal you stop mentioning, the project you quietly let die, the version of yourself you used to reach for and no longer have the energy to find. It is the most common way ambitious people lose, and almost nobody loses loudly. They just stop. One year they are chasing something hard, and the next year they are explaining, calmly and reasonably, why they let it go.

No Burnout exists for one reason: to keep that from happening to you. Not by telling you to slow down, and not by selling you the idea that rest is the answer to everything. The premise is the opposite. Keep working hard. Keep chasing the thing that matters. Just stop letting burnout take you out of the game before you get there. That is the whole brand in four words. Work hard, last longer.

I write this from inside the problem, on both sides of it at once. I work in behavioral health, which means I spend my days with people whose nervous systems are already running past redline, and I watch up close what chronic stress does to a body and a mind. I also run my own weeks at a pace most people would call unsustainable: long clinical shifts stacked onto overnight work, stacked onto full-time school. I am not writing about endurance from a comfortable chair. I am writing about it because I have to build it on purpose every single week, and because the people I work with cannot afford for me to break.

Here is the part most hustle advice skips, and the part I refuse to skip: burnout is not a character flaw, and it is not weakness. A lot of the time it is not even about you. The caseload is too high, the system is understaffed, the work asks more than any one person can give, and no amount of grit fixes a structural problem. So No Burnout is never going to tell you to toughen up and push through. That message is part of what burns people out in the first place. What it will tell you is this: inside the part you actually control, there is a great deal you can do to last longer, and recovery is one of your most powerful tools, not a sign of surrender. Real endurance athletes do not grind every waking hour. They train hard and they recover hard, because recovery is what makes the hard training repeatable. That is the entire game. Not less effort. Sustainable effort.

This is the line everything here is built on: the difference between the good burn and burning out. Effort that builds you, training that makes you durable, deep work that carries you toward something real. That is the good burn, and you want more of it. Depletion that hollows you out with nothing left to show for it. That is burnout, and it is the enemy. Every tool under this brand exists to keep you on the right side of that line.

It comes in three forms. The first is the writing, which is the heart of it: honest, practical strategy for staying in the fight, how to read the warning signs before they wreck you, how to build stamina, how to push hard without breaking, with no fluff and no toxic positivity. The second is Burnout Radio, the music. Calm but focused lo-fi made to lock into, the soundtrack for deep work and long study sessions and hard training, built to keep you steady instead of frantic and fried. The third is the app, the movement. A fitness tracker that actually rewards you for showing up, because physical conditioning is one of the strongest defenses against burnout there is, with the same music playing right inside it so your training and your focus run on the same fuel.

None of this is about doing less. It is about building the engine that goes the distance, so that years from now you are still here, still working on the thing that matters, while the people who burned bright and burned out have long since tapped out. That is the whole bet. Read the strategy. Put on the music. Get the work in. Build the kind of stamina that outlasts the moment everyone expects you to quit. Resist the burnout. Go the distance.

---

*No Burnout is educational and motivational, not therapy or medical advice. If you are in crisis or thinking about harming yourself, please reach out: in the US, call or text 988 to reach the Suicide and Crisis Lifeline, available 24/7.*
```

- [ ] **Step 2: Point the loader tests at the real article**

Replace the body of `src/lib/articles.test.ts` with:
```typescript
import { describe, it, expect } from "vitest";
import { getAllArticles, getArticleBySlug, getAllSlugs } from "./articles";

describe("articles loader", () => {
  it("loads the first article from frontmatter", () => {
    const a = getArticleBySlug("work-hard-last-longer");
    expect(a?.title).toBe("Work Hard, Last Longer");
    expect(a?.excerpt.length).toBeGreaterThan(0);
    expect(a?.content).toContain("Work hard, last longer.");
  });
  it("returns null for unknown slug", () => {
    expect(getArticleBySlug("does-not-exist")).toBeNull();
  });
  it("includes the article in the full list", () => {
    expect(getAllSlugs()).toContain("work-hard-last-longer");
    expect(getAllArticles().some((a) => a.slug === "work-hard-last-longer")).toBe(true);
  });
});
```

- [ ] **Step 3: Run the full suite**

Run: `npm test`
Expected: PASS — `validation.test.ts` and `articles.test.ts` all green.

- [ ] **Step 4: Commit Tasks 3 + 4 together**

```bash
git add src/lib/articles.ts src/lib/articles.test.ts content/articles/work-hard-last-longer.md
git commit -m "feat: add article markdown loader and first article"
```

---

## Task 5: Rebrand constants

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Add the YouTube link and rebrand nav/footer**

In `src/lib/constants.ts`, add the YouTube constant near the other URLs (after `DC_5K_URL`):
```typescript
export const YOUTUBE_URL = "https://youtube.com/@noburnouts";
```

Replace the existing `navLinks` block with the three-pillar nav (note the optional `badge`):
```typescript
export const navLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/music", label: "Music" },
  { href: "/ember", label: "Ember App", badge: "New" },
] as const;
```

Replace the existing `footerLinks` block with:
```typescript
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
```

> Leave `charities`, `features`, `howItWorks`, `tiers`, and the app-store/zapstore URLs in place — they are reused by `/ember` and the parked pages.

- [ ] **Step 2: Verify the type-check / build picks up the new shape**

Run: `npm run lint`
Expected: no errors referencing `constants.ts`. (Header still references `navLinks`; the new `badge` field is additive and optional at the consumer.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: rebrand nav, footer links, add YouTube url"
```

---

## Task 6: Rebrand Header (logo, three-pillar nav, New badge)

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Swap brand mark + name and render the optional badge**

In `src/components/layout/Header.tsx`:

Replace the logo/name block (lines 16-27) with:
```tsx
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/no-burnout-logo.png"
              alt="No Burnout"
              width={40}
              height={40}
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-display text-2xl tracking-wide text-[var(--accent)]">
              NO BURNOUT
            </span>
          </Link>
```

The current desktop nav maps `navLinks` and branches on `link.href.includes("#")`. None of the new links contain `#`, so they all render via `<Link>`. Update the desktop `<Link>` branch (lines 41-47) to render the badge. Replace the desktop nav `{navLinks.map(...)}` block with:
```tsx
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 relative inline-flex items-center gap-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--accent)] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
                {"badge" in link && link.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-black bg-[var(--accent)] rounded-full px-1.5 py-0.5 leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
```

And replace the mobile nav `{navLinks.map(...)}` block (lines 93-113) with:
```tsx
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
                >
                  {link.label}
                  {"badge" in link && link.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-black bg-[var(--accent)] rounded-full px-1.5 py-0.5 leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
```

- [ ] **Step 2: Repoint the header Download button to the Ember page**

Replace both `<Button href={APP_STORE_URL} external size="sm">Download</Button>` usages (desktop, line ~53; mobile, line ~114) with a link to the Ember page:
```tsx
              <Button href="/ember" size="sm">
                Get Ember
              </Button>
```
(Mobile keeps its `className="mt-2"`.)

Remove the now-unused `APP_STORE_URL` import if lint flags it (keep `navLinks`).

- [ ] **Step 3: Verify dev render**

Run: `npm run dev`, open `http://localhost:3000`, confirm header shows the No Burnout logo + wordmark and the three nav items with a "New" badge on Ember App. Stop the dev server.

- [ ] **Step 4: Lint + commit**

```bash
npm run lint
git add src/components/layout/Header.tsx
git commit -m "feat: rebrand header to No Burnout with three-pillar nav"
```

---

## Task 7: Rebrand Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Swap brand mark, name, blurb, and external-link handling**

Replace the brand block (lines 13-29) with:
```tsx
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image
                src="/images/no-burnout-logo.png"
                alt="No Burnout"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-display text-xl tracking-wide text-[var(--accent)]">
                NO BURNOUT
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm max-w-md leading-relaxed">
              A toolkit for people who refuse to stop, but refuse to burn out
              doing it. Read the strategy, put on the music, get the work in,
              and go the distance.
            </p>
```

The product links list uses `<Link>`. Since `footerLinks.product` items are all internal, leave that map as-is. The resources list already renders external `<a>` tags — it now includes the YouTube link automatically.

- [ ] **Step 2: Update the copyright line**

Replace line 76:
```tsx
            &copy; {new Date().getFullYear()} No Burnout. Work hard, last longer.
```

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/layout/Footer.tsx
git commit -m "feat: rebrand footer to No Burnout"
```

---

## Task 8: Rebrand root metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the `metadata` export**

Replace lines 18-35 with:
```tsx
export const metadata: Metadata = {
  title: "No Burnout — Work Hard, Last Longer",
  description:
    "No Burnout is a toolkit for people who work hard and intend to keep working hard, without burning out. Strategy, focus music, and the Ember fitness app, in one place.",
  keywords: ["burnout", "resilience", "endurance", "focus music", "lofi", "fitness", "stamina", "deep work", "ember"],
  authors: [{ name: "No Burnout" }],
  openGraph: {
    title: "No Burnout — Work Hard, Last Longer",
    description:
      "Strategy, focus music, and the Ember fitness app. Resist the burnout. Go the distance.",
    url: "https://www.runstr.club",
    siteName: "No Burnout",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No Burnout — Work Hard, Last Longer",
    description: "Resist the burnout. Go the distance.",
  },
};
```

> The `url` stays `runstr.club` until the new domain/CNAME is swapped (separate, user-flagged change).

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add src/app/layout.tsx
git commit -m "feat: rebrand site metadata to No Burnout"
```

---

## Task 9: Email signup component

**Files:**
- Create: `src/components/ui/EmailSignup.tsx`
- Modify: `src/components/ui/index.ts`

> **Supabase table prerequisite (manual, by repo owner):** In the Supabase project (`mofalmnixppnqcvfkveq`), create a `subscribers` table — columns: `id` uuid pk default `gen_random_uuid()`, `email` text unique not null, `created_at` timestamptz default `now()` — and enable RLS with an INSERT policy allowing the `anon` role to insert (`with check (true)`). The component degrades gracefully (shows an error state) if the table is absent, so implementation is not blocked.

- [ ] **Step 1: Create the component**

`src/components/ui/EmailSignup.tsx`:
```tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validation";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      // Unique-violation = already subscribed; treat as success.
      if (error.code === "23505") {
        setStatus("success");
        setMessage("You're already on the list. Go the distance.");
        return;
      }
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
    setMessage("You're in. Work hard, last longer.");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p className={`text-[var(--accent)] font-medium ${className}`}>{message}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 px-4 py-3 rounded-lg bg-[var(--background-card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <Button onClick={() => {}} disabled={status === "submitting"}>
          {status === "submitting" ? "Joining..." : "Subscribe"}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{message}</p>
      )}
    </form>
  );
}
```

> Note: the `<Button>` is inside the form, so it submits on click via the form's `onSubmit`. The `onClick={() => {}}` satisfies the Button prop shape without intercepting submission.

- [ ] **Step 2: Export it**

In `src/components/ui/index.ts`, add:
```typescript
export { EmailSignup } from "./EmailSignup";
```

- [ ] **Step 3: Verify build + dev render**

Run: `npm run dev`, then temporarily import `EmailSignup` is not required yet — instead confirm it compiles by running `npm run lint`. Expected: no errors.

- [ ] **Step 4: Commit**

```bash
npm run lint
git add src/components/ui/EmailSignup.tsx src/components/ui/index.ts
git commit -m "feat: add Supabase-backed email signup component"
```

---

## Task 10: Honest rewards section (for /ember)

**Files:**
- Create: `src/components/sections/Rewards.tsx`
- Modify: `src/components/sections/index.ts`

- [ ] **Step 1: Create the section**

`src/components/sections/Rewards.tsx`:
```tsx
"use client";

import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Rewards() {
  const ref = useScrollReveal();

  return (
    <section id="rewards" className="relative py-24">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h2 className="scroll-reveal font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-6">
            How rewards work
          </h2>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
            Every qualifying workout earns rewards. Physical conditioning is one
            of the strongest defenses against burnout there is, so Ember is built
            to pull you toward the work, not nag you about it. Log your effort,
            climb the daily leaderboard, earn rewards.
          </p>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed">
            By default, your rewards go to our charity partners, so showing up
            supports a cause automatically. Prefer to keep them? Add a Lightning
            address in the app and your rewards come to you instead. Either way,
            the work counts.
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Export it**

In `src/components/sections/index.ts`, add:
```typescript
export { Rewards } from "./Rewards";
```

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/sections/Rewards.tsx src/components/sections/index.ts
git commit -m "feat: add honest rewards section"
```

---

## Task 11: Ember app page

**Files:**
- Create: `src/app/ember/page.tsx`

- [ ] **Step 1: Compose the Ember showcase from existing + new sections**

`src/app/ember/page.tsx`:
```tsx
import { Header, Footer } from "@/components/layout";
import {
  Features,
  AppScreenshots,
  Rewards,
  CharityPartners,
  CallToAction,
} from "@/components/sections";

export default function EmberPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Features />
        <AppScreenshots />
        <Rewards />
        <CharityPartners />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
```

> The existing `Features`, `AppScreenshots`, `CharityPartners`, and `CallToAction` sections render as-is here. Their RUNSTR-specific copy is rebranded in Task 15.

- [ ] **Step 2: Verify dev render**

Run: `npm run dev`, open `http://localhost:3000/ember`, confirm sections render with the rewards block present. Stop the server.

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/app/ember/page.tsx
git commit -m "feat: add Ember app showcase page"
```

---

## Task 12: Music page

**Files:**
- Create: `src/app/music/page.tsx`

- [ ] **Step 1: Create the Coming Soon page**

`src/app/music/page.tsx`:
```tsx
import { Header, Footer } from "@/components/layout";
import { Container, Button } from "@/components/ui";
import { YOUTUBE_URL } from "@/lib/constants";

export default function MusicPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[160px]" />
          <Container className="relative z-10 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-card)] border border-[var(--border)] mb-8">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">Coming Soon</span>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl tracking-tight text-[var(--foreground)] mb-6">
              BURNOUT RADIO
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
              Calm but focused lo-fi made to lock into. The soundtrack for deep
              work, long study sessions, and hard training. Built to keep you
              steady instead of frantic and fried.
            </p>
            <Button href={YOUTUBE_URL} external size="lg">
              Listen on YouTube
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify dev render**

Run: `npm run dev`, open `http://localhost:3000/music`, confirm the Coming Soon hero and the YouTube button (links to youtube.com/@noburnouts). Stop the server.

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/app/music/page.tsx
git commit -m "feat: add Burnout Radio coming-soon music page"
```

---

## Task 13: Articles list + reader pages

**Files:**
- Create: `src/app/articles/page.tsx`
- Create: `src/app/articles/[slug]/page.tsx`

- [ ] **Step 1: Create the article list page**

`src/app/articles/page.tsx`:
```tsx
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-20">
          <Container>
            <h1 className="font-display text-5xl sm:text-6xl tracking-tight text-[var(--foreground)] mb-4">
              ARTICLES
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-12">
              Honest, practical strategy for staying in the fight. No fluff, no
              toxic positivity.
            </p>
            <div className="grid gap-6 max-w-3xl">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="block p-6 rounded-2xl bg-[var(--background-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300"
                >
                  <h2 className="font-display text-2xl tracking-wide text-[var(--foreground)] mb-2">
                    {a.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
              {articles.length === 0 && (
                <p className="text-[var(--text-muted)]">More writing coming soon.</p>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create the article reader page with static params**

`src/app/articles/[slug]/page.tsx`:
```tsx
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="pt-16">
        <article className="py-20">
          <Container>
            <div className="max-w-2xl mx-auto">
              <Link
                href="/articles"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                &larr; All articles
              </Link>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mt-6 mb-8">
                {article.title}
              </h1>
              <div className="article-prose text-[var(--text-secondary)] leading-relaxed space-y-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Add minimal prose styling for markdown elements**

In `src/app/globals.css`, append:
```css
.article-prose p { margin-bottom: 1.25rem; }
.article-prose em { color: var(--text-muted); }
.article-prose hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
.article-prose a { color: var(--accent); text-decoration: underline; }
.article-prose h2 {
  color: var(--foreground);
  font-size: 1.75rem;
  margin: 2rem 0 1rem;
}
```

- [ ] **Step 4: Verify dev render**

Run: `npm run dev`, open `http://localhost:3000/articles` (card for "Work Hard, Last Longer") and `http://localhost:3000/articles/work-hard-last-longer` (full article, 988 disclaimer at the bottom). Stop the server.

- [ ] **Step 5: Lint + commit**

```bash
npm run lint
git add src/app/articles/page.tsx "src/app/articles/[slug]/page.tsx" src/app/globals.css
git commit -m "feat: add articles list and reader pages"
```

---

## Task 14: Homepage brand hub

**Files:**
- Create: `src/components/sections/BrandHero.tsx`
- Create: `src/components/sections/GoodBurn.tsx`
- Create: `src/components/sections/PillarCards.tsx`
- Modify: `src/components/sections/index.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the brand hero**

`src/components/sections/BrandHero.tsx`:
```tsx
"use client";

import { Container, Button, EmailSignup } from "@/components/ui";

export function BrandHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px] animate-orbit" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-[100px] animate-orbit anim-delay-500" />
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <Container className="relative z-10 py-16 text-center">
        <h1 className="animate-fade-in-up mb-6">
          <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight block text-[var(--foreground)]">
            WORK HARD
          </span>
          <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight block text-gradient">
            LAST LONGER
          </span>
        </h1>
        <p className="animate-fade-in-up anim-delay-200 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
          No Burnout is for people who work hard and intend to keep working hard,
          without letting it grind them into the ground. Burnout is the enemy of
          your goals. We help you outlast it.
        </p>
        <div className="animate-fade-in-up anim-delay-400 flex flex-col items-center gap-6">
          <EmailSignup className="mx-auto" />
          <Button href="#pillars" variant="outline" size="md">
            See what&apos;s inside
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create the good-burn framing section**

`src/components/sections/GoodBurn.tsx`:
```tsx
"use client";

import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function GoodBurn() {
  const ref = useScrollReveal();
  return (
    <section className="relative py-24">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h2 className="scroll-reveal font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-6">
            The good burn vs. burnout
          </h2>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
            Effort that builds you, training that makes you durable, deep work
            that carries you toward something real. That is the good burn, and
            you want more of it.
          </p>
          <p className="scroll-reveal text-lg text-[var(--text-secondary)] leading-relaxed">
            Depletion that hollows you out with nothing to show for it. That is
            burnout, and it is the enemy. Everything here exists to keep you on
            the right side of that line. Recovery is not retreat. It is what
            makes the hard effort repeatable.
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create the three pillar cards**

`src/components/sections/PillarCards.tsx`:
```tsx
"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

const pillars = [
  {
    href: "/articles",
    title: "The Writing",
    body: "Honest, practical strategy for staying in the fight. How to read the warning signs, build stamina, and push hard without breaking.",
    cta: "Read the strategy",
  },
  {
    href: "/music",
    title: "Burnout Radio",
    body: "Calm but focused lo-fi made to lock into. The soundtrack for deep work, long study sessions, and hard training.",
    cta: "Put on the music",
  },
  {
    href: "/ember",
    title: "Ember",
    body: "A fitness tracker that rewards you for showing up, because conditioning is one of the strongest defenses against burnout.",
    cta: "Get the work in",
  },
];

export function PillarCards() {
  const ref = useScrollReveal();
  return (
    <section id="pillars" className="relative py-24">
      <Container>
        <div ref={ref} className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="scroll-reveal group block p-8 rounded-2xl bg-[var(--background-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <h3 className="font-display text-2xl tracking-wide text-[var(--foreground)] mb-3">
                {p.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {p.body}
              </p>
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] group-hover:text-[var(--accent-light)]">
                {p.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Export the new sections**

In `src/components/sections/index.ts`, add:
```typescript
export { BrandHero } from "./BrandHero";
export { GoodBurn } from "./GoodBurn";
export { PillarCards } from "./PillarCards";
```

- [ ] **Step 5: Rebuild the homepage**

Replace the entire contents of `src/app/page.tsx` with:
```tsx
import { Header, Footer } from "@/components/layout";
import { BrandHero, GoodBurn, PillarCards } from "@/components/sections";
import { Container, EmailSignup } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BrandHero />
        <GoodBurn />
        <PillarCards />
        <section className="relative py-24 border-t border-[var(--border)]/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-4">
                RESIST THE BURNOUT
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Get the strategy in your inbox. Keep going long after others tap out.
              </p>
              <div className="flex justify-center">
                <EmailSignup />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify dev render**

Run: `npm run dev`, open `http://localhost:3000`, confirm: hero ("WORK HARD / LAST LONGER" + email signup), good-burn section, three pillar cards linking to /articles, /music, /ember, and the closing signup. Stop the server.

- [ ] **Step 7: Lint + commit**

```bash
npm run lint
git add src/components/sections/BrandHero.tsx src/components/sections/GoodBurn.tsx src/components/sections/PillarCards.tsx src/components/sections/index.ts src/app/page.tsx
git commit -m "feat: rebuild homepage as No Burnout brand hub"
```

---

## Task 15: Rebrand relocated section copy + remove old logo usages

**Files:**
- Modify: `src/components/sections/Features.tsx`
- Modify: `src/components/sections/AppScreenshots.tsx`
- Modify: `src/components/sections/CharityPartners.tsx`
- Modify: `src/components/sections/CallToAction.tsx`
- Modify: `src/app/leaderboards/page.tsx` (logo fallback only)

- [ ] **Step 1: Find all remaining RUNSTR references in section/app copy**

Run:
```bash
grep -rn "RUNSTR" src/components/sections src/app/ember src/app/page.tsx
```
Expected: a list of copy strings (headings, alt text, body) still saying "RUNSTR".

- [ ] **Step 2: Replace user-facing "RUNSTR" with "Ember"**

For each match in `Features.tsx`, `AppScreenshots.tsx`, `CharityPartners.tsx`, and `CallToAction.tsx`, replace the brand name in user-facing copy and image `alt` text: "RUNSTR" → "Ember" (the app), except where the sentence is about the broader movement — there use "No Burnout". Use judgment per string; the app sections (Features, AppScreenshots) refer to the app, so "Ember". Leave variable/identifier names unchanged.

- [ ] **Step 3: Repoint the leaderboard avatar fallback logo**

In `src/app/leaderboards/page.tsx`, the `Avatar` fallback uses `/images/logo.png`. Replace that `src` with `/images/ember-logo.png` so the parked page does not reference the retired logo.

- [ ] **Step 4: Confirm no user-facing RUNSTR strings remain on live pages**

Run:
```bash
grep -rn "RUNSTR" src/components/sections src/app/ember src/app/music src/app/articles src/app/page.tsx src/app/layout.tsx src/components/layout
```
Expected: no matches in user-facing copy. (Matches inside parked `/pro`, `/sponsor`, `/leaderboards` page bodies are acceptable since they are unlinked, but fix any in shared components.)

- [ ] **Step 5: Lint + commit**

```bash
npm run lint
git add src/components/sections/Features.tsx src/components/sections/AppScreenshots.tsx src/components/sections/CharityPartners.tsx src/components/sections/CallToAction.tsx src/app/leaderboards/page.tsx
git commit -m "feat: rebrand relocated section copy to Ember"
```

---

## Task 16: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update Project Overview**

Replace the Project Overview paragraph with a description of No Burnout: the umbrella brand/platform (articles, Burnout Radio music, the Ember fitness app) positioned as a toolkit for working hard without burning out; the app formerly RUNSTR is now Ember.

- [ ] **Step 2: Update Content Guidelines**

Replace the Content Guidelines section with:
```markdown
## Content Guidelines

- Brand: No Burnout (platform). App: Ember (fitness tracker).
- Voice: pro-hard-work, anti-burnout — resilience and endurance, not "slow down." Taglines: "Work hard, last longer." / "Resist the burnout. Go the distance."
- NO mentions of Bitcoin, Nostr, cryptocurrency, sats. "Token economy" is allowed in its behavioral-health sense.
- EXCEPTION: the rewards mechanic on /ember may name a "Lightning address" as the payout setting (rewards go to charity by default, or to the user if they add a Lightning address). This is the only place Lightning is named.
- No colorful emojis; status indicators use accent orange or text/muted grays.
- Three pillars: Articles (writing), Music (Burnout Radio), Ember (app).
```

- [ ] **Step 3: Note the file-structure additions**

Add `content/articles/` (markdown articles) and the new pages (`/articles`, `/music`, `/ember`) to the File Structure section; note that `/leaderboards`, `/pro`, `/sponsor` are parked (in repo, unlinked).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for No Burnout rebrand"
```

---

## Task 17: Full build verification

**Files:** none (verification only)

- [ ] **Step 1: Run the unit test suite**

Run: `npm test`
Expected: all tests pass (`validation.test.ts`, `articles.test.ts`).

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run the production static export**

Run: `npm run build`
Expected: build succeeds; `out/` contains `index.html`, `articles/index.html`, `articles/work-hard-last-longer/index.html`, `music/index.html`, `ember/index.html`, plus parked `leaderboards/`, `pro/`, `sponsor/` still generated.

- [ ] **Step 4: Spot-check the exported article route**

Run:
```bash
grep -l "Work Hard, Last Longer" out/articles/work-hard-last-longer/index.html
```
Expected: the file path prints (string present in the statically rendered article).

- [ ] **Step 5: Final verification note**

Confirm against the spec success criteria: three-pillar nav with New badge, brand-hub homepage, articles from markdown, music coming-soon + YouTube link, Ember showcase with honest rewards, email signup wired to Supabase, no Bitcoin/Nostr in public copy (Lightning only on /ember). No commit needed (verification task).

---

## Self-Review

**Spec coverage:**
- Brand & content rules → Tasks 5, 8, 10, 15, 16 (rebrand copy, metadata, rewards mechanic, CLAUDE.md).
- Theme (steady-warmth, palette unchanged) → reused glow/animation classes in Tasks 12, 14; no palette change.
- Site map / nav / parked pages → Tasks 5 (nav), 6 (header), 11/12/13/14 (pages); parked pages untouched + unlinked.
- Homepage brand hub → Task 14.
- Articles system (markdown + list + reader) → Tasks 1, 3, 4, 13.
- Music page → Task 12.
- Ember app page + honest rewards → Tasks 10, 11.
- Email subscriptions (Supabase) → Tasks 2, 9 (+ manual table note).
- Logos/assets → Tasks 6, 7 (no-burnout-logo), 15 (ember-logo fallback). Logo files already copied into `public/images/`.
- Rebrand mechanics → Tasks 5–8, 15.
- CLAUDE.md update → Task 16.
- Deployment/domain (CNAME unchanged) → noted in Task 8; no code change required.
- Out of scope items → not implemented (correct).

**Placeholder scan:** No "TBD"/"implement later"; all code steps include full code. Task 15 uses judgment-based string replacement (inherent to a copy pass) but specifies exact files, the grep to find every instance, and the rule (app→Ember, movement→No Burnout).

**Type consistency:** `ArticleMeta`/`Article`, `getAllArticles`/`getArticleBySlug`/`getAllSlugs` are consistent between Tasks 3, 4, 13. `isValidEmail` consistent between Tasks 2 and 9. `navLinks` `badge` field added in Task 5 and consumed in Task 6. `EmailSignup`/`Rewards`/`BrandHero`/`GoodBurn`/`PillarCards` exports match their imports.

**Note on Task 3/4 commit coupling:** the loader's tests need real article content, so Task 3 intentionally defers its commit to Task 4 (documented in Task 3 Step 6).
