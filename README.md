# WorkWise Tools

Database-driven programmatic SEO platform for WorkWise Tools, covering AI tools, SaaS comparisons, alternatives, workflows, templates, prompts, country guides, profession guides, and free tools.

The build package is preserved in `brief_package/`. The application source of truth is now the app scaffold in this repository, with the provided Prisma schema at `prisma/schema.prisma` and starter seed data at `src/data/seed-data.json`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL-ready schema
- Zod validation
- Seed JSON fallback for local development

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL` for PostgreSQL when you are ready to use Prisma.

4. Set admin and tracking variables before production:

```bash
ADMIN_BASIC_AUTH_USER="your-user"
ADMIN_BASIC_AUTH_PASSWORD="your-strong-password"
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=""
```

5. Generate Prisma client and push schema:

```bash
npm run prisma:generate
npm run prisma:push
```

6. Seed the database:

```bash
npm run db:seed
```

7. Run the app:

```bash
npm run dev
```

## MVP Routes

- `/`
- `/ai-tools/` and `/ai-tools/[slug]/`
- `/professions/` and `/professions/[slug]/`
- `/countries/` and `/countries/[country]/`
- `/comparisons/` and `/comparisons/[slug]/`
- `/alternatives/` and `/alternatives/[slug]/`
- `/workflows/` and `/workflows/[slug]/`
- `/prompts/` and `/prompts/[slug]/`
- `/templates/` and `/templates/[slug]/`
- `/free-tools/` and free tool landing pages
- `/about/`, `/editorial-policy/`, `/how-we-review-ai-tools/`, `/affiliate-disclosure/`, `/contact/`, `/media-kit/`

## Data QA

```bash
npm run data:validate
npm run data:duplicates
npm run data:missing
npm run data:stale
npm run links:check
npm run content:refresh-queue
npm run content:quality
npm run free-tools:audit
npm run monetisation:report
npm run seo:audit
npm run seo:noindex
```

Data import/export helpers:

```bash
npm run data:export -- exports/seed-export.json
npm run data:import -- tools imports/tools.csv imported-tools.json
npm run db:import -- imported-tools.json
```

## Data Access Architecture

Stage 2 adds a server-side repository layer in `src/lib/repository.ts`.

The repository uses this order:

1. If `DATABASE_URL` is configured and not the placeholder value, read from Prisma/PostgreSQL.
2. If the database is unavailable in development, fall back to `src/data/seed-data.json`.
3. Normalize Prisma records back into the public content types in `src/types/content.ts`.

This keeps local development easy while allowing production to move to database-backed content without rewriting page templates.

Dynamic pages use the repository for:

- tool detail data
- profession guides
- country guides
- comparison pages
- alternatives pages
- workflows
- prompts/templates
- sitemap route discovery

## Notes

- Seed data is demo content. Verify pricing, features, availability, countries, affiliate status, and recommendations before publishing.
- Thin pages are designed to support `noindex` through the quality scoring helper.
- Sitemap and robots are implemented using Next metadata routes.
- Growth workflow and launch checklist are copied into `docs/`.
- Rich PSEO blocks live in `src/components/Blocks.tsx` and content assembly helpers live in `src/lib/content-engine.ts`.
- Route-level SEO metadata and quality scoring live in `src/lib/route-registry.ts`; sitemap generation uses this registry so noindex pages are omitted automatically.
- `npm run seo:audit` checks duplicate titles, generated-route integrity, title/description length warnings, and missing referenced routes.
- `npm run content:quality` reports per-page content profiles, unique value blocks, data freshness gaps, and noindex reasons.
- Development pages show a content quality panel with value blocks and data warnings; this panel is hidden in production.
- `npm run free-tools:audit` validates free tool field definitions, defaults, generated output depth, and CTA coverage.
- Stage 6 adds missing-field reports, broken internal-reference checks, JSON/CSV import-export helpers, a noindex `/admin/` operations dashboard, and centralised affiliate CTA handling in `src/lib/affiliate.ts`.
- Stage 7 adds Basic Auth protection for `/admin/`, optional GA/Plausible script loading, a no-op analytics event endpoint, tracked outbound/newsletter/free-tool events, a database import path for edited seed exports, and `npm run monetisation:report`.

## Free Tools MVP

The free tools live in `src/lib/free-tools.ts` and render through `src/components/FreeToolForm.tsx`.

Current tools:

- AI tool recommender
- AI proposal outline generator
- AI cold email generator
- Prompt generator by profession
- SaaS cost calculator

They run locally with deterministic rules and require no paid API keys. Outputs are copyable drafts and include related guide CTAs plus newsletter capture placeholders.

## Production Operations

- `/admin/` is noindex and protected by Basic Auth when `ADMIN_BASIC_AUTH_USER` and `ADMIN_BASIC_AUTH_PASSWORD` are set. In production, admin access returns 404 if credentials are not configured.
- `src/app/api/events/route.ts` validates high-intent events and acts as a no-op collection endpoint until analytics/storage is connected.
- `src/components/Analytics.tsx` loads GA and Plausible only when public env IDs are present.
- Outbound vendor CTAs, newsletter submissions, free-tool copy events, and free-tool resets emit structured analytics events.
- Use `npm run monetisation:report` with `npm run content:refresh-queue` to decide which pages and affiliate records to update first.

## Roadmap

1. Replace seed fallback reads with Prisma-backed repository functions where production data is available.
2. Add authenticated admin views or import workflows for tools, professions, countries, comparisons, and templates.
3. Add analytics/Search Console integrations and page-level KPI tracking.
4. Expand free tools with better validation and saved lead capture.
5. Add screenshot/media fields and stronger review evidence blocks.
6. Replace demo recommendations with verified editorial testing notes and current pricing snapshots.
