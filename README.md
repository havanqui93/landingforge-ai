# LandingForge

One Next.js project that hosts **many independent, premium landing pages** —
each generated from a single typed config object. Add a new landing without
ever touching the existing ones.

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** with per-landing **CSS-variable theming**
- **Framer Motion** for scroll reveals, staggered entrances, parallax & micro-interactions
- **Lucide React** icons
- Honors `prefers-reduced-motion`, animates only `transform`/`opacity` (60fps)

> **TrendPage AI** — an AI SEO landing-page generator (keyword → AI content →
> Postgres → `/trends/[slug]`) lives alongside LandingForge in this app.
> See [`TRENDPAGE.md`](./TRENDPAGE.md).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

- `/` — directory listing every registered landing as a card
- `/l/demo` — the example landing (exercises every section type)

```bash
npm run typecheck   # strict TS, exhaustive section renderer
npm run build       # static pre-render of every registered landing
```

## Deploy & daily automation

A **Vercel Cron** job generates a fresh, news-themed landing page every morning
(see `vercel.json`, `app/api/cron/daily-landing`, and `lib/generate-landing.ts`).
See **[DEPLOY.md](./DEPLOY.md)** for the one-time Vercel + KV setup.


## How it works

```
app/
  page.tsx              # index → reads registry, renders cards
  l/[slug]/page.tsx     # dynamic route → getLanding(slug) → <LandingRenderer/>
components/
  LandingRenderer.tsx   # switch on section.type → section component (exhaustive)
  ThemeProvider.tsx     # injects the landing's palette as CSS variables
  primitives.tsx        # Container, Reveal, StaggerGroup, Button, headings
  sections/             # Hero, Features, Stats, Testimonials, Pricing, FAQ, CTA, Footer
landings/
  <slug>/config.ts      # the typed content object for that landing
  <slug>/page.tsx       # thin renderer (co-located, optional)
lib/
  landing.types.ts      # LandingConfig + discriminated-union Section types
  motion.ts             # shared variants: fadeUp, reveal, stagger, parallax
  registry.ts           # the list of all landings (powers / and /l/[slug])
  icons.ts              # resolve a Lucide icon by string name
```

A landing is just data:

```ts
interface LandingConfig {
  meta:  { slug; title; description };
  theme: { primary; bg; surface?; fg?; muted?; border?; font?; radius?; mode };
  sections: Section[];   // discriminated union, keyed by `type`
}
```

> 📐 For the full end-to-end flow — the two landing sources (static registry vs.
> Vercel KV), the render pipeline, request flows, and the daily-automation core
> process — see **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

`LandingRenderer` switches on `section.type` and renders the matching
component. The `switch` is **exhaustive** — a `never` branch makes the build
fail if you add a union member without handling it.

## Add a new landing (3 steps)

### 1. Create the config

`landings/acme/config.ts`:

```ts
import type { LandingConfig } from "@/lib/landing.types";

const acme: LandingConfig = {
  meta: {
    slug: "acme",
    title: "Acme — do more, faster",
    description: "The all-in-one toolkit for modern teams.",
  },
  theme: {
    primary: "16 185 129",   // RGB triple → drives every accent
    bg: "255 255 255",
    mode: "light",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "New",
      title: "Do more, faster",
      subtitle: "A premium landing built from a config object.",
      actions: [{ label: "Get started", href: "#", variant: "primary" }],
    },
    // ...add features / stats / testimonials / pricing / faq / cta / footer
  ],
};

export default acme;
```

### 2. Register it

`lib/registry.ts`:

```ts
import acme from "@/landings/acme/config";

export const landings: RegistryEntry[] = [
  { slug: demo.meta.slug, config: demo },
  { slug: acme.meta.slug, config: acme }, // 👈 add this line
];
```

### 3. Done

It's live at **`/l/acme`** and appears as a card on the index page. No
existing landing was touched. `generateStaticParams` will pre-render it on the
next build.

> Optional: add a thin `landings/acme/page.tsx` (3 lines) if you want the
> landing importable as its own route module — see `landings/demo/page.tsx`.

## Add a new section type

1. Add a `*Section` interface to `lib/landing.types.ts` and include it in the
   `Section` union.
2. Build `components/sections/MySection.tsx` (use `Reveal` / `StaggerGroup`
   from `primitives.tsx` for consistent, reduced-motion-safe animations).
3. Add a `case "my-section":` to `LandingRenderer`. TypeScript will remind you
   if you forget.

## Theming

Each landing's `theme` is written to CSS variables (`--lf-primary`, `--lf-bg`,
`--lf-surface`, `--lf-fg`, `--lf-muted`, `--lf-border`, `--lf-font`,
`--lf-radius`) by `ThemeProvider`. Tailwind tokens (`bg-primary`, `text-muted`,
`rounded-xl`, …) read those variables, so a landing's entire look is driven by
its config — no per-landing CSS files. Colors are `R G B` triples so Tailwind's
`/<alpha>` opacity modifiers work (e.g. `bg-primary/15`).

## Animation standard (applied to every section)

- Scroll reveals: `whileInView` + `viewport={{ once: true, margin: "-100px" }}`
- Staggered children via container variants (`staggerChildren`)
- Hero parallax (`useScroll` + `useTransform`), hover micro-interactions
- Default easing: expo-out `cubic-bezier(0.22, 1, 0.36, 1)`
- Only `transform`/`opacity` animate → 60fps
- `prefers-reduced-motion` disables motion (gated in JS **and** CSS)
