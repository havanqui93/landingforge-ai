---
description: Generate today's news-themed landing page, register it, verify the build, and commit.
allowed-tools: WebSearch, WebFetch, Read, Write, Edit, Glob, Grep, Bash, Agent
---

# Daily landing page

Create exactly **one** new, news-themed landing page for today and ship it.
Today's date is provided by the environment — use it for the slug.

Follow these steps in order. Do not skip the verification step.

## 1. Find today's angle

Use `WebSearch` (and `WebFetch` if helpful) to find a few notable, **positive or
neutral** news stories from today in tech, science, business, culture, sports,
or product launches. Pick **one** story that's fun to build a marketing page
around.

Editorial guardrails (from `CLAUDE.md`):
- Market a **fictional product, app, or campaign** *inspired by* the story.
  Never impersonate real companies/people/publications or copy article text.
- **Skip sensitive/tragic/divisive topics.** If the top story is heavy, choose a
  lighter one.

Write a 2–4 sentence brief: the story, the fictional product concept, the target
audience, and a suggested vibe/color direction.

## 2. Generate the landing config

Delegate to the `landing-builder` subagent (via the Agent tool, subagent_type
`landing-builder`), passing your brief and **today's date**. It will create
`landings/<YYYY-MM-DD-slug>/config.ts` exporting a default `LandingConfig`.

Requirements for the config (the subagent knows these — verify them):
- `meta.slug` = `<YYYY-MM-DD>-<short-kebab-topic>` (URL-safe, unique).
- A distinctive `theme` (colors as `"R G B"` triples) with legible contrast.
- A full page: `hero` first → a sensible mix (stats / features / testimonials /
  pricing / faq / cta) → `footer` last. Real Lucide icon names (PascalCase).
- Only fields/section types defined in `lib/landing.types.ts`.

## 3. Register it

Edit `lib/registry.ts`:
- Add `import <camelCaseName> from "@/landings/<slug>/config";` with the others.
- Append `{ slug: <camelCaseName>.meta.slug, config: <camelCaseName> },` to the
  `landings` array. **Do not modify or reorder existing entries.**

(A numeric/date-prefixed slug isn't a valid JS identifier, so give the import a
camelCase alias, e.g. `landing20260606`.)

## 4. Verify

```bash
npm run typecheck
npm run build
```

Both must pass. If typecheck reports missing/extra fields, fix the config —
don't loosen the types. Re-run until green.

## 5. Report

Summarize: the chosen story, the fictional product, the new slug/URL
(`/l/<slug>`), and confirmation that typecheck + build passed.

> Git commit/push is handled by the CI workflow when this runs on schedule. If
> you're running this manually and want it committed, ask first, then commit on
> the current branch with a message like
> `feat(landing): add <slug> daily landing`.
