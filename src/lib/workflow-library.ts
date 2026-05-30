import type { SiteLink, WorkflowCollection, WorkflowRecipe } from "@/types/content";

export type WorkflowChecklist = {
  title: string;
  slug: string;
  audience: string;
  summary: string;
  checklistType: "readiness" | "qa" | "privacy" | "migration";
  steps: string[];
  reviewQuestions: string[];
  relatedRecipeSlugs: string[];
  relatedFreeToolSlug: string;
};

type RecipeInput = {
  title: string;
  slug: string;
  group: string;
  audience: string;
  professionSlug: string;
  workflowType: string;
  summary: string;
  trigger: string;
  outcome: string;
  tools: string[];
  relatedToolSlugs: string[];
  templateSlug: string;
  freeToolSlug: string;
  setupTime?: string;
  difficulty?: WorkflowRecipe["difficulty"];
  riskLevel?: WorkflowRecipe["riskLevel"];
};

export const workflowRecipes: WorkflowRecipe[] = [
  recipe({ title: "Speed-to-lead form to CRM", slug: "speed-to-lead-form-to-crm", group: "Sales/CRM", audience: "Small sales teams", professionSlug: "sales-teams", workflowType: "lead follow-up", summary: "Capture a new form lead, create the CRM record, assign an owner, and start a same-day follow-up loop.", trigger: "A website, Typeform, or landing-page lead form is submitted.", outcome: "Every qualified lead has a CRM record, owner, deadline, and reviewed response draft.", tools: ["Typeform", "Zapier", "Pipedrive", "HubSpot"], relatedToolSlugs: ["typeform", "zapier", "pipedrive", "hubspot"], templateSlug: "speed-to-lead-ai-qualifier", freeToolSlug: "lead-follow-up-sla-calculator", riskLevel: "high" }),
  recipe({ title: "Missed-lead recovery", slug: "missed-lead-recovery", group: "Sales/CRM", audience: "Sales managers", professionSlug: "sales-teams", workflowType: "CRM cleanup", summary: "Find leads with no activity, route them back to an owner, and create a recovery message without spamming cold records.", trigger: "A daily CRM report finds leads with no next activity or overdue first response.", outcome: "Missed leads are triaged into recover, close, or nurture queues.", tools: ["Pipedrive", "HubSpot", "Zapier"], relatedToolSlugs: ["pipedrive", "hubspot", "zapier"], templateSlug: "crm-hygiene-weekly-reset", freeToolSlug: "workflow-audit-generator", difficulty: "medium" }),
  recipe({ title: "Sales call notes to Pipedrive", slug: "sales-call-notes-to-pipedrive", group: "Sales/CRM", audience: "Revenue teams", professionSlug: "sales-teams", workflowType: "meeting notes", summary: "Turn call transcripts into deal notes, objections, next activities, and follow-up drafts inside Pipedrive.", trigger: "A sales call recording or meeting note is completed.", outcome: "The CRM has the buying signal, objection, next step, owner, and reviewed follow-up copy.", tools: ["Fathom", "Fireflies.ai", "Pipedrive", "Zapier"], relatedToolSlugs: ["fathom", "fireflies-ai", "pipedrive", "zapier"], templateSlug: "meeting-notes-to-project-tasks", freeToolSlug: "workflow-recipe-finder", riskLevel: "medium" }),
  recipe({ title: "Stale-deal cleanup", slug: "stale-deal-cleanup", group: "Sales/CRM", audience: "Sales operators", professionSlug: "sales-teams", workflowType: "CRM cleanup", summary: "Create a weekly stale-deal review that keeps the pipeline honest before reports are shared.", trigger: "A deal has no recent activity or no clear next action.", outcome: "Stale deals get a follow-up task, stage update, or close-lost review.", tools: ["Pipedrive", "HubSpot", "Airtable AI"], relatedToolSlugs: ["pipedrive", "hubspot", "airtable-ai"], templateSlug: "crm-hygiene-weekly-reset", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Inbound demo qualification", slug: "inbound-demo-qualification", group: "Sales/CRM", audience: "B2B sales teams", professionSlug: "sales-teams", workflowType: "lead qualification", summary: "Qualify booked demos before the call by combining form answers, CRM data, and a prep note.", trigger: "A prospect books a demo call.", outcome: "The sales owner gets a short qualification brief and risk flags before the meeting.", tools: ["Calendly", "HubSpot", "Pipedrive", "Zapier"], relatedToolSlugs: ["calendly", "hubspot", "pipedrive", "zapier"], templateSlug: "speed-to-lead-ai-qualifier", freeToolSlug: "workflow-recipe-finder", riskLevel: "medium" }),
  recipe({ title: "Review request follow-up", slug: "review-request-follow-up", group: "Sales/CRM", audience: "Service businesses", professionSlug: "sales-teams", workflowType: "customer follow-up", summary: "Ask happy customers for reviews after work is complete while excluding unresolved issues.", trigger: "A deal, job, or support case is marked complete.", outcome: "Only suitable customers receive a reviewed review request and one reminder.", tools: ["HubSpot", "Pipedrive", "Zapier"], relatedToolSlugs: ["hubspot", "pipedrive", "zapier"], templateSlug: "review-request-after-job-completion", freeToolSlug: "lead-follow-up-sla-calculator" }),
  recipe({ title: "Portal lead to agent follow-up", slug: "portal-lead-to-agent-follow-up", group: "Real estate", audience: "Agents and brokerages", professionSlug: "real-estate-agents", workflowType: "real estate lead routing", summary: "Route property portal enquiries to an agent with a same-day response target and checked property context.", trigger: "A buyer or seller enquiry arrives from a portal, form, or referral source.", outcome: "The agent gets the lead, property context, first response draft, and SLA deadline.", tools: ["Follow Up Boss", "Pipedrive", "Zapier", "Calendly"], relatedToolSlugs: ["follow-up-boss", "pipedrive", "zapier", "calendly"], templateSlug: "real-estate-lead-routing", freeToolSlug: "lead-follow-up-sla-calculator", riskLevel: "high" }),
  recipe({ title: "Viewing notes to buyer email", slug: "viewing-notes-to-buyer-email", group: "Real estate", audience: "Real estate agents", professionSlug: "real-estate-agents", workflowType: "client follow-up", summary: "Convert viewing notes into a careful buyer follow-up that separates facts, opinions, and next steps.", trigger: "A viewing ends and the agent has notes or a transcript.", outcome: "The buyer gets a useful follow-up and the CRM gets next actions.", tools: ["Fathom", "Fireflies.ai", "Follow Up Boss", "Pipedrive"], relatedToolSlugs: ["fathom", "fireflies-ai", "follow-up-boss", "pipedrive"], templateSlug: "meeting-notes-to-project-tasks", freeToolSlug: "workflow-recipe-finder", riskLevel: "high" }),
  recipe({ title: "Listing facts to description", slug: "listing-facts-to-description", group: "Real estate", audience: "Listing agents", professionSlug: "real-estate-agents", workflowType: "content workflow", summary: "Turn verified property facts into listing copy, social captions, and review notes without inventing claims.", trigger: "A listing brief or property fact sheet is ready.", outcome: "The agent gets draft listing copy and a fact-check checklist before publishing.", tools: ["ChatGPT", "Canva", "Matterport"], relatedToolSlugs: ["chatgpt", "canva", "matterport"], templateSlug: "marketing-campaign-brief-builder", freeToolSlug: "prompt-generator", riskLevel: "high" }),
  recipe({ title: "Open-house lead capture", slug: "open-house-lead-capture", group: "Real estate", audience: "Real estate teams", professionSlug: "real-estate-agents", workflowType: "event follow-up", summary: "Capture open-house visitors, tag interest level, and trigger follow-up without losing consent context.", trigger: "A visitor submits an open-house form or sign-in.", outcome: "Every visitor is tagged, routed, and assigned a reviewed follow-up task.", tools: ["Typeform", "Follow Up Boss", "Zapier"], relatedToolSlugs: ["typeform", "follow-up-boss", "zapier"], templateSlug: "real-estate-lead-routing", freeToolSlug: "lead-follow-up-sla-calculator", riskLevel: "high" }),
  recipe({ title: "Seller valuation intake", slug: "seller-valuation-intake", group: "Real estate", audience: "Listing teams", professionSlug: "real-estate-agents", workflowType: "intake automation", summary: "Collect seller context before a valuation call and prepare a clean CRM note for the agent.", trigger: "A seller requests a valuation or appraisal.", outcome: "The agent sees property context, motivation, timeline, and missing questions before the call.", tools: ["Typeform", "Calendly", "Pipedrive", "Follow Up Boss"], relatedToolSlugs: ["typeform", "calendly", "pipedrive", "follow-up-boss"], templateSlug: "client-onboarding-kickoff", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Follow Up Boss daily cleanup", slug: "follow-up-boss-daily-cleanup", group: "Real estate", audience: "Brokerage operators", professionSlug: "real-estate-agents", workflowType: "CRM cleanup", summary: "Run a daily cleanup for missed responses, stale agent tasks, and unassigned property enquiries.", trigger: "The team starts the morning lead review.", outcome: "Every active lead has an agent, next step, and response status.", tools: ["Follow Up Boss", "Zapier", "Pipedrive"], relatedToolSlugs: ["follow-up-boss", "zapier", "pipedrive"], templateSlug: "crm-hygiene-weekly-reset", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Discovery call to proposal", slug: "discovery-call-to-proposal", group: "Consultants/agencies", audience: "Consultants", professionSlug: "consultants", workflowType: "proposal workflow", summary: "Turn discovery notes into proposal sections, assumptions, open questions, and a reviewed next-step email.", trigger: "A discovery call ends.", outcome: "The consultant gets a proposal outline and action list tied to the source notes.", tools: ["Fathom", "ChatGPT", "Claude", "Notion AI"], relatedToolSlugs: ["fathom", "chatgpt", "claude", "notion-ai"], templateSlug: "meeting-notes-to-project-tasks", freeToolSlug: "ai-proposal-generator", riskLevel: "medium" }),
  recipe({ title: "Meeting transcript to tasks", slug: "meeting-transcript-to-tasks", group: "Consultants/agencies", audience: "Client service teams", professionSlug: "consultants", workflowType: "meeting notes", summary: "Extract tasks, owners, decisions, and open questions from a client meeting transcript.", trigger: "A recurring client meeting ends.", outcome: "Tasks are assigned and the client recap is reviewed before sending.", tools: ["Fathom", "Fireflies.ai", "ClickUp", "Asana"], relatedToolSlugs: ["fathom", "fireflies-ai", "clickup", "asana"], templateSlug: "meeting-notes-to-project-tasks", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Client onboarding checklist", slug: "client-onboarding-checklist", group: "Consultants/agencies", audience: "Consultants and agencies", professionSlug: "consultants", workflowType: "client onboarding", summary: "Create a repeatable first-week checklist from signed proposal to kickoff tasks and access requests.", trigger: "A proposal is accepted or kickoff form is submitted.", outcome: "The client, project, folder, access list, and kickoff agenda are ready.", tools: ["Typeform", "ClickUp", "Asana", "Notion AI"], relatedToolSlugs: ["typeform", "clickup", "asana", "notion-ai"], templateSlug: "client-onboarding-kickoff", freeToolSlug: "workflow-kit-planner" }),
  recipe({ title: "Campaign brief from intake", slug: "campaign-brief-from-intake", group: "Consultants/agencies", audience: "Marketing agencies", professionSlug: "marketing-agencies", workflowType: "campaign planning", summary: "Turn client intake into a campaign brief, production tasks, review gates, and missing-info questions.", trigger: "A campaign request or intake form is submitted.", outcome: "The team gets a usable brief and task list before production starts.", tools: ["Typeform", "Semrush", "Jasper", "ClickUp"], relatedToolSlugs: ["typeform", "semrush", "jasper", "clickup"], templateSlug: "marketing-campaign-brief-builder", freeToolSlug: "workflow-kit-planner" }),
  recipe({ title: "Weekly client report", slug: "weekly-client-report", group: "Consultants/agencies", audience: "Agencies and consultants", professionSlug: "marketing-agencies", workflowType: "reporting", summary: "Collect weekly metrics, explain movement, flag missing data, and create next actions for the client.", trigger: "The weekly reporting window opens.", outcome: "The client gets a checked update with numbers, causes, caveats, and next actions.", tools: ["Airtable AI", "Notion AI", "ClickUp", "Semrush"], relatedToolSlugs: ["airtable-ai", "notion-ai", "clickup", "semrush"], templateSlug: "weekly-kpi-reporting-brief", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Scope-change request triage", slug: "scope-change-request-triage", group: "Consultants/agencies", audience: "Client delivery teams", professionSlug: "consultants", workflowType: "operations", summary: "Route a scope-change request into impact notes, approval steps, and revised task ownership.", trigger: "A client asks for work outside the current scope.", outcome: "The team can approve, defer, or quote the change with evidence.", tools: ["ClickUp", "Asana", "Notion AI"], relatedToolSlugs: ["clickup", "asana", "notion-ai"], templateSlug: "client-onboarding-kickoff", freeToolSlug: "automation-roi-calculator-v2", riskLevel: "medium" }),
  recipe({ title: "Support ticket triage", slug: "support-ticket-triage", group: "Ecommerce/support", audience: "Support teams", professionSlug: "ecommerce-sellers", workflowType: "support triage", summary: "Classify support tickets, route high-risk messages, and draft responses for review.", trigger: "A new support message arrives.", outcome: "Tickets are tagged, prioritized, and reviewed before sensitive responses go out.", tools: ["Zendesk AI", "Gorgias", "Tidio", "Zapier"], relatedToolSlugs: ["zendesk-ai", "gorgias", "tidio", "zapier"], templateSlug: "support-triage-reply-draft", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Refund request review", slug: "refund-request-review", group: "Ecommerce/support", audience: "Ecommerce support teams", professionSlug: "ecommerce-sellers", workflowType: "support triage", summary: "Route refund requests through policy checks, order context, and human approval.", trigger: "A customer asks for a refund or cancellation.", outcome: "The reply is policy-aware, order-aware, and approved before sending.", tools: ["Gorgias", "Zendesk AI", "Shopify Magic"], relatedToolSlugs: ["gorgias", "zendesk-ai", "shopify-magic"], templateSlug: "support-triage-reply-draft", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Product launch checklist", slug: "product-launch-checklist", group: "Ecommerce/support", audience: "Online store owners", professionSlug: "ecommerce-sellers", workflowType: "launch workflow", summary: "Coordinate product copy, email tasks, support macros, launch checks, and claim review.", trigger: "A product is ready for launch planning.", outcome: "The launch has assigned tasks, reviewed claims, and support preparation.", tools: ["Shopify Magic", "Klaviyo AI", "Canva", "Gorgias"], relatedToolSlugs: ["shopify-magic", "klaviyo-ai", "canva", "gorgias"], templateSlug: "ecommerce-product-launch-automation", freeToolSlug: "automation-roi-calculator-v2", riskLevel: "high" }),
  recipe({ title: "Abandoned-cart support handoff", slug: "abandoned-cart-support-handoff", group: "Ecommerce/support", audience: "Ecommerce teams", professionSlug: "ecommerce-sellers", workflowType: "customer follow-up", summary: "Route high-value abandoned carts to support or sales for a useful human follow-up.", trigger: "A customer abandons a high-value cart or repeat purchase.", outcome: "The team gets context, product details, and a reviewed message before outreach.", tools: ["Klaviyo AI", "Gorgias", "Shopify Magic", "Zapier"], relatedToolSlugs: ["klaviyo-ai", "gorgias", "shopify-magic", "zapier"], templateSlug: "speed-to-lead-ai-qualifier", freeToolSlug: "automation-roi-calculator-v2" }),
  recipe({ title: "Review mining to FAQ updates", slug: "review-mining-to-faq-updates", group: "Ecommerce/support", audience: "Support and content teams", professionSlug: "ecommerce-sellers", workflowType: "content refresh", summary: "Turn recurring customer reviews and support questions into FAQ update tasks.", trigger: "New reviews, support tags, or product questions appear.", outcome: "Common issues become reviewed FAQ updates and support macros.", tools: ["Gorgias", "Zendesk AI", "Notion AI"], relatedToolSlugs: ["gorgias", "zendesk-ai", "notion-ai"], templateSlug: "content-refresh-queue", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "VIP customer alert", slug: "vip-customer-alert", group: "Ecommerce/support", audience: "Support teams", professionSlug: "ecommerce-sellers", workflowType: "support triage", summary: "Alert the right owner when a high-value customer needs support or recovery.", trigger: "A VIP customer sends a support message or has a failed order.", outcome: "The owner receives context, risk notes, and a reviewed response path.", tools: ["Gorgias", "Intercom", "Zapier"], relatedToolSlugs: ["gorgias", "intercom", "zapier"], templateSlug: "support-triage-reply-draft", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Invoice follow-up", slug: "invoice-follow-up", group: "Ops/admin/finance", audience: "Service businesses", professionSlug: "accountants", workflowType: "finance follow-up", summary: "Create polite invoice reminders, escalation tasks, and payment-status checks.", trigger: "An invoice becomes due or overdue.", outcome: "Finance follow-up happens consistently without chasing paid invoices.", tools: ["HubSpot", "Zapier", "Make"], relatedToolSlugs: ["hubspot", "zapier", "make"], templateSlug: "invoice-follow-up-reminder", freeToolSlug: "automation-roi-calculator-v2", riskLevel: "medium" }),
  recipe({ title: "Expense receipt intake", slug: "expense-receipt-intake", group: "Ops/admin/finance", audience: "Accountants and operators", professionSlug: "accountants", workflowType: "document intake", summary: "Classify receipts, route missing information, and prepare a review queue.", trigger: "A client or employee uploads a receipt or expense document.", outcome: "Documents are grouped, checked, and routed without exposing sensitive details.", tools: ["Typeform", "Airtable AI", "Notion AI", "Zapier"], relatedToolSlugs: ["typeform", "airtable-ai", "notion-ai", "zapier"], templateSlug: "accounting-document-intake", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Weekly KPI brief", slug: "weekly-kpi-brief", group: "Ops/admin/finance", audience: "Operators and founders", professionSlug: "consultants", workflowType: "reporting", summary: "Collect weekly metrics, explain movement, and turn the report into next-week actions.", trigger: "Weekly planning starts.", outcome: "The team sees numbers, caveats, and decisions in one short brief.", tools: ["Airtable AI", "Notion AI", "ClickUp"], relatedToolSlugs: ["airtable-ai", "notion-ai", "clickup"], templateSlug: "weekly-kpi-reporting-brief", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Hiring intake to scorecard", slug: "hiring-intake-to-scorecard", group: "Ops/admin/finance", audience: "Hiring managers", professionSlug: "recruiters", workflowType: "recruiting", summary: "Turn role intake notes into a structured hiring scorecard and screening checklist.", trigger: "A hiring manager opens a new role.", outcome: "Recruiters get aligned criteria before screening begins.", tools: ["ChatGPT", "Claude", "Airtable AI"], relatedToolSlugs: ["chatgpt", "claude", "airtable-ai"], templateSlug: "recruiting-candidate-screening-handoff", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Candidate screen review", slug: "candidate-screen-review", group: "Ops/admin/finance", audience: "Recruiters", professionSlug: "recruiters", workflowType: "recruiting", summary: "Summarise candidate evidence against criteria while keeping the decision human-reviewed.", trigger: "A candidate applies or completes a screen.", outcome: "The recruiter gets evidence notes, missing questions, and next-stage tasks.", tools: ["ChatGPT", "Claude", "Airtable AI", "Zapier"], relatedToolSlugs: ["chatgpt", "claude", "airtable-ai", "zapier"], templateSlug: "recruiting-candidate-screening-handoff", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Policy document update watch", slug: "policy-document-update-watch", group: "Ops/admin/finance", audience: "Operations teams", professionSlug: "consultants", workflowType: "document control", summary: "Track policy updates, assign review owners, and flag affected workflow pages or docs.", trigger: "A vendor, policy, or internal process changes.", outcome: "Documents are reviewed, assigned, and updated with a change note.", tools: ["Notion AI", "Airtable AI", "ClickUp"], relatedToolSlugs: ["notion-ai", "airtable-ai", "clickup"], templateSlug: "ai-tool-watchlist-refresh", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Quote follow-up", slug: "quote-follow-up", group: "Trades/local services", audience: "Trades and service teams", professionSlug: "freelancers", workflowType: "quote follow-up", summary: "Follow up estimates at the right time with scope, price, and availability checks.", trigger: "A quote has been sent and the follow-up date arrives.", outcome: "The customer gets a reviewed check-in and the pipeline stays clean.", tools: ["Pipedrive", "HubSpot", "Calendly", "Zapier"], relatedToolSlugs: ["pipedrive", "hubspot", "calendly", "zapier"], templateSlug: "trade-job-estimate-follow-up", freeToolSlug: "lead-follow-up-sla-calculator", riskLevel: "medium" }),
  recipe({ title: "Job completion review", slug: "job-completion-review", group: "Trades/local services", audience: "Local service teams", professionSlug: "freelancers", workflowType: "customer follow-up", summary: "Ask for reviews after successful jobs while routing complaints to a human first.", trigger: "A job is completed and marked satisfied.", outcome: "Happy customers receive a review request; unresolved issues are excluded.", tools: ["HubSpot", "Pipedrive", "Zapier"], relatedToolSlugs: ["hubspot", "pipedrive", "zapier"], templateSlug: "review-request-after-job-completion", freeToolSlug: "workflow-recipe-finder" }),
  recipe({ title: "Booking request routing", slug: "booking-request-routing", group: "Trades/local services", audience: "Local service teams", professionSlug: "freelancers", workflowType: "booking workflow", summary: "Route new booking requests by urgency, location, service type, and owner availability.", trigger: "A customer submits a booking or callback request.", outcome: "The right owner gets the job context and next action quickly.", tools: ["Typeform", "Calendly", "HubSpot", "Zapier"], relatedToolSlugs: ["typeform", "calendly", "hubspot", "zapier"], templateSlug: "speed-to-lead-ai-qualifier", freeToolSlug: "lead-follow-up-sla-calculator" }),
  recipe({ title: "Materials order reminder", slug: "materials-order-reminder", group: "Trades/local services", audience: "Service operators", professionSlug: "freelancers", workflowType: "operations", summary: "Create reminders for materials, job notes, and supplier follow-up before scheduled work.", trigger: "A job is booked and materials are required.", outcome: "The owner sees what needs ordering before the job date.", tools: ["ClickUp", "Asana", "Zapier"], relatedToolSlugs: ["clickup", "asana", "zapier"], templateSlug: "client-onboarding-kickoff", freeToolSlug: "workflow-audit-generator" }),
  recipe({ title: "Service complaint triage", slug: "service-complaint-triage", group: "Trades/local services", audience: "Local service owners", professionSlug: "freelancers", workflowType: "support triage", summary: "Classify complaints, route urgent cases to an owner, and draft a careful response.", trigger: "A customer sends a complaint or negative review.", outcome: "The issue has an owner, timeline, evidence, and reviewed response.", tools: ["HubSpot", "Intercom", "Zapier"], relatedToolSlugs: ["hubspot", "intercom", "zapier"], templateSlug: "support-triage-reply-draft", freeToolSlug: "workflow-audit-generator", riskLevel: "high" }),
  recipe({ title: "Recurring maintenance reminder", slug: "recurring-maintenance-reminder", group: "Trades/local services", audience: "Maintenance providers", professionSlug: "freelancers", workflowType: "customer follow-up", summary: "Remind customers about recurring maintenance, inspection, or service appointments.", trigger: "A customer reaches a maintenance interval.", outcome: "The customer receives a timely reminder and booking path.", tools: ["HubSpot", "Pipedrive", "Calendly", "Zapier"], relatedToolSlugs: ["hubspot", "pipedrive", "calendly", "zapier"], templateSlug: "review-request-after-job-completion", freeToolSlug: "lead-follow-up-sla-calculator" })
];

export const workflowCollections: WorkflowCollection[] = [
  collection("Real estate workflow recipes", "real-estate", "Agents and brokerages", "Leads, viewings, listings, and seller intake need fast handoffs without invented property claims.", ["portal-lead-to-agent-follow-up", "viewing-notes-to-buyer-email", "listing-facts-to-description", "open-house-lead-capture", "seller-valuation-intake", "follow-up-boss-daily-cleanup"], ["pipedrive", "follow-up-boss", "canva", "matterport"], ["real-estate-lead-routing"], ["lead-follow-up-sla-calculator"]),
  collection("Sales team workflow recipes", "sales-teams", "Small sales teams", "Leads and calls go cold when the CRM lacks next actions, owners, and response deadlines.", ["speed-to-lead-form-to-crm", "missed-lead-recovery", "sales-call-notes-to-pipedrive", "stale-deal-cleanup", "inbound-demo-qualification", "review-request-follow-up"], ["pipedrive", "hubspot", "fathom", "zapier"], ["speed-to-lead-ai-qualifier", "crm-hygiene-weekly-reset"], ["lead-follow-up-sla-calculator", "workflow-recipe-finder"]),
  collection("Consultant workflow recipes", "consultants", "Consultants and advisors", "Discovery notes, reports, and proposals need evidence, owners, and careful follow-through.", ["discovery-call-to-proposal", "meeting-transcript-to-tasks", "client-onboarding-checklist", "scope-change-request-triage", "weekly-client-report"], ["chatgpt", "claude", "fathom", "notion-ai"], ["meeting-notes-to-project-tasks", "client-onboarding-kickoff"], ["ai-proposal-generator", "workflow-audit-generator"]),
  collection("Agency workflow recipes", "agencies", "Marketing agencies", "Campaign intake, reporting, approvals, and scope changes need repeatable operating rules.", ["campaign-brief-from-intake", "weekly-client-report", "client-onboarding-checklist", "meeting-transcript-to-tasks", "scope-change-request-triage"], ["semrush", "jasper", "clickup", "typeform"], ["marketing-campaign-brief-builder"], ["workflow-kit-planner"]),
  collection("Ecommerce workflow recipes", "ecommerce", "Online store owners", "Launches, support, reviews, and abandoned carts need fast action with claim review.", ["product-launch-checklist", "abandoned-cart-support-handoff", "review-mining-to-faq-updates", "refund-request-review", "vip-customer-alert"], ["shopify-magic", "klaviyo-ai", "gorgias", "canva"], ["ecommerce-product-launch-automation"], ["automation-roi-calculator-v2"]),
  collection("Support team workflow recipes", "support-teams", "Support teams", "Tickets, refunds, VIP customers, and complaints need routing and human review.", ["support-ticket-triage", "refund-request-review", "vip-customer-alert", "service-complaint-triage", "review-mining-to-faq-updates"], ["zendesk-ai", "gorgias", "tidio", "intercom"], ["support-triage-reply-draft"], ["workflow-audit-generator"]),
  collection("Finance and admin workflow recipes", "finance-admin", "Finance and operations teams", "Invoices, documents, hiring, and policy changes need ownership and source discipline.", ["invoice-follow-up", "expense-receipt-intake", "weekly-kpi-brief", "hiring-intake-to-scorecard", "candidate-screen-review", "policy-document-update-watch"], ["airtable-ai", "notion-ai", "clickup", "zapier"], ["invoice-follow-up-reminder", "accounting-document-intake"], ["automation-roi-calculator-v2", "workflow-audit-generator"]),
  collection("Trades and local service workflow recipes", "trades-local-services", "Trades and local service teams", "Quotes, bookings, reviews, complaints, and recurring reminders need simple daily workflows.", ["quote-follow-up", "job-completion-review", "booking-request-routing", "materials-order-reminder", "service-complaint-triage", "recurring-maintenance-reminder"], ["pipedrive", "hubspot", "calendly", "zapier"], ["trade-job-estimate-follow-up"], ["lead-follow-up-sla-calculator"])
];

export const workflowChecklists: WorkflowChecklist[] = [
  checklist("Workflow readiness checklist", "workflow-readiness", "Operators and founders", "Check whether a workflow is clear enough to automate before buying tools.", "readiness", ["Name the trigger and owner.", "List required inputs.", "Identify the system of record.", "Define the review step.", "Choose the first failure alert."], ["Is the trigger reliable?", "Who fixes bad runs?", "Can the team run it manually first?"], ["speed-to-lead-form-to-crm", "client-onboarding-checklist"], "workflow-recipe-finder"),
  checklist("Automation QA checklist", "automation-qa", "Operations teams", "Test workflow runs before trusting them with customer-facing outputs.", "qa", ["Run a safe sample.", "Check field mapping.", "Check duplicate handling.", "Confirm alerts fire.", "Record the rollback plan."], ["What happens on missing data?", "What gets logged?", "Who approves launch?"], ["support-ticket-triage", "invoice-follow-up"], "workflow-audit-generator"),
  checklist("Data and privacy review checklist", "data-privacy-review", "Teams using customer or candidate data", "Review sensitive data before adding AI or automation steps.", "privacy", ["Classify data sensitivity.", "Check tool retention settings.", "Remove unnecessary fields.", "Add human review.", "Document consent or lawful basis where relevant."], ["Is sensitive data required?", "Can fields be minimized?", "Does the output affect a person materially?"], ["candidate-screen-review", "expense-receipt-intake"], "workflow-audit-generator"),
  checklist("Zapier and Make migration checklist", "zapier-make-migration", "Automation owners", "Move brittle workflows between automation platforms without losing monitoring or ownership.", "migration", ["Export active workflows.", "Group by business process.", "Rebuild the highest-value workflow first.", "Test failure alerts.", "Archive duplicates after verification."], ["Which workflow pays for migration?", "Which app connection is fragile?", "Who owns the new runbook?"], ["missed-lead-recovery", "booking-request-routing"], "zapier-make-n8n-picker")
];

export function getWorkflowRecipe(slug: string) {
  return workflowRecipes.find((recipeItem) => recipeItem.slug === slug);
}

export function getWorkflowCollection(slug: string) {
  return workflowCollections.find((collectionItem) => collectionItem.slug === slug);
}

export function getWorkflowChecklist(slug: string) {
  return workflowChecklists.find((checklistItem) => checklistItem.slug === slug);
}

export function workflowRecipeLinks(slugs: string[]): SiteLink[] {
  return slugs
    .map(getWorkflowRecipe)
    .filter(Boolean)
    .map((recipeItem) => ({
      title: recipeItem!.title,
      href: `/workflow-library/${recipeItem!.slug}/`,
      description: recipeItem!.summary
    }));
}

export function workflowCollectionLinks(slugs: string[]): SiteLink[] {
  return slugs
    .map(getWorkflowCollection)
    .filter(Boolean)
    .map((collectionItem) => ({
      title: collectionItem!.title,
      href: `/workflow-library/collections/${collectionItem!.slug}/`,
      description: collectionItem!.primaryPain
    }));
}

export function findWorkflowRecipes(filters: { audience?: string; workflowType?: string; difficulty?: string; riskLevel?: string; tool?: string }) {
  return workflowRecipes.filter((recipeItem) => {
    const audience = filters.audience?.toLowerCase() ?? "";
    const workflowType = filters.workflowType?.toLowerCase() ?? "";
    const tool = filters.tool?.toLowerCase() ?? "";
    return (
      (!audience || recipeItem.audience.toLowerCase().includes(audience) || recipeItem.professionSlug.includes(audience)) &&
      (!workflowType || recipeItem.workflowType.toLowerCase().includes(workflowType)) &&
      (!filters.difficulty || recipeItem.difficulty === filters.difficulty) &&
      (!filters.riskLevel || recipeItem.riskLevel === filters.riskLevel) &&
      (!tool || recipeItem.tools.some((name) => name.toLowerCase().includes(tool)) || recipeItem.relatedToolSlugs.some((slug) => slug.includes(tool)))
    );
  });
}

function recipe(input: RecipeInput): WorkflowRecipe {
  return {
    title: input.title,
    slug: input.slug,
    audience: input.audience,
    professionSlug: input.professionSlug,
    workflowType: input.workflowType,
    summary: input.summary,
    trigger: input.trigger,
    outcome: input.outcome,
    tools: input.tools,
    setupTime: input.setupTime ?? "45-90 minutes",
    difficulty: input.difficulty ?? "medium",
    riskLevel: input.riskLevel ?? "medium",
    inputs: ["Trigger source", "Customer or record context", "Owner", "Deadline", "System of record"],
    steps: [
      "Capture the trigger and required context.",
      "Create or update the system-of-record entry.",
      "Draft the next action or message for review.",
      "Assign an owner and deadline.",
      "Log the result and check failures in the next daily review."
    ],
    prompts: [
      `Summarise the context for ${input.title.toLowerCase()} in five bullet points.`,
      "List missing information, risk flags, and the safest next action.",
      "Draft a short message that a human can review before sending."
    ],
    reviewChecks: ["Confirm the source data is real.", "Check customer-facing wording before sending.", "Confirm the owner and deadline are visible."],
    failureModes: ["Trigger does not fire.", "Record is duplicated or routed to the wrong owner.", "AI output sounds confident but lacks source evidence."],
    privacyNotes: ["Only send fields needed for the workflow.", "Avoid uploading sensitive data unless the tool has been approved.", "Keep a human review step for high-risk outputs."],
    relatedToolSlugs: input.relatedToolSlugs,
    relatedAutomationTemplateSlugs: [input.templateSlug],
    relatedFreeToolSlug: input.freeToolSlug,
    dailyHabit: `Check ${input.title.toLowerCase()} once per workday until the failure list is empty.`
  };
}

function collection(
  title: string,
  slug: string,
  audience: string,
  primaryPain: string,
  recipeSlugs: string[],
  toolSlugs: string[],
  automationTemplateSlugs: string[],
  freeToolSlugs: string[]
): WorkflowCollection {
  return {
    title,
    slug,
    audience,
    primaryPain,
    recipeSlugs,
    toolSlugs,
    automationTemplateSlugs,
    freeToolSlugs,
    internalLinks: [
      { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." },
      { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one workflow task each day." },
      { title: "Free tools", href: "/free-tools/", description: "Use calculators and generators." }
    ]
  };
}

function checklist(
  title: string,
  slug: string,
  audience: string,
  summary: string,
  checklistType: WorkflowChecklist["checklistType"],
  steps: string[],
  reviewQuestions: string[],
  relatedRecipeSlugs: string[],
  relatedFreeToolSlug: string
): WorkflowChecklist {
  return { title, slug, audience, summary, checklistType, steps, reviewQuestions, relatedRecipeSlugs, relatedFreeToolSlug };
}
