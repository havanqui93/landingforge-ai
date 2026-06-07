# LandingForge — Architecture & Core Process

This document explains **how LandingForge actually works end to end**: the data
model, the two landing sources, the request/render pipeline, and the headline
"new landing every morning" automation. It reflects the current code
(`lib/`, `app/`, `components/`).

> Quick reference for *adding* a landing lives in [`README.md`](../README.md)
> and [`CLAUDE.md`](../CLAUDE.md). Deployment steps live in
> [`DEPLOY.md`](../DEPLOY.md). This file is about the **flow**.

---

## 1. The one idea

> **A landing page is just data.** A single typed `LandingConfig` object fully
> describes a page — its metadata, its theme, and an ordered list of sections.
> One renderer turns any valid config into a premium page. Nothing is
> per-page except the config itself: no per-page CSS, no per-page components.

Everything below is a consequence of that idea.

```ts
interface LandingConfig {
  meta:     { slug; title; description };       // routing + <head>
  theme:    { primary; bg; mode; ...optional }; // palette → CSS variables
  sections: Section[];                          // discriminated union by `type`
}
```

`Section` is a **discriminated union** (`lib/landing.types.ts`) keyed on
`type`: `hero | features | stats | testimonials | pricing | faq | cta | footer`.
Each variant carries exactly the fields its component needs. TypeScript enforces
this, which is what makes "just data" safe (see §6).

---

## 2. Two sources of landings, one renderer

LandingForge serves landings from **two independent stores that never touch each
other** but render through the same pipeline:

| Source | Lives in | Written by | When it renders | Survives redeploy? |
|---|---|---|---|---|
| **Static registry** | `landings/<slug>/config.ts` + `lib/registry.ts` | A developer/agent committing files | Pre-rendered at **build time** | Yes (it's in the repo) |
| **KV store** | Vercel KV (Upstash Redis) | The daily cron job at **runtime** | Rendered **on demand** per request | Yes (KV is external), but not in the repo |

The reason for two sources: Vercel serverless functions **cannot write files
into the deployed bundle**. So the cron job can't add a `config.ts` and commit
it — instead it writes the generated `LandingConfig` to KV, and the pages read
KV at request time *in addition to* the static registry.

```
                         ┌──────────────────────────────┐
   committed config.ts ─▶│  Static registry (build-time) │─┐
                         └──────────────────────────────┘ │
                                                           ├─▶  same LandingConfig
                         ┌──────────────────────────────┐ │     shape →
   daily cron job ──────▶│  Vercel KV store (runtime)     │─┘     LandingRenderer
                         └──────────────────────────────┘
```

When KV env vars are absent (local dev, CI builds), every KV read is a **no-op
returning empty data** (`lib/store.ts → isStoreEnabled()`), so the app degrades
gracefully to just the static registry. Nothing breaks without Vercel.

---

## 3. Render pipeline — config → pixels

Both routes converge on the same renderer. Given a `LandingConfig`:

```
LandingConfig
   │
   ▼
<LandingRenderer config>                       components/LandingRenderer.tsx
   │
   ├─▶ <ThemeProvider theme>                    components/ThemeProvider.tsx
   │      writes theme → CSS variables on a wrapper:
   │      --lf-primary, --lf-bg, --lf-surface, --lf-fg,
   │      --lf-muted, --lf-border, --lf-radius, --lf-font
   │      (Tailwind tokens like `bg-primary` read these vars)
   │
   └─▶ config.sections.map(renderSection)
          exhaustive switch on section.type:
            "hero"         → <Hero/>
            "features"     → <Features/>
            "stats"        → <Stats/>
            "testimonials" → <Testimonials/>
            "pricing"      → <Pricing/>
            "faq"          → <FAQ/>
            "cta"          → <CTA/>
            "footer"       → <Footer/>
            default        → const _exhaustive: never = section  ← build guard
```

Key points:

- **Theming is data, not CSS files.** `ThemeProvider` writes the palette as
  `--lf-*` CSS variables on a wrapper `<div>`. Section components style
  themselves with Tailwind tokens (`bg-primary`, `text-muted`, `rounded-xl`)
  that resolve to those variables. Swapping a theme = changing the config.
- **Colors are `"R G B"` triples** (e.g. `"124 92 255"`) so Tailwind's opacity
  modifiers work (`bg-primary/15`).
- **Icons are Lucide names as strings** (`"Zap"`), resolved at render by
  `lib/icons.ts → getIcon()`, falling back to `Sparkles` for unknown names.
- **Motion is shared and consistent.** Section components animate via
  `Reveal`/`StaggerGroup` (`components/primitives.tsx`) using variants from
  `lib/motion.ts` — scroll reveals, stagger, parallax — `transform`/`opacity`
  only (60fps), and `prefers-reduced-motion` aware.

---

## 4. Request flows

### 4a. Index page `/` — the directory

`app/page.tsx` (`dynamic = "force-dynamic"`, so it reads KV fresh per request):

```
GET /
  │
  ├─ getStoredLandings()    → KV configs, newest first (empty if KV off)
  ├─ landings               → static registry entries
  │
  ▼
getAllEntries():
  merge [ ...storedEntries (deduped by slug), ...staticLandings ]
  │  (stored shown first; static slugs win on collision)
  ▼
<IndexGrid entries> → one card per landing
  card swatch/preview is derived from config.theme (primary + bg gradient)
```

### 4b. Landing page `/l/[slug]` — a single page

`app/l/[slug]/page.tsx`:

```
GET /l/<slug>
  │
  ▼
resolveLanding(slug):
  getLanding(slug)              // static registry first
    ?? await getStoredLanding(slug)   // then KV fallback
  │
  ├─ undefined → notFound() (404)
  └─ config    → <LandingRenderer config>  (see §3)
```

- `generateStaticParams()` returns every **static** slug, so file-based
  landings are pre-rendered at build time.
- KV-backed slugs aren't known at build time; they render **on demand**
  (`dynamicParams` defaults to `true`).
- `generateMetadata()` resolves the same way to populate `<title>`/description.

---

## 5. The core workflow — a new landing every morning

This is the headline use case. It is **fully Vercel-native: no LLM, no GitHub
commit in the loop.** A scheduled function fetches a headline, deterministically
builds a config for a *fictional* product themed around it, and stores it in KV
where it's instantly live.

### Moving parts

| Step | File | Responsibility |
|---|---|---|
| Schedule | `vercel.json` → `crons` | `0 0 * * *` UTC = **07:00 ICT (UTC+7)**. |
| Entry point | `app/api/cron/daily-landing/route.ts` | `GET` route, orchestrates the run. |
| News source | `lib/news.ts` | Top non-sensitive Hacker News story (free Algolia API, no key). |
| Generator | `lib/generate-landing.ts` | Deterministic, templated `LandingConfig`. |
| Store | `lib/store.ts` | Vercel KV read/write (no-op without env vars). |

### End-to-end sequence

```
Vercel Cron (07:00 ICT)  ──GET──▶  /api/cron/daily-landing
                                        │
   1. Auth          CRON_SECRET set? require "Authorization: Bearer <secret>"  (else 401)
   2. Guard         isStoreEnabled()?  (else 503 — KV not configured)
                                        │
   3. fetchTopStory()  ── HN front page (Algolia) ──▶ highest-points story
                          that has title + url AND passes the SENSITIVE
                          keyword blocklist  (else 502 "no suitable story")
                                        │
   4. generateLanding(story, { dateISO })
        seed   = hash(title + date)               ← deterministic per day
        theme  = HSL→"R G B" palette from seed    ← legible dark theme, daily-unique
        copy   = product name, hero, features, faqs rotated by seed
        slug   = "YYYY-MM-DD-<name>-<keyword>"
        sections = hero → stats → features → testimonials → pricing → faq → cta → footer
                                        │
   5. collision check: storedLandingExists(slug)?  → suffix slug with base36 timestamp
                                        │
   6. saveStoredLanding(config)
        kv.set("landing:<slug>", config)
        kv.zadd("landings:index", { score: Date.now(), member: slug })   ← sorted set, newest first
                                        │
   7. 200 { ok: true, slug, url: "/l/<slug>", source: story.url }
```

The new page is **immediately live** at `/l/<slug>` and appears first on `/`,
because both routes read KV at request time (§4).

### What "deterministic" buys us

`generateLanding` is a pure function of `(title, date)`:

- `hash()` (FNV-1a) seeds everything; `pick()` selects from copy pools by seed.
- The **palette** is computed (`hslToTriple`) from the seed → a guaranteed
  legible dark theme that differs day to day but never produces unreadable
  contrast.
- The **product name** is built from the headline's first keyword + a suffix
  pool; **hero/feature/faq copy** is templated and `{name}`/`{topic}` filled.

Same headline + same day ⇒ identical page (idempotent, testable, no surprises).

### Editorial guardrails (why it's safe to run unattended)

- **Fictional product only.** The headline is *inspiration* for palette +
  keywords; article body text is never copied, and real companies/people aren't
  impersonated. Footer + FAQ state the product is fictional.
- **Sensitivity filter.** `lib/news.ts` drops any headline containing a word in
  the `SENSITIVE` blocklist (death, war, disaster, politics, medical, etc.).
  Extend that list to tighten the filter.

### Triggering it manually

```bash
# KV must be configured on the deployment
curl https://<deployment>.vercel.app/api/cron/daily-landing
# if CRON_SECRET is set:
curl -H "Authorization: Bearer <secret>" \
  https://<deployment>.vercel.app/api/cron/daily-landing
```

Responses: `200 {ok}` success · `401` bad/missing secret · `503` KV off ·
`502` no suitable story · `500` unexpected error.

---

## 6. Why the types are the contract

The discriminated union + the exhaustive `switch` in `LandingRenderer` form a
**compile-time guarantee**:

- A config with a missing/extra/mis-typed field fails `npm run typecheck`.
- Adding a new section variant to the union but forgetting to render it trips
  the `const _exhaustive: never = section` branch → the build fails until you
  add the `case`.

So `npm run typecheck` (and `npm run build`) is the proof that a config — whether
hand-written or machine-generated — is valid and complete. **Always run it after
generating or editing a landing.**

### Adding a section type (the only time you touch the core)

1. Add a `*Section` interface to `lib/landing.types.ts` and include it in the
   `Section` union.
2. Build `components/sections/MySection.tsx` using `Reveal`/`StaggerGroup`.
3. Add `case "my-section":` to `LandingRenderer` (typecheck fails until you do).

---

## 7. File map (what each piece does)

```
app/
  page.tsx                          # / — merges static + KV, renders IndexGrid (force-dynamic)
  l/[slug]/page.tsx                 # /l/<slug> — resolve static→KV, render or 404
  not-found.tsx                     # 404
  layout.tsx, globals.css           # root shell + global styles / motion gating
  api/cron/daily-landing/route.ts   # the daily job (GET)
components/
  LandingRenderer.tsx               # exhaustive switch: section.type → component
  ThemeProvider.tsx                 # theme → --lf-* CSS variables
  IndexGrid.tsx                     # directory cards (client, themed swatches)
  primitives.tsx                    # Container, Reveal, StaggerGroup, Button, headings
  sections/                         # Hero, Features, Stats, Testimonials, Pricing, FAQ, CTA, Footer
landings/
  demo/config.ts                    # known-good reference landing (every section)
  demo/page.tsx                     # thin co-located renderer (optional pattern)
  2026-06-06-photonic-ai/config.ts  # an example committed (static) landing
lib/
  landing.types.ts                  # LandingConfig + Section discriminated union
  registry.ts                       # static landing list + getLanding / getAllSlugs
  store.ts                          # Vercel KV read/write (no-op when unconfigured)
  news.ts                           # fetchTopStory() from Hacker News (Algolia)
  generate-landing.ts               # generateLanding(): deterministic config builder
  motion.ts                         # shared Framer Motion variants
  icons.ts                          # getIcon(): Lucide name string → component
vercel.json                         # cron schedule
```

---

## 8. TL;DR of the core process

1. **Authoring path (static):** write `landings/<slug>/config.ts`, register it
   in `lib/registry.ts`, `npm run typecheck` → pre-rendered & listed.
2. **Automated path (runtime):** Vercel Cron → fetch HN headline → deterministic
   `generateLanding()` → save to KV → instantly live at `/l/<slug>` and on `/`.
3. **Both paths** produce the same `LandingConfig`, which one **exhaustive
   renderer** turns into a themed, animated page. The type system guarantees
   every config is valid and every section is handled.
