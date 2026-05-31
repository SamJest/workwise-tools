import type { SiteLink } from "@/types/content";

export type BuyingGuide = {
  title: string;
  slug: string;
  category: string;
  audience: string;
  searchIntent: string;
  summary: string;
  quickAnswer: string;
  bestFor: string[];
  evaluationCriteria: Array<{
    title: string;
    body: string;
    checks: string[];
  }>;
  pricingReality: string;
  privacyRisk: string;
  rolloutPlan: string[];
  redFlags: string[];
  related: SiteLink[];
  dailyReturn: string;
};

const defaultRelated: SiteLink[] = [
  { title: "Software Buying Checklist Generator", href: "/free-tools/software-buying-checklist-generator/", description: "Generate vendor questions before buying." },
  { title: "AI Stack Builder", href: "/free-tools/ai-stack-builder/", description: "Turn the buying decision into a practical stack." },
  { title: "Workflow Library", href: "/workflow-library/", description: "Find the workflow that proves the tool is worth buying." },
  { title: "Latest updates", href: "/updates/", description: "Check what changed before committing." }
];

export const buyingGuides: BuyingGuide[] = [
  guide({
    title: "Best CRM for Small Business",
    slug: "best-crm-for-small-business",
    category: "CRM",
    audience: "Founders, sales managers, agencies, consultants, and local service teams choosing a first serious CRM.",
    searchIntent: "Commercial investigation",
    summary: "A workflow-first CRM buying guide for lead capture, sales follow-up, pipeline visibility, reporting, and team adoption.",
    quickAnswer: "Choose a CRM by the daily follow-up workflow first. Pipedrive fits simple sales pipelines, HubSpot fits broader marketing and customer records, and Follow Up Boss fits real estate lead routing.",
    bestFor: ["Sales pipeline visibility", "Lead ownership", "Follow-up reminders", "Weekly sales reporting"],
    evaluationCriteria: [
      criterion("Pipeline fit", "The CRM should mirror the buying process rather than internal wishful thinking.", ["5 to 7 usable stages", "Required next action", "Stale deal views"]),
      criterion("Lead capture", "Forms, calls, bookings, and referrals need to land in one record quickly.", ["Source tracking", "Owner assignment", "Duplicate checks"]),
      criterion("Reporting", "Small teams need simple weekly reports they will actually review.", ["Stage conversion", "No-activity deals", "Source quality"])
    ],
    pricingReality: "Seat pricing rises quickly when sales, marketing, automation, and reporting are split across plan tiers. Test the exact workflow before annual billing.",
    privacyRisk: "CRM records often include customer contact details, deal notes, call summaries, and sensitive commercial context. Check permissions and export options.",
    rolloutPlan: ["Clean imported records", "Define pipeline stages", "Create lead source fields", "Turn on reminders", "Review stale deals weekly"],
    redFlags: ["Sales reps keep using spreadsheets", "No owner on new leads", "Reports are impressive but not used", "Custom fields outnumber useful actions"],
    related: [
      { title: "Pipedrive guide", href: "/ai-tools/pipedrive/", description: "Use cases, fit, evidence, and alternatives." },
      { title: "Pipedrive vs HubSpot", href: "/topics/pipedrive-vs-hubspot-for-small-business/", description: "Simple sales CRM vs broader customer platform." },
      { title: "Sales follow-up workflow", href: "/workflow-library/speed-to-lead-form-to-crm/", description: "Test the CRM with a daily workflow." },
      ...defaultRelated
    ],
    dailyReturn: "Open the CRM every morning to review new leads, overdue tasks, and no-activity deals."
  }),
  guide({
    title: "Best Marketing Automation Software for Small Business",
    slug: "best-marketing-automation-software-small-business",
    category: "Marketing automation",
    audience: "Small businesses and agencies choosing email, nurture, form, CRM, and campaign automation tools.",
    searchIntent: "Commercial investigation",
    summary: "Compare marketing automation by audience capture, segmentation, campaign handoff, reporting, and review controls.",
    quickAnswer: "Pick the platform that matches the customer journey you can maintain. Do not buy a complex suite until forms, segments, emails, and CRM ownership are clear.",
    bestFor: ["Email nurture", "Lead capture", "Audience segments", "Campaign reporting"],
    evaluationCriteria: [
      criterion("Audience model", "The system should make it easy to understand who gets which message and why.", ["Segments", "Suppression lists", "Consent source"]),
      criterion("Workflow triggers", "Automations should start from reliable events, not vague intent.", ["Form submitted", "Tag added", "Deal stage changed"]),
      criterion("Review and reporting", "Campaign changes need approval and a clear readout.", ["Preview", "Approval", "Performance summary"])
    ],
    pricingReality: "Contact-based billing can become more expensive than expected. Check subscriber limits, send limits, AI credits, and CRM add-ons.",
    privacyRisk: "Marketing tools hold consent status, customer emails, behavior data, and campaign history. Check unsubscribe handling and data processing settings.",
    rolloutPlan: ["Clean lists", "Map consent", "Build one welcome flow", "Connect CRM source fields", "Review performance weekly"],
    redFlags: ["No suppression process", "Unclear source of consent", "Too many nurture paths", "No human approval before sends"],
    related: [
      { title: "AI marketing reporting workflow", href: "/topics/ai-marketing-reporting-workflow/", description: "Turn campaign metrics into actions." },
      { title: "Campaign brief recipe", href: "/workflow-library/campaign-brief-from-intake/", description: "Start campaigns from better inputs." },
      ...defaultRelated
    ],
    dailyReturn: "Check one live automation, one segment, and one campaign result before launching new messages."
  }),
  guide({
    title: "Best AI Writing Tool for Business Content",
    slug: "best-ai-writing-tool-business-content",
    category: "AI writing",
    audience: "Marketers, consultants, founders, and agencies choosing AI writing tools for business content.",
    searchIntent: "Best tools",
    summary: "A buying guide for AI writing tools that supports briefs, source notes, tone, review, repurposing, and publishing quality.",
    quickAnswer: "The best AI writing tool is the one that fits your source material and review process. General assistants work for flexible drafting, while specialist tools can help with repeat content workflows.",
    bestFor: ["Content drafts", "Email copy", "Brief expansion", "Repurposing"],
    evaluationCriteria: [
      criterion("Source control", "Good content workflows start from supplied facts, not invented context.", ["Source notes", "Citation habits", "Assumption flags"]),
      criterion("Brand review", "The tool should help enforce tone without hiding factual review.", ["Style guide", "Reviewer", "Version history"]),
      criterion("Workflow reuse", "Look for templates, prompts, and saved workflows that reduce repeated setup.", ["Templates", "Prompt library", "Team sharing"])
    ],
    pricingReality: "Usage limits, seat counts, brand voice features, and plagiarism or SEO add-ons may sit behind higher plans.",
    privacyRisk: "Check whether drafts, uploaded documents, prompts, and customer examples are retained or used for model training.",
    rolloutPlan: ["Create a brief template", "Build review checklist", "Test 5 real drafts", "Document prompts", "Measure edit time"],
    redFlags: ["First drafts get published directly", "No source notes", "No ownership of claims", "Team uses scattered prompts"],
    related: [
      { title: "AI content workflow", href: "/topics/ai-content-workflow-small-business/", description: "Set the publishing workflow first." },
      { title: "AI SEO content brief workflow", href: "/topics/ai-seo-content-brief-workflow/", description: "Build briefs before drafting." },
      ...defaultRelated
    ],
    dailyReturn: "Improve one prompt, one outline, or one repurposed asset each publishing day."
  }),
  guide({
    title: "Best AI Meeting Notes Tool",
    slug: "best-ai-meeting-notes-tool",
    category: "Meeting notes",
    audience: "Sales teams, consultants, agencies, recruiters, and operators choosing meeting transcription and summary tools.",
    searchIntent: "Best tools",
    summary: "Compare meeting AI tools by consent, transcript quality, summaries, action items, CRM/project handoff, and data controls.",
    quickAnswer: "Choose the tool that turns meetings into trusted next actions. Transcript accuracy matters, but the real value is CRM, project, or scorecard handoff.",
    bestFor: ["Sales calls", "Client meetings", "Hiring interviews", "Project updates"],
    evaluationCriteria: [
      criterion("Capture quality", "The tool needs reliable transcription and clear participant handling.", ["Speaker labels", "Recording consent", "Transcript export"]),
      criterion("Action handoff", "Summaries should become tasks, CRM notes, or scorecards.", ["Action items", "Owners", "Due dates"]),
      criterion("Data controls", "Meetings can contain sensitive customer, hiring, or financial context.", ["Retention", "Permissions", "Admin controls"])
    ],
    pricingReality: "Check recording limits, storage, AI summary quotas, CRM integrations, and whether external guests require paid seats.",
    privacyRisk: "Meeting recordings and transcripts can include sensitive personal and commercial data. Consent, retention, and deletion settings are essential.",
    rolloutPlan: ["Set consent language", "Pick meeting types", "Connect task destination", "Review summaries manually", "Audit old recordings monthly"],
    redFlags: ["No consent workflow", "Summaries are trusted without review", "Tasks do not reach the system of record", "Recordings never expire"],
    related: [
      { title: "Meeting transcript to tasks", href: "/workflow-library/meeting-transcript-to-tasks/", description: "Convert meetings into project work." },
      { title: "Sales call notes to Pipedrive", href: "/workflow-library/sales-call-notes-to-pipedrive/", description: "Push call context into CRM." },
      ...defaultRelated
    ],
    dailyReturn: "Review yesterday's summaries and make sure every action has an owner."
  }),
  guide({
    title: "Best Project Management Software for AI Workflows",
    slug: "best-project-management-software-ai-workflows",
    category: "Project management",
    audience: "Operators, agencies, consultants, and service teams choosing where AI-generated tasks should live.",
    searchIntent: "Commercial investigation",
    summary: "A buying guide for project management software that can absorb AI notes, tasks, approvals, automations, and reporting.",
    quickAnswer: "The best project tool for AI workflows is the one your team already checks daily. AI task creation only helps if ownership, status, and review are visible.",
    bestFor: ["Task ownership", "Client delivery", "Approvals", "Weekly reporting"],
    evaluationCriteria: [
      criterion("Task structure", "AI-generated work needs fields for owner, due date, source, and status.", ["Owner", "Due date", "Source link"]),
      criterion("Views", "Teams need views for daily work, blocked tasks, approvals, and reporting.", ["My tasks", "Blocked", "Review queue"]),
      criterion("Automation fit", "Project tools should connect to forms, meeting notes, docs, and reports.", ["Forms", "Integrations", "Notifications"])
    ],
    pricingReality: "Per-seat pricing may be simple at first but can rise with guests, automations, dashboards, AI credits, or advanced permissions.",
    privacyRisk: "Project tools can expose client files, internal notes, and commercial plans. Check guest permissions and workspace boundaries.",
    rolloutPlan: ["Define task fields", "Create review queue", "Connect meeting notes", "Set weekly reporting", "Archive stale projects"],
    redFlags: ["AI creates tasks nobody sees", "Guests can see too much", "No blocked-task view", "Multiple project tools compete"],
    related: [
      { title: "Meeting notes to tasks", href: "/automation-os/templates/meeting-notes-to-project-tasks/", description: "Automate project handoff safely." },
      { title: "Asana vs ClickUp", href: "/automation-os/support/asana-vs-clickup-automation/", description: "Compare project-management fit." },
      ...defaultRelated
    ],
    dailyReturn: "Clear the review queue and blocked tasks before creating more AI-generated work."
  }),
  guide({
    title: "Best Customer Support Software for Ecommerce",
    slug: "best-customer-support-software-ecommerce",
    category: "Customer support",
    audience: "Ecommerce stores and support teams choosing helpdesk, AI reply, refund, and VIP support workflows.",
    searchIntent: "Best tools and comparison",
    summary: "Compare ecommerce support software by order context, ticket triage, macros, refund review, escalation, and AI guardrails.",
    quickAnswer: "Ecommerce support software should connect order context to ticket decisions. AI can draft and triage, but refunds, complaints, and VIP issues need review.",
    bestFor: ["Ticket triage", "Refund review", "VIP alerts", "FAQ improvement"],
    evaluationCriteria: [
      criterion("Order context", "Support agents need order, customer, product, and shipping context in the ticket.", ["Order", "Customer tier", "Product"]),
      criterion("AI triage", "Classification should route urgency and risk, not hide sensitive decisions.", ["Urgency", "Topic", "Escalation"]),
      criterion("Improvement loop", "Tickets should feed macros, FAQs, product pages, and launch planning.", ["Macros", "FAQ", "Product feedback"])
    ],
    pricingReality: "Check ticket volume pricing, automation limits, Shopify or marketplace integrations, AI reply costs, and add-on channels.",
    privacyRisk: "Support tools handle customer messages, order details, addresses, refund context, and complaint history. Permissions matter.",
    rolloutPlan: ["Define ticket categories", "Route refund exceptions", "Set VIP alerts", "Review AI drafts", "Update FAQs weekly"],
    redFlags: ["AI approves refunds", "No complaint escalation", "Order context missing", "Macros are stale"],
    related: [
      { title: "Gorgias vs Zendesk", href: "/topics/gorgias-vs-zendesk-ecommerce-ai-support/", description: "Compare ecommerce support fit." },
      { title: "Support ticket triage", href: "/workflow-library/support-ticket-triage/", description: "Build the repeat workflow." },
      ...defaultRelated
    ],
    dailyReturn: "Review high-risk tickets, refund exceptions, and repeated questions every support day."
  }),
  guide({
    title: "Best Accounting Software for Small Business Automation",
    slug: "best-accounting-software-small-business-automation",
    category: "Accounting",
    audience: "Small businesses, bookkeepers, and finance admins choosing accounting software with AI and automation support.",
    searchIntent: "Commercial investigation",
    summary: "A buying guide for accounting workflows around invoice processing, receipt capture, cash-flow notes, reporting, and review queues.",
    quickAnswer: "Choose accounting software by the records and review process first. AI can help summarize and classify, but payment, tax, and accounting decisions need human ownership.",
    bestFor: ["Bookkeeping records", "Invoice processing", "Receipt capture", "Cash-flow review"],
    evaluationCriteria: [
      criterion("Record quality", "The system needs clean invoices, receipts, bank feeds, and supplier records.", ["Bank feed", "Receipt capture", "Supplier"]),
      criterion("Approval workflow", "Finance automation should surface exceptions before payment or close.", ["Duplicate", "Missing field", "Approval"]),
      criterion("Reporting", "Reports should explain overdue, upcoming, and blocked items clearly.", ["Overdue", "Cash view", "Exception list"])
    ],
    pricingReality: "Check user limits, payroll, receipt capture, bank feeds, project tracking, multi-currency, and accountant access before buying.",
    privacyRisk: "Accounting tools hold bank, supplier, payroll, tax, and customer payment information. Use strict permissions and exports.",
    rolloutPlan: ["Map chart of accounts", "Connect bank feeds", "Create approval rules", "Test receipt workflow", "Review month-end exceptions"],
    redFlags: ["AI categories are accepted without review", "No backup/export process", "Too many admins", "Invoices remain in email"],
    related: [
      { title: "AI tools for bookkeeping", href: "/topics/ai-tools-for-bookkeeping-accounting/", description: "Finance workflows and review cautions." },
      { title: "Invoice processing workflow", href: "/topics/ai-invoice-processing-workflow/", description: "Route invoices safely." },
      ...defaultRelated
    ],
    dailyReturn: "Clear new receipts, overdue invoices, and finance exceptions before they pile up."
  }),
  guide({
    title: "Best Recruiting Software for Small Business",
    slug: "best-recruiting-software-small-business",
    category: "Recruiting",
    audience: "Recruiters, founders, and hiring managers choosing an ATS or recruiting AI workflow.",
    searchIntent: "Commercial investigation",
    summary: "Compare recruiting software by hiring intake, scorecards, candidate communication, interview notes, approvals, and compliance review.",
    quickAnswer: "Recruiting software should make the hiring process more consistent, not more automated. Prioritize scorecards, evidence summaries, and human decision ownership.",
    bestFor: ["Hiring intake", "Candidate pipeline", "Interview notes", "Scorecard review"],
    evaluationCriteria: [
      criterion("Scorecard fit", "The system should support consistent criteria before candidate review starts.", ["Criteria", "Evidence", "Reviewer"]),
      criterion("Candidate communication", "Templates and automations need tone, timing, and human review.", ["Email templates", "Status", "Owner"]),
      criterion("Interview workflow", "Notes should map to scorecards and next-step decisions.", ["Transcript", "Scorecard", "Decision log"])
    ],
    pricingReality: "Check job slots, users, interview scheduling, AI summaries, careers page, assessment integrations, and data retention.",
    privacyRisk: "Recruiting systems store resumes, personal data, interview notes, and hiring decisions. Bias, retention, and access controls matter.",
    rolloutPlan: ["Create intake form", "Build scorecard", "Define stages", "Set candidate communication rules", "Review retention settings"],
    redFlags: ["AI rejects candidates automatically", "No scorecard", "Interview notes are scattered", "Retention settings are ignored"],
    related: [
      { title: "AI recruiting tools", href: "/topics/ai-recruiting-tools-small-business/", description: "Recruiting and HR AI workflows." },
      { title: "Candidate screening workflow", href: "/topics/ai-candidate-screening-workflow/", description: "Summarize evidence for human review." },
      ...defaultRelated
    ],
    dailyReturn: "Review candidate evidence, missing scorecards, and next-step owners every hiring day."
  }),
  guide({
    title: "Best Analytics and Reporting Software for Small Business",
    slug: "best-analytics-reporting-software-small-business",
    category: "Analytics",
    audience: "Founders, operators, agencies, and team leads choosing reporting tools and AI commentary workflows.",
    searchIntent: "Commercial investigation",
    summary: "A buying guide for reporting software that turns source metrics into useful commentary, alerts, and next actions.",
    quickAnswer: "The best reporting tool is the one that makes source data trustworthy and action obvious. AI commentary is useful only when metrics, owners, and confidence are visible.",
    bestFor: ["Weekly KPI reports", "Dashboard commentary", "Client reports", "Exception alerts"],
    evaluationCriteria: [
      criterion("Source integrity", "Reporting depends on clean sources, definitions, and refresh cadence.", ["Source", "Metric definition", "Refresh"]),
      criterion("Commentary", "AI should explain changes, assumptions, and questions without inventing causality.", ["Observation", "Hypothesis", "Confidence"]),
      criterion("Action loop", "Reports should create owners and follow-up tasks.", ["Owner", "Next action", "Deadline"])
    ],
    pricingReality: "Check connector costs, report viewers, data refresh frequency, AI usage, dashboard exports, and agency/client access.",
    privacyRisk: "Reporting tools may connect to revenue, customer, advertising, and product data. Limit access and check export permissions.",
    rolloutPlan: ["Define KPIs", "Connect one source", "Create weekly brief", "Add exception alerts", "Review data quality monthly"],
    redFlags: ["No metric definitions", "AI commentary is treated as fact", "Dashboards have no owner", "Client access leaks internal notes"],
    related: [
      { title: "AI reporting tools", href: "/topics/ai-reporting-tools-small-business/", description: "Reporting workflows and tool fit." },
      { title: "Weekly KPI report automation", href: "/topics/weekly-kpi-report-automation/", description: "Build the weekly reporting loop." },
      ...defaultRelated
    ],
    dailyReturn: "Check one metric movement and assign one follow-up before adding more dashboards."
  }),
  guide({
    title: "Best Workflow Automation Software for Small Business",
    slug: "best-workflow-automation-software-small-business",
    category: "Workflow automation",
    audience: "Small teams choosing between Zapier, Make, n8n, built-in automations, and workflow cleanup.",
    searchIntent: "Best tools and comparison",
    summary: "Choose automation software by trigger reliability, app coverage, workflow complexity, maintenance ownership, and failure handling.",
    quickAnswer: "Simple app-to-app workflows usually favor managed no-code tools. Complex, technical, or self-hosted workflows need stronger ownership and maintenance.",
    bestFor: ["Lead routing", "Task handoff", "Reporting automation", "System cleanup"],
    evaluationCriteria: [
      criterion("Trigger quality", "Every automation depends on a reliable event and clean source data.", ["Trigger", "Required fields", "Fallback"]),
      criterion("Maintenance owner", "Automation failure needs a named owner, alert, and repair path.", ["Owner", "Alert", "Run history"]),
      criterion("Complexity fit", "Do not use a complex builder for a workflow the team cannot maintain.", ["Skill level", "Branching", "Documentation"])
    ],
    pricingReality: "Check task/run limits, premium app connectors, AI steps, polling frequency, users, and support before scaling.",
    privacyRisk: "Automation tools can move data between many apps. Check connected account permissions and logs.",
    rolloutPlan: ["Audit manual workflow", "Build one trigger", "Add review step", "Monitor failures", "Document fallback"],
    redFlags: ["Nobody owns failures", "Automations duplicate records", "Run limits surprise the team", "Data moves to tools nobody reviewed"],
    related: [
      { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." },
      { title: "Zapier vs Make vs n8n picker", href: "/free-tools/zapier-make-n8n-picker/", description: "Choose the right builder." },
      ...defaultRelated
    ],
    dailyReturn: "Check failed runs and exception queues before building another automation."
  }),
  guide({
    title: "Best Forms and Survey Software for Lead Capture",
    slug: "best-forms-survey-software-lead-capture",
    category: "Forms and surveys",
    audience: "Sales, marketing, real estate, recruiting, and service teams collecting structured intake data.",
    searchIntent: "Commercial investigation",
    summary: "Compare forms and survey software by completion rate, CRM handoff, conditional logic, data quality, and consent capture.",
    quickAnswer: "Choose forms software by what happens after submission. The best form is the one that routes clean data to the right owner quickly.",
    bestFor: ["Lead intake", "Client onboarding", "Hiring intake", "Customer feedback"],
    evaluationCriteria: [
      criterion("Question design", "Forms should collect enough information without crushing completion.", ["Required fields", "Conditional logic", "Mobile fit"]),
      criterion("Handoff", "Submissions need owner, urgency, and system-of-record routing.", ["CRM", "Project tool", "Notification"]),
      criterion("Consent and data", "Sensitive or marketing data needs consent capture and clean exports.", ["Consent", "Export", "Retention"])
    ],
    pricingReality: "Check response limits, branding, logic jumps, file uploads, payments, integrations, and team access.",
    privacyRisk: "Forms can collect personal, customer, hiring, or payment-adjacent details. Keep sensitive fields intentional.",
    rolloutPlan: ["Define the next action", "Trim questions", "Connect destination", "Test mobile submission", "Review response quality weekly"],
    redFlags: ["Submissions go only to email", "No source tracking", "Too many required questions", "Sensitive data is collected casually"],
    related: [
      { title: "Speed-to-lead workflow", href: "/workflow-library/speed-to-lead-form-to-crm/", description: "Route form leads into CRM." },
      { title: "Client onboarding checklist", href: "/workflow-library/client-onboarding-checklist/", description: "Use forms for onboarding." },
      ...defaultRelated
    ],
    dailyReturn: "Review new submissions and fix one weak question or handoff each week."
  }),
  guide({
    title: "Best Scheduling Software for Sales and Services",
    slug: "best-scheduling-software-sales-services",
    category: "Scheduling",
    audience: "Sales teams, consultants, real estate agents, local services, and customer-success teams booking meetings or appointments.",
    searchIntent: "Commercial investigation",
    summary: "Compare scheduling software by booking rules, reminders, CRM handoff, team routing, payments, and no-show reduction.",
    quickAnswer: "The best scheduler is the one that gets the right context into the calendar and CRM. Booking links alone are not a workflow.",
    bestFor: ["Sales calls", "Property viewings", "Consultations", "Service appointments"],
    evaluationCriteria: [
      criterion("Booking rules", "Availability, buffers, locations, and routing need to match the real service process.", ["Availability", "Buffers", "Routing"]),
      criterion("Context capture", "Booking forms should capture enough detail for the owner to prepare.", ["Need", "Urgency", "Source"]),
      criterion("Follow-up", "Calendar events should create reminders, CRM records, or project tasks.", ["CRM note", "Reminder", "No-show handling"])
    ],
    pricingReality: "Check team routing, round-robin booking, reminders, payments, integrations, and branding before buying.",
    privacyRisk: "Scheduling tools expose availability, customer contact data, meeting links, and sometimes payment or location details.",
    rolloutPlan: ["Define event types", "Add intake questions", "Connect CRM", "Set reminders", "Review no-shows monthly"],
    redFlags: ["Bookings have no owner", "No reminder flow", "Calendar exposes too much availability", "Follow-up is manual"],
    related: [
      { title: "Lead Follow-Up SLA Calculator", href: "/free-tools/lead-follow-up-sla-calculator/", description: "Set a response target." },
      { title: "Portal lead to agent follow-up", href: "/workflow-library/portal-lead-to-agent-follow-up/", description: "Connect booking and follow-up." },
      ...defaultRelated
    ],
    dailyReturn: "Check today's bookings, no-shows, and missing CRM notes before taking new calls."
  }),
  guide({
    title: "Best Customer Success Software for Renewals",
    slug: "best-customer-success-software-renewals",
    category: "Customer success",
    audience: "Subscription, retainer, SaaS, and service teams improving onboarding, renewals, churn risk, and customer health.",
    searchIntent: "Commercial investigation",
    summary: "A buying guide for customer-success software that supports onboarding milestones, churn review, feedback loops, and renewal reminders.",
    quickAnswer: "Choose customer-success software when you can define health signals and owner actions. Otherwise start with CRM tasks, reports, and onboarding workflows.",
    bestFor: ["Customer onboarding", "Churn risk", "Renewal reminders", "Feedback loops"],
    evaluationCriteria: [
      criterion("Health model", "Customer health should come from visible signals, not a mysterious score.", ["Usage", "Tickets", "Renewal date"]),
      criterion("Owner action", "Risk alerts should create tasks and messages for account owners.", ["Owner", "Message", "Due date"]),
      criterion("Feedback loop", "Customer feedback should feed roadmap, docs, and support improvements.", ["Theme", "Evidence", "Decision"])
    ],
    pricingReality: "Check account limits, data connectors, customer health scoring, playbooks, admin seats, and reporting exports.",
    privacyRisk: "Customer-success tools combine customer contacts, usage, support tickets, commercial notes, and renewal details.",
    rolloutPlan: ["Define health signals", "Create onboarding milestones", "Add renewal reminders", "Route risk alerts", "Review feedback monthly"],
    redFlags: ["Health scores have no action", "Renewals live in calendars only", "Feedback is not tagged", "Customer data is duplicated"],
    related: [
      { title: "AI customer success tools", href: "/topics/ai-customer-success-tools-small-business/", description: "Retention workflows and tool fit." },
      { title: "AI renewal reminder workflow", href: "/topics/ai-renewal-reminder-workflow/", description: "Build renewal follow-up." },
      ...defaultRelated
    ],
    dailyReturn: "Review onboarding blockers, at-risk customers, and upcoming renewals every morning."
  }),
  guide({
    title: "Best AI Chatbot Software for Small Business",
    slug: "best-ai-chatbot-software-small-business",
    category: "AI chatbots",
    audience: "Small businesses adding chatbots to sales, support, ecommerce, and website lead capture.",
    searchIntent: "Best tools",
    summary: "Compare AI chatbot software by source grounding, escalation, lead capture, support routing, analytics, and privacy controls.",
    quickAnswer: "A chatbot should answer from known content and escalate cleanly. Do not let it invent pricing, policies, legal terms, or support decisions.",
    bestFor: ["Website FAQs", "Lead capture", "Support triage", "Product questions"],
    evaluationCriteria: [
      criterion("Knowledge source", "The bot needs approved source content and clear gaps.", ["Docs", "FAQs", "Source limits"]),
      criterion("Escalation", "High-risk questions should route to a human with context.", ["Support owner", "Sales owner", "Fallback"]),
      criterion("Measurement", "Review missed answers, bad answers, leads, and repeated questions.", ["Unanswered", "Escalated", "Converted"])
    ],
    pricingReality: "Check conversation limits, AI message pricing, knowledge-base size, handoff integrations, and team seats.",
    privacyRisk: "Chatbots may collect customer questions, contact details, support context, and behavioral data. Disclose and limit what is collected.",
    rolloutPlan: ["Approve source content", "Write escalation rules", "Test common questions", "Connect CRM/support", "Review unanswered logs weekly"],
    redFlags: ["Bot answers without sources", "No human handoff", "Collects sensitive data", "No review of bad answers"],
    related: [
      { title: "AI customer support agent", href: "/topics/ai-customer-support-agent-small-business/", description: "Guardrails for support agents." },
      { title: "AI agent guardrails", href: "/topics/ai-agent-guardrails-customer-facing-workflows/", description: "Customer-facing safety checks." },
      ...defaultRelated
    ],
    dailyReturn: "Review unanswered questions and escalations before expanding chatbot coverage."
  }),
  guide({
    title: "Best Knowledge Base Software for AI Support",
    slug: "best-knowledge-base-software-ai-support",
    category: "Knowledge base",
    audience: "Support teams, ecommerce stores, SaaS businesses, and service firms building AI-ready help content.",
    searchIntent: "Commercial investigation",
    summary: "Choose knowledge base software by article quality, source control, search, AI answers, feedback, and support handoff.",
    quickAnswer: "AI support gets better when the knowledge base is accurate, maintained, and connected to ticket feedback. Start with article ownership before buying more AI.",
    bestFor: ["Support docs", "AI answer sources", "Internal SOPs", "FAQ updates"],
    evaluationCriteria: [
      criterion("Article ownership", "Every article should have a topic owner and review date.", ["Owner", "Review date", "Version"]),
      criterion("Search and AI", "Search and AI answers should point back to approved content.", ["Source link", "Answer quality", "Gap report"]),
      criterion("Feedback loop", "Support tickets and customer feedback should create article updates.", ["Ticket theme", "Suggested article", "Update task"])
    ],
    pricingReality: "Check public/private spaces, AI answer limits, article versioning, analytics, custom domains, and support integrations.",
    privacyRisk: "Internal knowledge bases may contain customer, employee, operational, or security details. Separate public and private content carefully.",
    rolloutPlan: ["Audit top questions", "Create article owners", "Connect support tickets", "Enable feedback", "Review stale articles monthly"],
    redFlags: ["No article owner", "AI answers from outdated docs", "Private content leaks into public help", "Feedback never becomes updates"],
    related: [
      { title: "Review mining to FAQ updates", href: "/workflow-library/review-mining-to-faq-updates/", description: "Turn repeated questions into content." },
      { title: "Support ticket triage", href: "/workflow-library/support-ticket-triage/", description: "Route support signals into improvements." },
      ...defaultRelated
    ],
    dailyReturn: "Update one stale article or FAQ from support evidence each week."
  }),
  guide({
    title: "Best Contract Management Software for Small Business",
    slug: "best-contract-management-software-small-business",
    category: "Contracts",
    audience: "Small businesses organizing proposals, vendor agreements, renewals, signatures, and contract review notes.",
    searchIntent: "Commercial investigation",
    summary: "A cautious buying guide for contract workflows covering storage, renewal reminders, clause notes, approvals, signatures, and professional review.",
    quickAnswer: "Contract software should organize documents, reminders, obligations, and review notes. AI summaries can help preparation, but they do not replace qualified legal advice.",
    bestFor: ["Vendor agreements", "Client contracts", "Renewal reminders", "Signature workflows"],
    evaluationCriteria: [
      criterion("Document control", "Contracts need clear version, owner, status, and renewal fields.", ["Version", "Owner", "Renewal"]),
      criterion("Review workflow", "AI can summarize questions and obligations before professional review.", ["Questions", "Obligations", "Approval"]),
      criterion("Reminder loop", "Renewals, notice periods, and obligations should create tasks early.", ["Notice period", "Task", "Owner"])
    ],
    pricingReality: "Check signature limits, template libraries, storage, approval workflows, AI summaries, user roles, and audit history.",
    privacyRisk: "Contracts contain sensitive commercial terms, personal data, and obligations. Limit permissions and export access.",
    rolloutPlan: ["Inventory contracts", "Add renewal dates", "Assign owners", "Create review checklist", "Set reminder workflow"],
    redFlags: ["Renewal dates live only in inboxes", "AI summary is treated as advice", "Old versions remain active", "No audit trail"],
    related: [
      { title: "AI contract review workflow", href: "/topics/ai-contract-review-workflow-small-business/", description: "Organize questions before professional review." },
      { title: "AI vendor risk assessment", href: "/topics/ai-vendor-risk-assessment-workflow/", description: "Check vendors before signing." },
      ...defaultRelated
    ],
    dailyReturn: "Review upcoming renewals and vendor obligations before they become urgent."
  }),
  guide({
    title: "Best Local Service Management Software",
    slug: "best-local-service-management-software",
    category: "Local services",
    audience: "Trades, home services, maintenance providers, and local service teams choosing job, quote, and booking software.",
    searchIntent: "Commercial investigation",
    summary: "Choose local service software by quote follow-up, booking routing, job notes, review requests, complaints, and recurring maintenance reminders.",
    quickAnswer: "Local service teams should buy for speed-to-lead and quote follow-up first. The best software makes jobs, customers, prices, and next actions visible.",
    bestFor: ["Quote follow-up", "Booking routing", "Job notes", "Review requests"],
    evaluationCriteria: [
      criterion("Lead response", "New enquiries need urgency, service type, location, owner, and response time.", ["Urgency", "Location", "Owner"]),
      criterion("Job context", "Technicians or operators need notes, materials, customer history, and status.", ["Job notes", "Materials", "Status"]),
      criterion("Customer follow-up", "Review requests and complaints need separate, careful workflows.", ["Review eligibility", "Complaint route", "Reminder"])
    ],
    pricingReality: "Check field users, job volume, SMS/reminders, payments, customer portal, quoting, and mobile app limits.",
    privacyRisk: "Local service tools may hold home addresses, contact details, payment notes, job photos, and complaints. Lock down access.",
    rolloutPlan: ["Map enquiry sources", "Set quote follow-up", "Create job stages", "Add review workflow", "Review complaints weekly"],
    redFlags: ["Missed calls are not logged", "Quotes go stale", "Review requests go to unhappy customers", "Job notes stay in personal phones"],
    related: [
      { title: "AI tools for local service businesses", href: "/topics/ai-tools-for-local-service-businesses/", description: "Local-service workflows and tools." },
      { title: "Quote follow-up workflow", href: "/workflow-library/quote-follow-up/", description: "Follow up estimates safely." },
      ...defaultRelated
    ],
    dailyReturn: "Check new enquiries, quote follow-ups, and completed jobs every morning."
  })
];

export function getBuyingGuide(slug: string) {
  return buyingGuides.find((guide) => guide.slug === slug);
}

function guide(input: BuyingGuide): BuyingGuide {
  return input;
}

function criterion(title: string, body: string, checks: string[]) {
  return { title, body, checks };
}
