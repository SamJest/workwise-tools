# Stage 2 Codex Prompt — Dynamic PSEO Pages

Extend the foundation MVP with database/seed-driven dynamic pages.

## Required dynamic routes

```txt
/ai-tools/[slug]/
/professions/[slug]/
/countries/[country]/
/comparisons/[slug]/
/alternatives/[slug]/
/workflows/[slug]/
/prompts/[slug]/
/templates/[slug]/
```

## Required page templates

### Tool detail page

Must include:

- tool summary
- best for / not best for
- pricing notes
- pros and cons
- use cases
- professions
- countries supported
- alternatives
- related comparisons
- affiliate disclosure
- last updated
- JSON-LD

### Profession guide page

Example: `/professions/accountants/`

Must include:

- H1: Best AI Tools for Accountants
- short verdict
- ranked tools
- comparison table
- recommended workflow
- prompt/template links
- related country pages
- FAQ
- last updated
- author box

### Country guide page

Example: `/countries/uk/`

Must include:

- country-specific terminology notes
- currency notes
- privacy/compliance notes
- tools relevant to that country
- related profession guides
- related workflow pages

### Comparison page

Example: `/comparisons/chatgpt-vs-claude/`

Must include:

- quick verdict
- feature table
- pricing notes
- best for each user type
- winner by use case
- alternatives
- FAQs

### Alternatives page

Example: `/alternatives/grammarly-alternatives/`

Must include:

- why users look for alternatives
- ranked alternatives
- comparison table
- best free option
- best business option
- final recommendation

## Safeguards

- If there is insufficient data, add noindex metadata.
- Do not render empty sections.
- Show demo-data warnings in development only.
- Generate clear 404 pages for invalid slugs.
