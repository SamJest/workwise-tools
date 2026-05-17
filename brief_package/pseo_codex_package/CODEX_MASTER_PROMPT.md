# Codex Master Prompt: Build a Database-Driven AI/SaaS PSEO Platform

You are Codex acting as a senior full-stack engineer, product architect, technical SEO specialist, and pragmatic startup CTO.

Build a production-ready web platform for a global PSEO project focused on AI tools, SaaS comparisons, alternatives, workflows, templates, prompts, and professional use cases.

The project must be built in stages. Complete as much as possible in the current run. If the full project is too large, complete Stage 1 fully, leave clear TODOs, and create the scaffolding for later stages.

Do not ask clarifying questions unless a requirement is genuinely impossible. Make reasonable assumptions and document them.

---

## 1. Product objective

Build a database-driven SEO platform that can scale into thousands of useful pages around:

- Best AI tools for professions
- Best AI/SaaS tools by use case
- Tool alternatives
- Tool-vs-tool comparisons
- Country-specific guides
- AI workflows
- Prompt libraries
- Downloadable templates
- Free tools/calculators
- Vendor review pages

This is not a generic AI tools directory. It is a practical decision engine for English-speaking professionals, small businesses, freelancers, creators, agencies, and teams in the US, UK, Australia, Canada, New Zealand, Ireland, Singapore, South Africa, India, and the Philippines.

---

## 2. Recommended stack

Use this unless the existing repository already has a different clear stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Zod for validation
- MDX or structured JSON content blocks
- Server components where appropriate
- Static generation / ISR for SEO pages
- Dynamic routes for database-driven pages
- JSON-LD structured data
- Sitemap and robots generation
- Lightweight admin seed scripts

If starting from an empty repository, create a Next.js app with TypeScript and Tailwind.

---

## 3. Build stages

### Stage 1 — Foundation MVP

Create the base app, layout, navigation, design system, data models, seed data, and core SEO routes.

Deliver:

- Responsive homepage
- Header and footer
- Core navigation
- Tool cards
- Comparison tables
- Recommendation blocks
- Pros/cons blocks
- CTA blocks
- Author/reviewer blocks
- Affiliate disclosure component
- Last updated component
- Basic search/filter UI
- Seed data loader
- Prisma schema
- Sitemap generation
- Robots file
- JSON-LD helper
- Reusable page templates

Required routes:

```txt
/
/ai-tools/
/ai-tools/[slug]/
/professions/
/professions/[slug]/
/countries/
/countries/[country]/
/comparisons/
/comparisons/[slug]/
/alternatives/
/alternatives/[slug]/
/workflows/
/workflows/[slug]/
/prompts/
/prompts/[slug]/
/templates/
/templates/[slug]/
/free-tools/
/about/
/editorial-policy/
/how-we-review-ai-tools/
/affiliate-disclosure/
/contact/
```

### Stage 2 — Database-driven page engine

Implement dynamic page generation from structured data.

Page types:

1. Tool detail page
2. Best tools for profession page
3. Best tools by country page
4. Tool-vs-tool comparison page
5. Tool alternatives page
6. Workflow page
7. Prompt/template page
8. Free tool landing page

Each SEO page must include:

- H1
- short verdict or answer box
- original recommendation block
- comparison table where relevant
- tool cards
- pros and cons
- internal links
- FAQs
- author/reviewer
- last updated
- affiliate disclosure
- JSON-LD
- canonical URL

### Stage 3 — SEO architecture

Implement:

- Clean metadata generation per route
- Canonical URLs
- Open Graph data
- Breadcrumbs
- JSON-LD for Article, FAQPage, BreadcrumbList, SoftwareApplication, Product where suitable
- XML sitemap split by route group if needed
- Robots.txt
- Noindex support for thin/low-data pages
- Internal linking engine
- Related pages module
- Related comparisons module
- Related alternatives module

Internal link rules:

Every page should link to:

- parent category
- related tools
- related profession pages
- related country pages
- related workflows
- related prompts/templates
- alternatives and comparisons where applicable

### Stage 4 — Content and PSEO generator

Create a content generator layer that converts database entities into useful, structured page sections without creating thin pages.

It should support:

- Best `[AI tool category]` for `[profession]`
- Best `[AI/SaaS category]` in `[country]`
- `[Tool A] vs [Tool B]`
- Best `[Tool]` alternatives
- ChatGPT prompts for `[profession/task]`
- AI workflow for `[business process]`
- Free tool landing page for `[task]`

Implement safeguards:

- Do not index pages with too few matching tools
- Show data quality warnings in development
- Use `lastCheckedAt` fields
- Show “pricing may change” note
- Require unique value blocks before indexing

### Stage 5 — Free tools MVP

Build lightweight free tools that can capture organic traffic and email leads.

Initial tools:

1. AI tool recommender quiz
2. AI proposal outline generator
3. AI cold email generator
4. Prompt generator by profession
5. SaaS cost calculator

These can be rule-based locally. Do not require paid APIs for MVP.

Each free tool should include:

- landing page copy
- form inputs
- generated output
- CTA to related tool pages
- CTA to email capture
- related templates/workflows

### Stage 6 — Admin/data workflow

Create simple internal data workflows:

- Seed script
- JSON/CSV import support
- Admin-only placeholder pages or scripts for updating tools
- Validation using Zod
- Data freshness report
- Missing-field report
- Duplicate-slug detection
- Broken internal link detection where possible

A full admin dashboard is optional for MVP, but the codebase should make it easy to add later.

### Stage 7 — Monetisation hooks

Add flexible monetisation components:

- Affiliate disclosure
- Affiliate link wrapper
- Sponsored listing badge
- Featured partner slot
- Newsletter capture block
- Template download CTA
- Vendor inquiry CTA
- Media kit placeholder page

Do not hard-code fake revenue claims. Make the system ready for affiliate and sponsor data.

### Stage 8 — Analytics and growth loop

Add placeholders and documentation for:

- Google Search Console workflow
- GA4/Plausible integration
- Page-level KPI tracking fields
- Query expansion workflow
- Refresh scheduling
- Content decay detection
- “Pages with impressions but low CTR” optimisation flow

If analytics cannot be connected directly, create clear config placeholders and documentation.

---

## 4. Site information architecture

Use this structure:

```txt
/
  /ai-tools/
  /software/
  /comparisons/
  /alternatives/
  /professions/
  /industries/
  /countries/
  /workflows/
  /templates/
  /prompts/
  /free-tools/
  /reviews/
  /deals/
  /blog/
```

Prioritise the implemented MVP routes listed in Stage 1.

---

## 5. Data entities

Model at minimum:

- Tool
- ToolCategory
- Profession
- Country
- UseCase
- Workflow
- PromptTemplate
- Comparison
- AlternativeSet
- Article/Page
- Author
- AffiliateProgram
- PricingPlan
- Integration
- FAQ
- ReviewSignal

Important fields:

Tool:

- name
- slug
- summary
- description
- websiteUrl
- affiliateUrl
- logoUrl
- category
- subcategories
- pricingModel
- startingPrice
- currency
- freePlanAvailable
- trialAvailable
- bestFor
- notBestFor
- pros
- cons
- countriesSupported
- professions
- useCases
- integrations
- alternatives
- rating
- lastCheckedAt
- isSponsored
- affiliateAvailable

Profession:

- name
- slug
- aliases
- countryTerminology
- painPoints
- commonTasks
- recommendedCategories
- monetisationScore

Country:

- name
- slug
- currency
- region
- terminologyNotes
- privacyNotes
- priority

Comparison:

- slug
- toolA
- toolB
- summaryVerdict
- winnerByUseCase
- featureRows
- pricingNotes
- lastCheckedAt

Workflow:

- title
- slug
- problem
- toolsNeeded
- steps
- prompts
- templates
- relatedTools
- relatedProfessions

---

## 6. Page quality standard

Each indexable PSEO page must contain at least 3 of these unique value blocks:

- comparison table
- pricing table
- professional use-case explanation
- country-specific note
- tested/tool-specific recommendation
- workflow example
- prompt/template section
- calculator/tool output
- FAQ section
- internal alternatives/comparisons
- screenshot placeholder
- editorial verdict

If a generated page has insufficient data, set `noindex`.

---

## 7. Design requirements

Use a clean, trustworthy B2B design.

Style:

- white or near-white background
- strong readable typography
- card-based layout
- simple comparison tables
- clear CTAs
- restrained gradients, if any
- mobile-first
- accessible contrast
- semantic HTML

Key UI components:

- ToolCard
- ToolRankedList
- ComparisonTable
- PricingTable
- ProsCons
- VerdictBox
- MethodologyBox
- AffiliateDisclosure
- Breadcrumbs
- RelatedPages
- FAQAccordion
- NewsletterCTA
- SearchAndFilter
- CountryBadge
- SponsoredBadge
- LastUpdated
- AuthorBox

---

## 8. Initial seed content

Use seed data from this package or create equivalent seed content.

Initial professions:

- accountants
- real estate agents / estate agents
- recruiters
- sales teams
- marketing agencies
- freelancers
- consultants
- coaches
- ecommerce sellers
- teachers
- designers
- developers
- copywriters
- HR teams
- insurance brokers
- mortgage brokers
- financial advisers
- content creators

Initial countries:

- United States
- United Kingdom
- Australia
- Canada
- New Zealand
- Ireland
- Singapore
- South Africa
- India
- Philippines

Initial categories:

- AI writing
- AI chatbots
- AI meeting notes
- AI design
- AI video
- AI SEO
- AI sales automation
- AI CRM
- AI document automation
- AI coding
- AI customer support
- AI project management

---

## 9. Free tools logic examples

### AI tool recommender

Inputs:

- profession
- task
- budget
- country
- team size
- preferred complexity

Output:

- top 3 recommended tools
- why each fits
- what to avoid
- related guides

### Proposal outline generator

Inputs:

- business type
- client type
- service
- tone
- length

Output:

- proposal title
- sections
- suggested wording
- CTA
- related templates/tools

### Cold email generator

Inputs:

- audience
- offer
- pain point
- tone
- CTA

Output:

- subject lines
- email body
- follow-up email
- related sales tools

### Prompt generator

Inputs:

- profession
- task
- tool
- output format

Output:

- prompt
- refinement prompt
- mistakes to avoid

### SaaS cost calculator

Inputs:

- number of users
- monthly price per user
- setup cost
- annual discount
- number of tools

Output:

- monthly cost
- annual cost
- savings estimate
- notes

---

## 10. SEO metadata templates

Examples:

Profession page title:

```txt
Best AI Tools for {Profession} in {Year}: Compare Features, Pricing & Use Cases
```

Profession meta description:

```txt
Compare the best AI tools for {profession}. See pricing, use cases, pros and cons, workflows, and practical recommendations for {audience}.
```

Country page title:

```txt
Best AI Tools for Small Businesses in {Country} in {Year}
```

Alternative page title:

```txt
Best {Tool} Alternatives in {Year}: Compare Pricing, Features & Use Cases
```

Comparison page title:

```txt
{Tool A} vs {Tool B}: Which Is Better for {Primary Use Case}?
```

Workflow page title:

```txt
AI Workflow for {Task}: Tools, Prompts & Step-by-Step Setup
```

---

## 11. Acceptance criteria

The build is acceptable when:

- The app runs locally without errors.
- Core routes render.
- Seed data appears on pages.
- Dynamic routes work for tools, professions, countries, comparisons, alternatives, workflows, prompts/templates, and free tools.
- Pages include useful structured content, not placeholder-only text.
- SEO metadata is generated dynamically.
- Sitemap and robots are present.
- JSON-LD helpers are implemented.
- Thin pages can be noindexed.
- Internal links are generated.
- Components are reusable.
- Data validation catches missing required fields.
- README includes setup instructions.
- There is a clear roadmap/TODO list for unfinished stages.

---

## 12. Repository output expectations

Create or update:

```txt
README.md
package.json
next.config.*
tailwind.config.*
prisma/schema.prisma
prisma/seed.ts
src/app/**
src/components/**
src/lib/**
src/data/**
src/types/**
src/content/**
scripts/**
.env.example
```

Add comments where business logic matters. Avoid over-engineering. Prefer a working, clean MVP over a giant incomplete system.

---

## 13. Important constraints

- Do not create misleading fake reviews.
- Do not present placeholder pricing as verified.
- Mark seed data as starter/demo data.
- Add affiliate disclosures where affiliate links may appear.
- Use noindex for insufficiently useful generated pages.
- Do not keyword-stuff.
- Do not generate thousands of pages in the MVP.
- Build the system so expansion is easy after real Search Console data appears.

---

## 14. Final instruction

Proceed stage by stage. Start with the smallest production-quality version that proves the architecture. Prioritise: clean data model, useful page templates, SEO foundations, internal linking, and a growth loop.
