import type { AutomationCluster, AutomationTemplate, SiteLink } from "@/types/content";

export type AutomationSupportPage = {
  title: string;
  slug: string;
  kind: "comparison" | "alternative";
  summary: string;
  tools: string[];
  bestFor: string[];
  tradeoffs: string[];
  relatedTemplateSlugs: string[];
  relatedFreeToolSlug: string;
};

export type AutomationProfessionPage = {
  title: string;
  slug: string;
  audience: string;
  summary: string;
  painPoints: string[];
  recommendedTemplates: string[];
  toolSlugs: string[];
  dailyHabit: string;
};

export type AutomationCleanupPage = {
  title: string;
  slug: string;
  symptom: string;
  summary: string;
  diagnosisSteps: string[];
  repairSteps: string[];
  relatedTemplateSlugs: string[];
  relatedFreeToolSlug: string;
};

const defaultAutomationTools = ["zapier", "make", "pipedrive"];

export const automationTemplates: AutomationTemplate[] = [
  template("Speed-to-lead AI qualifier", "speed-to-lead-ai-qualifier", "A new lead form, portal enquiry, or booked call arrives.", ["Lead source", "Contact details", "Need or property interest", "Urgency", "Consent context"], ["Create or update the CRM record.", "Classify intent and urgency.", "Assign an owner and response deadline.", "Draft a first response for human review.", "Log the outcome and next action."], ["Pipedrive", "HubSpot", "Zapier", "Make", "Typeform"], "high", "Review the response before sending if it includes pricing, property, legal, or availability claims.", ["Lead source is missing", "Duplicate CRM records", "AI invents lead intent", "Owner is not assigned"], ["pipedrive", "hubspot", "zapier", "make", "typeform"], "lead-follow-up-sla-calculator", "Check hot leads twice daily and clear anything close to the SLA limit."),
  template("CRM hygiene weekly reset", "crm-hygiene-weekly-reset", "A weekly CRM review starts or a pipeline has stale deals.", ["Deal stage", "Last activity date", "Owner", "Lead source", "Next action"], ["Find records with no recent activity.", "Group by owner and stage.", "Suggest close, follow-up, or update actions.", "Assign cleanup tasks.", "Review source quality and stage bottlenecks."], ["Pipedrive", "HubSpot", "Airtable AI", "Zapier"], "medium", "Sales owner approves close-lost or stage changes before records are updated.", ["Closed deals stay open", "No owner accepts cleanup", "Reports hide duplicates"], ["pipedrive", "hubspot", "airtable-ai", "zapier"], "workflow-audit-generator", "Run every Friday before pipeline reporting."),
  template("Meeting notes to project tasks", "meeting-notes-to-project-tasks", "A client, sales, or delivery meeting ends.", ["Transcript", "Attendees", "Project", "Decisions", "Deadlines"], ["Summarise decisions and open questions.", "Extract action items with owners.", "Create tasks in the project system.", "Flag missing evidence or unclear ownership.", "Send a reviewed recap."], ["Fathom", "Fireflies.ai", "ClickUp", "Asana", "Zapier"], "medium", "Meeting owner checks transcript accuracy and task ownership before sharing.", ["Transcript has errors", "Tasks have no owner", "Private comments leak into recap"], ["fathom", "fireflies-ai", "clickup", "asana", "zapier"], "workflow-audit-generator", "Use after every recurring client or delivery meeting."),
  template("Client onboarding kickoff", "client-onboarding-kickoff", "A proposal is accepted or a kickoff form is submitted.", ["Client details", "Scope", "Access needs", "Success criteria", "Timeline"], ["Create client folder and project.", "Generate kickoff agenda.", "Create access request checklist.", "Assign first-week tasks.", "Send reviewed welcome email."], ["Typeform", "ClickUp", "Asana", "Notion AI", "Zapier"], "medium", "Delivery owner confirms scope and access requests before client email is sent.", ["Wrong template used", "Access request is incomplete", "Timeline conflicts with scope"], ["typeform", "clickup", "asana", "notion-ai", "zapier"], "workflow-kit-planner", "Use for every new client before the kickoff call."),
  template("Support triage and reply draft", "support-triage-reply-draft", "A customer support message arrives.", ["Message", "Customer tier", "Order or account ID", "Sentiment", "Issue type"], ["Classify urgency and category.", "Find matching help content or policy.", "Draft a response.", "Route high-risk issues to a human.", "Log resolution status."], ["Zendesk AI", "Gorgias", "Tidio", "Zapier", "Make"], "high", "Human review is required for refunds, legal issues, account access, and angry customers.", ["Wrong order matched", "Refund promise invented", "Urgent issue misclassified"], ["zendesk-ai", "gorgias", "tidio", "zapier", "make"], "workflow-audit-generator", "Review high-priority tickets at the start and end of each day."),
  template("Invoice follow-up reminder", "invoice-follow-up-reminder", "An invoice becomes due or overdue.", ["Invoice number", "Customer", "Due date", "Amount", "Payment status"], ["Check payment status.", "Create a reminder task.", "Draft polite follow-up copy.", "Escalate long-overdue invoices.", "Log payment outcome."], ["QuickBooks", "Xero", "HubSpot", "Zapier", "Make"], "medium", "Finance owner approves payment wording and escalation before sending.", ["Payment already made", "Wrong contact selected", "Tone is too aggressive"], defaultAutomationTools, "automation-roi-calculator-v2", "Check overdue invoices every morning."),
  template("Review request after job completion", "review-request-after-job-completion", "A project, property viewing, job, or support case is completed.", ["Customer name", "Work completed", "Completion date", "Review platform", "Owner"], ["Confirm the work is complete.", "Draft a short review request.", "Schedule one reminder only.", "Log response status.", "Flag unhappy customers for human follow-up."], ["HubSpot", "Pipedrive", "Calendly", "Zapier", "Make"], "medium", "Do not send review requests to customers with unresolved complaints.", ["Unhappy customer asked for review", "Duplicate reminders", "Wrong review link"], ["hubspot", "pipedrive", "calendly", "zapier", "make"], "lead-follow-up-sla-calculator", "Send requests daily for work completed yesterday."),
  template("Weekly KPI reporting brief", "weekly-kpi-reporting-brief", "Weekly reporting window opens.", ["Metrics", "Goal", "Campaign or pipeline context", "Previous period", "Owner notes"], ["Collect source metrics.", "Calculate deltas.", "Draft plain-English commentary.", "Flag missing or suspicious data.", "Create next-week action list."], ["Airtable AI", "Notion AI", "ClickUp", "Asana", "Zapier"], "medium", "Report owner verifies numbers and source definitions before sharing.", ["Wrong date range", "AI invents causes", "Missing data hidden"], ["airtable-ai", "notion-ai", "clickup", "asana", "zapier"], "workflow-audit-generator", "Use every Monday before team planning."),
  template("Real estate lead routing", "real-estate-lead-routing", "A buyer or seller enquiry arrives from a portal, form, or referral.", ["Lead source", "Property", "Buyer or seller intent", "Location", "Timeline"], ["Create CRM record.", "Assign agent or team.", "Draft acknowledgement.", "Create viewing or qualification task.", "Review missed responses."], ["Follow Up Boss", "Pipedrive", "Calendly", "Typeform", "Zapier"], "high", "Agent checks property facts and fair-housing-sensitive wording before sending.", ["No agent assigned", "Property facts invented", "Lead goes cold"], ["follow-up-boss", "pipedrive", "calendly", "typeform", "zapier"], "lead-follow-up-sla-calculator", "Check new leads at least twice per day."),
  template("Marketing campaign brief builder", "marketing-campaign-brief-builder", "A campaign request or client intake form is submitted.", ["Audience", "Offer", "Channels", "Budget", "Constraints"], ["Summarise intake.", "Create campaign angle options.", "Generate production tasks.", "Route approvals.", "Log final brief."], ["Semrush", "Jasper", "Copy.ai", "ClickUp", "Typeform"], "medium", "Strategist reviews claims, audience insight, and deliverables before production begins.", ["Weak research becomes polished copy", "No approval owner", "Client constraints ignored"], ["semrush", "jasper", "copy-ai", "clickup", "typeform"], "workflow-kit-planner", "Use before every new campaign kickoff."),
  template("Ecommerce product launch automation", "ecommerce-product-launch-automation", "A new product is ready for launch planning.", ["Product facts", "Launch date", "Offer", "Email list", "Support notes"], ["Draft product page copy.", "Create email tasks.", "Prepare support macros.", "Schedule launch checks.", "Review claims and stock status."], ["Shopify Magic", "Klaviyo AI", "Canva", "Gorgias", "Zapier"], "high", "Human review verifies product claims, stock, discounts, and consumer wording.", ["Invented product claims", "Wrong discount", "Support not prepared"], ["shopify-magic", "klaviyo-ai", "canva", "gorgias", "zapier"], "automation-roi-calculator-v2", "Use for every launch and seasonal promo."),
  template("Recruiting candidate screening handoff", "recruiting-candidate-screening-handoff", "A candidate applies or is sourced.", ["Role", "CV", "Screening criteria", "Location", "Hiring stage"], ["Extract role-relevant evidence.", "Draft screening notes.", "Flag missing information.", "Create next-stage task.", "Prepare candidate communication."], ["ChatGPT", "Claude", "Airtable AI", "Zapier"], "high", "Recruiter reviews fairness, evidence, and hiring criteria before any decision.", ["Bias in summary", "Unsupported rejection reason", "Candidate data mishandled"], ["chatgpt", "claude", "airtable-ai", "zapier"], "workflow-audit-generator", "Use when reviewing batches of new candidates."),
  template("Accounting document intake", "accounting-document-intake", "A client uploads receipts, statements, or tax documents.", ["Client", "Document type", "Period", "Missing items", "Deadline"], ["Classify documents.", "Create missing-item list.", "Route to the right folder.", "Draft client follow-up.", "Log completion status."], ["Typeform", "Airtable AI", "Notion AI", "Zapier"], "high", "Accountant verifies document classification and client wording before sending.", ["Sensitive document exposed", "Wrong period tagged", "Client asked for irrelevant files"], ["typeform", "airtable-ai", "notion-ai", "zapier"], "workflow-audit-generator", "Check missing documents every workday during deadline season."),
  template("Trade job estimate follow-up", "trade-job-estimate-follow-up", "A quote or estimate is sent to a customer.", ["Customer", "Trade", "Job type", "Estimate sent date", "Follow-up date"], ["Create follow-up reminder.", "Draft polite check-in.", "Log customer response.", "Convert accepted estimate to job.", "Archive dead enquiries."], ["Pipedrive", "HubSpot", "Calendly", "Zapier"], "medium", "Business owner verifies price, availability, and scope before sending.", ["Old price quoted", "Wrong customer", "Scope changed without review"], ["pipedrive", "hubspot", "calendly", "zapier"], "lead-follow-up-sla-calculator", "Review estimates due for follow-up each morning."),
  template("Content refresh queue", "content-refresh-queue", "Search Console or content audit shows pages needing refresh.", ["Page URL", "Query", "Position", "CTR", "Last updated"], ["Group pages by cluster.", "Assign refresh reason.", "Create update task.", "Add internal-link checks.", "Log completed changes."], ["Search Console", "Airtable AI", "Notion AI", "ClickUp", "Zapier"], "low", "Editor verifies search intent and source freshness before republishing.", ["Refreshing the wrong intent", "Adding thin content", "Forgetting internal links"], ["airtable-ai", "notion-ai", "clickup", "zapier"], "workflow-audit-generator", "Use after every weekly GSC export."),
  template("AI tool watchlist refresh", "ai-tool-watchlist-refresh", "A priority tool needs pricing, feature, or evidence re-checking.", ["Tool", "Pricing URL", "Feature URL", "Last checked", "Cluster"], ["Check source pages.", "Update watchlist notes.", "Flag material changes.", "Create affected-page tasks.", "Add update-log entry."], ["Airtable AI", "Notion AI", "ClickUp", "Zapier"], "medium", "Editor confirms source URLs and avoids unsupported vendor claims.", ["Pricing copied incorrectly", "Feature change affects old verdicts", "No affected pages updated"], ["airtable-ai", "notion-ai", "clickup", "zapier"], "workflow-audit-generator", "Refresh priority tools weekly until rankings stabilize.")
];

export const automationSupportPages: AutomationSupportPage[] = [
  support("Zapier vs Make vs n8n for small business", "zapier-vs-make-vs-n8n-small-business", "comparison", "Choose between simple app automation, visual scenario building, and self-hostable workflow orchestration.", ["Zapier", "Make", "n8n"], ["Simple client handoffs", "Visual branching", "Technical control"], ["Zapier is easiest to start", "Make gives more visual control", "n8n needs more technical ownership"], ["speed-to-lead-ai-qualifier", "support-triage-reply-draft"], "zapier-make-n8n-picker"),
  support("Zapier alternatives for AI workflows", "zapier-alternatives-ai-workflows", "alternative", "When Zapier is too expensive, too simple, or too constrained for AI-heavy workflows.", ["Make", "n8n", "Airtable AI", "ClickUp"], ["Cost control", "Complex workflows", "Data operations"], ["Switching adds migration cost", "Complex builders need owners", "AI steps need extra review"], ["weekly-kpi-reporting-brief"], "workflow-audit-generator"),
  support("Make alternatives for operations teams", "make-alternatives-operations-teams", "alternative", "Alternatives when Make scenarios become too complex or hard for non-technical teams to maintain.", ["Zapier", "n8n", "ClickUp", "Asana"], ["Team-friendly automation", "Project handoffs", "Run monitoring"], ["Simpler tools may cost more", "Native project automation may be narrower"], ["meeting-notes-to-project-tasks"], "workflow-audit-generator"),
  support("Airtable vs ClickUp for automation", "airtable-vs-clickup-automation", "comparison", "Compare database-led workflow tracking with project-management-led automation.", ["Airtable AI", "ClickUp"], ["Structured records", "Task ownership", "Reporting"], ["Airtable fits data-heavy workflows", "ClickUp fits delivery workflows", "Both need governance"], ["weekly-kpi-reporting-brief", "content-refresh-queue"], "workflow-audit-generator"),
  support("Asana vs ClickUp automation", "asana-vs-clickup-automation", "comparison", "Compare two project tools for intake, status handoffs, recurring tasks, and AI summaries.", ["Asana", "ClickUp"], ["Project delivery", "Status reporting", "Team adoption"], ["ClickUp can be denser", "Asana is cleaner for simpler teams", "AI summaries need structured tasks"], ["meeting-notes-to-project-tasks"], "workflow-audit-generator"),
  support("HubSpot vs Pipedrive automation", "hubspot-vs-pipedrive-automation", "comparison", "Compare broader customer-platform automation with focused sales pipeline automation.", ["HubSpot", "Pipedrive"], ["Sales follow-up", "Marketing handoff", "CRM hygiene"], ["HubSpot has broader surface area", "Pipedrive is easier for sales adoption", "Both need clean CRM rules"], ["crm-hygiene-weekly-reset", "speed-to-lead-ai-qualifier"], "lead-follow-up-sla-calculator"),
  support("Typeform vs Calendly for intake automation", "typeform-vs-calendly-intake-automation", "comparison", "Decide whether the workflow starts with a form, booking link, or both.", ["Typeform", "Calendly"], ["Lead intake", "Qualification", "Booking"], ["Forms collect context", "Booking reduces back-and-forth", "Both need CRM handoff"], ["client-onboarding-kickoff", "real-estate-lead-routing"], "workflow-audit-generator"),
  support("Pipedrive automation alternatives", "pipedrive-automation-alternatives", "alternative", "Tools to compare when Pipedrive automation is not enough for routing, marketing, or operations handoffs.", ["HubSpot", "Zapier", "Make", "Follow Up Boss"], ["CRM routing", "Marketing workflows", "Real estate teams"], ["Alternatives can add complexity", "Native CRM automation is easier to govern"], ["crm-hygiene-weekly-reset", "real-estate-lead-routing"], "zapier-make-n8n-picker"),
  support("Follow Up Boss vs Pipedrive automation", "follow-up-boss-vs-pipedrive-automation", "comparison", "Compare real-estate-specific lead automation with general CRM pipeline automation.", ["Follow Up Boss", "Pipedrive"], ["Real estate routing", "Small sales teams", "Brokerage accountability"], ["Specialist CRM fits agents", "Pipedrive fits broader sales", "Both need response-time rules"], ["real-estate-lead-routing"], "lead-follow-up-sla-calculator"),
  support("Notion AI vs Airtable AI for workflow docs", "notion-ai-vs-airtable-ai-workflow-docs", "comparison", "Compare document-first and database-first AI support for operating workflows.", ["Notion AI", "Airtable AI"], ["Knowledge bases", "Structured records", "Reporting notes"], ["Notion fits narrative docs", "Airtable fits structured workflow queues", "Both require source discipline"], ["content-refresh-queue", "weekly-kpi-reporting-brief"], "workflow-audit-generator")
];

export const automationProfessionPages: AutomationProfessionPage[] = [
  profession("Real estate automation OS", "real-estate-automation-os", "Agents and brokerages", "Lead routing, listing marketing, viewing notes, and follow-up workflows for real estate teams.", ["Slow lead response", "Scattered viewing notes", "Listing copy review"], ["real-estate-lead-routing", "review-request-after-job-completion", "meeting-notes-to-project-tasks"], ["pipedrive", "follow-up-boss", "canva", "matterport"], "Check new leads and overdue follow-ups every morning."),
  profession("Consultant automation OS", "consultant-automation-os", "Consultants and advisory firms", "Automate intake, notes, reports, proposals, and implementation handoffs without losing evidence.", ["Client notes scattered", "Reports lack traceability", "Onboarding stalls"], ["client-onboarding-kickoff", "meeting-notes-to-project-tasks", "weekly-kpi-reporting-brief"], ["chatgpt", "claude", "fathom", "notion-ai"], "Turn every meeting into tasks and open questions before the next call."),
  profession("Agency automation OS", "agency-automation-os", "Marketing agencies", "Campaign brief, reporting, client onboarding, and production task workflows.", ["Briefs are inconsistent", "Approvals are unclear", "Reports take too long"], ["marketing-campaign-brief-builder", "weekly-kpi-reporting-brief", "client-onboarding-kickoff"], ["semrush", "jasper", "clickup", "typeform"], "Review campaign blockers and reporting inputs every Monday."),
  profession("Sales team automation OS", "sales-team-automation-os", "Sales teams", "Speed-to-lead, CRM hygiene, call notes, follow-up, and weekly pipeline review.", ["Leads go cold", "CRM tasks are stale", "Calls are not logged"], ["speed-to-lead-ai-qualifier", "crm-hygiene-weekly-reset", "meeting-notes-to-project-tasks"], ["pipedrive", "hubspot", "fathom", "zapier"], "Clear overdue next activities before starting new outreach."),
  profession("Trades automation OS", "trades-automation-os", "Tradespeople and small service teams", "Estimate follow-up, review requests, job notes, and invoice reminder workflows.", ["Quotes are not followed up", "Reviews are missed", "Invoices go overdue"], ["trade-job-estimate-follow-up", "review-request-after-job-completion", "invoice-follow-up-reminder"], ["pipedrive", "hubspot", "calendly", "zapier"], "Check estimates and unpaid invoices at the start of each day."),
  profession("Ecommerce automation OS", "ecommerce-automation-os", "Online store owners", "Product launches, support triage, campaign briefs, reporting, and review request workflows.", ["Launch tasks scatter", "Support is reactive", "Product claims need review"], ["ecommerce-product-launch-automation", "support-triage-reply-draft", "weekly-kpi-reporting-brief"], ["shopify-magic", "klaviyo-ai", "gorgias", "canva"], "Review launch blockers, support spikes, and product claims daily during campaigns."),
  profession("Accountant automation OS", "accountant-automation-os", "Accountants and bookkeepers", "Document intake, missing-item follow-up, client reminders, and weekly workload reporting.", ["Documents arrive late", "Sensitive files need control", "Client follow-up repeats"], ["accounting-document-intake", "invoice-follow-up-reminder", "weekly-kpi-reporting-brief"], ["typeform", "airtable-ai", "notion-ai", "zapier"], "Review missing documents every workday during deadline season."),
  profession("Recruiter automation OS", "recruiter-automation-os", "Recruiters and hiring teams", "Candidate screening, interview notes, status updates, and client reporting workflows.", ["Candidate notes are inconsistent", "Follow-up is slow", "Fairness review is unclear"], ["recruiting-candidate-screening-handoff", "meeting-notes-to-project-tasks", "weekly-kpi-reporting-brief"], ["chatgpt", "claude", "airtable-ai", "zapier"], "Review new candidates in batches with evidence-based notes.")
];

export const automationCleanupPages: AutomationCleanupPage[] = [
  cleanup("Broken Zapier workflow audit", "broken-zapier-workflow-audit", "A Zap runs inconsistently, fails silently, or creates bad records.", "Diagnose broken Zapier workflows by checking triggers, filters, field mapping, ownership, and review rules.", ["Find recent failed runs", "Check trigger data", "Compare mapped fields", "Review owner and alert rules"], ["Pause risky automations", "Fix required fields", "Add failure alerts", "Retest with safe sample data"], ["speed-to-lead-ai-qualifier", "crm-hygiene-weekly-reset"], "workflow-audit-generator"),
  cleanup("Zapier sprawl cleanup", "zapier-sprawl-cleanup", "The team has too many zaps and nobody knows which workflows matter.", "Consolidate duplicated automations, assign owners, and keep only workflows tied to measurable outcomes.", ["Export active automations", "Group by business process", "Find duplicates", "Score by usage and risk"], ["Archive unused zaps", "Assign owners", "Create naming rules", "Document review cadence"], ["weekly-kpi-reporting-brief", "ai-tool-watchlist-refresh"], "workflow-audit-generator"),
  cleanup("Failed AI workflow repair", "failed-ai-workflow-repair", "AI output is inaccurate, inconsistent, or creating more review work than it saves.", "Repair AI workflows by improving inputs, constraints, review gates, and failure handling.", ["Inspect examples", "Find missing context", "Check prompt constraints", "Identify high-risk outputs"], ["Add structured inputs", "Tighten review steps", "Route risky cases to humans", "Measure rework"], ["support-triage-reply-draft", "meeting-notes-to-project-tasks"], "automation-roi-calculator-v2"),
  cleanup("CRM automation cleanup", "crm-automation-cleanup", "CRM automations create duplicates, stale tasks, or confusing ownership.", "Clean CRM automation by tightening triggers, duplicate rules, activity ownership, and reporting checks.", ["Review duplicate records", "Check task rules", "Find stale deals", "Audit owner fields"], ["Merge duplicates", "Simplify stages", "Create stale-record report", "Add weekly hygiene task"], ["crm-hygiene-weekly-reset", "speed-to-lead-ai-qualifier"], "lead-follow-up-sla-calculator"),
  cleanup("AI workflow audit for small business", "ai-workflow-audit-small-business", "The business uses several AI tools but cannot prove they save time.", "Audit AI workflows by mapping triggers, outputs, review time, risk, cost, and daily usefulness.", ["List active AI workflows", "Estimate time saved", "Estimate review overhead", "Check risk level"], ["Keep valuable workflows", "Fix brittle workflows", "Delete vanity automations", "Track weekly outcomes"], ["weekly-kpi-reporting-brief", "content-refresh-queue"], "automation-roi-calculator-v2"),
  cleanup("Tool stack consolidation", "tool-stack-consolidation", "The team has overlapping tools and subscription creep.", "Consolidate tools by system of record, workflow owner, frequency of use, and replacement risk.", ["List subscriptions", "Map workflows", "Find overlap", "Check contract dates"], ["Keep systems of record", "Remove duplicates", "Plan migration", "Add watchlist checks"], ["ai-tool-watchlist-refresh", "weekly-kpi-reporting-brief"], "zapier-make-n8n-picker")
];

export const automationClusters: AutomationCluster[] = [
  cluster("lead-follow-up", "Sales and real estate teams", "Leads go cold because routing, ownership, and response deadlines are unclear.", ["speed-to-lead-ai-qualifier", "real-estate-lead-routing", "crm-hygiene-weekly-reset"], ["hubspot-vs-pipedrive-automation", "follow-up-boss-vs-pipedrive-automation"], ["pipedrive", "hubspot", "follow-up-boss"], ["chatgpt-prompts-for-sales-teams"], ["lead-follow-up-sla-calculator", "zapier-make-n8n-picker"]),
  cluster("client-delivery", "Consultants and agencies", "Client intake, meeting notes, approvals, and reporting do not become owned tasks.", ["client-onboarding-kickoff", "meeting-notes-to-project-tasks", "marketing-campaign-brief-builder"], ["asana-vs-clickup-automation", "typeform-vs-calendly-intake-automation"], ["clickup", "asana", "typeform", "fathom"], ["chatgpt-prompts-for-consultants"], ["workflow-audit-generator", "automation-roi-calculator-v2"]),
  cluster("support-ops", "Support and ecommerce teams", "Messages, product claims, and escalation rules scatter across inboxes and helpdesks.", ["support-triage-reply-draft", "ecommerce-product-launch-automation", "review-request-after-job-completion"], ["zapier-vs-make-vs-n8n-small-business"], ["zendesk-ai", "gorgias", "tidio", "shopify-magic"], ["chatgpt-prompts-for-ecommerce-support"], ["workflow-audit-generator"]),
  cluster("admin-finance", "Service businesses and accounting teams", "Invoices, documents, and missing information need repeatable reminders without risky claims.", ["invoice-follow-up-reminder", "accounting-document-intake", "trade-job-estimate-follow-up"], ["notion-ai-vs-airtable-ai-workflow-docs"], ["typeform", "airtable-ai", "notion-ai", "zapier"], ["chatgpt-prompts-for-accountants"], ["automation-roi-calculator-v2"])
];

export function getAutomationTemplate(slug: string) {
  return automationTemplates.find((template) => template.slug === slug);
}

export function getAutomationSupportPage(slug: string) {
  return automationSupportPages.find((page) => page.slug === slug);
}

export function getAutomationProfessionPage(slug: string) {
  return automationProfessionPages.find((page) => page.slug === slug);
}

export function getAutomationCleanupPage(slug: string) {
  return automationCleanupPages.find((page) => page.slug === slug);
}

export function automationTemplateLinks(slugs: string[]): SiteLink[] {
  return slugs
    .map(getAutomationTemplate)
    .filter(Boolean)
    .map((template) => ({
      title: template!.title,
      href: `/automation-os/templates/${template!.slug}/`,
      description: template!.trigger
    }));
}

function template(
  title: string,
  slug: string,
  trigger: string,
  inputs: string[],
  steps: string[],
  tools: string[],
  riskLevel: AutomationTemplate["riskLevel"],
  reviewStep: string,
  failureModes: string[],
  relatedToolSlugs: string[],
  relatedFreeToolSlug: string,
  dailyUseCase: string
): AutomationTemplate {
  return { title, slug, trigger, inputs, steps, tools, riskLevel, reviewStep, failureModes, relatedToolSlugs, relatedFreeToolSlug, dailyUseCase };
}

function support(
  title: string,
  slug: string,
  kind: AutomationSupportPage["kind"],
  summary: string,
  tools: string[],
  bestFor: string[],
  tradeoffs: string[],
  relatedTemplateSlugs: string[],
  relatedFreeToolSlug: string
): AutomationSupportPage {
  return { title, slug, kind, summary, tools, bestFor, tradeoffs, relatedTemplateSlugs, relatedFreeToolSlug };
}

function profession(
  title: string,
  slug: string,
  audience: string,
  summary: string,
  painPoints: string[],
  recommendedTemplates: string[],
  toolSlugs: string[],
  dailyHabit: string
): AutomationProfessionPage {
  return { title, slug, audience, summary, painPoints, recommendedTemplates, toolSlugs, dailyHabit };
}

function cleanup(
  title: string,
  slug: string,
  symptom: string,
  summary: string,
  diagnosisSteps: string[],
  repairSteps: string[],
  relatedTemplateSlugs: string[],
  relatedFreeToolSlug: string
): AutomationCleanupPage {
  return { title, slug, symptom, summary, diagnosisSteps, repairSteps, relatedTemplateSlugs, relatedFreeToolSlug };
}

function cluster(
  slug: string,
  audience: string,
  primaryPain: string,
  templateSlugs: string[],
  comparisonSlugs: string[],
  toolSlugs: string[],
  promptSlugs: string[],
  freeToolSlugs: string[]
): AutomationCluster {
  return { slug, audience, primaryPain, templateSlugs, comparisonSlugs, toolSlugs, promptSlugs, freeToolSlugs };
}
