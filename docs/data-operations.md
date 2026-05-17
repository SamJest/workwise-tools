# Data Operations

Stage 6 adds the foundations for running the PSEO site as a repeatable content operation rather than a one-off seed build.

## Daily checks

Run these before publishing new data:

```bash
npm run data:validate
npm run data:duplicates
npm run data:missing
npm run links:check
```

`data:missing` separates required fields from recommended editorial fields. Required gaps should block publishing. Recommended gaps should go into the refresh queue.

## Refresh workflow

```bash
npm run data:stale
npm run content:quality
npm run content:refresh-queue
npm run seo:audit
npm run monetisation:report
```

The refresh queue prioritises noindex pages, affiliate-ready pages missing affiliate URLs, stale comparisons, alternatives, and high-value profession pages.

## Import workflow

The importer accepts JSON arrays or CSV files for `tools`, `professions`, `countries`, and `categories`.

```bash
npm run data:import -- tools imports/tools.csv imported-tools.json
npm run data:validate
```

The importer merges by `slug`, validates the full seed shape, and writes a new JSON file. Review the output before replacing `src/data/seed-data.json`.

## Export workflow

```bash
npm run data:export -- exports/seed-export.json
```

Use exports for backups, editorial handoff, and preparing spreadsheet edits.

## Database import workflow

After reviewing an imported JSON file, push it into PostgreSQL with the same upsert logic used by the normal seed task:

```bash
npm run db:import -- imported-tools.json
```

If no file path is provided, `db:import` uses `src/data/seed-data.json`.

## Monetisation data

Affiliate and sponsored fields stay centralised on each tool record:

- `websiteUrl`
- `affiliateUrl`
- `affiliateAvailable`
- `isSponsored`
- `lastCheckedAt`

Outbound CTA links are generated through `src/lib/affiliate.ts`, which adds UTM parameters and sponsored rel attributes consistently.

## Admin and analytics

`/admin/` is an operational dashboard for checks and command reminders. It is noindex and protected by Basic Auth when these variables are set:

```bash
ADMIN_BASIC_AUTH_USER="your-user"
ADMIN_BASIC_AUTH_PASSWORD="your-strong-password"
```

Tracked events currently flow to `/api/events` and optional GA/Plausible scripts:

- `outbound_click`
- `newsletter_submit`
- `free_tool_copy`
- `free_tool_reset`

Set `ANALYTICS_DEBUG=true` locally if you want accepted events logged by the API route.
