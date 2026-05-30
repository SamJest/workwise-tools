# GSC Growth Plan - 2026-05-26

## Data read

Source: `workwisetools.com-Performance-on-Search-2026-05-26.zip`

- Filter: Web search, last 3 months.
- Actual visible chart activity: 2026-05-17 to 2026-05-24.
- Page dimension: 24 pages, 218 impressions, 1 click.
- Query dimension: 61 visible queries, 191 impressions, 0 clicks.
- Country concentration: United States has 117 impressions and the only click.
- Device concentration: Desktop has 199 of 218 page impressions.

This is very early data. Use it to choose direction, but avoid treating one impression queries as proven demand.

## What Google has noticed

### 1. Pipedrive is the first real cluster

Evidence:

- `/ai-tools/pipedrive` and `/ai-tools/pipedrive/`: 104 combined impressions.
- Query cluster: 13 Pipedrive-related queries, 100 impressions.
- Best query: `pipedrive use cases`, 10 impressions, average position 20.
- Related queries include `pipedrive`, `pipedrive tool`, `pipedrive data studio`, `what is pipedrive`, `pipedrive consulting`, `pipedrive consulting services`, and misspellings.

Interpretation:

The page is being discovered, but not yet trusted enough to rank on head terms. The most realistic early win is to move long-tail Pipedrive intent from positions 20-50 toward page one.

### 2. Real estate agents are the second cluster

Evidence:

- `/countries/us/real-estate-agents` and trailing-slash variant: 36 combined impressions.
- Query cluster: 17 real-estate queries, 37 impressions.
- Queries include `real estate agent tools`, `real estate ai software`, `ai tools for real estate agents`, `real estate brokerage tools`, `real estate broker tools`, `real estate ai tools`, and `ai tools for realtors`.

Interpretation:

This is lower ranked than Pipedrive, but it is aligned with the site strategy and has enough repeated wording to justify a focused refresh and supporting pages.

### 3. Automation/workflow language is emerging

Evidence:

- `/use-cases/automation/`: 13 combined impressions.
- Query cluster includes `workplace automation tools` at average position 23, plus `automation tools`, `work automation tools`, `automation tools for work`, and `prompt workflow tool`.

Interpretation:

The automation hub can become a bridge between tool pages and profession pages. It should not stay generic.

### 4. A few product pages are being discovered

Evidence:

- `/ai-tools/github-copilot`: 5 impressions for `what is github copilot`.
- `/ai-tools/clickup`: 5 impressions, with `clickup` and `clickup implementation`.
- `/ai-tools/asana/`: 3 impressions, plus `asana use cases`, `asana ai tool`, and `asana ai tools`.
- `/alternatives/zendesk-ai-alternatives/`: 5 impressions, including Zendesk alternative terms.

Interpretation:

These are not priority over Pipedrive and real estate yet, but they are candidates for a second wave after the first refreshes are done.

## Phase 1 - Fix signal quality first

Target window: next 7 days.

### Technical cleanup

1. Confirm the production domain and canonical base.
   - GSC export is for `workwisetools.com`.
   - `src/lib/seo.ts` fallback config currently uses `https://www.workwise.tools` and `workwise.tools`.
   - Action: set the production `NEXT_PUBLIC_SITE_URL` correctly and update the fallback config if `workwisetools.com` is the intended canonical domain.

2. Normalize trailing slashes.
   - GSC shows both `/ai-tools/pipedrive` and `/ai-tools/pipedrive/`.
   - GSC also shows both `/countries/us/real-estate-agents` and `/countries/us/real-estate-agents/`.
   - Action: verify redirects and sitemap URLs resolve to one canonical version, preferably the trailing-slash version already used by metadata.

3. Resubmit sitemap after the canonical/domain check.
   - This matters more now because the site is newly visible and Google is still forming URL patterns.

### Content refreshes

1. Refresh `/ai-tools/pipedrive/`.
   - Retarget title around `Pipedrive use cases`, not only `Pipedrive review`.
   - Add a short answer block for `what is Pipedrive`.
   - Add use-case sections for sales teams, real estate agents, consultants, lead follow-up, pipeline automation, and reporting.
   - Add a section covering `Pipedrive Data Studio` or reporting context carefully, depending on current product wording.
   - Add an alternatives/internal-links block to HubSpot, Follow Up Boss, Apollo, Calendly, Typeform, Zapier, and Make where relevant.
   - Add FAQ entries for `Pipedrive use cases`, `Pipedrive for real estate agents`, `Pipedrive consulting`, and `Pipedrive automation`.

2. Refresh `/countries/us/real-estate-agents/`.
   - Shift the page from country context only to a practical shortlist for US real estate workflows.
   - Add workflow sections for lead capture, listing marketing, CRM follow-up, appointment booking, showing notes, transaction reminders, review requests, and market-content creation.
   - Make the tool shortlist explicit: Pipedrive, Follow Up Boss, HubSpot, Canva, Matterport, Calendly, Typeform, Fathom, Otter, Zapier, and Make.
   - Add internal links to real estate prompt/template pages and the Pipedrive page.
   - Add FAQs around `real estate agent tools`, `real estate AI software`, `AI tools for realtors`, and `real estate brokerage tools`.

3. Refresh `/use-cases/automation/`.
   - Add concrete workflow examples instead of broad automation language.
   - Create sections for sales follow-up automation, real estate lead routing, agency reporting automation, ecommerce support automation, and consultant onboarding.
   - Link out to Zapier, Make, Pipedrive, ClickUp, Asana, Airtable AI, HubSpot, and relevant profession pages.

4. Quick polish for the current click page.
   - `/templates/chatgpt-prompts-for-consultants` has the only page-dimension click and average position 12.5.
   - Action: improve the title/meta and add links to consultant workflow, Claude, ChatGPT, Notion AI, Fathom, and Typeform pages.

## Phase 2 - Expand from proven clusters

Target window: weeks 2-4.

Prioritize pages that complete clusters, not isolated pages.

### Pipedrive and sales CRM cluster

Create or improve:

1. `Pipedrive use cases for small business`
2. `Pipedrive for real estate agents`
3. `Pipedrive vs HubSpot for small business`
4. `Pipedrive alternatives for sales teams`
5. `Best CRM automation tools for small sales teams`
6. `Sales follow-up automation workflow`
7. `Real estate lead follow-up workflow`
8. `Pipedrive implementation checklist`

Internal-link pattern:

- Pipedrive tool page links to all Pipedrive cluster pages.
- Real estate and sales-team profession pages link back to Pipedrive where it is a credible fit.
- Automation hub links to Pipedrive only in the sales follow-up context.

### Real estate AI tools cluster

Create or improve:

1. `Best AI tools for real estate agents`
2. `AI tools for realtors`
3. `Real estate AI software for lead follow-up`
4. `Real estate listing description prompts`
5. `ChatGPT prompts for real estate agents`
6. `AI workflow for real estate lead intake`
7. `Follow Up Boss alternatives`
8. `Pipedrive vs Follow Up Boss`
9. `Canva for real estate marketing`
10. `Matterport for real estate agents`

Internal-link pattern:

- The US real-estate country page should become the hub.
- Prompt/template pages should link back to the hub and the relevant tools.
- Tool pages should link into specific real estate workflows, not just generic related pages.

### Workplace automation cluster

Create or improve:

1. `Workplace automation tools for small business`
2. `Work automation tools for consultants`
3. `Best workflow automation tools`
4. `Zapier vs Make for small business`
5. `ClickUp automation use cases`
6. `Asana AI use cases`
7. `Airtable AI workflow examples`
8. `Client onboarding automation workflow`

Internal-link pattern:

- The automation use-case page should be the hub.
- Tool pages link to the hub from their automation sections.
- Profession pages link to one workflow page each, not every automation page.

## Phase 3 - Broaden carefully

Target window: month 2 onward, after refreshed pages have 2-4 weeks of fresh GSC data.

Expansion candidates:

1. Canada AI software
   - Current `/countries/ca/` page has 20 combined impressions, but average position is weak.
   - Build only if country pages can include genuine local value: CAD pricing notes, privacy context, local terminology, and country-specific availability.

2. Developer tools
   - `what is github copilot` has 5 impressions.
   - Build this only if the site wants developer/software-team traffic. Otherwise keep it as a supporting page, not a core growth cluster.

3. Marketing agency tools
   - `/countries/us/marketing-agencies` has only 3 impressions, but average position 16.
   - This is worth a light refresh because it is close to striking distance, but not a full cluster until impressions rise.

4. Ecommerce support and helpdesk
   - Zendesk, Gorgias, Tidio, Klaviyo, Shopify Magic, Mailchimp, and Omnisend already exist in the data.
   - Expand after the sales/real-estate/automation clusters have stronger rankings.

## Weekly operating loop

Run this every week:

1. Export GSC for the last 28 days.
2. Sort by pages with impressions and average position 8-30.
3. For each page, map queries into one of three actions:
   - Improve existing page if query intent matches.
   - Add internal links if the right page already exists.
   - Create a new page only when at least three related queries or one strategically important query appears.
4. Refresh 3-5 existing pages before publishing new pages.
5. Publish 5-10 new pages only inside the top two active clusters.
6. Add links from hubs to new pages and from new pages back to hubs.
7. Recheck canonical, indexability, title length, meta description length, and sitemap inclusion.

## Success metrics

Check after 28 days:

- Pipedrive cluster impressions increase from 100 to 300+.
- `pipedrive use cases` moves from average position 20 to top 12.
- Real estate cluster impressions increase from 37 to 150+.
- `/countries/us/real-estate-agents/` moves from average position 60-70 range toward top 40.
- At least three pages receive clicks, not just one.
- Duplicate trailing-slash and domain variants stop appearing as separate meaningful entries.

## Priority order

1. Fix canonical domain and trailing slash consistency.
2. Refresh `/ai-tools/pipedrive/`.
3. Refresh `/countries/us/real-estate-agents/`.
4. Refresh `/use-cases/automation/`.
5. Improve `/templates/chatgpt-prompts-for-consultants/`.
6. Publish the first Pipedrive supporting pages.
7. Publish the first real-estate supporting pages.
8. Expand into workplace automation pages.
9. Reassess Canada, GitHub Copilot, and marketing agencies after the next GSC export.
