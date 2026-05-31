import type { UpdateItem } from "@/types/content";

export const updateItems: UpdateItem[] = [
  {
    title: "Quality scorecard and expanded audit coverage added",
    slug: "quality-scorecard-audit-coverage-added",
    type: "verification",
    summary:
      "The quality system now includes a public scorecard plus content-profile coverage for buying guides, so new commercial pages are checked for usefulness, links, red flags, rollout depth, and daily-return value.",
    affectedTools: [],
    affectedClusters: ["quality scorecard", "buying guides", "content quality", "internal links"],
    sourceUrls: ["/quality-scorecard/", "/buying-guides/", "/how-we-review-ai-tools/"],
    publishedAt: "2026-05-31"
  },
  {
    title: "Software buying guide library added",
    slug: "software-buying-guide-library-added",
    type: "new-guide",
    summary:
      "A new buying-guide route family captures high-intent software searches with pricing reality, privacy risk, rollout plans, red flags, and related workflow actions.",
    affectedTools: ["pipedrive", "hubspot", "zapier", "make", "fathom", "gorgias", "zendesk-ai", "calendly", "typeform"],
    affectedClusters: ["buying guides", "software decisions", "commercial investigation", "returning tools"],
    sourceUrls: ["/buying-guides/", "/free-tools/software-buying-checklist-generator/", "/stack-blueprints/"],
    publishedAt: "2026-05-31"
  },
  {
    title: "New search-demand clusters added across six adjacent markets",
    slug: "adjacent-search-demand-clusters-added",
    type: "new-guide",
    summary:
      "WorkWise now adds topic clusters for marketing content ops, finance and admin automation, recruiting and HR, analytics reporting, compliance risk, and customer-success retention workflows.",
    affectedTools: ["chatgpt", "claude", "zapier", "make", "hubspot", "quickbooks", "xero", "clickup", "asana"],
    affectedClusters: ["marketing content", "finance admin", "recruiting HR", "analytics reporting", "compliance risk", "customer success"],
    sourceUrls: [
      "/topics/best-ai-tools-for-marketing-teams/",
      "/topics/ai-tools-for-bookkeeping-accounting/",
      "/topics/ai-recruiting-tools-small-business/",
      "/topics/ai-reporting-tools-small-business/",
      "/topics/ai-privacy-review-checklist-small-business/",
      "/topics/ai-customer-success-tools-small-business/"
    ],
    publishedAt: "2026-05-30"
  },
  {
    title: "AI stack blueprints added for buyer-intent workflows",
    slug: "ai-stack-blueprints-added",
    type: "new-guide",
    summary:
      "Stack Blueprints connect tools, recipes, agent playbooks, rollout steps, risk notes, and upgrade triggers for commercial-intent stack searches.",
    affectedTools: ["pipedrive", "hubspot", "follow-up-boss", "zapier", "clickup", "gorgias", "shopify-magic"],
    affectedClusters: ["stack blueprints", "workflow library", "agent playbooks"],
    sourceUrls: ["/stack-blueprints/", "/free-tools/stack-gap-analyzer/"],
    publishedAt: "2026-05-30"
  },
  {
    title: "AI agent playbooks added for guarded workflows",
    slug: "ai-agent-playbooks-added",
    type: "new-guide",
    summary:
      "Agent Playbooks add practical AI agent pages with triggers, owners, guardrails, handoff rules, privacy notes, and a readiness checker.",
    affectedTools: ["pipedrive", "hubspot", "follow-up-boss", "zapier", "gorgias", "chatgpt", "claude"],
    affectedClusters: ["agent playbooks", "workflow library", "automation OS"],
    sourceUrls: ["/agent-playbooks/", "/free-tools/agent-readiness-checker/"],
    publishedAt: "2026-05-30"
  },
  {
    title: "Workflow Library recipe expansion launched",
    slug: "workflow-library-recipe-expansion-launched",
    type: "workflow-idea",
    summary:
      "The new Workflow Library adds step-by-step recipes for sales, real estate, agencies, ecommerce, support, finance, admin, and local service teams.",
    affectedTools: ["pipedrive", "hubspot", "follow-up-boss", "zapier", "make", "clickup", "gorgias"],
    affectedClusters: ["workflow library", "automation OS", "organic traffic"],
    sourceUrls: ["/workflow-library/", "/free-tools/workflow-recipe-finder/"],
    publishedAt: "2026-05-29"
  },
  {
    title: "Automation OS template library launched",
    slug: "automation-os-template-library-launched",
    type: "template",
    summary:
      "Automation OS adds repeatable templates for speed-to-lead, CRM hygiene, meeting notes, onboarding, support triage, invoices, reporting, and workflow cleanup.",
    affectedTools: ["zapier", "make", "pipedrive", "hubspot", "clickup", "asana"],
    affectedClusters: ["automation OS", "workflow templates", "returning tools"],
    sourceUrls: ["/automation-os/"],
    publishedAt: "2026-05-29"
  },
  {
    title: "Workflow audit loop added for returning users",
    slug: "workflow-audit-loop-added",
    type: "workflow-audit",
    summary:
      "The new audit generator, ROI calculator, automation picker, and lead SLA calculator give readers repeatable actions after reading a template.",
    affectedTools: ["zapier", "make", "n8n", "pipedrive"],
    affectedClusters: ["interactive tools", "automation OS"],
    sourceUrls: ["/free-tools/workflow-audit-generator/", "/free-tools/automation-roi-calculator-v2/"],
    publishedAt: "2026-05-29"
  },
  {
    title: "Automation tool decision pages added",
    slug: "automation-tool-decision-pages-added",
    type: "tool-change",
    summary:
      "New support pages compare and position Zapier, Make, n8n, Airtable, ClickUp, Asana, HubSpot, Pipedrive, Typeform, Calendly, Notion AI, and Airtable AI.",
    affectedTools: ["zapier", "make", "clickup", "asana", "hubspot", "pipedrive", "typeform", "calendly"],
    affectedClusters: ["automation comparisons", "tool watchlist"],
    sourceUrls: ["/automation-os/support/zapier-vs-make-vs-n8n-small-business/"],
    publishedAt: "2026-05-29"
  },
  {
    title: "Pipedrive use cases moved into the first authority cluster",
    slug: "pipedrive-use-cases-authority-cluster",
    type: "new-guide",
    summary:
      "The Pipedrive cluster now connects use cases, real estate fit, CRM implementation, alternatives, and follow-up workflows so readers can move from search intent to action.",
    affectedTools: ["pipedrive", "hubspot", "follow-up-boss"],
    affectedClusters: ["pipedrive", "sales CRM", "real estate AI"],
    sourceUrls: ["/topics/pipedrive-use-cases-for-small-business/"],
    publishedAt: "2026-05-27"
  },
  {
    title: "Real estate AI workflows are now a daily-use cluster",
    slug: "real-estate-ai-daily-workflows",
    type: "workflow-idea",
    summary:
      "Real estate pages now focus on lead capture, viewing notes, listing copy, follow-up, and brokerage review instead of broad tool-directory language.",
    affectedTools: ["pipedrive", "follow-up-boss", "canva", "matterport", "calendly", "typeform"],
    affectedClusters: ["real estate AI"],
    sourceUrls: ["/countries/us/real-estate-agents/", "/workflows/real-estate-lead-follow-up-workflow/"],
    publishedAt: "2026-05-27"
  },
  {
    title: "Automation hub retargeted around workplace handoffs",
    slug: "automation-hub-workplace-handoffs",
    type: "verification",
    summary:
      "The automation hub now prioritises sales follow-up, real estate routing, agency reporting, and consultant onboarding examples.",
    affectedTools: ["zapier", "make", "clickup", "asana", "airtable-ai"],
    affectedClusters: ["automation"],
    sourceUrls: ["/use-cases/automation/"],
    publishedAt: "2026-05-27"
  },
  {
    title: "Daily AI Workflow Brief v1",
    slug: "daily-ai-workflow-brief-v1",
    type: "daily-brief",
    summary:
      "The daily brief gives returning readers one workflow idea, one tool to check, one prompt, and one free tool action.",
    affectedTools: ["pipedrive", "zapier", "make", "canva"],
    affectedClusters: ["daily workflow", "automation", "real estate AI"],
    sourceUrls: ["/daily-ai-workflow-brief/"],
    publishedAt: "2026-05-27"
  },
  {
    title: "Priority tool watchlist created",
    slug: "priority-tool-watchlist-created",
    type: "price-watch",
    summary:
      "The watchlist highlights source-linked tools whose pricing, plan limits, features, and workflow fit should be rechecked before strong ranking claims.",
    affectedTools: ["pipedrive", "hubspot", "follow-up-boss", "zapier", "make", "calendly", "typeform", "canva", "matterport", "fathom"],
    affectedClusters: ["tool watchlist"],
    sourceUrls: ["/updates/"],
    publishedAt: "2026-05-27"
  }
];

export function latestUpdates(limit = updateItems.length) {
  return [...updateItems]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
