# AGENTS.md

Guidance for Codex (and any AI agent) working in this repository.

## What this project is

**LandingForge** is one Next.js 14 (App Router) + TypeScript project that hosts
**many independent, premium landing pages**. Each page is generated from a
single typed `LandingConfig` object — no per-page CSS, no per-page components.
Adding a landing never requires touching an existing one.

The headline use case for this repo: **a scheduled agent generates a brand-new,
news-themed landing page every morning** (see "Daily automation" below).

## Tech stack

- Next.js 14 (App Router), TypeScript (strict)
- Tailwind CSS with per-landing CSS-variable theming
- Framer Motion (scroll reveals, stagger, parallax) — `transform`/`opacity` only, 60fps
- Lucide React icons (resolved by string name)

## Commands

```bash
npm install        # install deps
npm run dev        # local dev → http://localhost:3000
npm run typecheck  # strict tsc --noEmit (also enforces exhaustive section renderer)
npm run build      # static pre-render of every registered landing
npm run lint       # eslint
```

**Always run `npm run typecheck` (and ideally `npm run build`) after generating
or editing a landing.** The section renderer's `switch` has a `never` branch, so
typecheck is the contract that proves a config is valid and complete.

## Architecture map

```
app/
  page.tsx              # index → reads registry, renders one card per landing
  l/[slug]/page.tsx     # dynamic route → getLanding(slug) → <LandingRenderer/>
components/
  LandingRenderer.tsx   # exhaustive switch on section.type → section component
  ThemeProvider.tsx     # injects the landing's palette as CSS variables (--lf-*)
  primitives.tsx        # Container, Reveal, StaggerGroup, Button, headings
  sections/             # Hero, Features, Stats, Testimonials, Pricing, FAQ, CTA, Footer
landings/
  <slug>/config.ts      # the typed content object for that landing (the source of truth)
  <slug>/page.tsx       # thin renderer (optional, co-located)
lib/
  landing.types.ts      # LandingConfig + discriminated-union Section types
  motion.ts             # shared variants: fadeUp, reveal, stagger, parallax
  registry.ts           # the list of all landings (powers / and /l/[slug])
  icons.ts              # resolve a Lucide icon by string name
```

A landing is **just data**:

```ts
interface LandingConfig {
  meta:  { slug; title; description };
  theme: { primary; bg; surface?; fg?; muted?; border?; font?; radius?; mode };
  sections: Section[];   // discriminated union, keyed by `type`
}
```

## The "add a landing" contract (follow exactly)

1. **Create `landings/<slug>/config.ts`** that `export default`s a
   `LandingConfig`. Copy `landings/demo/config.ts` as the reference for shape
   and quality. Keep the `slug` URL-safe (lowercase, hyphens, no spaces).
2. **Register it in `lib/registry.ts`**: add the import and one entry to the
   `landings` array. Do not reorder or remove existing entries.
3. **Verify**: `npm run typecheck` must pass. Prefer `npm run build` too.
4. The page is then live at `/l/<slug>` and appears on the index `/`.

### Conventions an agent must respect

- **Colors are `"R G B"` triples** (space-separated, no commas, no `rgb()`),
  e.g. `"124 92 255"`. This lets Tailwind opacity modifiers work (`bg-primary/15`).
- **Icons are Lucide names as PascalCase strings** (e.g. `"Zap"`, `"ShieldCheck"`,
  `"BarChart3"`). Unknown names fall back to `Sparkles` — pick real ones.
- **A good landing uses a hero first and a footer last**, with a sensible mix in
  between (stats / features / testimonials / pricing / faq / cta). Only use
  section `type`s defined in `lib/landing.types.ts`.
- **Don't invent fields.** The discriminated union is strict; extra/missing
  fields fail typecheck. If you need a new capability, add a section type
  (see below) — don't hack around the types.
- **Theme for legibility**: ensure `fg`/`muted` contrast against `bg`/`surface`,
  and set `mode` to match (`"dark"` for dark backgrounds). The `demo` landing is
  a known-good dark example.
- **Never edit other landings.** Each landing is independent by design.

## Adding a new section type (only if genuinely needed)

1. Add a `*Section` interface to `lib/landing.types.ts` and include it in the
   `Section` union.
2. Build `components/sections/MySection.tsx` using `Reveal` / `StaggerGroup`
   from `primitives.tsx` (keeps motion consistent and reduced-motion-safe).
3. Add a `case "my-section":` to `LandingRenderer`. Typecheck will fail until
   you do — that's the safety net.

## Daily automation (the core workflow)

Every morning a **Vercel Cron** job generates a fresh, news-themed landing
page. There is no LLM and no GitHub commit in the loop — it's fully
Vercel-native. Because serverless functions can't write files into the deployed
bundle, generated landings are stored in **Vercel KV** and rendered
dynamically, *alongside* the static, file-based landings in `lib/registry.ts`.

Moving parts:

- **Schedule:** `vercel.json` → `crons`, at **07:00 ICT (UTC+7) → `0 0 * * *`
  UTC** (Vercel cron times are UTC). Change the cron to shift the timezone.
- **The job:** `app/api/cron/daily-landing/route.ts` (a `GET` route).
- **News source:** `lib/news.ts` — top non-sensitive Hacker News story via the
  free Algolia API (no key).
- **Generator:** `lib/generate-landing.ts` — deterministic, templated
  `LandingConfig` for a **fictional product** themed by the headline (palette,
  name, and copy all derived from a hash of the title).
- **Store:** `lib/store.ts` — Vercel KV read/write; degrades to a no-op when KV
  env vars are absent, so local dev and builds still work off the static
  registry.

Each run:
1. `fetchTopStory()` picks one compelling, non-sensitive HN story.
2. `generateLanding()` builds a `LandingConfig` with a `YYYY-MM-DD-...` slug and
   a unique theme.
3. `saveStoredLanding()` writes it to KV; it's instantly live at `/l/<slug>` and
   on the index `/` (both read the store at request time).

Trigger manually with `GET /api/cron/daily-landing` (send
`Authorization: Bearer $CRON_SECRET` if that env var is set).

### Editorial guardrails for generated pages

- Theme around the news, but **market a fictional product/initiative** — do not
  impersonate real companies, people, or publications, and don't reproduce
  article text. The headline is *inspiration* only (the generator derives a
  palette + keywords from it; it never copies article body text).
- **Avoid sensitive/tragic topics.** `lib/news.ts` filters a keyword blocklist
  (death, disaster, violence, politics, medical claims, etc.). Extend the list
  there if needed.
- Keep copy original, upbeat, and benefit-led. Prices/stats are clearly
  fictional demo values.

## Setup required for automation to run

- **Add a Vercel KV store** to the project (Vercel dashboard → Storage). This
  injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars the job uses.
- **Deploy to Vercel.** Cron jobs only run on deployed Vercel projects (and only
  on production). The schedule comes from `vercel.json`.
- **Optional `CRON_SECRET`** env var — when set, the route requires Vercel's
  Bearer token, blocking unauthenticated calls.
- Note: on the Vercel **Hobby** plan, crons run at most once per day and the
  exact minute is best-effort; a daily schedule is fine.
