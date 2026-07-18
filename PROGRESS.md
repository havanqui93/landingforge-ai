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

## In Progress
- [ ] <none — all backlog items cleared>

## Backlog (prioritized)
1. End-to-end smoke test for the cron route (`/api/cron/daily-landing`) — mock fetch + KV + Prisma to exercise the full pipeline in CI.
2. Add `generateStaticParams` to `app/l/[slug]/page.tsx` if KV-backed landings need SSG; currently they're dynamic (request-time KV read).
3. Rate-limit or deduplicate the cron job — if it fires more than once a day (e.g. multiple Vercel deployments), the same slug could be written twice. Add a KV existence check before generating.

## Known Issues / Tech Debt
- Daily automation needs Vercel KV env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) in production and `ANTHROPIC_API_KEY` for the AI generator; both degrade gracefully when absent, so the pipeline can't be tested end-to-end without those credentials.
- CI build step pre-renders static landings and confirms the type system is valid but can't exercise KV or AI paths.

## Session Notes
Second session on 2026-07-18. Resumed from 30 passing tests. Cleared the remaining 3 backlog items:

- **selectTopStory extraction** — the filter/sort logic in `fetchTopStory` was previously untestable because it was tangled with `fetch`. Extracted as `selectTopStory(hits: AlgoliaHit[])` (exported). `fetchTopStory` is now a thin wrapper: fetch → parse → delegate. 8 new tests cover null hits, missing URL, sensitive filtering, points sorting, null-points handling, and result shape.
- **Blocklist expansion** — word-boundary matching was correct but the list was missing inflected forms: "deaths", "deadly", "kills", "killed", "killing", "killings", "murders", "murdered", "bombing", "attacks". Added all of them. 3 new tests verify the new variants are caught.
- **uniqueSlug Prisma mock** — used `vi.mock("@/lib/prisma", ...)` to replace the Prisma client with a `vi.fn()`. 5 tests: free base, single collision (-2), multi-collision (-3), ignoreId short-circuit, empty-string fallback to "page".

Result: 43 tests passing (up from 30). Typecheck and lint clean. Two commits pushed to `claude/autonomous-dev-session-bzjvzi`. Backlog replaced with 3 new forward-looking items.
