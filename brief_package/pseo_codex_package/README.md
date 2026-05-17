# AI/SaaS PSEO Platform — Codex Build Package

This package turns the market research plan into a build-ready Codex brief.

## How to use

1. Start with `CODEX_MASTER_PROMPT.md`.
2. Paste it into Codex or your coding agent.
3. Let the agent build in stages. If the agent cannot finish the full build in one run, use the individual staged prompts in `/prompts`.
4. Use `/schemas/schema.prisma` and `/schemas/content_model.sql` as the source of truth for the database.
5. Use `/data/seed_data.json` as starter content, not final editorial truth.
6. Use `/checklists/launch_checklist.md` before publishing.

## Intended project

A database-driven SEO platform for AI tools, SaaS comparisons, alternatives, workflows, prompts, templates, and country/profession-specific buying guides.

The site is designed to grow continuously through a loop:

Keyword data -> structured content -> internal links -> Search Console feedback -> page refreshes -> new templates -> affiliate/sponsor monetisation -> stronger database -> more pages.

## Recommended stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- MDX or database-rendered content blocks
- Zod for validation
- next-sitemap or custom sitemap generator
- Plausible/GA4 + Google Search Console

## Core principle

Do not build a thin AI-tools directory. Build a decision engine that helps users choose, compare, replace, and use AI/SaaS tools by profession, task, country, budget, and workflow.
