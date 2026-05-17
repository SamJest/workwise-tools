# Stage 3 Codex Prompt — SEO, Internal Links, and Structured Data

Implement the SEO engine for the AI/SaaS PSEO platform.

## Deliverables

1. Dynamic metadata generation for every page type.
2. Canonical URL helper.
3. Open Graph metadata helper.
4. Breadcrumb component and BreadcrumbList JSON-LD.
5. Article JSON-LD helper.
6. FAQPage JSON-LD helper.
7. SoftwareApplication/Product JSON-LD where suitable.
8. XML sitemap generation.
9. Robots file.
10. `noindex` handling for thin or incomplete pages.
11. Internal linking engine.
12. Related page selection logic.

## Internal linking rules

Every page should link to relevant:

- parent category
- tools
- professions
- countries
- workflows
- prompts/templates
- comparisons
- alternatives

## Metadata examples

Profession title:

`Best AI Tools for {Profession} in {Year}: Compare Features, Pricing & Use Cases`

Alternative title:

`Best {Tool} Alternatives in {Year}: Compare Pricing, Features & Use Cases`

Comparison title:

`{Tool A} vs {Tool B}: Which Is Better for {Primary Use Case}?`

## Acceptance criteria

- Metadata does not duplicate across route types.
- Canonicals are stable.
- Sitemap includes only indexable pages.
- Noindex is applied for insufficient pages.
- Breadcrumb JSON-LD validates structurally.
