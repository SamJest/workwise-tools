import type { SiteLink } from "@/types/content";

export type AuthorityCluster =
  | "pipedrive"
  | "real-estate-ai"
  | "automation"
  | "agent-workflows"
  | "ai-stacks"
  | "support-ops"
  | "ecommerce-ai"
  | "local-services"
  | "marketing-content"
  | "finance-admin"
  | "recruiting-hr"
  | "analytics-reporting"
  | "compliance-risk"
  | "customer-success";

export type AuthorityTopic = {
  title: string;
  slug: string;
  cluster: AuthorityCluster;
  summary: string;
  audience: string;
  primaryIntent: string;
  whyItMatters: string;
  sections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
  related: SiteLink[];
  dailyReturn: string;
};

const pipedriveRelated: SiteLink[] = [
  { title: "Pipedrive guide", href: "/ai-tools/pipedrive/", description: "Use cases, fit, evidence, and alternatives." },
  { title: "Pipedrive sales follow-up workflow", href: "/workflows/pipedrive-sales-follow-up-workflow/", description: "Turn calls and enquiries into CRM tasks." },
  { title: "Pipedrive vs Follow Up Boss", href: "/comparisons/pipedrive-vs-follow-up-boss/", description: "Generic CRM vs real estate CRM." },
  { title: "AI workflow ROI calculator", href: "/free-tools/ai-workflow-roi-calculator/", description: "Check whether the workflow is worth automating." }
];

const realEstateRelated: SiteLink[] = [
  { title: "US real estate AI tools", href: "/countries/us/real-estate-agents/", description: "Local workflow-first shortlist for agents." },
  { title: "Real estate lead follow-up workflow", href: "/workflows/real-estate-lead-follow-up-workflow/", description: "Capture, route, and follow up property leads." },
  { title: "ChatGPT prompts for real estate agents", href: "/prompts/chatgpt-prompts-for-real-estate-agents/", description: "Listing, social, and follow-up prompts." },
  { title: "AI stack builder", href: "/free-tools/ai-stack-builder/", description: "Build a practical starter stack." }
];

const automationRelated: SiteLink[] = [
  { title: "Automation AI tools", href: "/use-cases/automation/", description: "Compare automation tools by workflow fit." },
  { title: "Zapier vs Make", href: "/comparisons/zapier-vs-make/", description: "Two core automation platforms compared." },
  { title: "Client onboarding workflow", href: "/workflows/ai-client-onboarding-workflow/", description: "Automate intake and handoff steps." },
  { title: "Workflow kit planner", href: "/free-tools/workflow-kit-planner/", description: "Draft a repeatable workflow kit." }
];

const agentRelated: SiteLink[] = [
  { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Guardrailed AI agent workflows." },
  { title: "Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Check trigger, review, data, and fallback readiness." },
  { title: "Workflow Library", href: "/workflow-library/", description: "Step-by-step recipes behind each agent." },
  { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." }
];

const stackRelated: SiteLink[] = [
  { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Buyer-ready AI and SaaS stack plans." },
  { title: "Stack Gap Analyzer", href: "/free-tools/stack-gap-analyzer/", description: "Find missing stack layers and risky overlap." },
  { title: "AI Stack Builder", href: "/free-tools/ai-stack-builder/", description: "Build a starter stack." },
  { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Find the workflow that proves the stack." }
];

const supportRelated: SiteLink[] = [
  { title: "Support triage agent", href: "/agent-playbooks/support-triage-agent/", description: "Guardrails for AI-assisted support triage." },
  { title: "Support ticket triage recipe", href: "/workflow-library/support-ticket-triage/", description: "Step-by-step ticket routing and review." },
  { title: "Ecommerce support recovery stack", href: "/stack-blueprints/ecommerce-support-recovery-stack/", description: "Tools for support triage, refunds, and VIP recovery." },
  { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit support workflows before rollout." }
];

const ecommerceRelated: SiteLink[] = [
  { title: "Ecommerce product launch stack", href: "/stack-blueprints/ecommerce-product-launch-stack/", description: "Product copy, email, launch assets, and support." },
  { title: "Product launch checklist", href: "/workflow-library/product-launch-checklist/", description: "Step-by-step launch workflow." },
  { title: "Product launch agent", href: "/agent-playbooks/product-launch-agent/", description: "Guardrails for AI-assisted launches." },
  { title: "Automation ROI Calculator v2", href: "/free-tools/automation-roi-calculator-v2/", description: "Estimate value and review overhead." }
];

const localServicesRelated: SiteLink[] = [
  { title: "Local service quote follow-up stack", href: "/stack-blueprints/local-service-quote-follow-up-stack/", description: "Quote, booking, review, and complaint workflow stack." },
  { title: "Quote follow-up recipe", href: "/workflow-library/quote-follow-up/", description: "Follow up quotes without stale prices or unclear scope." },
  { title: "Quote follow-up agent", href: "/agent-playbooks/quote-follow-up-agent/", description: "Guardrails for estimate follow-up." },
  { title: "Lead Follow-Up SLA Calculator", href: "/free-tools/lead-follow-up-sla-calculator/", description: "Set practical response targets." }
];

const marketingContentRelated: SiteLink[] = [
  { title: "Marketing agency AI stack", href: "/topics/ai-stack-for-marketing-agencies/", description: "A stack for briefs, production, approvals, and reporting." },
  { title: "Campaign brief from intake", href: "/workflow-library/campaign-brief-from-intake/", description: "Turn client inputs into a checked campaign brief." },
  { title: "AI prompt generator", href: "/free-tools/prompt-generator/", description: "Draft reusable prompts for marketing workflows." },
  { title: "Workflow Library", href: "/workflow-library/", description: "Find the repeatable recipe behind the topic." }
];

const financeAdminRelated: SiteLink[] = [
  { title: "Invoice follow-up recipe", href: "/workflow-library/invoice-follow-up/", description: "Chase overdue invoices with review steps." },
  { title: "Expense receipt intake", href: "/workflow-library/expense-receipt-intake/", description: "Capture receipts and route exceptions." },
  { title: "Automation ROI Calculator v2", href: "/free-tools/automation-roi-calculator-v2/", description: "Estimate whether a finance workflow is worth automating." },
  { title: "Software Buying Checklist Generator", href: "/free-tools/software-buying-checklist-generator/", description: "Check finance software before committing." }
];

const recruitingHrRelated: SiteLink[] = [
  { title: "Candidate screen review", href: "/workflow-library/candidate-screen-review/", description: "Score candidates with a human review gate." },
  { title: "Hiring intake to scorecard", href: "/workflow-library/hiring-intake-to-scorecard/", description: "Turn role needs into a reusable scorecard." },
  { title: "Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Check whether a hiring workflow is safe for an AI agent." },
  { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit recruiting handoffs before rollout." }
];

const analyticsReportingRelated: SiteLink[] = [
  { title: "Weekly KPI brief", href: "/workflow-library/weekly-kpi-brief/", description: "Turn source metrics into a checked weekly summary." },
  { title: "Weekly reporting automation", href: "/automation-os/templates/weekly-kpi-reporting-brief/", description: "Automate report gathering without hiding review." },
  { title: "Stack Gap Analyzer", href: "/free-tools/stack-gap-analyzer/", description: "Find missing reporting and system-of-record layers." },
  { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Find a reporting recipe by team and risk." }
];

const complianceRiskRelated: SiteLink[] = [
  { title: "Data/privacy review checklist", href: "/workflow-library/checklists/data-privacy-review/", description: "Check data handling before automation." },
  { title: "Policy document update watch", href: "/workflow-library/policy-document-update-watch/", description: "Watch policy changes and route review." },
  { title: "How we review AI tools", href: "/how-we-review-ai-tools/", description: "See the evidence and review framework." },
  { title: "Software Buying Checklist Generator", href: "/free-tools/software-buying-checklist-generator/", description: "Generate vendor questions and red flags." }
];

const customerSuccessRelated: SiteLink[] = [
  { title: "Client onboarding checklist", href: "/workflow-library/client-onboarding-checklist/", description: "Turn new customers into a tracked onboarding flow." },
  { title: "Support ticket triage", href: "/workflow-library/support-ticket-triage/", description: "Route support issues with review gates." },
  { title: "AI customer support agent", href: "/topics/ai-customer-support-agent-small-business/", description: "Guardrails for customer-facing support agents." },
  { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Find weak spots in customer handoffs." }
];

export const authorityTopics: AuthorityTopic[] = [
  topic({
    title: "Pipedrive Use Cases for Small Business",
    slug: "pipedrive-use-cases-for-small-business",
    cluster: "pipedrive",
    summary: "A practical map of where Pipedrive helps small teams: lead capture, pipeline stages, follow-up tasks, reporting, and handoffs.",
    audience: "Small sales teams, consultants, agencies, and owner-led businesses choosing a lightweight CRM.",
    primaryIntent: "Informational and commercial investigation.",
    whyItMatters: "GSC already shows Pipedrive use-case impressions. This page supports that query without forcing readers into a generic review.",
    sections: [
      section("Pipeline control", "Pipedrive should be evaluated as a process tool first.", ["Define the sales motion", "Name stages by buyer action", "Review stale deals weekly"]),
      section("Follow-up discipline", "The strongest daily value is turning conversations into activities.", ["Log call context", "Create next action before leaving the record", "Use templates for repeated replies"]),
      section("Reporting fit", "A CRM only earns adoption when managers can see where deals slow down.", ["Check dashboard limits", "Track source and stage conversion", "Keep reports simple at launch"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Use the sales follow-up workflow every Friday to clear stale deals and update next activities."
  }),
  topic({
    title: "Pipedrive for Real Estate Agents",
    slug: "pipedrive-for-real-estate-agents",
    cluster: "pipedrive",
    summary: "When Pipedrive is enough for real estate lead follow-up and when a dedicated real estate CRM is a better fit.",
    audience: "Independent agents and small property teams comparing a simple CRM with real-estate-specific platforms.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "It connects the strongest Pipedrive signal with the strongest profession signal already visible in GSC.",
    sections: [
      section("Good fit", "Pipedrive can work when the job is simple enquiry capture, viewing notes, reminders, and follow-up.", ["Track lead source", "Attach viewing notes", "Create reminders immediately"]),
      section("Limits", "Brokerages may need stronger routing, agent accountability, property integrations, and lead-source reporting.", ["Check portal integrations", "Check assignment rules", "Check team visibility"]),
      section("Workflow stack", "Pair the CRM with booking, forms, listing copy, and meeting notes tools.", ["Calendly for bookings", "Typeform for intake", "Canva and ChatGPT for listing drafts"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use the real estate lead follow-up workflow at the end of each viewing day."
  }),
  topic({
    title: "Pipedrive Implementation Checklist",
    slug: "pipedrive-implementation-checklist",
    cluster: "pipedrive",
    summary: "A launch checklist for teams moving from spreadsheets, inboxes, or a messy CRM into Pipedrive.",
    audience: "Sales operators and founders setting up Pipedrive without overbuilding the first version.",
    primaryIntent: "Actionable checklist.",
    whyItMatters: "Implementation content is more useful than another feature list and can earn return visits during setup.",
    sections: [
      section("Before import", "Clean the data before it enters the CRM.", ["Remove dead records", "Standardise company names", "Decide required fields"]),
      section("Pipeline design", "Keep the first pipeline close to the real buying process.", ["Use 5 to 7 stages", "Avoid internal-only stage names", "Define exit criteria"]),
      section("Launch review", "Adoption depends on weekly habits.", ["Check activity completion", "Review stale deals", "Adjust fields after two weeks"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Return to the checklist during setup week and after the first pipeline review."
  }),
  topic({
    title: "Pipedrive vs HubSpot for Small Business",
    slug: "pipedrive-vs-hubspot-for-small-business",
    cluster: "pipedrive",
    summary: "A buyer-focused explanation of when a lightweight sales CRM beats a broader customer platform.",
    audience: "Small businesses choosing between simple pipeline management and a broader marketing/sales suite.",
    primaryIntent: "Comparison.",
    whyItMatters: "This supports high-intent CRM comparison demand while keeping the verdict workflow-specific.",
    sections: [
      section("Choose Pipedrive when", "The core need is deal tracking, follow-up activities, and sales adoption.", ["Small sales team", "Simple pipeline", "Limited marketing ops"]),
      section("Choose HubSpot when", "The business needs marketing, CRM, service, and reporting in a connected platform.", ["Inbound marketing", "Lead nurturing", "Multi-team customer data"]),
      section("Check before buying", "Plan limits and implementation effort matter more than brand familiarity.", ["Seat costs", "Automation limits", "Data migration work"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Use the software buying checklist before comparing annual plans."
  }),
  topic({
    title: "Pipedrive Alternatives for Sales Teams",
    slug: "pipedrive-alternatives-for-sales-teams",
    cluster: "pipedrive",
    summary: "Alternatives to consider when Pipedrive is too narrow, too sales-only, or not specialised enough.",
    audience: "Sales teams shortlisting CRMs and sales workflow tools.",
    primaryIntent: "Alternatives.",
    whyItMatters: "Alternatives pages usually capture switching intent and can support ad-friendly buyer traffic.",
    sections: [
      section("Need broader platform", "Consider HubSpot when marketing and customer service workflows matter.", ["Campaigns", "Lead nurturing", "Customer records"]),
      section("Need prospecting depth", "Consider Apollo or Clay when list building and outbound enrichment are the bottleneck.", ["Prospecting", "Enrichment", "Outbound sequences"]),
      section("Need real estate fit", "Consider Follow Up Boss when lead routing and brokerage accountability matter.", ["Lead assignment", "Agent activity", "Property-team follow-up"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Use the tool watchlist before migrating to catch pricing or feature changes."
  }),
  topic({
    title: "Best CRM Automation Tools for Small Sales Teams",
    slug: "best-crm-automation-tools-for-small-sales-teams",
    cluster: "pipedrive",
    summary: "How small sales teams should compare CRM automation without creating brittle, hidden processes.",
    audience: "Sales teams trying to automate follow-up, routing, reminders, and reporting.",
    primaryIntent: "Best tools.",
    whyItMatters: "This bridges the Pipedrive and automation clusters with a clear commercial decision.",
    sections: [
      section("Automate handoffs", "Start with the steps that often get forgotten.", ["New lead to CRM", "Meeting booked to activity", "Call summary to follow-up"]),
      section("Keep review visible", "Automation should surface decisions rather than hide them.", ["Approval steps", "Exception lists", "Weekly reports"]),
      section("Compare the stack", "Pipedrive, HubSpot, Zapier, Make, Calendly, and Typeform solve different layers.", ["CRM", "Integration layer", "Input and booking tools"])
    ],
    related: automationRelated,
    dailyReturn: "Return weekly to clear failed automations and stale CRM activities."
  }),
  topic({
    title: "Pipedrive Consulting Services Checklist",
    slug: "pipedrive-consulting-services-checklist",
    cluster: "pipedrive",
    summary: "What to check before hiring Pipedrive setup or consulting help for imports, fields, automations, reports, and adoption.",
    audience: "Founders and sales managers deciding whether CRM consulting help is worth it.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "GSC already shows Pipedrive consulting queries. This page captures that intent with a buyer checklist instead of a sales pitch.",
    sections: [
      section("When help is worth it", "Consulting help is useful when CRM setup mistakes would slow the sales team.", ["Multiple pipelines", "Messy imports", "Custom reporting"]),
      section("What to ask", "The consultant should explain process design, not just field creation.", ["Pipeline logic", "Automation scope", "Adoption plan"]),
      section("What to avoid", "Avoid overbuilt setups that hide the next action from sales reps.", ["Too many fields", "Unclear owners", "Reports nobody reviews"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Use the checklist before kickoff, after import, and after the first adoption review."
  }),
  topic({
    title: "Pipedrive Reporting and Dashboard Use Cases",
    slug: "pipedrive-reporting-dashboard-use-cases",
    cluster: "pipedrive",
    summary: "How small teams should use CRM reporting to spot stale deals, source quality, bottlenecks, and follow-up gaps.",
    audience: "Sales managers and operators trying to make CRM reporting useful.",
    primaryIntent: "Use case.",
    whyItMatters: "Reporting helps WorkWise move beyond review content into daily operating habits.",
    sections: [
      section("Pipeline health", "Start with reports that show where deals slow down.", ["Deals by stage", "Age by stage", "No-activity deals"]),
      section("Source quality", "Track which lead sources produce useful conversations.", ["Source field", "Conversion rate", "Follow-up speed"]),
      section("Weekly review", "The dashboard should drive decisions, not become decoration.", ["Close dead deals", "Assign next tasks", "Fix bottlenecks"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Return every Monday to inspect stale deals and follow-up gaps."
  }),
  topic({
    title: "Sales Follow-Up Automation Workflow",
    slug: "sales-follow-up-automation-workflow",
    cluster: "pipedrive",
    summary: "A practical workflow for turning lead forms, booked calls, meeting notes, and CRM stages into timely follow-up.",
    audience: "Small sales teams trying to reduce missed replies and stale opportunities.",
    primaryIntent: "Workflow.",
    whyItMatters: "This topic links the Pipedrive and automation clusters around a repeated task readers can use every day.",
    sections: [
      section("Capture context", "Every follow-up starts with the facts the buyer actually provided.", ["Lead source", "Problem", "Next requested step"]),
      section("Create activity", "Do not leave a call or enquiry without a next task.", ["Owner", "Due date", "Message draft"]),
      section("Review exceptions", "Automation should surface missed follow-up rather than silently fail.", ["Failed runs", "No activity", "Overdue tasks"])
    ],
    related: pipedriveRelated,
    dailyReturn: "Use the workflow at the end of each sales day."
  }),
  topic({
    title: "Best AI Tools for Real Estate Agents",
    slug: "best-ai-tools-for-real-estate-agents",
    cluster: "real-estate-ai",
    summary: "A workflow-first shortlist for agents covering lead follow-up, listing copy, scheduling, meeting notes, and marketing assets.",
    audience: "US real estate agents, teams, and brokerages comparing AI tools.",
    primaryIntent: "Best tools.",
    whyItMatters: "GSC is already testing real estate tool queries, so this should become a central hub.",
    sections: [
      section("Lead follow-up", "The first tool layer should make every enquiry actionable.", ["CRM record", "Owner", "Next task"]),
      section("Listing marketing", "AI can draft copy and social posts, but property facts must stay verified.", ["Listing descriptions", "Brochure copy", "Social captions"]),
      section("Daily operations", "Meeting notes, scheduling, and reminders matter because speed shapes conversion.", ["Viewing notes", "Booking links", "Follow-up reminders"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use prompt of the day for listings, follow-up, and review requests."
  }),
  topic({
    title: "AI Tools for Realtors",
    slug: "ai-tools-for-realtors",
    cluster: "real-estate-ai",
    summary: "A realtor-focused version of the real estate AI stack using US terminology and practical client communication workflows.",
    audience: "Realtors looking for usable AI tools rather than generic software lists.",
    primaryIntent: "Best tools and local terminology.",
    whyItMatters: "The keyword wording differs from broader real estate agent searches and deserves a tailored entry point.",
    sections: [
      section("Client communication", "Use AI to draft, not invent, client-ready messages.", ["Buyer follow-up", "Seller updates", "Review requests"]),
      section("Listing work", "Keep MLS facts, local claims, and pricing context outside unverified AI output.", ["Property facts", "Neighborhood claims", "Compliance review"]),
      section("Team workflow", "A brokerage needs shared visibility rather than personal productivity tools only.", ["Lead routing", "Handoffs", "Response-time checks"])
    ],
    related: realEstateRelated,
    dailyReturn: "Return to the daily brief for new prompts and tool-change notes."
  }),
  topic({
    title: "Real Estate AI Software for Lead Follow-Up",
    slug: "real-estate-ai-software-for-lead-follow-up",
    cluster: "real-estate-ai",
    summary: "Compare tools by how well they capture, route, prioritise, and follow up property enquiries.",
    audience: "Agents and brokerages trying to reduce missed leads.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "Lead follow-up is the repeat workflow most likely to create both search demand and daily utility.",
    sections: [
      section("Capture", "Every source needs to land in one system quickly.", ["Portal leads", "Website forms", "Open-house notes"]),
      section("Route", "The right owner and due date matter more than another inbox notification.", ["Agent assignment", "Urgency", "Follow-up deadline"]),
      section("Review", "Brokerages should inspect missed responses and stale leads weekly.", ["Response time", "Conversion by source", "No-activity leads"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use the workflow after open houses and every morning before new enquiries pile up."
  }),
  topic({
    title: "Real Estate Listing Description Prompts",
    slug: "real-estate-listing-description-prompts",
    cluster: "real-estate-ai",
    summary: "Prompt patterns for listing descriptions that separate verified facts from sales copy.",
    audience: "Agents drafting property marketing copy.",
    primaryIntent: "Prompt/template.",
    whyItMatters: "Prompts create return visits because agents can reuse them on every listing.",
    sections: [
      section("Inputs", "Collect the facts before asking AI to draft.", ["Property type", "Rooms", "Features", "Restrictions"]),
      section("Draft", "Ask for multiple copy angles without adding unsupported claims.", ["Luxury", "Family", "Investor"]),
      section("Review", "Check fair housing, local claims, numbers, and property details before publishing.", ["Claims", "Tone", "Accuracy"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use this prompt for every new listing draft."
  }),
  topic({
    title: "Follow Up Boss Alternatives",
    slug: "follow-up-boss-alternatives",
    cluster: "real-estate-ai",
    summary: "When to compare Pipedrive, HubSpot, and other CRMs against a real-estate-specific CRM.",
    audience: "Real estate teams considering a CRM switch.",
    primaryIntent: "Alternatives.",
    whyItMatters: "It gives WorkWise a switching-intent page inside the real estate cluster.",
    sections: [
      section("Need simplicity", "Pipedrive may be enough when lead volume and routing are simple.", ["Pipeline", "Activities", "Simple reports"]),
      section("Need broader marketing", "HubSpot may fit when campaigns and customer data are bigger than property leads.", ["Marketing", "CRM", "Service"]),
      section("Need real estate depth", "Stay with specialist CRMs when portal routing and agent accountability are central.", ["Lead sources", "Assignments", "Team reporting"])
    ],
    related: realEstateRelated,
    dailyReturn: "Check the tool watchlist before switching platforms."
  }),
  topic({
    title: "Canva for Real Estate Marketing",
    slug: "canva-for-real-estate-marketing",
    cluster: "real-estate-ai",
    summary: "How agents can use Canva for listing assets, social posts, brochures, and reusable brand templates.",
    audience: "Agents and small brokerages making marketing assets.",
    primaryIntent: "Tool use case.",
    whyItMatters: "It expands the cluster beyond CRM into daily marketing tasks.",
    sections: [
      section("Listing templates", "Create repeatable assets for property launches.", ["Flyers", "Social cards", "Email graphics"]),
      section("Brand control", "Reusable templates reduce quality swings across agents.", ["Brand kit", "Approved layouts", "Photo rules"]),
      section("Workflow fit", "Pair Canva with listing prompts and CRM follow-up.", ["Draft copy", "Create asset", "Send to lead segment"])
    ],
    related: realEstateRelated,
    dailyReturn: "Return whenever a listing, open house, or price-change post needs a quick asset."
  }),
  topic({
    title: "Matterport for Real Estate Agents",
    slug: "matterport-for-real-estate-agents",
    cluster: "real-estate-ai",
    summary: "Where virtual tours fit inside a real estate marketing and lead qualification workflow.",
    audience: "Agents deciding whether virtual tours are worth adding to listings.",
    primaryIntent: "Tool use case.",
    whyItMatters: "It supports the high-value real estate software cluster with visual marketing intent.",
    sections: [
      section("Best fit", "Virtual tours help when buyers need remote qualification or rich pre-viewing context.", ["Remote buyers", "Premium listings", "Investor screening"]),
      section("Workflow", "Use tour links in listing pages, follow-up emails, and nurture sequences.", ["Listing page", "CRM email", "Viewing prep"]),
      section("Check costs", "Verify hosting, capture, export, and plan limits before recommending it.", ["Monthly cost", "Capture workflow", "Team access"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use the checklist before deciding whether each listing needs a tour."
  }),
  topic({
    title: "AI Workflow for Real Estate Lead Intake",
    slug: "ai-workflow-for-real-estate-lead-intake",
    cluster: "real-estate-ai",
    summary: "A repeatable lead-intake workflow for turning property enquiries into CRM records, qualification notes, and follow-up tasks.",
    audience: "Agents and brokerages trying to respond faster without losing lead context.",
    primaryIntent: "Workflow.",
    whyItMatters: "It turns the real estate cluster into a practical operating system, not just a list of tools.",
    sections: [
      section("Collect the right fields", "Capture enough context to respond usefully without creating a long form nobody finishes.", ["Source", "Property", "Timeline", "Budget if supplied"]),
      section("Create the CRM record", "The enquiry should have an owner, status, and due follow-up task.", ["Owner", "Stage", "Next action"]),
      section("Draft safely", "AI should draft a response from supplied facts and flag missing details.", ["No invented claims", "Verify property facts", "Suggest next step"])
    ],
    related: realEstateRelated,
    dailyReturn: "Use this intake flow every morning and after open-house lead capture."
  }),
  topic({
    title: "Workplace Automation Tools for Small Business",
    slug: "workplace-automation-tools-for-small-business",
    cluster: "automation",
    summary: "A workflow-first guide to automating repeated small-business handoffs without losing review control.",
    audience: "Small business owners and operators comparing automation tools.",
    primaryIntent: "Best tools.",
    whyItMatters: "GSC is already showing workplace automation impressions, and this hub can anchor the automation cluster.",
    sections: [
      section("Start with handoffs", "Automate the steps where information moves between tools.", ["Form to CRM", "Booking to calendar", "Notes to task list"]),
      section("Add AI carefully", "Use AI for summaries and drafts while keeping approvals visible.", ["Draft", "Review", "Publish or send"]),
      section("Monitor failures", "Automation creates value only if someone checks broken runs and stale tasks.", ["Error log", "Weekly review", "Owner"])
    ],
    related: automationRelated,
    dailyReturn: "Return weekly to check failed runs and new workflow ideas."
  }),
  topic({
    title: "Best Workflow Automation Tools",
    slug: "best-workflow-automation-tools",
    cluster: "automation",
    summary: "Compare automation platforms by trigger coverage, app integrations, review steps, and ease of maintenance.",
    audience: "Teams choosing between Zapier, Make, CRM automation, and project-management automation.",
    primaryIntent: "Best tools.",
    whyItMatters: "This is a central high-volume automation concept that supports narrower pages.",
    sections: [
      section("Zapier-style builders", "Best when common apps and simple handoffs matter.", ["Broad app library", "Simple setup", "Clear task history"]),
      section("Make-style builders", "Best when visual scenario design and multi-step logic matter.", ["Branching", "Data transforms", "Scenario control"]),
      section("Native automation", "Best when the workflow lives mostly inside one CRM or project tool.", ["CRM tasks", "Project status", "Notifications"])
    ],
    related: automationRelated,
    dailyReturn: "Use the workflow kit planner every time a repeated manual process appears."
  }),
  topic({
    title: "Zapier vs Make for Small Business",
    slug: "zapier-vs-make-for-small-business",
    cluster: "automation",
    summary: "A plain-English comparison of two automation builders for small teams.",
    audience: "Small businesses deciding which automation builder to learn first.",
    primaryIntent: "Comparison.",
    whyItMatters: "It adds a high-intent comparison inside the automation cluster.",
    sections: [
      section("Choose Zapier when", "The team wants simpler setup and broad app coverage.", ["Common apps", "Quick wins", "Less technical maintenance"]),
      section("Choose Make when", "The workflow needs visual branching, data operations, and more control.", ["Complex scenarios", "Data shaping", "Power users"]),
      section("Check before scaling", "Costs and maintenance depend on volume and workflow complexity.", ["Task volume", "Run history", "Failure alerts"])
    ],
    related: automationRelated,
    dailyReturn: "Return after each workflow launch to compare failures, cost, and maintenance effort."
  }),
  topic({
    title: "ClickUp Automation Use Cases",
    slug: "clickup-automation-use-cases",
    cluster: "automation",
    summary: "Where ClickUp automation helps with intake, status updates, handoffs, and delivery reminders.",
    audience: "Operations teams already using or considering ClickUp.",
    primaryIntent: "Tool use case.",
    whyItMatters: "ClickUp already has early GSC impressions and can support the automation hub.",
    sections: [
      section("Intake to task", "Turn forms and requests into assigned work.", ["Project request", "Owner", "Due date"]),
      section("Status handoff", "Move tasks through repeatable delivery stages.", ["Brief", "In progress", "Review", "Done"]),
      section("Reporting", "Use dashboards for overdue work and blockers.", ["Overdue tasks", "Blocked items", "Workload"])
    ],
    related: automationRelated,
    dailyReturn: "Use the daily brief to find one workflow improvement each workday."
  }),
  topic({
    title: "Asana AI Use Cases",
    slug: "asana-ai-use-cases",
    cluster: "automation",
    summary: "How teams can use Asana and AI features for project summaries, intake, task updates, and delivery checks.",
    audience: "Teams comparing project-management automation.",
    primaryIntent: "Tool use case.",
    whyItMatters: "Asana has early impressions and belongs in the workplace automation cluster.",
    sections: [
      section("Project summaries", "AI summaries are useful when projects have enough structured task context.", ["Milestones", "Risks", "Owners"]),
      section("Intake", "Forms and templates reduce repeated setup work.", ["Request form", "Template", "Assignment rule"]),
      section("Review", "Keep human review for client-facing or high-risk updates.", ["Approval", "Evidence", "Final send"])
    ],
    related: automationRelated,
    dailyReturn: "Return weekly to review overdue tasks and update project summaries."
  }),
  topic({
    title: "Client Onboarding Automation Workflow",
    slug: "client-onboarding-automation-workflow",
    cluster: "automation",
    summary: "A repeatable automation workflow for moving a new client from signed proposal to kickoff.",
    audience: "Consultants, agencies, and service businesses.",
    primaryIntent: "Workflow.",
    whyItMatters: "It connects consultant prompts, workflows, and automation tools into one practical operating asset.",
    sections: [
      section("Intake", "Collect client details, assets, access needs, and success criteria once.", ["Form", "Folder", "CRM record"]),
      section("Kickoff", "Turn the intake into agenda, tasks, and owner assignments.", ["Agenda", "Tasks", "Timeline"]),
      section("Review", "Check assumptions and missing access before the first week stalls.", ["Open questions", "Risks", "Dependencies"])
    ],
    related: automationRelated,
    dailyReturn: "Use this workflow every time a new client signs."
  }),
  topic({
    title: "AI Agents for Small Business",
    slug: "ai-agents-for-small-business",
    cluster: "agent-workflows",
    summary: "A practical guide to where AI agents help small teams and where human owners, review queues, and fallbacks are still required.",
    audience: "Small business owners and operators exploring AI agents without enterprise infrastructure.",
    primaryIntent: "Informational and commercial investigation.",
    whyItMatters: "AI agent searches are growing, but most results are broad. WorkWise can win by grounding agents in real workflows, guardrails, and tools.",
    sections: [
      section("Good agent jobs", "Start with repeated tasks that have clear triggers and visible outputs.", ["Lead routing", "Meeting follow-up", "Support triage"]),
      section("Bad agent jobs", "Avoid vague, high-risk, or decision-heavy work until the process is mature.", ["Hiring decisions", "Legal advice", "Unreviewed refunds"]),
      section("Readiness", "An agent needs data access, owner, review queue, and fallback path.", ["Trigger", "Owner", "Manual fallback"])
    ],
    related: agentRelated,
    dailyReturn: "Run the readiness checker before turning any workflow into an agent."
  }),
  topic({
    title: "AI Agent Workflow Examples",
    slug: "ai-agent-workflow-examples",
    cluster: "agent-workflows",
    summary: "Examples of AI agent workflows for sales, real estate, support, ecommerce, finance, recruiting, and local services.",
    audience: "Operators looking for practical agent ideas they can adapt safely.",
    primaryIntent: "Examples.",
    whyItMatters: "Example-led queries create broad discovery and can route readers into playbooks, recipes, and calculators.",
    sections: [
      section("Sales", "Agents can help draft follow-up and flag stale CRM records.", ["Speed-to-lead", "Call summary", "CRM hygiene"]),
      section("Support", "Agents can classify tickets and draft replies while humans approve risky cases.", ["Refunds", "Complaints", "VIP alerts"]),
      section("Operations", "Agents can prepare reports, intake notes, and document queues.", ["KPI brief", "Document intake", "Policy updates"])
    ],
    related: agentRelated,
    dailyReturn: "Pick one example and check its failure mode in the daily brief."
  }),
  topic({
    title: "AI Agent Readiness Checklist",
    slug: "ai-agent-readiness-checklist",
    cluster: "agent-workflows",
    summary: "A checklist for deciding whether a workflow is ready for an AI agent, automation, or manual cleanup first.",
    audience: "Founders, operators, and team leads evaluating agent rollout risk.",
    primaryIntent: "Checklist.",
    whyItMatters: "Readiness content turns curiosity traffic into repeat tool usage and safer implementation.",
    sections: [
      section("Trigger", "The workflow must start from a reliable event or record.", ["Form submitted", "Transcript saved", "Ticket received"]),
      section("Review", "The agent should know when to route to a human.", ["Customer-facing output", "Sensitive data", "Low confidence"]),
      section("Fallback", "A manual path must exist if the agent fails.", ["Owner", "Runbook", "Alert"])
    ],
    related: agentRelated,
    dailyReturn: "Use the checker whenever a team proposes a new agent."
  }),
  topic({
    title: "AI Sales Agent for Lead Follow-Up",
    slug: "ai-sales-agent-lead-follow-up",
    cluster: "agent-workflows",
    summary: "How to design a sales AI agent that drafts follow-up, updates CRM fields, and escalates hot leads safely.",
    audience: "Sales teams and founders trying to improve response speed.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "Sales-agent queries combine emerging AI demand with WorkWise's existing CRM and Pipedrive authority.",
    sections: [
      section("Inputs", "The agent needs lead source, contact context, need, urgency, and consent notes.", ["Source", "Need", "Urgency"]),
      section("Output", "Keep outputs reviewable: CRM update, task, and draft message.", ["CRM field", "Next action", "Draft"]),
      section("Guardrails", "Do not let the agent promise pricing, availability, or terms without review.", ["Review", "Escalate", "Log"])
    ],
    related: agentRelated,
    dailyReturn: "Review hot-lead agent outputs at the start and end of each day."
  }),
  topic({
    title: "AI Customer Support Agent for Small Business",
    slug: "ai-customer-support-agent-small-business",
    cluster: "agent-workflows",
    summary: "A support-agent guide for ticket triage, reply drafts, refund routing, VIP alerts, and complaint escalation.",
    audience: "Small support and ecommerce teams considering AI-assisted support.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "Support-agent searches can route into support tools, ecommerce stacks, and workflow audits.",
    sections: [
      section("Triage", "Classify urgency, issue type, sentiment, and customer tier.", ["Urgency", "Category", "Tier"]),
      section("Draft", "Use AI to draft, not approve, sensitive responses.", ["Refund", "Complaint", "Account access"]),
      section("Escalate", "Route high-risk cases to humans with context.", ["Owner", "Policy", "Evidence"])
    ],
    related: supportRelated,
    dailyReturn: "Review unresolved high-risk tickets daily."
  }),
  topic({
    title: "AI Agent Guardrails for Customer-Facing Workflows",
    slug: "ai-agent-guardrails-customer-facing-workflows",
    cluster: "agent-workflows",
    summary: "Guardrails for AI agents that draft emails, support replies, client reports, or customer updates.",
    audience: "Teams adding agents to external communication workflows.",
    primaryIntent: "Risk and implementation.",
    whyItMatters: "Guardrail pages build trust and support higher-quality traffic than hype-only agent content.",
    sections: [
      section("Source context", "The agent should reference known data or flag missing fields.", ["Citation", "Missing info", "Confidence"]),
      section("Approval rules", "Customer-facing outputs need clear review thresholds.", ["Human approval", "Escalation", "Audit trail"]),
      section("Fallback", "Manual workflows should stay documented during rollout.", ["Runbook", "Owner", "Rollback"])
    ],
    related: agentRelated,
    dailyReturn: "Return after each failed output and update the guardrail list."
  }),
  topic({
    title: "Best AI Stack for Small Business",
    slug: "best-ai-stack-for-small-business",
    cluster: "ai-stacks",
    summary: "How small businesses should assemble AI tools across intake, CRM, automation, docs, reporting, and customer communication.",
    audience: "Owners and operators deciding what to buy first.",
    primaryIntent: "Best stack.",
    whyItMatters: "Stack searches are commercial, ad-friendly, and connect naturally to WorkWise blueprints and free tools.",
    sections: [
      section("Start with workflow", "A stack should serve a repeated process, not a generic AI ambition.", ["Lead follow-up", "Client onboarding", "Support triage"]),
      section("Add layers", "Most small teams need intake, records, automation, review, and reporting.", ["Forms", "CRM", "Dashboard"]),
      section("Upgrade later", "Upgrade only when volume or visibility requires it.", ["Usage", "Bottleneck", "Cost"])
    ],
    related: stackRelated,
    dailyReturn: "Use the gap analyzer after every tool change."
  }),
  topic({
    title: "AI Stack for Sales Teams",
    slug: "ai-stack-for-sales-teams",
    cluster: "ai-stacks",
    summary: "A practical sales AI stack for lead capture, CRM ownership, meeting notes, follow-up, and pipeline reporting.",
    audience: "Sales teams comparing tools before buying or consolidating software.",
    primaryIntent: "Commercial investigation.",
    whyItMatters: "Sales-stack searches support CRM, automation, and agent playbook traffic.",
    sections: [
      section("CRM layer", "Keep ownership, stage, source, and next action visible.", ["Pipedrive", "HubSpot", "Follow-up"]),
      section("Meeting layer", "Capture calls and turn notes into CRM activity.", ["Fathom", "Fireflies", "Tasks"]),
      section("Automation layer", "Automate lead capture and reminders only after rules are clear.", ["Zapier", "Make", "SLA"])
    ],
    related: stackRelated,
    dailyReturn: "Check stale deals and missed leads every Friday."
  }),
  topic({
    title: "AI Stack for Real Estate Agents",
    slug: "ai-stack-for-real-estate-agents",
    cluster: "ai-stacks",
    summary: "A real estate AI stack for portal leads, viewing notes, listing copy, client follow-up, and brokerage accountability.",
    audience: "Agents and small brokerages choosing practical AI tools.",
    primaryIntent: "Best stack.",
    whyItMatters: "It combines the real estate cluster with buyer-intent stack searches.",
    sections: [
      section("CRM", "Use a CRM that supports agent assignment and fast lead review.", ["Follow Up Boss", "Pipedrive", "HubSpot"]),
      section("Marketing", "Use AI for listing drafts and assets with fact checks.", ["ChatGPT", "Canva", "Matterport"]),
      section("Follow-up", "Connect forms, bookings, viewing notes, and response targets.", ["Typeform", "Calendly", "SLA"])
    ],
    related: stackRelated,
    dailyReturn: "Review new property leads and overdue follow-ups every morning."
  }),
  topic({
    title: "AI Stack for Consultants",
    slug: "ai-stack-for-consultants",
    cluster: "ai-stacks",
    summary: "A consultant AI stack for discovery calls, proposal drafts, onboarding, reports, and implementation tasks.",
    audience: "Consultants and advisory firms building a lean delivery stack.",
    primaryIntent: "Best stack.",
    whyItMatters: "Consultant stack queries connect prompts, proposals, workflow kits, and tools.",
    sections: [
      section("Capture", "Meeting notes and intake forms protect context.", ["Fathom", "Typeform", "Notes"]),
      section("Synthesis", "Use AI assistants to draft proposals and reports from source material.", ["ChatGPT", "Claude", "Evidence"]),
      section("Delivery", "Turn decisions into tasks and implementation owners.", ["ClickUp", "Asana", "Review"])
    ],
    related: stackRelated,
    dailyReturn: "Turn each call into tasks before the next client meeting."
  }),
  topic({
    title: "AI Stack for Marketing Agencies",
    slug: "ai-stack-for-marketing-agencies",
    cluster: "ai-stacks",
    summary: "An agency AI stack for research, campaign briefs, content production, approvals, reporting, and scope control.",
    audience: "Small agencies and fractional marketing teams.",
    primaryIntent: "Best stack.",
    whyItMatters: "Agency stack content can capture commercial searches around tools, briefs, and reporting workflows.",
    sections: [
      section("Research", "Separate research tools from copy tools so weak inputs do not become polished guesses.", ["Semrush", "Ahrefs", "Source notes"]),
      section("Production", "Use AI and design tools inside a managed approval workflow.", ["Jasper", "Canva", "ClickUp"]),
      section("Reporting", "Create checked commentary and next actions from source metrics.", ["Airtable", "Notion", "Client report"])
    ],
    related: stackRelated,
    dailyReturn: "Review campaign blockers and report inputs weekly."
  }),
  topic({
    title: "AI Stack for Ecommerce",
    slug: "ai-stack-for-ecommerce",
    cluster: "ecommerce-ai",
    summary: "An ecommerce AI stack for product launches, lifecycle email, product copy, support, reviews, and recovery workflows.",
    audience: "Shopify and online store owners.",
    primaryIntent: "Best stack.",
    whyItMatters: "Ecommerce stack searches are commercial and connect to ad-friendly tool categories.",
    sections: [
      section("Launch", "Coordinate copy, assets, email, and support before publishing.", ["Shopify Magic", "Klaviyo", "Canva"]),
      section("Support", "Connect support triage and refund review to product context.", ["Gorgias", "Zendesk", "Policy"]),
      section("Retention", "Use reviews, FAQs, and lifecycle messages to improve repeat purchase.", ["Reviews", "FAQ", "VIP"])
    ],
    related: ecommerceRelated,
    dailyReturn: "Check launch blockers and support spikes daily during campaigns."
  }),
  topic({
    title: "AI Tools for Product Launches",
    slug: "ai-tools-for-product-launches",
    cluster: "ecommerce-ai",
    summary: "Tools and workflows for drafting product copy, preparing lifecycle emails, creating assets, and reviewing launch claims.",
    audience: "Ecommerce teams preparing product or seasonal launches.",
    primaryIntent: "Tool use case.",
    whyItMatters: "Product-launch searches let WorkWise connect ecommerce tools with workflow recipes and ROI calculators.",
    sections: [
      section("Copy", "Draft product pages and emails from verified facts.", ["Product facts", "Claims", "Discounts"]),
      section("Assets", "Create launch visuals and support materials with review gates.", ["Canva", "Support macros", "QA"]),
      section("Measure", "Review launch readiness before paid traffic or campaign sends.", ["Checklist", "Risks", "Owners"])
    ],
    related: ecommerceRelated,
    dailyReturn: "Use the product launch checklist before every campaign send."
  }),
  topic({
    title: "AI Customer Support Tools for Ecommerce",
    slug: "ai-customer-support-tools-for-ecommerce",
    cluster: "support-ops",
    summary: "Compare ecommerce support tools by ticket triage, refund workflows, VIP alerts, review mining, and FAQ updates.",
    audience: "Store owners and support teams choosing support AI tools.",
    primaryIntent: "Best tools.",
    whyItMatters: "Support and ecommerce overlap creates a strong topic cluster with tool-buying intent.",
    sections: [
      section("Triage", "The first layer is classifying and routing messages correctly.", ["Urgency", "Customer tier", "Topic"]),
      section("Review", "Refunds, complaints, and account issues need human approval.", ["Policy", "Owner", "Escalation"]),
      section("Improve", "Support tags should feed FAQs, product pages, and launch planning.", ["FAQ", "Macros", "Review mining"])
    ],
    related: supportRelated,
    dailyReturn: "Review high-risk tickets and repeat questions every day."
  }),
  topic({
    title: "Gorgias vs Zendesk for Ecommerce AI Support",
    slug: "gorgias-vs-zendesk-ecommerce-ai-support",
    cluster: "support-ops",
    summary: "How ecommerce teams should compare Gorgias and Zendesk around AI support workflows, routing, and review.",
    audience: "Ecommerce teams shortlisting support platforms.",
    primaryIntent: "Comparison.",
    whyItMatters: "Comparison queries are high intent and support the ecommerce/support stack pages.",
    sections: [
      section("Choose Gorgias when", "Store context and ecommerce workflows matter most.", ["Shopify", "Order context", "Macros"]),
      section("Choose Zendesk when", "Broader support operations and multi-channel governance matter.", ["Scale", "Support ops", "Routing"]),
      section("Check AI fit", "AI features still need review gates and policy context.", ["Refunds", "Complaints", "VIP"])
    ],
    related: supportRelated,
    dailyReturn: "Run the support workflow audit before switching platforms."
  }),
  topic({
    title: "AI Refund Workflow for Ecommerce",
    slug: "ai-refund-workflow-ecommerce",
    cluster: "support-ops",
    summary: "A workflow for using AI to prepare refund responses without letting it approve money, exceptions, or policy changes.",
    audience: "Ecommerce support managers and store owners.",
    primaryIntent: "Workflow.",
    whyItMatters: "Refund workflows are repeated, high-risk, and useful for support tool comparisons.",
    sections: [
      section("Check order context", "The workflow starts with order, policy, and customer history.", ["Order", "Policy", "Customer tier"]),
      section("Draft response", "AI can prepare wording but should not decide approval.", ["Draft", "Evidence", "Tone"]),
      section("Escalate", "Human review handles exceptions, angry customers, and edge cases.", ["Manager", "Refund", "Complaint"])
    ],
    related: supportRelated,
    dailyReturn: "Review refund queues daily and update macros from repeated issues."
  }),
  topic({
    title: "AI Tools for Local Service Businesses",
    slug: "ai-tools-for-local-service-businesses",
    cluster: "local-services",
    summary: "AI tools and workflows for quotes, bookings, reviews, complaints, reminders, and customer follow-up in local service businesses.",
    audience: "Local trades, service providers, and owner-led teams.",
    primaryIntent: "Best tools.",
    whyItMatters: "Local-service searches broaden WorkWise beyond SaaS teams while staying workflow-first.",
    sections: [
      section("Lead response", "Fast quote and booking follow-up matters more than generic AI features.", ["Quote", "Booking", "SLA"]),
      section("Customer proof", "Review requests and complaint recovery support local visibility.", ["Reviews", "Complaints", "Follow-up"]),
      section("Operations", "Reminders and job notes keep small teams organized.", ["Materials", "Maintenance", "Owner"])
    ],
    related: localServicesRelated,
    dailyReturn: "Check quote follow-ups and bookings every morning."
  }),
  topic({
    title: "AI Quote Follow-Up Workflow",
    slug: "ai-quote-follow-up-workflow",
    cluster: "local-services",
    summary: "A quote follow-up workflow for local service teams that avoids stale pricing, wrong customers, and unclear scope.",
    audience: "Trades and service businesses that send estimates or quotes.",
    primaryIntent: "Workflow.",
    whyItMatters: "Quote follow-up is a repeated commercial workflow that can drive tool and calculator usage.",
    sections: [
      section("Trigger", "Start when a quote reaches its follow-up date.", ["Quote sent", "Follow-up date", "Owner"]),
      section("Review", "Check price, scope, availability, and customer context before sending.", ["Price", "Scope", "Calendar"]),
      section("Close loop", "Log the response and convert accepted quotes into jobs.", ["Accepted", "Deferred", "Closed"])
    ],
    related: localServicesRelated,
    dailyReturn: "Review due follow-ups before starting new quotes."
  }),
  topic({
    title: "AI Review Request Workflow for Service Businesses",
    slug: "ai-review-request-workflow-service-businesses",
    cluster: "local-services",
    summary: "How to ask happy customers for reviews after job completion while routing complaints to a human first.",
    audience: "Local service teams trying to improve review generation safely.",
    primaryIntent: "Workflow.",
    whyItMatters: "Review request searches connect local-service traffic to repeatable tools and daily routines.",
    sections: [
      section("Eligibility", "Do not ask unresolved or unhappy customers for reviews.", ["Completion", "Satisfaction", "Complaint check"]),
      section("Message", "Draft short, specific review requests with the correct platform link.", ["Tone", "Link", "Reminder"]),
      section("Follow-up", "Use one reminder and log the outcome.", ["Reminder", "Status", "No spam"])
    ],
    related: localServicesRelated,
    dailyReturn: "Send review requests for yesterday's completed jobs."
  }),
  topic({
    title: "Best AI Tools for Marketing Teams",
    slug: "best-ai-tools-for-marketing-teams",
    cluster: "marketing-content",
    summary: "A workflow-first guide to AI tools for briefs, research, content drafts, approvals, social repurposing, and campaign reporting.",
    audience: "Small marketing teams, agencies, and founders choosing AI tools for repeatable content operations.",
    primaryIntent: "Best tools and commercial investigation.",
    whyItMatters: "Marketing AI searches are broad and competitive, so WorkWise should win by tying tools to briefs, approvals, reporting, and reusable workflows.",
    sections: [
      section("Brief first", "Marketing AI works best when the campaign brief is structured before tools start drafting.", ["Audience", "Offer", "Evidence"]),
      section("Approval flow", "Keep brand, claims, compliance, and client approval visible.", ["Review owner", "Fact check", "Publish status"]),
      section("Reporting loop", "Campaign reporting should feed the next brief instead of sitting in a slide deck.", ["Performance notes", "Learnings", "Next test"])
    ],
    related: marketingContentRelated,
    dailyReturn: "Use the daily brief to pick one campaign asset to improve or repurpose."
  }),
  topic({
    title: "AI Content Workflow for Small Business",
    slug: "ai-content-workflow-small-business",
    cluster: "marketing-content",
    summary: "A practical content workflow for turning ideas, customer questions, and source notes into reviewed articles, emails, and social posts.",
    audience: "Owners, marketers, and small agencies trying to publish consistently without lowering quality.",
    primaryIntent: "Workflow.",
    whyItMatters: "Content searches can be low quality unless the page gives readers a repeatable operating system with review gates.",
    sections: [
      section("Source notes", "Start with customer questions, product facts, sales objections, and search intent.", ["Questions", "Facts", "Intent"]),
      section("Draft safely", "AI can structure and rewrite, but source claims need review before publishing.", ["Outline", "Draft", "Claims"]),
      section("Repurpose", "One approved article can become email, social, sales enablement, and FAQ updates.", ["Email", "Social", "FAQ"])
    ],
    related: marketingContentRelated,
    dailyReturn: "Return daily to repurpose one approved asset into another channel."
  }),
  topic({
    title: "AI SEO Content Brief Workflow",
    slug: "ai-seo-content-brief-workflow",
    cluster: "marketing-content",
    summary: "How to build SEO content briefs with search intent, internal links, evidence, outlines, and quality checks before drafting.",
    audience: "SEO teams, agencies, and content leads building repeatable brief processes.",
    primaryIntent: "Workflow and template.",
    whyItMatters: "Brief workflows attract search traffic while pushing readers into templates, prompts, and internal-link journeys.",
    sections: [
      section("Intent map", "Separate informational, comparison, and buying intent before writing.", ["Query", "SERP angle", "Reader job"]),
      section("Internal links", "Every brief should connect to a hub, related tool, comparison, and free tool.", ["Hub", "Tool", "Calculator"]),
      section("Quality checks", "Require source notes, not-for guidance, and a refresh trigger.", ["Evidence", "Cautions", "Refresh"])
    ],
    related: marketingContentRelated,
    dailyReturn: "Use the workflow before commissioning or refreshing one content page."
  }),
  topic({
    title: "AI Social Media Repurposing Workflow",
    slug: "ai-social-media-repurposing-workflow",
    cluster: "marketing-content",
    summary: "A workflow for turning approved blogs, webinars, podcasts, and customer stories into reviewed social posts and short-form assets.",
    audience: "Small marketing teams and agencies that need more distribution from each asset.",
    primaryIntent: "Workflow.",
    whyItMatters: "Repurposing content creates returning-user utility because teams can reuse the workflow every publishing day.",
    sections: [
      section("Choose source", "Only repurpose content that has already passed factual and brand review.", ["Article", "Webinar", "Case note"]),
      section("Create variants", "Draft posts for different channels without changing the core claim.", ["LinkedIn", "Email", "Short video"]),
      section("Review and log", "Track which angle performed so the next repurpose round improves.", ["Claim check", "Owner", "Result"])
    ],
    related: marketingContentRelated,
    dailyReturn: "Repurpose one approved asset into three channel-specific drafts each morning."
  }),
  topic({
    title: "AI Marketing Reporting Workflow",
    slug: "ai-marketing-reporting-workflow",
    cluster: "marketing-content",
    summary: "Turn campaign metrics into concise commentary, next actions, blockers, and client-ready reports without inventing performance claims.",
    audience: "Agencies, fractional marketers, and in-house teams preparing weekly or monthly reports.",
    primaryIntent: "Workflow.",
    whyItMatters: "Reporting workflows bridge marketing searches with analytics, client retention, and repeat weekly usage.",
    sections: [
      section("Gather metrics", "Pull source numbers before asking AI to summarize anything.", ["Traffic", "Leads", "Spend"]),
      section("Explain changes", "Separate what happened from why it may have happened.", ["Observation", "Hypothesis", "Confidence"]),
      section("Recommend next actions", "Every report should end with owners, tests, and blockers.", ["Owner", "Test", "Blocker"])
    ],
    related: marketingContentRelated,
    dailyReturn: "Use the report workflow during every weekly performance review."
  }),
  topic({
    title: "AI Tools for Bookkeeping and Accounting",
    slug: "ai-tools-for-bookkeeping-accounting",
    cluster: "finance-admin",
    summary: "Compare AI and automation tools for receipt capture, invoice follow-up, reconciliation support, reporting, and exception review.",
    audience: "Small businesses, bookkeepers, finance admins, and accounting practices reviewing AI workflows.",
    primaryIntent: "Best tools and commercial investigation.",
    whyItMatters: "Finance searches are commercially valuable, but WorkWise must earn trust by emphasizing review, records, and exception handling.",
    sections: [
      section("Capture", "Start with clean receipt, invoice, and payment records.", ["Receipts", "Invoices", "Bank feed"]),
      section("Review exceptions", "AI can flag likely issues, but finance decisions need human review.", ["Duplicates", "Missing fields", "Approvals"]),
      section("Report clearly", "Monthly summaries should explain cash position and blockers without pretending to be accounting advice.", ["Cash", "Overdue", "Risks"])
    ],
    related: financeAdminRelated,
    dailyReturn: "Review new receipts, overdue invoices, and finance exceptions at the same time each day."
  }),
  topic({
    title: "AI Invoice Processing Workflow",
    slug: "ai-invoice-processing-workflow",
    cluster: "finance-admin",
    summary: "A workflow for capturing invoices, checking required fields, routing approvals, and logging payment status.",
    audience: "Finance admins and owner-led teams trying to reduce invoice inbox chaos.",
    primaryIntent: "Workflow.",
    whyItMatters: "Invoice processing is a repeated operational search that can route into calculators and software buying checks.",
    sections: [
      section("Capture invoice", "Every invoice needs a source, supplier, due date, amount, and owner.", ["Supplier", "Due date", "Amount"]),
      section("Approve safely", "Route exceptions to a human before payment or customer communication.", ["Mismatch", "Duplicate", "Missing PO"]),
      section("Close loop", "Log status and next action so overdue or blocked invoices surface quickly.", ["Paid", "Blocked", "Follow-up"])
    ],
    related: financeAdminRelated,
    dailyReturn: "Run the invoice queue review before approving payments."
  }),
  topic({
    title: "AI Expense Management Workflow",
    slug: "ai-expense-management-workflow",
    cluster: "finance-admin",
    summary: "Use AI and automation to collect receipts, classify expenses, flag missing details, and prepare review queues.",
    audience: "Small teams handling expenses across email, apps, cards, and spreadsheets.",
    primaryIntent: "Workflow.",
    whyItMatters: "Expense workflows create sticky repeat visits because teams need a routine, not a one-time article.",
    sections: [
      section("Collect evidence", "Receipts and notes should land in one place before classification.", ["Receipt", "Category", "Project"]),
      section("Flag exceptions", "AI should surface missing VAT, unclear vendors, or policy mismatches for review.", ["Missing fields", "Policy", "Duplicate"]),
      section("Prepare export", "Keep the final system of record clean before monthly close.", ["Export", "Owner", "Month end"])
    ],
    related: financeAdminRelated,
    dailyReturn: "Clear receipt exceptions before they become month-end cleanup."
  }),
  topic({
    title: "QuickBooks AI Use Cases for Small Business",
    slug: "quickbooks-ai-use-cases-small-business",
    cluster: "finance-admin",
    summary: "Where QuickBooks-style accounting workflows can benefit from AI support: receipts, invoices, cash-flow notes, reports, and admin reminders.",
    audience: "Small businesses using or comparing accounting software workflows.",
    primaryIntent: "Use cases.",
    whyItMatters: "Tool-specific finance searches are high-intent, but the page should stay workflow-led and cautious about accounting decisions.",
    sections: [
      section("Admin assistance", "Use AI to organize context around accounting tasks, not to replace professional judgment.", ["Receipts", "Invoices", "Notes"]),
      section("Cash-flow commentary", "Draft plain-English explanations from source reports and known facts.", ["Overdue", "Upcoming", "Seasonality"]),
      section("Workflow fit", "Check integrations, permissions, exports, and review before buying add-ons.", ["Permissions", "Exports", "Review"])
    ],
    related: financeAdminRelated,
    dailyReturn: "Return weekly to summarize overdue invoices and cash-flow blockers."
  }),
  topic({
    title: "Cash Flow Forecasting AI Workflow",
    slug: "cash-flow-forecasting-ai-workflow",
    cluster: "finance-admin",
    summary: "A cautious workflow for preparing cash-flow notes from known invoices, expenses, upcoming commitments, and assumptions.",
    audience: "Founders and finance admins preparing practical cash-flow reviews.",
    primaryIntent: "Workflow and checklist.",
    whyItMatters: "Cash-flow content attracts serious business readers and supports repeat weekly planning habits.",
    sections: [
      section("Use known records", "Forecasts should start from actual invoices, bills, payroll, taxes, and commitments.", ["Receivables", "Payables", "Commitments"]),
      section("Label assumptions", "AI-generated commentary must separate facts from assumptions.", ["Known", "Assumed", "Unknown"]),
      section("Review decisions", "Use the output for planning conversations, not as financial advice.", ["Owner", "Action", "Risk"])
    ],
    related: financeAdminRelated,
    dailyReturn: "Refresh the forecast notes before the weekly finance check-in."
  }),
  topic({
    title: "AI Recruiting Tools for Small Business",
    slug: "ai-recruiting-tools-small-business",
    cluster: "recruiting-hr",
    summary: "Compare AI recruiting workflows for job descriptions, intake, screening, interview notes, candidate scorecards, and onboarding.",
    audience: "Small businesses, recruiters, and hiring managers improving hiring operations.",
    primaryIntent: "Best tools and commercial investigation.",
    whyItMatters: "Recruiting AI searches are high demand and risk-sensitive, so WorkWise should lead with structured review and fairness checks.",
    sections: [
      section("Define the role", "Start with a clear hiring intake and scorecard before screening candidates.", ["Responsibilities", "Must-haves", "Scorecard"]),
      section("Screen carefully", "AI can summarize evidence, but humans must own hiring decisions.", ["Evidence", "Bias check", "Reviewer"]),
      section("Improve handoff", "Interview notes should become scorecards and onboarding tasks.", ["Notes", "Decision", "Onboarding"])
    ],
    related: recruitingHrRelated,
    dailyReturn: "Review candidate queues and missing scorecard evidence every hiring day."
  }),
  topic({
    title: "AI Candidate Screening Workflow",
    slug: "ai-candidate-screening-workflow",
    cluster: "recruiting-hr",
    summary: "A candidate screening workflow that turns resumes and role criteria into evidence summaries for human review.",
    audience: "Recruiters and hiring managers trying to screen consistently without outsourcing judgment to AI.",
    primaryIntent: "Workflow.",
    whyItMatters: "Screening searches are abundant, but the trust angle is reviewable evidence rather than automated rejection.",
    sections: [
      section("Set criteria", "Screening needs a role scorecard before any resume summary.", ["Must-have", "Nice-to-have", "Disqualifier"]),
      section("Summarize evidence", "Ask AI to cite resume evidence and flag missing information.", ["Evidence", "Gap", "Question"]),
      section("Human decision", "Keep shortlist, reject, and interview decisions with a named human owner.", ["Reviewer", "Reason", "Next step"])
    ],
    related: recruitingHrRelated,
    dailyReturn: "Use the scorecard review at the start of each hiring block."
  }),
  topic({
    title: "AI Interview Notes to Scorecard Workflow",
    slug: "ai-interview-notes-to-scorecard-workflow",
    cluster: "recruiting-hr",
    summary: "Turn interview transcripts and notes into structured scorecards, follow-up questions, and hiring committee summaries.",
    audience: "Hiring teams that run interviews but struggle to compare candidates consistently.",
    primaryIntent: "Workflow.",
    whyItMatters: "Interview note workflows connect meeting AI, recruiting, and repeat hiring operations.",
    sections: [
      section("Capture notes", "Collect transcript notes with consent and keep sensitive data access limited.", ["Consent", "Transcript", "Access"]),
      section("Map to scorecard", "Summaries should map evidence to agreed criteria.", ["Criteria", "Evidence", "Concern"]),
      section("Prepare review", "Use AI to draft questions and summary, then discuss as a human team.", ["Follow-up", "Summary", "Decision"])
    ],
    related: recruitingHrRelated,
    dailyReturn: "Process interview notes before the next candidate discussion."
  }),
  topic({
    title: "AI Employee Onboarding Workflow",
    slug: "ai-employee-onboarding-workflow",
    cluster: "recruiting-hr",
    summary: "A workflow for turning accepted offers into onboarding checklists, system access tasks, training notes, and manager reminders.",
    audience: "Small businesses and HR admins improving new-hire onboarding.",
    primaryIntent: "Workflow.",
    whyItMatters: "Onboarding expands WorkWise beyond hiring into repeat HR operations and daily checklists.",
    sections: [
      section("Create checklist", "Onboarding needs role, start date, systems, training, and owner fields.", ["Role", "Start date", "Owner"]),
      section("Route access", "System access and data permissions should use review gates.", ["Email", "Tools", "Permissions"]),
      section("Follow up", "Managers need reminders for first-day, first-week, and first-month checks.", ["Day one", "Week one", "Month one"])
    ],
    related: recruitingHrRelated,
    dailyReturn: "Use the onboarding checklist during every new-hire week."
  }),
  topic({
    title: "AI Job Description Generator Workflow",
    slug: "ai-job-description-generator-workflow",
    cluster: "recruiting-hr",
    summary: "Generate job descriptions from role intake, responsibilities, requirements, salary context, and inclusive language checks.",
    audience: "Founders, recruiters, and hiring managers writing clear job posts.",
    primaryIntent: "Template and workflow.",
    whyItMatters: "Job-description queries are evergreen and can feed recruiting prompts, scorecards, and onboarding workflows.",
    sections: [
      section("Role intake", "Gather role outcomes before drafting responsibilities.", ["Outcome", "Team", "Success measures"]),
      section("Write clearly", "Use AI to improve clarity while checking requirements and claims.", ["Responsibilities", "Requirements", "Benefits"]),
      section("Review bias", "Check language for unnecessary barriers and vague requirements.", ["Inclusive wording", "Must-have", "Salary context"])
    ],
    related: recruitingHrRelated,
    dailyReturn: "Refresh job posts when screening reveals unclear role criteria."
  }),
  topic({
    title: "AI Reporting Tools for Small Business",
    slug: "ai-reporting-tools-small-business",
    cluster: "analytics-reporting",
    summary: "A practical guide to AI reporting workflows for dashboards, weekly KPI briefs, client reports, and exception summaries.",
    audience: "Operators, founders, agencies, and team leads improving reporting without adding heavy BI work.",
    primaryIntent: "Best tools and commercial investigation.",
    whyItMatters: "Reporting queries connect many WorkWise clusters and create weekly return habits.",
    sections: [
      section("Source data", "AI reporting is only useful when source metrics are clean and named.", ["Source", "Metric", "Owner"]),
      section("Commentary", "Use AI to draft plain-language explanations from known numbers.", ["Trend", "Cause", "Confidence"]),
      section("Action loop", "Reports should trigger owners and next actions.", ["Action", "Owner", "Due date"])
    ],
    related: analyticsReportingRelated,
    dailyReturn: "Review one KPI exception and one next action every workday."
  }),
  topic({
    title: "Weekly KPI Report Automation",
    slug: "weekly-kpi-report-automation",
    cluster: "analytics-reporting",
    summary: "Automate weekly KPI collection, commentary drafts, exception flags, and owner follow-up without hiding the source data.",
    audience: "Small teams and agencies preparing recurring reports.",
    primaryIntent: "Workflow.",
    whyItMatters: "Weekly report searches support repeat usage and link naturally to reporting templates and free tools.",
    sections: [
      section("Collect metrics", "Pull the same source metrics each week so changes are comparable.", ["Traffic", "Pipeline", "Revenue"]),
      section("Draft commentary", "Ask AI for observations and questions, not unsupported conclusions.", ["Observation", "Question", "Risk"]),
      section("Assign follow-up", "Every exception needs a named owner or it becomes report theatre.", ["Owner", "Due date", "Next step"])
    ],
    related: analyticsReportingRelated,
    dailyReturn: "Return every Friday to prepare the next weekly KPI brief."
  }),
  topic({
    title: "AI Dashboard Commentary Workflow",
    slug: "ai-dashboard-commentary-workflow",
    cluster: "analytics-reporting",
    summary: "Turn dashboard changes into concise commentary, confidence notes, and questions for the next team review.",
    audience: "Teams with dashboards that need better interpretation and follow-up.",
    primaryIntent: "Workflow.",
    whyItMatters: "Dashboard commentary pages capture analytics demand while emphasizing action over generic BI content.",
    sections: [
      section("Name the metric", "Each comment should point to the exact metric, period, and source.", ["Metric", "Period", "Source"]),
      section("Separate facts", "Distinguish observed movement from possible reasons.", ["Fact", "Hypothesis", "Unknown"]),
      section("Create questions", "Good commentary helps the team decide what to inspect next.", ["Segment", "Owner", "Follow-up"])
    ],
    related: analyticsReportingRelated,
    dailyReturn: "Review one dashboard movement before the daily or weekly team check-in."
  }),
  topic({
    title: "AI Data Cleanup Workflow for Small Business",
    slug: "ai-data-cleanup-workflow-small-business",
    cluster: "analytics-reporting",
    summary: "A workflow for finding duplicate records, missing fields, inconsistent names, and risky exports before reporting or automation.",
    audience: "Operators cleaning CRM, spreadsheet, and workflow data.",
    primaryIntent: "Workflow and checklist.",
    whyItMatters: "Data cleanup is the quiet blocker behind CRM, automation, reporting, and AI agent success.",
    sections: [
      section("Profile the data", "Find blanks, duplicates, inconsistent labels, and stale records.", ["Blank fields", "Duplicates", "Old records"]),
      section("Clean in stages", "Avoid bulk changes without backups and review.", ["Backup", "Sample", "Review"]),
      section("Prevent relapse", "Add required fields, owners, and weekly cleanup checks.", ["Required field", "Owner", "Cadence"])
    ],
    related: analyticsReportingRelated,
    dailyReturn: "Clear one data-quality queue before running automations or reports."
  }),
  topic({
    title: "Google Sheets AI Workflows for Small Business",
    slug: "google-sheets-ai-workflows-small-business",
    cluster: "analytics-reporting",
    summary: "Use spreadsheet AI workflows for cleanup, classification, summaries, draft reporting, and lightweight operations tracking.",
    audience: "Small teams that still run meaningful workflows in spreadsheets.",
    primaryIntent: "Use cases.",
    whyItMatters: "Spreadsheet AI searches are accessible, high volume, and bridge low-tech teams into WorkWise workflows.",
    sections: [
      section("Clean tables", "Use AI to spot inconsistent labels and missing fields before formulas break.", ["Labels", "Missing fields", "Duplicates"]),
      section("Classify rows", "Draft categories for leads, expenses, tickets, or feedback with review.", ["Category", "Confidence", "Reviewer"]),
      section("Summarize safely", "Generate summaries from selected rows and verify totals in the sheet.", ["Summary", "Total", "Assumption"])
    ],
    related: analyticsReportingRelated,
    dailyReturn: "Use one spreadsheet cleanup or classification check before updating reports."
  }),
  topic({
    title: "AI Policy Document Workflow",
    slug: "ai-policy-document-workflow",
    cluster: "compliance-risk",
    summary: "A workflow for monitoring policy documents, summarizing proposed updates, routing review, and logging decisions.",
    audience: "Small businesses managing internal policies, SOPs, vendor rules, and client requirements.",
    primaryIntent: "Workflow.",
    whyItMatters: "Policy content builds trust and supports AI adoption topics without drifting into hype.",
    sections: [
      section("Track source", "Keep the current document, source owner, and change history visible.", ["Document", "Owner", "Version"]),
      section("Summarize change", "AI can draft a summary, but reviewers must inspect the source.", ["Change", "Impact", "Question"]),
      section("Log decision", "Record approval, rejection, follow-up tasks, and next review date.", ["Decision", "Task", "Review date"])
    ],
    related: complianceRiskRelated,
    dailyReturn: "Check policy changes before rolling out new tools or workflows."
  }),
  topic({
    title: "AI Privacy Review Checklist for Small Business",
    slug: "ai-privacy-review-checklist-small-business",
    cluster: "compliance-risk",
    summary: "A practical checklist for reviewing customer data, vendor settings, retention, training use, permissions, and human review.",
    audience: "Owners and operators adding AI tools to workflows that touch customer, employee, or client data.",
    primaryIntent: "Checklist.",
    whyItMatters: "Privacy review searches attract serious buyers and strengthen trust across every AI tool page.",
    sections: [
      section("Data map", "List what data enters the tool and where it comes from.", ["Customer data", "Employee data", "Client data"]),
      section("Vendor settings", "Check retention, training use, exports, permissions, and admin controls.", ["Retention", "Training", "Export"]),
      section("Review threshold", "Set stricter review for sensitive or customer-facing outputs.", ["Sensitive data", "Approval", "Log"])
    ],
    related: complianceRiskRelated,
    dailyReturn: "Use the checklist before trialing any new AI tool."
  }),
  topic({
    title: "AI Vendor Risk Assessment Workflow",
    slug: "ai-vendor-risk-assessment-workflow",
    cluster: "compliance-risk",
    summary: "Assess AI and SaaS vendors by data exposure, permissions, pricing risk, export options, support, and rollout complexity.",
    audience: "Small-business buyers and operators comparing AI vendors before purchase.",
    primaryIntent: "Commercial investigation and checklist.",
    whyItMatters: "Vendor-risk content turns buyer-intent traffic into useful evaluation habits and supports affiliate trust.",
    sections: [
      section("Scope the workflow", "Risk depends on what the vendor will touch and who will use it.", ["Workflow", "Users", "Data"]),
      section("Ask vendor questions", "Gather evidence on security, privacy, billing, exports, and support.", ["Security", "Billing", "Export"]),
      section("Decide pilot terms", "Start with a narrow pilot and named exit criteria.", ["Pilot", "Owner", "Exit"])
    ],
    related: complianceRiskRelated,
    dailyReturn: "Run this assessment before every paid software decision."
  }),
  topic({
    title: "AI Contract Review Workflow for Small Business",
    slug: "ai-contract-review-workflow-small-business",
    cluster: "compliance-risk",
    summary: "A cautious workflow for summarizing contract terms, questions, obligations, and review items before professional legal review.",
    audience: "Small businesses organizing contract notes before asking a qualified professional.",
    primaryIntent: "Workflow and checklist.",
    whyItMatters: "Contract workflows can capture high-value searches when the page is careful: organize notes, do not replace legal advice.",
    sections: [
      section("Extract basics", "Summarize parties, dates, fees, obligations, renewal, cancellation, and unusual clauses.", ["Parties", "Fees", "Renewal"]),
      section("Flag questions", "AI should create questions for review, not decide legal risk.", ["Obligation", "Ambiguity", "Question"]),
      section("Route review", "Send flagged issues to the accountable owner or qualified adviser.", ["Owner", "Adviser", "Decision"])
    ],
    related: complianceRiskRelated,
    dailyReturn: "Use the workflow to prepare review notes before signing or renewing vendor agreements."
  }),
  topic({
    title: "AI Data Retention Workflow",
    slug: "ai-data-retention-workflow",
    cluster: "compliance-risk",
    summary: "A workflow for reviewing what data AI tools store, how long it stays there, who can access it, and when it should be deleted.",
    audience: "Small teams managing privacy, client data, and internal tool hygiene.",
    primaryIntent: "Workflow.",
    whyItMatters: "Retention questions show up before and after tool adoption, creating both acquisition and return visits.",
    sections: [
      section("Inventory tools", "List AI tools, data categories, admins, and connected apps.", ["Tool", "Data", "Admin"]),
      section("Check settings", "Review retention, training use, deletion controls, and exports.", ["Retention", "Deletion", "Export"]),
      section("Schedule cleanup", "Set a recurring review for stale prompts, uploads, exports, and inactive users.", ["Stale upload", "Inactive user", "Review date"])
    ],
    related: complianceRiskRelated,
    dailyReturn: "Run the retention review monthly and after tool changes."
  }),
  topic({
    title: "AI Customer Success Tools for Small Business",
    slug: "ai-customer-success-tools-small-business",
    cluster: "customer-success",
    summary: "Compare AI workflows for onboarding, support handoffs, renewal reminders, feedback analysis, churn review, and customer reporting.",
    audience: "Customer success teams, founders, and operators improving retention workflows.",
    primaryIntent: "Best tools and commercial investigation.",
    whyItMatters: "Customer-success searches sit close to revenue, retention, support, and CRM tool decisions.",
    sections: [
      section("Onboard", "Create clear onboarding tasks, owners, customer goals, and first-value milestones.", ["Goal", "Owner", "Milestone"]),
      section("Monitor risk", "AI can summarize signals, but account owners should decide outreach.", ["Usage", "Tickets", "Sentiment"]),
      section("Close loop", "Feedback should feed product notes, help docs, and renewal plans.", ["Feedback", "Roadmap", "Renewal"])
    ],
    related: customerSuccessRelated,
    dailyReturn: "Review at-risk customers and onboarding blockers every morning."
  }),
  topic({
    title: "AI Churn Risk Review Workflow",
    slug: "ai-churn-risk-review-workflow",
    cluster: "customer-success",
    summary: "A workflow for summarizing support tickets, usage notes, renewal dates, sentiment, and owner actions for at-risk customers.",
    audience: "SaaS, service, and subscription businesses trying to spot churn earlier.",
    primaryIntent: "Workflow.",
    whyItMatters: "Churn workflows have strong commercial value and natural daily or weekly return loops.",
    sections: [
      section("Collect signals", "Look at usage, tickets, complaints, low engagement, and renewal timing.", ["Usage", "Tickets", "Renewal"]),
      section("Draft risk note", "AI can assemble the context and questions for the account owner.", ["Context", "Concern", "Question"]),
      section("Assign action", "The output must become a specific outreach or recovery action.", ["Owner", "Message", "Date"])
    ],
    related: customerSuccessRelated,
    dailyReturn: "Review churn risk before weekly customer-success planning."
  }),
  topic({
    title: "Customer Feedback to Roadmap Workflow",
    slug: "customer-feedback-to-roadmap-workflow",
    cluster: "customer-success",
    summary: "Turn customer feedback from calls, tickets, surveys, and reviews into themes, evidence, roadmap candidates, and follow-up tasks.",
    audience: "Small product, support, and customer-success teams collecting customer feedback.",
    primaryIntent: "Workflow.",
    whyItMatters: "Feedback workflows connect support, product, reviews, and retention while giving readers a reason to return after every feedback batch.",
    sections: [
      section("Collect inputs", "Feedback should include source, customer segment, urgency, and original wording.", ["Source", "Segment", "Quote"]),
      section("Cluster themes", "AI can group similar feedback, but humans should verify priority.", ["Theme", "Frequency", "Evidence"]),
      section("Close loop", "Promising themes need owners, roadmap decisions, and customer follow-up.", ["Owner", "Decision", "Follow-up"])
    ],
    related: customerSuccessRelated,
    dailyReturn: "Process new feedback into themes before roadmap reviews."
  }),
  topic({
    title: "AI Onboarding Email Sequence Workflow",
    slug: "ai-onboarding-email-sequence-workflow",
    cluster: "customer-success",
    summary: "Build onboarding email sequences from customer goals, product milestones, support triggers, and human review.",
    audience: "SaaS, service, ecommerce, and membership teams improving activation.",
    primaryIntent: "Workflow and template.",
    whyItMatters: "Onboarding email searches connect marketing, support, retention, and automation pages.",
    sections: [
      section("Define milestones", "Each email should map to a customer progress moment.", ["Welcome", "First value", "Next step"]),
      section("Draft sequence", "Use AI to draft variations, then check claims, timing, and support paths.", ["Subject", "Body", "CTA"]),
      section("Measure activation", "Review opens, replies, completion, tickets, and drop-off.", ["Activation", "Reply", "Ticket"])
    ],
    related: customerSuccessRelated,
    dailyReturn: "Review one onboarding blocker and improve the next email."
  }),
  topic({
    title: "AI Renewal Reminder Workflow",
    slug: "ai-renewal-reminder-workflow",
    cluster: "customer-success",
    summary: "A renewal workflow for checking contract dates, usage, outcomes, open issues, message drafts, and owner follow-up.",
    audience: "Small teams managing subscription renewals, retainers, or repeat service contracts.",
    primaryIntent: "Workflow.",
    whyItMatters: "Renewal reminder searches are highly commercial and link naturally to CRM, reporting, and customer-success stacks.",
    sections: [
      section("Check account context", "Renewal messages need usage, outcomes, tickets, and open blockers.", ["Usage", "Outcome", "Issue"]),
      section("Draft reminder", "AI can prepare a message, but the owner should verify tone, terms, and timing.", ["Terms", "Tone", "Timing"]),
      section("Log next action", "Every renewal reminder should create a CRM task or account note.", ["Task", "Owner", "Date"])
    ],
    related: customerSuccessRelated,
    dailyReturn: "Review upcoming renewals before customer check-ins."
  })
];

export const authorityClusters: Array<{
  slug: AuthorityCluster;
  title: string;
  summary: string;
  href: string;
}> = [
  {
    slug: "pipedrive",
    title: "Pipedrive and sales CRM",
    summary: "Use cases, CRM setup, comparisons, alternatives, and sales follow-up workflows.",
    href: "/topics/pipedrive-use-cases-for-small-business/"
  },
  {
    slug: "real-estate-ai",
    title: "Real estate AI workflows",
    summary: "Tools, prompts, listing marketing, lead follow-up, and brokerage operations.",
    href: "/topics/best-ai-tools-for-real-estate-agents/"
  },
  {
    slug: "automation",
    title: "Workplace automation",
    summary: "Automation tools, Zapier vs Make, CRM routing, onboarding, and project handoffs.",
    href: "/topics/workplace-automation-tools-for-small-business/"
  },
  {
    slug: "agent-workflows",
    title: "AI agent workflows",
    summary: "Agent examples, readiness checks, guardrails, sales agents, support agents, and handoff rules.",
    href: "/topics/ai-agents-for-small-business/"
  },
  {
    slug: "ai-stacks",
    title: "AI stack blueprints",
    summary: "Buyer-ready AI stacks for sales, real estate, consultants, agencies, and small businesses.",
    href: "/topics/best-ai-stack-for-small-business/"
  },
  {
    slug: "support-ops",
    title: "Support and refund operations",
    summary: "AI support tools, ecommerce support workflows, refund review, and escalation guardrails.",
    href: "/topics/ai-customer-support-tools-for-ecommerce/"
  },
  {
    slug: "ecommerce-ai",
    title: "Ecommerce AI workflows",
    summary: "Product launch stacks, ecommerce AI tools, support recovery, lifecycle messaging, and launch checks.",
    href: "/topics/ai-stack-for-ecommerce/"
  },
  {
    slug: "local-services",
    title: "Local service AI workflows",
    summary: "Quote follow-up, booking routing, reviews, complaints, reminders, and service-business AI tools.",
    href: "/topics/ai-tools-for-local-service-businesses/"
  },
  {
    slug: "marketing-content",
    title: "Marketing content operations",
    summary: "AI tools and workflows for briefs, SEO content, social repurposing, campaign reporting, and approvals.",
    href: "/topics/best-ai-tools-for-marketing-teams/"
  },
  {
    slug: "finance-admin",
    title: "Finance and admin automation",
    summary: "Bookkeeping, invoice processing, expenses, cash-flow notes, and finance review workflows.",
    href: "/topics/ai-tools-for-bookkeeping-accounting/"
  },
  {
    slug: "recruiting-hr",
    title: "Recruiting and HR workflows",
    summary: "Hiring intake, candidate screening, interview notes, scorecards, job descriptions, and onboarding.",
    href: "/topics/ai-recruiting-tools-small-business/"
  },
  {
    slug: "analytics-reporting",
    title: "Analytics and reporting workflows",
    summary: "Weekly KPI reports, dashboard commentary, data cleanup, spreadsheet AI, and reporting automation.",
    href: "/topics/ai-reporting-tools-small-business/"
  },
  {
    slug: "compliance-risk",
    title: "Compliance and risk checks",
    summary: "Privacy reviews, vendor risk checks, policy updates, data retention, and cautious contract workflows.",
    href: "/topics/ai-privacy-review-checklist-small-business/"
  },
  {
    slug: "customer-success",
    title: "Customer success and retention",
    summary: "Onboarding, churn risk, renewals, feedback loops, support handoffs, and customer-success AI workflows.",
    href: "/topics/ai-customer-success-tools-small-business/"
  }
];

export function getAuthorityTopic(slug: string) {
  return authorityTopics.find((topic) => topic.slug === slug);
}

export function authorityTopicsByCluster(cluster: AuthorityCluster) {
  return authorityTopics.filter((topic) => topic.cluster === cluster);
}

function topic(input: AuthorityTopic): AuthorityTopic {
  return input;
}

function section(title: string, body: string, bullets: string[]) {
  return { title, body, bullets };
}
