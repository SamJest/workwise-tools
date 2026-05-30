import type { AgentPlaybook, SiteLink } from "@/types/content";

export const agentPlaybooks: AgentPlaybook[] = [
  playbook("Speed-to-lead agent", "speed-to-lead-agent", "Sales and real estate teams", "lead response", "An agent playbook for turning new enquiries into CRM records, owner alerts, and reviewed first-response drafts.", "Respond to qualified leads faster without inventing facts or skipping human review.", "A new lead form, portal enquiry, demo request, or callback request arrives.", "Sales manager", ["Pipedrive", "HubSpot", "Follow Up Boss", "Zapier"], ["pipedrive", "hubspot", "follow-up-boss", "zapier"], ["speed-to-lead-form-to-crm", "portal-lead-to-agent-follow-up"], "lead-follow-up-sla-calculator"),
  playbook("CRM hygiene agent", "crm-hygiene-agent", "Sales operators", "CRM cleanup", "A weekly agent for finding stale deals, missing owners, duplicate records, and next-action gaps.", "Keep the CRM useful without letting automation silently rewrite important records.", "A stale-record report or weekly sales review starts.", "Revenue operations owner", ["Pipedrive", "HubSpot", "Airtable AI"], ["pipedrive", "hubspot", "airtable-ai"], ["stale-deal-cleanup", "missed-lead-recovery"], "workflow-audit-generator"),
  playbook("Sales call follow-up agent", "sales-call-follow-up-agent", "Revenue teams", "meeting follow-up", "A call-summary agent that extracts objections, buying signals, next steps, and CRM-ready follow-up drafts.", "Turn calls into accurate CRM updates and reviewed follow-up without losing context.", "A call transcript or meeting note is completed.", "Account owner", ["Fathom", "Fireflies.ai", "Pipedrive", "HubSpot"], ["fathom", "fireflies-ai", "pipedrive", "hubspot"], ["sales-call-notes-to-pipedrive", "meeting-transcript-to-tasks"], "workflow-recipe-finder"),
  playbook("Real estate viewing follow-up agent", "real-estate-viewing-follow-up-agent", "Real estate agents", "client follow-up", "A playbook for turning viewing notes into buyer follow-up, CRM tasks, and careful property caveats.", "Follow up quickly while keeping property facts and subjective claims under human control.", "A viewing ends and notes are available.", "Assigned agent", ["Follow Up Boss", "Pipedrive", "Fathom", "Fireflies.ai"], ["follow-up-boss", "pipedrive", "fathom", "fireflies-ai"], ["viewing-notes-to-buyer-email", "portal-lead-to-agent-follow-up"], "lead-follow-up-sla-calculator"),
  playbook("Listing copy review agent", "listing-copy-review-agent", "Listing agents", "content review", "An agent that drafts listing copy from verified facts and flags claims requiring human approval.", "Create useful property copy without unsupported local, school, pricing, or condition claims.", "A property fact sheet is ready.", "Listing owner", ["ChatGPT", "Canva", "Matterport"], ["chatgpt", "canva", "matterport"], ["listing-facts-to-description"], "prompt-generator"),
  playbook("Client onboarding agent", "client-onboarding-agent", "Consultants and agencies", "client onboarding", "An onboarding agent for creating kickoff tasks, access requests, client folders, and welcome drafts.", "Move from signed proposal to first-week setup without missing access or ownership.", "A proposal is accepted or kickoff form is submitted.", "Delivery lead", ["Typeform", "ClickUp", "Asana", "Notion AI"], ["typeform", "clickup", "asana", "notion-ai"], ["client-onboarding-checklist", "discovery-call-to-proposal"], "workflow-kit-planner"),
  playbook("Meeting-to-task agent", "meeting-to-task-agent", "Client service teams", "meeting operations", "An agent that converts meeting transcripts into decisions, tasks, owners, deadlines, and recap drafts.", "Reduce follow-up drift after client, delivery, and internal meetings.", "A meeting transcript is saved.", "Meeting owner", ["Fathom", "Fireflies.ai", "ClickUp", "Asana"], ["fathom", "fireflies-ai", "clickup", "asana"], ["meeting-transcript-to-tasks"], "workflow-audit-generator"),
  playbook("Campaign brief agent", "campaign-brief-agent", "Marketing agencies", "campaign planning", "A campaign planning agent for turning intake answers into briefs, missing questions, and production tasks.", "Create better briefs while keeping strategy and claims human-owned.", "A campaign intake form or client request arrives.", "Strategist", ["Typeform", "Semrush", "Jasper", "ClickUp"], ["typeform", "semrush", "jasper", "clickup"], ["campaign-brief-from-intake"], "workflow-kit-planner"),
  playbook("Weekly reporting agent", "weekly-reporting-agent", "Operators and agencies", "reporting", "An agent that prepares weekly commentary, missing-data flags, and next actions from source metrics.", "Draft reports faster without inventing causes for metric changes.", "A weekly reporting cycle starts.", "Report owner", ["Airtable AI", "Notion AI", "ClickUp", "Semrush"], ["airtable-ai", "notion-ai", "clickup", "semrush"], ["weekly-client-report", "weekly-kpi-brief"], "workflow-audit-generator"),
  playbook("Support triage agent", "support-triage-agent", "Support teams", "support triage", "A support agent playbook for classifying tickets, drafting replies, and routing high-risk cases.", "Speed up triage while requiring human approval for refunds, legal issues, and angry customers.", "A support message arrives.", "Support lead", ["Zendesk AI", "Gorgias", "Tidio", "Intercom"], ["zendesk-ai", "gorgias", "tidio", "intercom"], ["support-ticket-triage", "refund-request-review"], "workflow-audit-generator"),
  playbook("Refund review agent", "refund-review-agent", "Ecommerce support teams", "refund review", "An agent for checking refund requests against order context, policy notes, and escalation rules.", "Keep refund replies consistent without letting AI promise money or exceptions.", "A refund, return, or cancellation request arrives.", "Support manager", ["Gorgias", "Zendesk AI", "Shopify Magic"], ["gorgias", "zendesk-ai", "shopify-magic"], ["refund-request-review"], "workflow-audit-generator"),
  playbook("Product launch agent", "product-launch-agent", "Ecommerce teams", "launch operations", "A launch agent that coordinates product copy, email tasks, support macros, and claim checks.", "Launch faster while keeping stock, discount, and product claims verified.", "A new product enters launch planning.", "Store owner", ["Shopify Magic", "Klaviyo AI", "Canva", "Gorgias"], ["shopify-magic", "klaviyo-ai", "canva", "gorgias"], ["product-launch-checklist"], "automation-roi-calculator-v2"),
  playbook("Invoice follow-up agent", "invoice-follow-up-agent", "Finance and admin teams", "finance follow-up", "An agent for checking payment status, drafting invoice reminders, and escalating overdue accounts.", "Follow up invoices consistently without chasing paid invoices or using the wrong tone.", "An invoice becomes due or overdue.", "Finance owner", ["HubSpot", "Zapier", "Make"], ["hubspot", "zapier", "make"], ["invoice-follow-up"], "automation-roi-calculator-v2"),
  playbook("Document intake agent", "document-intake-agent", "Accountants and operators", "document intake", "A document intake agent for classifying uploaded receipts, missing information, and review queues.", "Organize documents while minimizing sensitive-data exposure.", "A client uploads receipts, statements, or evidence.", "Admin owner", ["Typeform", "Airtable AI", "Notion AI", "Zapier"], ["typeform", "airtable-ai", "notion-ai", "zapier"], ["expense-receipt-intake"], "workflow-audit-generator"),
  playbook("Candidate screening support agent", "candidate-screening-support-agent", "Recruiters", "recruiting support", "A recruiting support agent for summarizing evidence against criteria and preparing review notes.", "Support recruiters without automating hiring decisions.", "A candidate applies or completes a screening step.", "Recruiter", ["ChatGPT", "Claude", "Airtable AI"], ["chatgpt", "claude", "airtable-ai"], ["candidate-screen-review", "hiring-intake-to-scorecard"], "workflow-audit-generator"),
  playbook("Quote follow-up agent", "quote-follow-up-agent", "Trades and service businesses", "quote follow-up", "An agent that reviews sent quotes, prepares check-ins, and routes accepted estimates into jobs.", "Follow up quotes without repeating old prices or unchecked availability.", "A quote follow-up date arrives.", "Business owner", ["Pipedrive", "HubSpot", "Calendly", "Zapier"], ["pipedrive", "hubspot", "calendly", "zapier"], ["quote-follow-up", "booking-request-routing"], "lead-follow-up-sla-calculator"),
  playbook("Complaint recovery agent", "complaint-recovery-agent", "Local service and support teams", "complaint triage", "A complaint triage agent that classifies urgency, gathers evidence, and drafts careful owner-reviewed replies.", "Recover customer issues without escalating through careless automated responses.", "A complaint, negative review, or angry support message arrives.", "Service owner", ["HubSpot", "Intercom", "Gorgias"], ["hubspot", "intercom", "gorgias"], ["service-complaint-triage", "vip-customer-alert"], "workflow-audit-generator"),
  playbook("Content refresh agent", "content-refresh-agent", "Content and SEO teams", "content operations", "An agent that turns Search Console or audit findings into refresh tasks, internal-link checks, and update notes.", "Refresh the right pages without adding thin content or unsupported claims.", "A weekly content or GSC export is reviewed.", "Editor", ["Airtable AI", "Notion AI", "ClickUp", "Semrush"], ["airtable-ai", "notion-ai", "clickup", "semrush"], ["policy-document-update-watch", "weekly-kpi-brief"], "workflow-recipe-finder")
];

export function getAgentPlaybook(slug: string) {
  return agentPlaybooks.find((playbookItem) => playbookItem.slug === slug);
}

export function agentPlaybookLinks(slugs: string[]): SiteLink[] {
  return slugs
    .map(getAgentPlaybook)
    .filter(Boolean)
    .map((playbookItem) => ({
      title: playbookItem!.title,
      href: `/agent-playbooks/${playbookItem!.slug}/`,
      description: playbookItem!.summary
    }));
}

function playbook(
  title: string,
  slug: string,
  audience: string,
  agentType: string,
  summary: string,
  jobToBeDone: string,
  trigger: string,
  humanOwner: string,
  tools: string[],
  relatedToolSlugs: string[],
  relatedWorkflowRecipeSlugs: string[],
  relatedFreeToolSlug: string
): AgentPlaybook {
  return {
    title,
    slug,
    audience,
    agentType,
    summary,
    jobToBeDone,
    trigger,
    humanOwner,
    tools,
    relatedToolSlugs,
    relatedWorkflowRecipeSlugs,
    relatedFreeToolSlug,
    setupSteps: [
      "Map the trigger and required source fields.",
      "Define what the agent may draft, classify, or route.",
      "Connect the system of record and keep the owner visible.",
      "Add a human approval step for customer-facing or high-risk output.",
      "Log decisions and review failures daily during rollout."
    ],
    guardrails: [
      "The agent must cite source context or mark missing information.",
      "The agent must not send external messages without the named owner approving them.",
      "The agent must escalate sensitive, legal, financial, hiring, or angry-customer cases."
    ],
    handoffRules: [
      `Human owner: ${humanOwner}.`,
      "Create a task when confidence is low or required fields are missing.",
      "Keep a rollback path so the team can run the workflow manually."
    ],
    failureModes: [
      "The trigger fires on the wrong record.",
      "The agent drafts confident copy from incomplete data.",
      "The owner misses the review queue and the workflow stalls."
    ],
    privacyNotes: [
      "Send only the fields needed for the workflow.",
      "Avoid sensitive data unless the tool has been approved for that use.",
      "Keep audit notes for decisions that affect customers, candidates, or payments."
    ],
    dailyReview: `Review ${title.toLowerCase()} outputs every workday until routing, review, and owner handoff are boringly reliable.`
  };
}
