# TrendPage AI

An AI-powered SEO landing-page generator that lives **alongside** LandingForge
in this same Next.js app. You give it a keyword + description; it generates
structured landing-page content, stores it in PostgreSQL, and publishes a clean,
SEO-friendly page at `/trends/[slug]`.

> Note on structure: the original `PROJECT_BRIEF.md` sketches a `/src/...` tree.
> Next.js can't use both a root `app/` (LandingForge) and `src/app/` at once, so
> TrendPage is integrated **additively** into the existing root layout
> (`app/`, `components/`, `lib/`, `types/`) with the repo's `@/*` → `./` alias.
> LandingForge is left untouched.

## MVP flow

```
keyword + description
  → POST /api/generate-page   (AI → structured JSON)
  → review in /admin/generate
  → POST /api/pages           (save to Postgres, unique slug)
  → publish
  → public page at /trends/[slug] (SEO metadata + FAQ JSON-LD)
```

## Setup

1. **Database** — provision PostgreSQL (Supabase / Neon / local) and set
   `DATABASE_URL` (see `.env.example`). Create `.env` for Prisma and
   `.env.local` for Next.js runtime, or one `.env` with both.
2. **Push the schema**: `npm run db:push`
3. **AI key (optional)** — set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`,
   default `gpt-4o-mini`). **Without a key the generator falls back to a
   deterministic local template**, so the whole flow still works end-to-end.
4. `npm run dev` → open `/admin/generate`.

## Routes

| Kind   | Path                          | Purpose                              |
| ------ | ----------------------------- | ------------------------------------ |
| Admin  | `/admin/generate`             | Enter keyword/description, generate  |
| Admin  | `/admin/pages`                | List, publish/unpublish, edit, delete|
| Admin  | `/admin/pages/[id]/edit`      | Edit content + status                |
| Public | `/trends/[slug]`              | Published landing page (SEO)         |
| API    | `POST /api/generate-page`     | Run AI generation (no persistence)   |
| API    | `GET/POST /api/pages`         | List / save pages                    |
| API    | `GET/PATCH/DELETE /api/pages/[id]` | Read / update / delete          |
| API    | `PATCH /api/pages/[id]/publish`    | Set status (default published)  |

## Code map

```
prisma/schema.prisma              LandingPage (+ future TrendTopic) models
lib/prisma.ts                     PrismaClient singleton
lib/ai.ts                         OpenAI generation + deterministic fallback
lib/slug.ts                       slugify() + uniqueSlug()
lib/validators.ts                 Zod input/content schemas
lib/api.ts                        JSON response helpers
types/landing-page.ts             GeneratedLandingPage type
components/landing/*               public page template (Hero/FAQ/CTA)
components/admin/*                 GeneratePageForm, PageList, EditPageForm
app/trends/[slug]/page.tsx        public route + generateMetadata
app/admin/**                      admin UI
app/api/**                        API routes
```

## Safety / editorial guardrails

The AI prompt (in `lib/ai.ts`) instructs original, factual content — no copied
articles, no unsupported medical/financial/political/legal claims. Public pages
carry a visible AI-generated disclosure and an optional source link. Nothing is
public until a human clicks **Publish**.

## Future (post-MVP, schema already prepared)

`TrendTopic` model is in place for auto-collecting trends (RSS / news APIs /
Google Trends / GDELT), trend scoring, and auto-drafting pages.
