# Stage 6 Codex Prompt — Growth Operations, Data QA, and Monetisation Hooks

Add the operational layer that allows the site to keep growing.

## Deliverables

1. Data validation scripts.
2. Duplicate slug detection.
3. Missing field report.
4. Stale data report based on `lastCheckedAt`.
5. Content refresh queue generator.
6. Affiliate link wrapper.
7. Sponsored placement badge.
8. Vendor CTA component.
9. Newsletter CTA component.
10. Media kit placeholder page.
11. Search Console growth workflow documentation.
12. Page refresh workflow documentation.

## Scripts

Create scripts such as:

```txt
npm run data:validate
npm run data:stale
npm run data:duplicates
npm run seo:sitemap
npm run content:refresh-queue
```

## Acceptance criteria

- Bad data is reported clearly.
- Stale pricing/tool data can be found.
- Affiliate links can be tagged centrally.
- Sponsored placements are visibly disclosed.
- Growth workflow is documented in the repo.
