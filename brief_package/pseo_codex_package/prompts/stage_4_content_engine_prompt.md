# Stage 4 Codex Prompt — Content Engine and Page Quality Rules

Build the structured content engine that converts database entities into useful PSEO pages.

## Objective

Create reusable content blocks that prevent thin programmatic SEO output.

## Required blocks

- VerdictBlock
- RankedToolList
- ComparisonTable
- PricingSummary
- BestForGrid
- NotBestForBlock
- WorkflowSteps
- PromptExamples
- TemplateDownloads
- FAQBlock
- MethodologyBlock
- DataFreshnessNotice
- RelatedPages

## Quality scoring

Implement a function like:

```ts
getPageQualityScore(pageData): {
  score: number
  reasons: string[]
  indexable: boolean
}
```

Criteria:

- at least 3 matching tools for list pages
- at least 3 unique value blocks
- non-empty intro/verdict
- at least 3 internal links
- last updated date present
- author/reviewer present
- no duplicate slug

If a page fails, mark it noindex and show a development warning.

## Content generation templates

Support:

- Best AI tools for `[profession]`
- Best AI tools in `[country]`
- `[Tool A] vs [Tool B]`
- Best `[Tool]` alternatives
- AI workflow for `[task]`
- ChatGPT prompts for `[profession/task]`
- Free tool landing pages

## Acceptance criteria

- The system outputs useful pages from seed data.
- Empty blocks are omitted.
- Thin pages are noindexed.
- The components are cleanly reusable.
