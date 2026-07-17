# Project Progress Log

## Status
Last updated: 2026-07-17
Current focus: Correctness of the daily-automation pipeline + establishing a test safety net

## Completed
- [x] fix(news): match sensitive-keyword blocklist on word boundaries instead of substrings — 2026-07-17
- [x] feat(ai): upgrade keyword→LandingConfig generator from claude-sonnet-4-6 to claude-sonnet-5 — 2026-07-17
- [x] test: add vitest suite (slug, isSensitive, generateLanding) + `npm test` / `test:watch` — 2026-07-17

## In Progress
- [ ] <none — session ended at a clean stopping point>

## Backlog (prioritized)
1. Validate AI-generated configs at runtime — `ai-generate-landing.ts` casts `toolUse.input as LandingConfig` with no schema check; add a zod schema and fall back to `generateLanding()` on invalid output.
2. Add CI workflow (`.github/workflows/ci.yml`) running typecheck + lint + test + build on PRs.
3. Consolidate the two `slugify` implementations (`lib/slug.ts` and `lib/generate-landing.ts`).
4. Make `fetchTopStory` selection logic testable (extract pure filter/sort or inject `fetch`).
5. Test `uniqueSlug` with a prisma mock.
6. Add blocklist variants ("killings", "deadly", …) if they surface in generated pages now that matching is stricter.

## Known Issues / Tech Debt
- Daily automation needs Vercel KV env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) in production and `ANTHROPIC_API_KEY` for the AI generator; both degrade gracefully when absent (local store / deterministic fallback), so the pipeline can't be tested end-to-end without those credentials.
- Two separate `slugify` implementations exist (see backlog #3).
- AI-generated `LandingConfig` is unvalidated at runtime (see backlog #1); only `LandingErrorBoundary` guards a malformed page.

## Session Notes
Baseline was green (typecheck/lint/build passed) but had no test suite and no progress log. Picked 3 items by impact/effort:
- The `isSensitive` substring bug was the highest-value find: "war" matched software/hardware/warehouse, "hack" matched hackathon/Hacker News, "dead" matched deadline — silently filtering out most legitimate HN tech stories, which are the core input to the daily generator. Fixed with a word-boundary regex; exported the function so it's unit-testable.
- Confirmed `claude-sonnet-4-6` was a *valid* model (not a bug), but upgraded to `claude-sonnet-5` per the "default to latest models" guidance; safe because the request sets no sampling params (Sonnet 5's breaking changes don't apply).
- Chose vitest for the test suite (fast, node-only, TS-native); tests cover only pure/deterministic logic to stay credential-free and offline. `vitest.config.ts` mirrors the `@/` path alias so tests import like the app.
All changes verified with `npm test` (20 passing), typecheck, lint, and build. Each item is its own commit; branch `claude/autonomous-dev-session-bzjvzi` is pushed. No PR opened (not requested).
