# Project Progress Log

## Status
Last updated: 2026-07-18
Current focus: Correctness of the daily-automation pipeline + establishing a test safety net

## Completed
- [x] fix(news): match sensitive-keyword blocklist on word boundaries instead of substrings — 2026-07-17
- [x] feat(ai): upgrade keyword→LandingConfig generator from claude-sonnet-4-6 to claude-sonnet-5 — 2026-07-17
- [x] test: add vitest suite (slug, isSensitive, generateLanding) + `npm test` / `test:watch` — 2026-07-17
- [x] feat(ai): validate AI-generated LandingConfig at runtime with zod; fallback to generateLanding() on bad output — 2026-07-18
- [x] ci: add GitHub Actions workflow running typecheck + lint + test + build on PRs — 2026-07-18
- [x] refactor: consolidate two slugify implementations — generate-landing now reuses lib/slug.ts — 2026-07-18
- [x] feat(news): extract selectTopStory as a pure testable function; expand blocklist with inflected variants — 2026-07-18
- [x] test: add uniqueSlug tests with a vitest Prisma mock — 2026-07-18
- [x] feat(schema): validate RGB triple format in color fields; reject hex/rgb()/out-of-range — 2026-07-18
- [x] test: isolate local store in tests (LANDINGFORGE_LOCAL_STORE=0) + include app/**/*.test.ts — 2026-07-18
- [x] test: add cron route smoke tests (12 cases, all deps mocked, CI-safe) — 2026-07-18

## In Progress
- [ ] <none — session ended at a clean stopping point>

## Backlog (prioritized)
1. Test the index page (`app/page.tsx`) — verify that it merges registry + store landings and renders one card per landing, using mocked `getStoredLandings`.
2. Add `NEXT_PUBLIC_BASE_URL` awareness to generated page metadata (og:url, canonical) — currently missing from `generateMetadata` in `app/l/[slug]/page.tsx`.
3. Widen the CI matrix: add Node 18 alongside Node 20 to catch any compatibility regressions in the cron route (uses the global `Request` API, new in Node 18).
4. Consider adding a `--reporter=verbose` flag to `npm test` in CI so failed tests print full diffs in GitHub Actions logs.

## Known Issues / Tech Debt
- Daily automation requires Vercel KV env vars in production; degrades gracefully when absent.
- CI can't exercise the KV or AI paths (no credentials). Smoke tests mock both; end-to-end requires Vercel.

## Session Notes
Third session on 2026-07-18. Resumed from 43 tests passing. Noted that backlog items #2 (generateStaticParams) and #3 (deduplication) were already implemented in the codebase — removed from backlog. Picked 3 items:

- **RGB triple validation** — upgraded `landingConfigSchema`'s theme color fields from `z.string()` to a composable `rgbTriple` validator (regex + per-channel 0-255 range). The existing try/catch in `ai-generate-landing.ts` promotes a ZodError to a deterministic fallback, so misconfigured LLM colors never reach KV or the renderer. Added 4 rejection tests.
- **Store isolation + app test include** — `vitest.config.ts` now sets `LANDINGFORGE_LOCAL_STORE=0` globally (prevents accidental local store reads/writes in any test) and adds `"app/**/*.test.ts"` to the include glob so route smoke tests can live next to their handlers.
- **Cron route smoke test** — 12 tests covering auth guard (4 cases), store-disabled 503, no-story 502, happy-path response shape + call assertions, slug collision deduplication (2 cases), and unexpected-error 500. All network/store/AI deps are mocked; runs fully offline in CI.

Result: 59 tests passing (up from 43), typecheck and lint clean. Three commits pushed.
