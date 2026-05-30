import type { SiteLink, StackBlueprint, StackLayer } from "@/types/content";

const crm = layer("CRM", "Keep records, owners, stages, and next actions visible.", ["pipedrive", "hubspot"], "Start with one pipeline and required owner/next-action fields.");
const automation = layer("Automation", "Move data between forms, calendars, CRM, and task tools.", ["zapier", "make"], "Automate the handoff only after the manual workflow works.");
const notes = layer("Meeting notes", "Capture calls and extract decisions, objections, and tasks.", ["fathom", "fireflies-ai"], "Keep transcript review with the meeting owner.");
const project = layer("Project management", "Turn decisions into tasks, owners, and deadlines.", ["clickup", "asana"], "Use one delivery board before adding complex automations.");
const docs = layer("Workspace docs", "Store prompts, SOPs, reports, and review notes.", ["notion-ai", "airtable-ai"], "Separate source facts from generated commentary.");
const content = layer("Content", "Draft copy, social assets, and campaign materials.", ["chatgpt", "claude", "jasper", "canva"], "Require human review for claims and client-facing copy.");
const ecommerce = layer("Ecommerce", "Run product launch, email, and support workflows.", ["shopify-magic", "klaviyo-ai", "gorgias"], "Keep stock, discount, and refund claims grounded in source data.");
const support = layer("Support", "Triage tickets, draft replies, and escalate risky cases.", ["zendesk-ai", "gorgias", "tidio", "intercom"], "Require approval for refunds, legal issues, and angry customers.");
const intake = layer("Intake", "Collect structured context before work starts.", ["typeform", "calendly"], "Ask only for fields needed by the next workflow.");
const seo = layer("Research and reporting", "Find content opportunities, monitor movement, and prepare refresh tasks.", ["semrush", "ahrefs", "airtable-ai"], "Keep search-intent notes attached to every update task.");

export const stackBlueprints: StackBlueprint[] = [
  blueprint("Lean sales follow-up stack", "lean-sales-follow-up-stack", "Small sales teams", "lean", "starter", "A simple stack for lead capture, CRM ownership, meeting notes, and same-day follow-up.", "Speed-to-lead and CRM hygiene", [crm, intake, automation, notes], ["speed-to-lead-form-to-crm", "sales-call-notes-to-pipedrive"], ["speed-to-lead-agent", "sales-call-follow-up-agent"], "lead-follow-up-sla-calculator"),
  blueprint("Balanced sales operations stack", "balanced-sales-operations-stack", "Growing revenue teams", "balanced", "growing", "A sales stack for routing leads, keeping CRM data clean, and turning calls into next actions.", "Lead routing, stale-deal cleanup, and weekly sales review", [crm, automation, notes, docs, project], ["missed-lead-recovery", "stale-deal-cleanup", "weekly-kpi-brief"], ["crm-hygiene-agent", "weekly-reporting-agent"], "workflow-audit-generator"),
  blueprint("Real estate agent AI stack", "real-estate-agent-ai-stack", "Independent real estate agents", "lean", "starter", "A practical stack for portal leads, viewing notes, listing copy, and client follow-up.", "Property lead response and viewing follow-up", [layer("Real estate CRM", "Route buyer and seller enquiries with property context.", ["follow-up-boss", "pipedrive"], "Choose the CRM your team will actually update daily."), intake, notes, content], ["portal-lead-to-agent-follow-up", "viewing-notes-to-buyer-email", "listing-facts-to-description"], ["real-estate-viewing-follow-up-agent", "listing-copy-review-agent"], "lead-follow-up-sla-calculator"),
  blueprint("Brokerage lead accountability stack", "brokerage-lead-accountability-stack", "Small brokerages", "balanced", "growing", "A stack for routing leads to agents, monitoring missed responses, and keeping property follow-up visible.", "Lead routing, agent accountability, and daily cleanup", [layer("Real estate CRM", "Assign leads and monitor agent response activity.", ["follow-up-boss", "pipedrive"], "Make response time a daily operating metric."), automation, notes, docs], ["follow-up-boss-daily-cleanup", "portal-lead-to-agent-follow-up"], ["speed-to-lead-agent", "crm-hygiene-agent"], "workflow-audit-generator"),
  blueprint("Consultant delivery stack", "consultant-delivery-stack", "Consultants and advisors", "lean", "starter", "A stack for discovery calls, proposals, onboarding, meeting notes, and client reports.", "Discovery-to-proposal and client onboarding", [notes, docs, project, intake, content], ["discovery-call-to-proposal", "client-onboarding-checklist", "meeting-transcript-to-tasks"], ["client-onboarding-agent", "meeting-to-task-agent"], "ai-proposal-generator"),
  blueprint("Agency campaign operations stack", "agency-campaign-operations-stack", "Marketing agencies", "balanced", "growing", "A stack for intake, campaign briefs, production tasks, reporting, and scope-change control.", "Campaign intake to delivery", [intake, seo, content, project, docs], ["campaign-brief-from-intake", "weekly-client-report", "scope-change-request-triage"], ["campaign-brief-agent", "weekly-reporting-agent"], "workflow-kit-planner"),
  blueprint("Ecommerce product launch stack", "ecommerce-product-launch-stack", "Online store owners", "balanced", "growing", "A stack for product copy, lifecycle email, launch assets, support macros, and review checks.", "Product launch planning", [ecommerce, content, support, automation, project], ["product-launch-checklist", "abandoned-cart-support-handoff"], ["product-launch-agent", "support-triage-agent"], "automation-roi-calculator-v2"),
  blueprint("Ecommerce support recovery stack", "ecommerce-support-recovery-stack", "Ecommerce support teams", "balanced", "growing", "A stack for ticket triage, refund review, VIP alerts, and FAQ updates.", "Support triage and recovery", [support, ecommerce, docs, automation], ["support-ticket-triage", "refund-request-review", "vip-customer-alert"], ["support-triage-agent", "refund-review-agent"], "workflow-audit-generator"),
  blueprint("Finance admin automation stack", "finance-admin-automation-stack", "Finance and admin teams", "lean", "starter", "A stack for invoice follow-up, document intake, weekly KPI briefs, and policy update tracking.", "Admin follow-up and document control", [intake, docs, automation, project], ["invoice-follow-up", "expense-receipt-intake", "weekly-kpi-brief"], ["invoice-follow-up-agent", "document-intake-agent"], "automation-roi-calculator-v2"),
  blueprint("Recruiting screening support stack", "recruiting-screening-support-stack", "Recruiters and hiring teams", "lean", "starter", "A stack for role intake, scorecards, evidence notes, and human-reviewed candidate screening support.", "Hiring intake and candidate review", [docs, intake, automation, project], ["hiring-intake-to-scorecard", "candidate-screen-review"], ["candidate-screening-support-agent"], "workflow-audit-generator"),
  blueprint("Local service quote follow-up stack", "local-service-quote-follow-up-stack", "Trades and local service teams", "lean", "starter", "A simple stack for quote follow-up, booking requests, reviews, complaints, and maintenance reminders.", "Quote and booking follow-up", [crm, intake, automation, project], ["quote-follow-up", "booking-request-routing", "job-completion-review"], ["quote-follow-up-agent", "complaint-recovery-agent"], "lead-follow-up-sla-calculator"),
  blueprint("Content refresh operations stack", "content-refresh-operations-stack", "Content and SEO teams", "balanced", "growing", "A stack for search data, content refresh queues, update notes, and internal-link tasks.", "Search-led content refresh", [seo, docs, project, automation], ["policy-document-update-watch", "weekly-kpi-brief"], ["content-refresh-agent", "weekly-reporting-agent"], "workflow-recipe-finder")
];

export function getStackBlueprint(slug: string) {
  return stackBlueprints.find((blueprintItem) => blueprintItem.slug === slug);
}

export function stackBlueprintLinks(slugs: string[]): SiteLink[] {
  return slugs
    .map(getStackBlueprint)
    .filter(Boolean)
    .map((blueprintItem) => ({
      title: blueprintItem!.title,
      href: `/stack-blueprints/${blueprintItem!.slug}/`,
      description: blueprintItem!.summary
    }));
}

function blueprint(
  title: string,
  slug: string,
  audience: string,
  budgetTier: StackBlueprint["budgetTier"],
  maturityLevel: StackBlueprint["maturityLevel"],
  summary: string,
  primaryWorkflow: string,
  layers: StackLayer[],
  relatedWorkflowRecipeSlugs: string[],
  relatedAgentPlaybookSlugs: string[],
  relatedFreeToolSlug: string
): StackBlueprint {
  return {
    title,
    slug,
    audience,
    budgetTier,
    maturityLevel,
    summary,
    primaryWorkflow,
    stackLayers: layers,
    rolloutSteps: [
      "Pick the primary workflow and owner before buying tools.",
      "Connect only the required stack layers for the first workflow.",
      "Run the workflow manually once and record failure points.",
      "Automate the highest-friction handoff.",
      "Review usage, cost, and output quality after two weeks."
    ],
    riskNotes: [
      "Do not add a tool without a named daily or weekly use case.",
      "Keep customer-facing and sensitive outputs under human review.",
      "Check pricing, plan limits, and data handling before annual contracts."
    ],
    upgradeTriggers: [
      "The team runs the workflow more than 20 times per month.",
      "Manual handoffs are causing missed follow-up or duplicate records.",
      "Reporting requires more visibility than the current stack provides."
    ],
    relatedWorkflowRecipeSlugs,
    relatedAgentPlaybookSlugs,
    relatedFreeToolSlug
  };
}

function layer(name: string, purpose: string, toolSlugs: string[], setupNote: string): StackLayer {
  return { name, purpose, toolSlugs, setupNote };
}
