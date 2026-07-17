# PROGRESS

Working log for autonomous development on LandingForge. Read this first each
session. See `CLAUDE.md` for architecture and the "add a landing" contract.

## Current state (2026-07-17)

- `npm run typecheck`, `npm run lint`, `npm run build`, and `npm test` all pass.
- **Test suite now exists** (vitest, node-only): `npm test` / `npm run test:watch`.
  Covers `lib/slug.ts`, `lib/news.ts` (isSensitive), and
  `lib/generate-landing.ts`. 20 tests. Config in `vitest.config.ts` (`@/` alias).
- 16 static landings registered in `lib/registry.ts`; daily automation
  (Vercel Cron → HN → generator → KV store) intact.

## Completed this session

- **fix(news):** `isSensitive` now matches the blocklist on **word boundaries**
  instead of substrings. Previously "war" matched software/hardware/warehouse,
  "hack" matched hackathon/Hacker News, "dead" matched deadline — over-filtering
  a large share of legitimate HN tech stories (the core daily-automation input).
  `isSensitive` is now exported and unit-tested.
- **feat(ai):** upgraded the keyword→LandingConfig generator in
  `lib/ai-generate-landing.ts` from `claude-sonnet-4-6` to `claude-sonnet-5`
  (latest Sonnet; no request-shape changes needed — no sampling params set).
- **test:** added the vitest suite described above (no test infra existed).

## Backlog (next sessions — roughly impact/effort ordered)

1. **Validate AI-generated configs at runtime.** `ai-generate-landing.ts` does
   `toolUse.input as LandingConfig` with no schema check. A malformed tool
   output could render a broken page (only `LandingErrorBoundary` guards it).
   Add a zod schema for `LandingConfig`/`Section` and fall back to
   `generateLanding()` when the AI output fails validation. (Medium)
2. **CI workflow.** Add `.github/workflows/ci.yml` running typecheck + lint +
   test + build on PRs. (Low effort, high safety.)
3. **Consolidate the two `slugify` implementations.** `lib/slug.ts` and
   `lib/generate-landing.ts` each define their own; unify to one. (Low)
4. **Test `fetchTopStory` selection logic.** Currently untestable (does a live
   `fetch`). Extract the pure candidate-filter/sort into a testable function
   and/or inject `fetch`. (Low–Medium)
5. **Test `uniqueSlug`** (needs a prisma mock). (Low)
6. **Blocklist variants.** With stricter word-boundary matching, a few variants
   slip through (e.g. "killings", "deadly"). Add them if they surface in
   generated pages. (Low)

## Known issues / blockers

- Daily automation requires Vercel KV env vars (`KV_REST_API_URL`,
  `KV_REST_API_TOKEN`) in production and `ANTHROPIC_API_KEY` for the AI
  generator; both degrade gracefully when absent (local store / deterministic
  fallback). Not testable end-to-end without those credentials.
