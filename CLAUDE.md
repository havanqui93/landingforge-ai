# CLAUDE.md

Guidance for Claude Code (and any AI agent) working in this repository.

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

Every morning a scheduled job generates a fresh, news-themed landing page:

- **Schedule:** `.github/workflows/daily-landing.yml`, cron at **07:00 ICT
  (UTC+7) → `0 0 * * *` UTC**. Change the cron to shift the timezone. Also
  runnable on demand via "Run workflow" (workflow_dispatch).
- **The procedure** the agent follows lives in
  `.claude/commands/daily-landing.md` (invoke with `/daily-landing`).
- **The generator** is the `landing-builder` subagent
  (`.claude/agents/landing-builder.md`), which turns a news brief into a
  `LandingConfig`.

High level, each run:
1. Fetches today's notable news (WebSearch/WebFetch) and picks one compelling,
   non-sensitive story to theme a **fictional product/campaign** landing around.
2. Generates `landings/<YYYY-MM-DD-slug>/config.ts` with a unique theme.
3. Registers it in `lib/registry.ts`.
4. Runs `npm run typecheck` + `npm run build`; fixes any issues.
5. Commits and pushes (which auto-deploys if a host like Vercel is connected).

### Editorial guardrails for generated pages

- Theme around the news, but **market a fictional product/initiative** — do not
  impersonate real companies, people, or publications, and don't reproduce
  article text. Treat news as *inspiration*, not content to copy.
- **Avoid sensitive/tragic topics** (death, disaster, violence, politics-as-
  outrage, medical claims). If the top story is sensitive, pick a lighter angle
  (tech, science, culture, sports, business, product launches).
- Keep copy original, upbeat, and benefit-led. No real prices, no real claims.
- One landing per day; never overwrite or modify previous days' landings.

## Setup required for automation to run

- Add repo secret **`ANTHROPIC_API_KEY`** (Settings → Secrets and variables →
  Actions). The workflow needs it to run Claude Code.
- The workflow needs `contents: write` permission (already set in the YAML) to
  commit the new landing.
- Optional: connect the repo to Vercel (or similar) so each pushed commit
  deploys automatically.
