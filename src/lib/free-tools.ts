import { agentPlaybooks } from "./agent-playbooks";
import { stackBlueprints } from "./stack-blueprints";
import { findWorkflowRecipes } from "./workflow-library";

export type FreeToolField = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  placeholder?: string;
  defaultValue: string;
  min?: number;
  max?: number;
  options?: string[];
  helper?: string;
  required?: boolean;
};

export type FreeToolResult = {
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  ctas: Array<{ title: string; href: string; description: string }>;
};

export type FreeToolDefinition = {
  title: string;
  slug: string;
  description: string;
  inputSummary: string;
  outputSummary: string;
  fields: FreeToolField[];
  related: Array<{ title: string; href: string; description?: string }>;
};

const commonToneOptions = ["clear and practical", "friendly", "direct", "premium", "consultative"];

export const freeTools: FreeToolDefinition[] = [
  {
    title: "AI Stack Builder",
    slug: "ai-stack-builder",
    description: "Build a practical starter stack for a workflow, budget, team size, and risk profile.",
    inputSummary: "Team type, workflow, budget, risk level, current tools, and country.",
    outputSummary: "Recommended stack layers, tool categories, review checks, and related workflow kits.",
    fields: [
      { name: "teamType", label: "Team type", type: "select", defaultValue: "marketing agency", options: ["marketing agency", "ecommerce seller", "sales team", "consultant", "real estate team"], required: true },
      { name: "workflow", label: "Workflow", type: "text", defaultValue: "turn client notes into campaign briefs", required: true },
      { name: "budget", label: "Budget", type: "select", defaultValue: "lean", options: ["lean", "moderate", "scaling", "enterprise"], required: true },
      { name: "riskLevel", label: "Risk level", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "currentTools", label: "Current tools", type: "textarea", defaultValue: "Google Workspace, CRM, ChatGPT", required: true },
      { name: "country", label: "Country", type: "select", defaultValue: "United Kingdom", options: ["United States", "United Kingdom", "Australia", "Canada", "Ireland", "Singapore"], required: true }
    ],
    related: [
      { title: "Workflow kits", href: "/workflow-kits/", description: "Match the stack to a complete topic cluster." },
      { title: "AI tools directory", href: "/ai-tools/", description: "Browse the supporting tool records." }
    ]
  },
  {
    title: "AI Workflow ROI Calculator",
    slug: "ai-workflow-roi-calculator",
    description: "Estimate whether an AI workflow is worth testing based on time saved, tool spend, and review overhead.",
    inputSummary: "Hours saved, hourly cost, users, monthly tool cost, setup hours, and review overhead.",
    outputSummary: "Monthly value, costs, payback estimate, and rollout caution notes.",
    fields: [
      { name: "hoursSaved", label: "Hours saved per person/month", type: "number", defaultValue: "6", min: 0, max: 500, required: true },
      { name: "hourlyCost", label: "Hourly cost", type: "number", defaultValue: "35", min: 0, max: 10000, required: true },
      { name: "users", label: "Users", type: "number", defaultValue: "5", min: 1, max: 5000, required: true },
      { name: "monthlyToolCost", label: "Monthly tool cost", type: "number", defaultValue: "250", min: 0, max: 1000000, required: true },
      { name: "setupHours", label: "One-time setup hours", type: "number", defaultValue: "12", min: 0, max: 10000, required: true },
      { name: "reviewOverhead", label: "Review overhead %", type: "number", defaultValue: "20", min: 0, max: 100, required: true },
      { name: "currency", label: "Currency", type: "select", defaultValue: "GBP", options: ["GBP", "USD", "EUR", "AUD", "CAD"], required: true }
    ],
    related: [
      { title: "Display ad readiness checklist", href: "/free-tools/display-ad-readiness-checklist/", description: "Check monetisation timing after content grows." },
      { title: "SaaS cost calculator", href: "/free-tools/saas-cost-calculator/", description: "Estimate broader software spend." }
    ]
  },
  {
    title: "Automation ROI Calculator v2",
    slug: "automation-roi-calculator-v2",
    description: "Estimate automation value with time saved, failure risk, review overhead, setup effort, and tool spend.",
    inputSummary: "Workflow, monthly runs, minutes saved, hourly cost, tool cost, setup effort, review overhead, and failure risk.",
    outputSummary: "Monthly value, adjusted value, payback, risk notes, and next workflow actions.",
    fields: [
      { name: "workflow", label: "Workflow", type: "text", defaultValue: "lead follow-up automation", required: true },
      { name: "monthlyRuns", label: "Monthly runs", type: "number", defaultValue: "120", min: 1, max: 100000, required: true },
      { name: "minutesSaved", label: "Minutes saved per run", type: "number", defaultValue: "8", min: 0, max: 10000, required: true },
      { name: "hourlyCost", label: "Hourly cost", type: "number", defaultValue: "35", min: 0, max: 10000, required: true },
      { name: "monthlyToolCost", label: "Monthly tool cost", type: "number", defaultValue: "180", min: 0, max: 1000000, required: true },
      { name: "setupHours", label: "Setup hours", type: "number", defaultValue: "10", min: 0, max: 10000, required: true },
      { name: "reviewOverhead", label: "Review overhead %", type: "number", defaultValue: "20", min: 0, max: 100, required: true },
      { name: "failureRisk", label: "Failure risk", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "currency", label: "Currency", type: "select", defaultValue: "GBP", options: ["GBP", "USD", "EUR", "AUD", "CAD"], required: true }
    ],
    related: [
      { title: "Automation OS", href: "/automation-os/", description: "Find a template to test before buying tools." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Check weak points before rollout." },
      { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Use the workflow again tomorrow." }
    ]
  },
  {
    title: "Workflow Audit Generator",
    slug: "workflow-audit-generator",
    description: "Audit a workflow for trigger quality, ownership, review steps, failure modes, privacy risk, and next fixes.",
    inputSummary: "Workflow, trigger, tools, owner, review level, failure symptoms, and data sensitivity.",
    outputSummary: "Audit score, weak points, repair plan, and related Automation OS templates.",
    fields: [
      { name: "workflow", label: "Workflow", type: "text", defaultValue: "new lead to CRM follow-up", required: true },
      { name: "trigger", label: "Trigger", type: "text", defaultValue: "website form submitted", required: true },
      { name: "tools", label: "Tools used", type: "textarea", defaultValue: "Typeform, Zapier, Pipedrive, Gmail", required: true },
      { name: "owner", label: "Workflow owner", type: "text", defaultValue: "sales manager", required: true },
      { name: "reviewLevel", label: "Review level", type: "select", defaultValue: "human before customer-facing output", options: ["none", "spot check", "human before customer-facing output", "manager approval"], required: true },
      { name: "symptoms", label: "Failure symptoms", type: "textarea", defaultValue: "duplicate records, late follow-up, unclear owner", required: true },
      { name: "dataSensitivity", label: "Data sensitivity", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true }
    ],
    related: [
      { title: "Broken Zapier workflow audit", href: "/automation-os/cleanup/broken-zapier-workflow-audit/", description: "Repair a failed workflow." },
      { title: "Automation OS templates", href: "/automation-os/", description: "Pick a stronger template." },
      { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one audit task tomorrow." }
    ]
  },
  {
    title: "Workflow Recipe Finder",
    slug: "workflow-recipe-finder",
    description: "Find a practical workflow recipe by team, workflow type, tool, difficulty, and risk level.",
    inputSummary: "Audience, workflow type, current tool, difficulty, risk level, and urgency.",
    outputSummary: "Recommended recipes, why they fit, related tools, and the next free tool to use.",
    fields: [
      { name: "audience", label: "Audience", type: "select", defaultValue: "sales teams", options: ["sales teams", "real estate", "consultants", "agencies", "ecommerce", "support", "finance", "trades"], required: true },
      { name: "workflowType", label: "Workflow type", type: "select", defaultValue: "lead follow-up", options: ["lead follow-up", "CRM cleanup", "meeting notes", "support triage", "reporting", "customer follow-up", "client onboarding", "finance follow-up"], required: true },
      { name: "currentTool", label: "Current tool", type: "select", defaultValue: "Pipedrive", options: ["Pipedrive", "HubSpot", "Follow Up Boss", "Zapier", "Make", "ClickUp", "Gorgias", "Notion AI", "none"], required: true },
      { name: "difficulty", label: "Difficulty", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "riskLevel", label: "Risk level", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "urgency", label: "Urgency", type: "select", defaultValue: "this week", options: ["today", "this week", "this month"], required: true }
    ],
    related: [
      { title: "Workflow Library", href: "/workflow-library/", description: "Browse every recipe." },
      { title: "Workflow readiness checklist", href: "/workflow-library/checklists/workflow-readiness/", description: "Check the workflow before automation." },
      { title: "Automation OS", href: "/automation-os/", description: "Open templates and audits." }
    ]
  },
  {
    title: "Agent Readiness Checker",
    slug: "agent-readiness-checker",
    description: "Check whether a workflow is ready for an AI agent by scoring trigger quality, data access, review rules, fallback, and risk.",
    inputSummary: "Agent goal, trigger quality, data sensitivity, review owner, fallback path, and customer-facing risk.",
    outputSummary: "Readiness score, launch recommendation, guardrails, failure checks, and related agent playbooks.",
    fields: [
      { name: "agentGoal", label: "Agent goal", type: "text", defaultValue: "follow up new sales leads", required: true },
      { name: "triggerQuality", label: "Trigger quality", type: "select", defaultValue: "mostly reliable", options: ["unclear", "mostly reliable", "very reliable"], required: true },
      { name: "dataSensitivity", label: "Data sensitivity", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "reviewOwner", label: "Review owner", type: "text", defaultValue: "sales manager", required: true },
      { name: "fallback", label: "Manual fallback", type: "select", defaultValue: "documented", options: ["none", "informal", "documented"], required: true },
      { name: "customerFacing", label: "Customer-facing output", type: "select", defaultValue: "yes, reviewed first", options: ["no", "yes, reviewed first", "yes, automated"], required: true }
    ],
    related: [
      { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Browse guarded AI agent workflows." },
      { title: "Workflow Library", href: "/workflow-library/", description: "Open the underlying workflow recipes." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit the workflow before launch." }
    ]
  },
  {
    title: "Stack Gap Analyzer",
    slug: "stack-gap-analyzer",
    description: "Find missing layers, overlap, risk, and the next blueprint for a small-business AI or SaaS stack.",
    inputSummary: "Audience, primary workflow, current tools, budget tier, maturity level, and risk concern.",
    outputSummary: "Stack gaps, overlap warnings, recommended blueprint, and next workflow checks.",
    fields: [
      { name: "audience", label: "Audience", type: "select", defaultValue: "sales teams", options: ["sales teams", "real estate", "consultants", "agencies", "ecommerce", "support", "finance", "recruiting", "local services", "content teams"], required: true },
      { name: "primaryWorkflow", label: "Primary workflow", type: "text", defaultValue: "lead follow-up and CRM hygiene", required: true },
      { name: "currentTools", label: "Current tools", type: "textarea", defaultValue: "Pipedrive, Zapier, Google Workspace", required: true },
      { name: "budgetTier", label: "Budget tier", type: "select", defaultValue: "lean", options: ["lean", "balanced", "scaling"], required: true },
      { name: "maturityLevel", label: "Maturity level", type: "select", defaultValue: "starter", options: ["starter", "growing", "advanced"], required: true },
      { name: "riskConcern", label: "Risk concern", type: "select", defaultValue: "missed follow-up", options: ["missed follow-up", "privacy", "tool overlap", "manual reporting", "support quality"], required: true }
    ],
    related: [
      { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Browse recommended stacks." },
      { title: "AI Stack Builder", href: "/free-tools/ai-stack-builder/", description: "Build a starter stack from scratch." },
      { title: "Workflow Library", href: "/workflow-library/", description: "Tie the stack to a recipe." }
    ]
  },
  {
    title: "Zapier vs Make vs n8n Picker",
    slug: "zapier-make-n8n-picker",
    description: "Choose an automation builder based on technical comfort, workflow complexity, budget pressure, and maintenance ownership.",
    inputSummary: "Workflow complexity, team skill, budget pressure, app coverage, hosting preference, and maintenance owner.",
    outputSummary: "Best-fit builder, caution notes, and next template links.",
    fields: [
      { name: "complexity", label: "Workflow complexity", type: "select", defaultValue: "moderate", options: ["simple", "moderate", "complex"], required: true },
      { name: "teamSkill", label: "Team skill", type: "select", defaultValue: "non-technical", options: ["non-technical", "ops-savvy", "technical"], required: true },
      { name: "budgetPressure", label: "Budget pressure", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "appCoverage", label: "App coverage need", type: "select", defaultValue: "common SaaS apps", options: ["common SaaS apps", "custom APIs", "mixed"], required: true },
      { name: "hosting", label: "Hosting preference", type: "select", defaultValue: "managed", options: ["managed", "self-hosted okay", "no preference"], required: true },
      { name: "owner", label: "Maintenance owner", type: "text", defaultValue: "operations manager", required: true }
    ],
    related: [
      { title: "Zapier vs Make vs n8n", href: "/automation-os/support/zapier-vs-make-vs-n8n-small-business/", description: "Read the comparison." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Check if the workflow is ready." },
      { title: "Automation OS", href: "/automation-os/", description: "Browse templates." }
    ]
  },
  {
    title: "Lead Follow-Up SLA Calculator",
    slug: "lead-follow-up-sla-calculator",
    description: "Set a practical follow-up SLA based on lead volume, response capacity, urgency, and missed-lead risk.",
    inputSummary: "Lead volume, hot-lead share, response capacity, average response time, urgency, and working hours.",
    outputSummary: "Recommended SLA, staffing warning, daily check cadence, and related lead templates.",
    fields: [
      { name: "dailyLeads", label: "Daily leads", type: "number", defaultValue: "25", min: 0, max: 100000, required: true },
      { name: "hotLeadPercent", label: "Hot lead %", type: "number", defaultValue: "30", min: 0, max: 100, required: true },
      { name: "minutesPerLead", label: "Minutes per response", type: "number", defaultValue: "6", min: 1, max: 10000, required: true },
      { name: "availableMinutes", label: "Available response minutes/day", type: "number", defaultValue: "180", min: 1, max: 100000, required: true },
      { name: "currentResponseTime", label: "Current avg response time (minutes)", type: "number", defaultValue: "90", min: 0, max: 100000, required: true },
      { name: "urgency", label: "Lead urgency", type: "select", defaultValue: "high", options: ["low", "medium", "high"], required: true }
    ],
    related: [
      { title: "Speed-to-lead template", href: "/automation-os/templates/speed-to-lead-ai-qualifier/", description: "Build the follow-up workflow." },
      { title: "Real estate lead routing", href: "/automation-os/templates/real-estate-lead-routing/", description: "Route property leads faster." },
      { title: "Pipedrive guide", href: "/ai-tools/pipedrive/", description: "Check CRM fit." }
    ]
  },
  {
    title: "Software Buying Checklist Generator",
    slug: "software-buying-checklist-generator",
    description: "Generate a buying checklist for an AI or SaaS tool before committing to a paid plan.",
    inputSummary: "Tool category, buyer type, data sensitivity, team size, country, and contract length.",
    outputSummary: "Buying checklist, vendor questions, red flags, and rollout checks.",
    fields: [
      { name: "toolCategory", label: "Tool category", type: "select", defaultValue: "AI writing", options: ["AI writing", "CRM", "customer support", "meeting notes", "SEO", "project management", "automation"], required: true },
      { name: "buyerType", label: "Buyer type", type: "select", defaultValue: "small business owner", options: ["small business owner", "agency owner", "sales manager", "consultant", "operations manager"], required: true },
      { name: "dataSensitivity", label: "Data sensitivity", type: "select", defaultValue: "medium", options: ["low", "medium", "high"], required: true },
      { name: "teamSize", label: "Team size", type: "number", defaultValue: "6", min: 1, max: 5000, required: true },
      { name: "country", label: "Country", type: "select", defaultValue: "United Kingdom", options: ["United States", "United Kingdom", "Australia", "Canada", "Ireland", "Singapore"], required: true },
      { name: "contractLength", label: "Contract length", type: "select", defaultValue: "monthly", options: ["monthly", "annual", "multi-year"], required: true }
    ],
    related: [
      { title: "How we review AI tools", href: "/how-we-review-ai-tools/", description: "Understand the review framework." },
      { title: "Tool directory", href: "/ai-tools/", description: "Compare candidate tools." }
    ]
  },
  {
    title: "Workflow Kit Planner",
    slug: "workflow-kit-planner",
    description: "Build a first-pass AI workflow kit with tasks, tools, prompts, checks, and related page ideas.",
    inputSummary: "Audience, workflow goal, current tools, country, risk level, and output type.",
    outputSummary: "Workflow steps, tool categories, prompt ideas, verification checks, and internal-link targets.",
    fields: [
      { name: "audience", label: "Audience", type: "select", defaultValue: "ecommerce sellers", options: ["ecommerce sellers", "marketing agencies", "real estate agents", "consultants", "sales teams"], required: true },
      { name: "goal", label: "Workflow goal", type: "text", defaultValue: "launch a new product campaign", placeholder: "e.g. turn calls into proposals", required: true },
      { name: "currentTools", label: "Current tools", type: "textarea", defaultValue: "ChatGPT, Canva, CRM", required: true },
      { name: "country", label: "Primary country", type: "select", defaultValue: "United Kingdom", options: ["United States", "United Kingdom", "Australia", "Canada", "New Zealand", "Ireland", "Singapore"], required: true },
      { name: "riskLevel", label: "Risk level", type: "select", defaultValue: "moderate", options: ["low", "moderate", "high"], required: true },
      { name: "outputType", label: "Output type", type: "select", defaultValue: "step-by-step workflow", options: ["step-by-step workflow", "content brief", "support process", "sales follow-up plan"], required: true }
    ],
    related: [
      { title: "Workflow guides", href: "/workflows/", description: "Browse the complete workflow-kit clusters." },
      { title: "Prompt library", href: "/prompts/", description: "Turn workflow steps into reusable prompts." }
    ]
  },
  {
    title: "Display Ad Readiness Checklist",
    slug: "display-ad-readiness-checklist",
    description: "Check whether a content site is ready to apply for display ads without hurting quality or trust.",
    inputSummary: "Indexed pages, organic sessions, policy pages, ad density, and content quality status.",
    outputSummary: "Readiness score, blockers, next actions, and ad-slot cautions.",
    fields: [
      { name: "indexedPages", label: "Indexed useful pages", type: "number", defaultValue: "25", min: 0, max: 100000, required: true },
      { name: "monthlySessions", label: "Monthly organic sessions", type: "number", defaultValue: "500", min: 0, max: 10000000, required: true },
      { name: "policyPages", label: "Policy/trust pages live?", type: "select", defaultValue: "yes", options: ["yes", "partly", "no"], required: true },
      { name: "thinPages", label: "Thin indexable pages", type: "number", defaultValue: "0", min: 0, max: 100000, required: true },
      { name: "adSlots", label: "Planned ad slots per article", type: "number", defaultValue: "2", min: 0, max: 20, required: true }
    ],
    related: [
      { title: "Editorial policy", href: "/editorial-policy/", description: "Keep monetisation separated from recommendations." },
      { title: "Advertising disclosure", href: "/affiliate-disclosure/", description: "Explain ad and sponsorship rules clearly." }
    ]
  },
  {
    title: "AI Tool Recommender",
    slug: "ai-tool-recommender",
    description: "Get a rule-based shortlist based on profession, task, budget, country, team size, and complexity.",
    inputSummary: "Profession, task, budget, country, team size, and preferred complexity.",
    outputSummary: "Top 3 recommended tools, why they fit, what to avoid, and related guides.",
    fields: [
      { name: "profession", label: "Profession", type: "select", defaultValue: "freelancer", options: ["freelancer", "recruiter", "sales team", "marketing agency", "consultant", "accountant", "developer"], required: true },
      { name: "task", label: "Primary task", type: "text", defaultValue: "write client proposal", placeholder: "e.g. screen candidates, write outreach, summarise calls", required: true },
      { name: "budget", label: "Budget", type: "select", defaultValue: "free or low cost", options: ["free or low cost", "under $50/month", "$50-$200/month", "team budget", "enterprise"], required: true },
      { name: "country", label: "Country", type: "select", defaultValue: "United Kingdom", options: ["United States", "United Kingdom", "Australia", "Canada", "New Zealand", "Ireland", "Singapore", "South Africa", "India", "Philippines"], required: true },
      { name: "teamSize", label: "Team size", type: "number", defaultValue: "1", min: 1, max: 500, required: true },
      { name: "complexity", label: "Preferred complexity", type: "select", defaultValue: "simple", options: ["simple", "moderate", "advanced"], required: true }
    ],
    related: [
      { title: "AI tools directory", href: "/ai-tools/", description: "Browse all starter tool records." },
      { title: "Best tools for professions", href: "/professions/", description: "Compare tool guides by job role." }
    ]
  },
  {
    title: "AI Proposal Outline Generator",
    slug: "ai-proposal-generator",
    description: "Create a practical proposal outline with sections, positioning, and next-step wording.",
    inputSummary: "Business type, client type, service, tone, and desired length.",
    outputSummary: "Proposal title, recommended sections, suggested wording, close, and related templates.",
    fields: [
      { name: "businessType", label: "Your business type", type: "text", defaultValue: "AI workflow consultant", required: true },
      { name: "clientType", label: "Client type", type: "text", defaultValue: "small business owner", required: true },
      { name: "service", label: "Service", type: "text", defaultValue: "AI workflow setup", required: true },
      { name: "tone", label: "Tone", type: "select", defaultValue: "clear and practical", options: commonToneOptions, required: true },
      { name: "length", label: "Proposal length", type: "select", defaultValue: "standard", options: ["short", "standard", "detailed"], required: true }
    ],
    related: [
      { title: "AI client onboarding workflow", href: "/workflows/ai-client-onboarding-workflow/", description: "Turn the proposal into a delivery workflow." },
      { title: "Templates", href: "/templates/", description: "Use reusable prompt and template pages." }
    ]
  },
  {
    title: "AI Cold Email Generator",
    slug: "ai-cold-email-generator",
    description: "Generate subject lines, a short email, and a follow-up from audience and offer inputs.",
    inputSummary: "Audience, offer, pain point, tone, and call to action.",
    outputSummary: "Subject lines, email body, follow-up email, and sales-tool links.",
    fields: [
      { name: "audience", label: "Audience", type: "text", defaultValue: "operations managers at small agencies", required: true },
      { name: "offer", label: "Offer", type: "text", defaultValue: "AI follow-up workflow setup", required: true },
      { name: "painPoint", label: "Pain point", type: "text", defaultValue: "manual follow-up after sales calls", required: true },
      { name: "tone", label: "Tone", type: "select", defaultValue: "direct", options: commonToneOptions, required: true },
      { name: "cta", label: "Call to action", type: "text", defaultValue: "send over a short example", required: true }
    ],
    related: [
      { title: "AI cold email follow-up workflow", href: "/workflows/ai-cold-email-follow-up-workflow/", description: "Build the full workflow after drafting copy." },
      { title: "Sales team tools", href: "/professions/sales-teams/", description: "Compare AI tools for sales teams." }
    ]
  },
  {
    title: "Prompt Generator by Profession",
    slug: "prompt-generator",
    description: "Turn a profession, task, tool, and output format into a reusable prompt.",
    inputSummary: "Profession, task, tool, output format, and constraints.",
    outputSummary: "Main prompt, refinement prompt, and mistakes to avoid.",
    fields: [
      { name: "profession", label: "Profession", type: "select", defaultValue: "recruiter", options: ["recruiter", "real estate agent", "accountant", "teacher", "consultant", "developer", "copywriter"], required: true },
      { name: "task", label: "Task", type: "text", defaultValue: "draft candidate outreach", required: true },
      { name: "tool", label: "AI tool", type: "select", defaultValue: "ChatGPT", options: ["ChatGPT", "Claude", "Gemini", "Copilot"], required: true },
      { name: "outputFormat", label: "Output format", type: "select", defaultValue: "structured checklist", options: ["structured checklist", "email draft", "table", "step-by-step plan", "short brief"], required: true },
      { name: "constraints", label: "Constraints", type: "textarea", defaultValue: "Do not invent facts. Flag assumptions. Keep the output concise.", required: true }
    ],
    related: [
      { title: "Prompt library", href: "/prompts/", description: "Browse existing profession prompt pages." },
      { title: "Recruiter prompts", href: "/prompts/chatgpt-prompts-for-recruiters/", description: "See a worked prompt page." }
    ]
  },
  {
    title: "SaaS Cost Calculator",
    slug: "saas-cost-calculator",
    description: "Estimate monthly and annual software costs across users, tools, setup fees, and discounts.",
    inputSummary: "Users, monthly price per user, setup cost, discount, number of tools, and currency.",
    outputSummary: "Monthly cost, annual cost, savings estimate, and buying notes.",
    fields: [
      { name: "users", label: "Users", type: "number", defaultValue: "5", min: 1, max: 5000, required: true },
      { name: "monthlyPrice", label: "Monthly price per user", type: "number", defaultValue: "20", min: 0, max: 10000, required: true },
      { name: "setupCost", label: "Setup cost", type: "number", defaultValue: "250", min: 0, max: 100000, required: true },
      { name: "annualDiscount", label: "Annual discount %", type: "number", defaultValue: "10", min: 0, max: 100, required: true },
      { name: "tools", label: "Number of tools", type: "number", defaultValue: "3", min: 1, max: 100, required: true },
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: ["USD", "GBP", "AUD", "CAD", "NZD", "EUR", "SGD", "ZAR", "INR", "PHP"], required: true }
    ],
    related: [
      { title: "AI tools directory", href: "/ai-tools/", description: "Compare tools before estimating spend." },
      { title: "Comparison guides", href: "/comparisons/", description: "Compare vendor trade-offs." }
    ]
  }
];

export function getFreeTool(slug: string): FreeToolDefinition | undefined {
  return freeTools.find((tool) => tool.slug === slug);
}

export function getDefaultValues(tool: FreeToolDefinition) {
  return Object.fromEntries(tool.fields.map((field) => [field.name, field.defaultValue]));
}

export function validateFreeToolInput(tool: FreeToolDefinition, values: Record<string, string>) {
  const errors: Record<string, string> = {};

  for (const field of tool.fields) {
    const value = values[field.name]?.trim() ?? "";
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    if (field.type === "number") {
      const numberValue = Number(value);
      if (!Number.isFinite(numberValue)) {
        errors[field.name] = `${field.label} must be a number.`;
      } else if (field.min !== undefined && numberValue < field.min) {
        errors[field.name] = `${field.label} must be at least ${field.min}.`;
      } else if (field.max !== undefined && numberValue > field.max) {
        errors[field.name] = `${field.label} must be ${field.max} or less.`;
      }
    }
  }

  return errors;
}

export function generateFreeToolResult(slug: string, values: Record<string, string>): FreeToolResult {
  switch (slug) {
    case "ai-stack-builder":
      return generateAiStack(values);
    case "ai-workflow-roi-calculator":
      return generateWorkflowRoi(values);
    case "automation-roi-calculator-v2":
      return generateAutomationRoiV2(values);
    case "workflow-audit-generator":
      return generateWorkflowAudit(values);
    case "workflow-recipe-finder":
      return generateWorkflowRecipeFinder(values);
    case "agent-readiness-checker":
      return generateAgentReadiness(values);
    case "stack-gap-analyzer":
      return generateStackGap(values);
    case "zapier-make-n8n-picker":
      return generateAutomationPicker(values);
    case "lead-follow-up-sla-calculator":
      return generateLeadSla(values);
    case "software-buying-checklist-generator":
      return generateBuyingChecklist(values);
    case "workflow-kit-planner":
      return generateWorkflowKit(values);
    case "display-ad-readiness-checklist":
      return generateDisplayAdReadiness(values);
    case "ai-tool-recommender":
      return generateToolRecommendations(values);
    case "ai-proposal-generator":
      return generateProposal(values);
    case "ai-cold-email-generator":
      return generateColdEmail(values);
    case "prompt-generator":
      return generatePrompt(values);
    case "saas-cost-calculator":
      return generateSaasCost(values);
    default:
      return {
        title: "Generated output",
        summary: "Choose a free tool to generate an output.",
        sections: [],
        ctas: []
      };
  }
}

export function stringifyResult(result: FreeToolResult) {
  return [
    result.title,
    "",
    result.summary,
    "",
    ...result.sections.flatMap((section) => [section.heading, ...section.body.map((line) => `- ${line}`), ""]),
    "Related next steps:",
    ...result.ctas.map((cta) => `- ${cta.title}: ${cta.description}`)
  ].join("\n");
}

export function calculateSaasCost(input: {
  users: number;
  monthlyPrice: number;
  setupCost: number;
  annualDiscount: number;
  tools: number;
}) {
  const monthly = input.users * input.monthlyPrice * input.tools;
  const annualBeforeDiscount = monthly * 12 + input.setupCost;
  const annualSavings = annualBeforeDiscount * (input.annualDiscount / 100);

  return {
    monthly,
    annualBeforeDiscount,
    annual: annualBeforeDiscount - annualSavings,
    annualSavings
  };
}

function generateAutomationRoiV2(values: Record<string, string>): FreeToolResult {
  const monthlyRuns = Number(values.monthlyRuns) || 0;
  const minutesSaved = Number(values.minutesSaved) || 0;
  const hourlyCost = Number(values.hourlyCost) || 0;
  const monthlyToolCost = Number(values.monthlyToolCost) || 0;
  const setupHours = Number(values.setupHours) || 0;
  const reviewOverhead = Number(values.reviewOverhead) || 0;
  const riskPenalty = values.failureRisk === "high" ? 0.7 : values.failureRisk === "medium" ? 0.85 : 0.95;
  const currency = values.currency || "USD";
  const grossMonthlyValue = (monthlyRuns * minutesSaved * hourlyCost) / 60;
  const reviewCost = grossMonthlyValue * (reviewOverhead / 100);
  const adjustedMonthlyValue = Math.max(0, grossMonthlyValue * riskPenalty - reviewCost - monthlyToolCost);
  const setupCost = setupHours * hourlyCost;
  const paybackMonths = adjustedMonthlyValue > 0 ? setupCost / adjustedMonthlyValue : Infinity;
  const format = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency });

  return {
    title: `${values.workflow || "Automation"} ROI estimate`,
    summary: `Adjusted monthly value is ${format(adjustedMonthlyValue)} after tool cost, review overhead, and ${values.failureRisk || "medium"} failure-risk weighting.`,
    sections: [
      {
        heading: "ROI estimate",
        body: [
          `Gross monthly time value: ${format(grossMonthlyValue)}.`,
          `Review overhead estimate: ${format(reviewCost)}.`,
          `Monthly tool cost: ${format(monthlyToolCost)}.`,
          `Setup cost estimate: ${format(setupCost)}.`,
          paybackMonths === Infinity ? "Payback is not positive yet; simplify the workflow or reduce cost before rollout." : `Estimated payback: ${paybackMonths.toFixed(1)} months.`
        ]
      },
      {
        heading: "Risk controls",
        body: [
          "Add a named owner for failed runs and stale tasks.",
          "Keep a human review step before customer-facing, legal, financial, or property claims.",
          "Measure actual saved time for two weeks before buying annual plans."
        ]
      },
      {
        heading: "Next workflow actions",
        body: [
          "Choose the closest Automation OS template.",
          "Run the workflow audit generator after the first test.",
          "Add the workflow to the daily brief loop if it needs recurring review."
        ]
      }
    ],
    ctas: [
      { title: "Automation OS", href: "/automation-os/", description: "Find a matching template." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Check weak points before launch." },
      { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Use it again tomorrow." }
    ]
  };
}

function generateWorkflowAudit(values: Record<string, string>): FreeToolResult {
  const hasReview = values.reviewLevel && values.reviewLevel !== "none";
  const highSensitivity = values.dataSensitivity === "high";
  const symptoms = (values.symptoms || "").split(",").map((item) => item.trim()).filter(Boolean);
  const score = Math.max(20, 100 - symptoms.length * 10 - (hasReview ? 0 : 25) - (highSensitivity ? 10 : 0));

  return {
    title: `${values.workflow || "Workflow"} audit score: ${score}/100`,
    summary: `This audit checks trigger clarity, tools, owner, review level, failure symptoms, and data sensitivity for ${values.workflow || "the workflow"}.`,
    sections: [
      {
        heading: "Weak points",
        body: [
          `Trigger to verify: ${values.trigger || "not supplied"}.`,
          `Owner: ${values.owner || "not supplied"}.`,
          hasReview ? `Review step: ${values.reviewLevel}.` : "No review step is a major risk.",
          highSensitivity ? "High-sensitivity data requires stricter permissions, retention checks, and human approval." : "Data sensitivity is not marked high, but connected-app permissions still need review.",
          ...(symptoms.length ? symptoms.map((symptom) => `Reported symptom: ${symptom}.`) : ["No failure symptoms supplied."])
        ]
      },
      {
        heading: "Repair plan",
        body: [
          "Name one owner for failed runs and stale tasks.",
          "Write the expected input fields before changing automations.",
          "Add a review step before any customer-facing output.",
          "Run one safe sample through the workflow and compare the result with the expected record."
        ]
      }
    ],
    ctas: [
      { title: "Broken Zapier workflow audit", href: "/automation-os/cleanup/broken-zapier-workflow-audit/", description: "Use the repair checklist." },
      { title: "Automation ROI Calculator v2", href: "/free-tools/automation-roi-calculator-v2/", description: "Estimate value after cleanup." },
      { title: "Automation OS", href: "/automation-os/", description: "Pick a cleaner template." }
    ]
  };
}

function generateWorkflowRecipeFinder(values: Record<string, string>): FreeToolResult {
  const audience = values.audience || "sales teams";
  const workflowType = values.workflowType || "lead follow-up";
  const currentTool = values.currentTool || "";
  const difficulty = values.difficulty || "medium";
  const riskLevel = values.riskLevel || "medium";
  const urgency = values.urgency || "this week";
  const matches = findWorkflowRecipes({
    audience,
    workflowType,
    difficulty,
    riskLevel,
    tool: currentTool === "none" ? "" : currentTool
  });
  const fallback = findWorkflowRecipes({ audience }).slice(0, 3);
  const recommendations = (matches.length ? matches : fallback).slice(0, 3);
  const top = recommendations[0];

  return {
    title: "Workflow recipe shortlist",
    summary: top
      ? `Start with ${top.title}. It matches ${audience}, ${workflowType}, ${difficulty} difficulty, and ${riskLevel} risk signals.`
      : "Start with the Workflow Library hub, then choose the closest collection before picking a tool.",
    sections: [
      {
        heading: "Recommended recipes",
        body: recommendations.length
          ? recommendations.map((recipe) => `${recipe.title}: ${recipe.summary} Open /workflow-library/${recipe.slug}/`)
          : ["No exact recipe matched every filter. Use the Workflow Library hub and relax one filter."]
      },
      {
        heading: "Why this fits",
        body: [
          `Audience: ${audience}.`,
          `Workflow type: ${workflowType}.`,
          `Current tool signal: ${currentTool}.`,
          `Rollout urgency: ${urgency}. Start with a recipe before adding new software.`
        ]
      },
      {
        heading: "Next checks",
        body: [
          "Confirm the trigger and system of record before automating.",
          "Add a human review step for customer-facing or high-risk outputs.",
          "Copy this share link so the same setup can be reused tomorrow."
        ]
      }
    ],
    ctas: [
      { title: top?.title ?? "Workflow Library", href: top ? `/workflow-library/${top.slug}/` : "/workflow-library/", description: "Open the best matching recipe." },
      { title: "Workflow readiness checklist", href: "/workflow-library/checklists/workflow-readiness/", description: "Check whether this workflow is ready." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit the selected workflow." },
      { title: "Automation OS", href: "/automation-os/", description: "Find related templates and calculators." }
    ]
  };
}

function generateAgentReadiness(values: Record<string, string>): FreeToolResult {
  const agentGoal = values.agentGoal || "launch an AI agent";
  const triggerQuality = values.triggerQuality || "mostly reliable";
  const dataSensitivity = values.dataSensitivity || "medium";
  const reviewOwner = values.reviewOwner || "workflow owner";
  const fallback = values.fallback || "informal";
  const customerFacing = values.customerFacing || "yes, reviewed first";
  const score =
    (triggerQuality === "very reliable" ? 25 : triggerQuality === "mostly reliable" ? 15 : 5) +
    (dataSensitivity === "low" ? 20 : dataSensitivity === "medium" ? 12 : 4) +
    (reviewOwner.trim().length > 2 ? 15 : 0) +
    (fallback === "documented" ? 20 : fallback === "informal" ? 10 : 0) +
    (customerFacing === "no" ? 20 : customerFacing === "yes, reviewed first" ? 12 : 0);
  const status = score >= 75 ? "pilot-ready with guardrails" : score >= 50 ? "needs a controlled test first" : "not ready for an agent yet";
  const likelyPlaybooks = agentPlaybooks
    .filter((playbook) => `${playbook.title} ${playbook.summary}`.toLowerCase().includes(agentGoal.toLowerCase().split(" ")[0] ?? ""))
    .slice(0, 3);
  const recommendations = likelyPlaybooks.length ? likelyPlaybooks : agentPlaybooks.slice(0, 3);

  return {
    title: `Agent readiness score: ${score}/100`,
    summary: `${agentGoal} is ${status}. Keep ${reviewOwner} as the named owner until the workflow has boring, predictable handoffs.`,
    sections: [
      {
        heading: "Readiness verdict",
        body: [
          `Trigger quality: ${triggerQuality}.`,
          `Data sensitivity: ${dataSensitivity}.`,
          `Fallback: ${fallback}.`,
          `Customer-facing status: ${customerFacing}.`
        ]
      },
      {
        heading: "Guardrails to add",
        body: [
          "Require source context or a missing-information flag for every output.",
          "Escalate sensitive, legal, financial, hiring, or angry-customer cases.",
          "Do not send customer-facing output unless the review rule allows it."
        ]
      },
      {
        heading: "Related playbooks",
        body: recommendations.map((playbook) => `${playbook.title}: ${playbook.summary} Open /agent-playbooks/${playbook.slug}/`)
      }
    ],
    ctas: [
      { title: recommendations[0]?.title ?? "Agent Playbooks", href: recommendations[0] ? `/agent-playbooks/${recommendations[0].slug}/` : "/agent-playbooks/", description: "Open the closest playbook." },
      { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Browse every guarded AI agent workflow." },
      { title: "Workflow Library", href: "/workflow-library/", description: "Use the underlying step-by-step recipe." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit the workflow before launch." }
    ]
  };
}

function generateStackGap(values: Record<string, string>): FreeToolResult {
  const audience = values.audience || "sales teams";
  const primaryWorkflow = values.primaryWorkflow || "workflow";
  const currentTools = values.currentTools || "";
  const budgetTier = values.budgetTier || "lean";
  const maturityLevel = values.maturityLevel || "starter";
  const riskConcern = values.riskConcern || "missed follow-up";
  const toolsLower = currentTools.toLowerCase();
  const matches = stackBlueprints.filter((blueprint) =>
    blueprint.audience.toLowerCase().includes(audience.split(" ")[0]) ||
    blueprint.primaryWorkflow.toLowerCase().includes(primaryWorkflow.toLowerCase().split(" ")[0] ?? "") ||
    blueprint.budgetTier === budgetTier ||
    blueprint.maturityLevel === maturityLevel
  );
  const recommended = (matches.length ? matches : stackBlueprints).slice(0, 3);
  const top = recommended[0];
  const missingLayers = top
    ? top.stackLayers
        .filter((layer) => !layer.toolSlugs.some((toolSlug) => toolsLower.includes(toolSlug.replaceAll("-", " ")) || toolsLower.includes(toolSlug)))
        .map((layer) => layer.name)
    : [];

  return {
    title: "Stack gap analysis",
    summary: top
      ? `Closest blueprint: ${top.title}. Focus on ${primaryWorkflow}, then close ${missingLayers.length || 1} likely stack gap before adding more tools.`
      : "Start with a stack blueprint before buying more tools.",
    sections: [
      {
        heading: "Likely gaps",
        body: missingLayers.length
          ? missingLayers.map((name) => `${name}: add or clarify this layer before upgrading plans.`)
          : ["No obvious missing layer from the closest blueprint. Check overlap, ownership, and review rules next."]
      },
      {
        heading: "Risk warnings",
        body: [
          `Main risk concern: ${riskConcern}.`,
          "Avoid buying a tool that does not map to the primary workflow.",
          "Check whether two current tools are doing the same job before adding a new one."
        ]
      },
      {
        heading: "Recommended blueprints",
        body: recommended.map((blueprint) => `${blueprint.title}: ${blueprint.summary} Open /stack-blueprints/${blueprint.slug}/`)
      }
    ],
    ctas: [
      { title: top?.title ?? "Stack Blueprints", href: top ? `/stack-blueprints/${top.slug}/` : "/stack-blueprints/", description: "Open the closest stack blueprint." },
      { title: "AI Stack Builder", href: "/free-tools/ai-stack-builder/", description: "Build a starter stack from scratch." },
      { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Find the recipe that proves the stack." },
      { title: "Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Check if any layer is ready for an agent." }
    ]
  };
}

function generateAutomationPicker(values: Record<string, string>): FreeToolResult {
  const complexity = values.complexity || "moderate";
  const skill = values.teamSkill || "non-technical";
  const budget = values.budgetPressure || "medium";
  const selfHosted = values.hosting === "self-hosted okay";
  const pick =
    selfHosted || skill === "technical"
      ? "n8n"
      : complexity === "complex" || budget === "high"
        ? "Make"
        : "Zapier";
  const reason =
    pick === "Zapier"
      ? "Zapier is usually the fastest path for non-technical teams using common SaaS apps."
      : pick === "Make"
        ? "Make is a strong fit when the workflow needs visual branching, data shaping, and better cost control."
        : "n8n is strongest when a technical owner can manage hosting, credentials, and workflow governance.";

  return {
    title: `Best first automation builder: ${pick}`,
    summary: reason,
    sections: [
      {
        heading: "Why this fit",
        body: [
          `Workflow complexity: ${complexity}.`,
          `Team skill: ${skill}.`,
          `Budget pressure: ${budget}.`,
          `App coverage need: ${values.appCoverage || "not supplied"}.`,
          `Maintenance owner: ${values.owner || "not supplied"}.`
        ]
      },
      {
        heading: "Cautions",
        body: [
          "Start with one workflow before moving several processes.",
          "Document failure alerts and owner responsibilities.",
          "Retest automations when connected apps change fields, permissions, or pricing."
        ]
      }
    ],
    ctas: [
      { title: "Zapier vs Make vs n8n", href: "/automation-os/support/zapier-vs-make-vs-n8n-small-business/", description: "Read the full decision page." },
      { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Audit the workflow before launch." },
      { title: "Automation OS templates", href: "/automation-os/", description: "Choose a workflow template." }
    ]
  };
}

function generateLeadSla(values: Record<string, string>): FreeToolResult {
  const dailyLeads = Number(values.dailyLeads) || 0;
  const hotLeadPercent = Number(values.hotLeadPercent) || 0;
  const minutesPerLead = Number(values.minutesPerLead) || 1;
  const availableMinutes = Number(values.availableMinutes) || 1;
  const currentResponseTime = Number(values.currentResponseTime) || 0;
  const hotLeads = dailyLeads * (hotLeadPercent / 100);
  const requiredMinutes = dailyLeads * minutesPerLead;
  const capacityRatio = requiredMinutes / availableMinutes;
  const target = values.urgency === "high" ? 15 : values.urgency === "medium" ? 60 : 240;
  const staffingWarning = capacityRatio > 1 ? "Response capacity is overloaded." : "Response capacity is workable if routing is clear.";

  return {
    title: `Recommended lead SLA: respond within ${target} minutes`,
    summary: `${staffingWarning} Current average response time is ${currentResponseTime} minutes, with about ${hotLeads.toFixed(1)} hot leads per day.`,
    sections: [
      {
        heading: "Capacity check",
        body: [
          `Daily lead volume: ${dailyLeads}.`,
          `Estimated hot leads per day: ${hotLeads.toFixed(1)}.`,
          `Response work required: ${requiredMinutes.toFixed(0)} minutes/day.`,
          `Available response capacity: ${availableMinutes.toFixed(0)} minutes/day.`,
          `Capacity load: ${(capacityRatio * 100).toFixed(0)}%.`
        ]
      },
      {
        heading: "Operating cadence",
        body: [
          "Route hot leads to a named owner immediately.",
          "Check missed-response queue at least twice per day.",
          "Use automation for routing and drafting, but verify claims before sending.",
          "Track missed SLA count weekly and simplify the intake flow if it keeps rising."
        ]
      }
    ],
    ctas: [
      { title: "Speed-to-lead template", href: "/automation-os/templates/speed-to-lead-ai-qualifier/", description: "Build the follow-up workflow." },
      { title: "Real estate lead routing", href: "/automation-os/templates/real-estate-lead-routing/", description: "Apply this to agent workflows." },
      { title: "Pipedrive guide", href: "/ai-tools/pipedrive/", description: "Check CRM fit." }
    ]
  };
}

function generateAiStack(values: Record<string, string>): FreeToolResult {
  const team = values.teamType || "team";
  const workflow = values.workflow || "workflow";
  const budget = values.budget || "lean";
  const risk = values.riskLevel || "medium";

  return {
    title: `AI stack for a ${team}`,
    summary: `A ${budget} stack for ${workflow}, with ${risk} risk controls.`,
    sections: [
      {
        heading: "Recommended stack layers",
        body: [
          "Drafting layer: a general AI assistant for first drafts, analysis, and prompt testing.",
          "System of record: a CRM, database, or project tool that owns tasks, contacts, approvals, and history.",
          "Specialist layer: one task-specific tool for SEO, support, meetings, sales, design, or automation.",
          "Review layer: a human approval checkpoint before customer-facing, legal, financial, or privacy-sensitive output goes live."
        ]
      },
      {
        heading: "Fit checks",
        body: [
          `Current tools to integrate: ${values.currentTools || "not supplied"}.`,
          `Country context: ${values.country || "not supplied"}. Check currency, terminology, data processing, and availability.`,
          `Risk level: ${risk}. Higher-risk workflows need stricter review, source logging, and permission controls.`
        ]
      }
    ],
    ctas: [
      { title: "Workflow kits", href: "/workflow-kits/", description: "Match this stack to a complete WorkWise kit." },
      { title: "AI tool recommender", href: "/free-tools/ai-tool-recommender/", description: "Generate a narrower shortlist." }
    ]
  };
}

function generateWorkflowRoi(values: Record<string, string>): FreeToolResult {
  const currency = values.currency || "GBP";
  const hoursSaved = Number(values.hoursSaved) || 0;
  const hourlyCost = Number(values.hourlyCost) || 0;
  const users = Number(values.users) || 1;
  const monthlyToolCost = Number(values.monthlyToolCost) || 0;
  const setupHours = Number(values.setupHours) || 0;
  const reviewOverhead = Number(values.reviewOverhead) || 0;
  const grossValue = hoursSaved * hourlyCost * users;
  const reviewCost = grossValue * (reviewOverhead / 100);
  const monthlyNet = grossValue - reviewCost - monthlyToolCost;
  const setupCost = setupHours * hourlyCost;
  const paybackMonths = monthlyNet > 0 ? setupCost / monthlyNet : Infinity;
  const format = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency });

  return {
    title: "AI workflow ROI estimate",
    summary: monthlyNet > 0 ? `Estimated monthly net value: ${format(monthlyNet)}.` : "This workflow needs a smaller pilot or cheaper stack before rollout.",
    sections: [
      {
        heading: "Estimate",
        body: [
          `Gross monthly time value: ${format(grossValue)}`,
          `Review overhead: ${format(reviewCost)}`,
          `Monthly tool cost: ${format(monthlyToolCost)}`,
          `One-time setup cost estimate: ${format(setupCost)}`,
          `Estimated payback: ${Number.isFinite(paybackMonths) ? `${paybackMonths.toFixed(1)} months` : "not positive yet"}`
        ]
      },
      {
        heading: "Rollout cautions",
        body: [
          "Treat this as a directional estimate, not a finance model.",
          "Pilot with one team before buying annual plans.",
          "Track actual time saved, review failures, customer impact, and adoption after 30 days."
        ]
      }
    ],
    ctas: [
      { title: "AI stack builder", href: "/free-tools/ai-stack-builder/", description: "Design the stack behind the ROI estimate." },
      { title: "Workflow kits", href: "/workflow-kits/", description: "Find a workflow cluster to test." }
    ]
  };
}

function generateBuyingChecklist(values: Record<string, string>): FreeToolResult {
  const category = values.toolCategory || "AI tool";
  const sensitivity = values.dataSensitivity || "medium";

  return {
    title: `${category} buying checklist`,
    summary: `A buying checklist for a ${values.buyerType || "buyer"} in ${values.country || "your market"} with ${sensitivity} data sensitivity.`,
    sections: [
      {
        heading: "Vendor questions",
        body: [
          "Which plan includes the exact AI, automation, export, and team features we need?",
          "Where is customer or client data processed, stored, retained, and used for model training?",
          "What happens if we cancel, downgrade, or need to export our data?",
          `What changes if we grow beyond ${values.teamSize || "the current"} users?`
        ]
      },
      {
        heading: "Red flags",
        body: [
          "No clear pricing page or unclear add-on costs.",
          "No practical way to review AI outputs before they reach customers.",
          "Annual or multi-year commitment before the workflow is tested.",
          sensitivity === "high" ? "Weak privacy, audit, retention, or permission controls." : "Feature limits hidden behind sales calls."
        ]
      },
      {
        heading: "Pilot checklist",
        body: [
          "Run a 14-30 day pilot with one workflow and one accountable owner.",
          "Measure adoption, time saved, review time, error rate, and whether outputs are good enough for real use.",
          `Avoid ${values.contractLength || "long"} commitments until the pilot proves value.`
        ]
      }
    ],
    ctas: [
      { title: "How we review AI tools", href: "/how-we-review-ai-tools/", description: "See the WorkWise review method." },
      { title: "SaaS cost calculator", href: "/free-tools/saas-cost-calculator/", description: "Estimate recurring software costs." }
    ]
  };
}

function generateWorkflowKit(values: Record<string, string>): FreeToolResult {
  const audience = values.audience || "small business team";
  const goal = values.goal || "complete the workflow";
  const country = values.country || "your market";
  const riskLevel = values.riskLevel || "moderate";
  const outputType = values.outputType || "step-by-step workflow";
  const currentTools = values.currentTools || "existing tools";

  return {
    title: `Workflow kit for ${audience}`,
    summary: `A first-pass ${outputType} for teams in ${country} trying to ${goal}.`,
    sections: [
      {
        heading: "Workflow steps",
        body: [
          `Define the exact trigger: when does the ${goal} workflow start?`,
          `Collect source material in one place: customer notes, existing docs, product details, calls, and constraints.`,
          `Use AI to draft the first output, then route it through a human review step before anything customer-facing is used.`,
          `Capture the final output, decisions, and next action in ${currentTools}.`
        ]
      },
      {
        heading: "Tool categories to compare",
        body: [
          "General AI assistant for drafting and analysis.",
          "Workflow database or CRM for ownership and handoff.",
          "Specialist tool for the main task: SEO, support, meetings, design, or sales.",
          "Analytics or reporting layer once the workflow is live."
        ]
      },
      {
        heading: "Verification checks",
        body: [
          `Risk level: ${riskLevel}. Add stricter review for client, customer, legal, financial, medical, or regulated claims.`,
          "Check privacy, recording consent, customer-data handling, and country-specific terminology before rollout.",
          "Do not buy annual plans until the workflow has been tested by the actual users."
        ]
      }
    ],
    ctas: [
      { title: "Workflow guides", href: "/workflows/", description: "Match this plan to an existing WorkWise workflow kit." },
      { title: "AI tool recommender", href: "/free-tools/ai-tool-recommender/", description: "Shortlist tools for the workflow." }
    ]
  };
}

function generateDisplayAdReadiness(values: Record<string, string>): FreeToolResult {
  const indexedPages = Number(values.indexedPages) || 0;
  const sessions = Number(values.monthlySessions) || 0;
  const thinPages = Number(values.thinPages) || 0;
  const adSlots = Number(values.adSlots) || 0;
  const hasPolicies = values.policyPages === "yes";
  const score =
    Math.min(35, Math.floor(indexedPages / 2)) +
    Math.min(30, Math.floor(sessions / 100)) +
    (hasPolicies ? 20 : values.policyPages === "partly" ? 10 : 0) +
    (thinPages === 0 ? 10 : 0) +
    (adSlots <= 3 ? 5 : 0);

  const blockers = [
    indexedPages < 30 ? "Publish more useful, indexable pages before expecting meaningful ad performance." : "Indexed page count is moving in the right direction.",
    sessions < 1000 ? "Organic traffic is still early; focus on Search Console-led improvements before heavy ads." : "Traffic is enough to begin testing basic display placements.",
    hasPolicies ? "Trust pages are present." : "Add or finish editorial, contact, privacy, and disclosure pages.",
    thinPages > 0 ? "Fix thin indexable pages before applying to ad networks." : "No thin-page blocker reported.",
    adSlots > 3 ? "Reduce ad density so the site still feels useful and readable." : "Ad density looks conservative."
  ];

  return {
    title: `Display ad readiness score: ${Math.min(score, 100)}/100`,
    summary: "Use this as an operational checklist, not a guarantee of network approval.",
    sections: [
      { heading: "Readiness signals", body: blockers },
      {
        heading: "Next actions",
        body: [
          "Submit the sitemap in Search Console and wait for early query data.",
          "Keep ad slots as placeholders until a network supplies publisher IDs and ads.txt instructions.",
          "Prioritise page quality, internal linking, and clean UX before increasing ad density."
        ]
      }
    ],
    ctas: [
      { title: "Editorial policy", href: "/editorial-policy/", description: "Review the trust foundation." },
      { title: "Workflow guides", href: "/workflows/", description: "Publish stronger workflow clusters first." }
    ]
  };
}

function generateToolRecommendations(values: Record<string, string>): FreeToolResult {
  const task = values.task || "the task";
  const profession = values.profession || "team";
  const complexity = values.complexity || "simple";
  const budget = values.budget || "budget";
  const visual = /design|social|image|presentation|brochure|creative/i.test(task);
  const sales = /sales|lead|email|outreach|crm|follow/i.test(task);
  const coding = /code|debug|developer|test/i.test(task) || profession === "developer";

  const recommendations = [
    coding ? "GitHub Copilot - best first check for coding, debugging, and developer productivity." : "ChatGPT - flexible first stop for drafting, analysis, and prompt testing.",
    visual ? "Canva - useful when the workflow needs visual assets, social posts, or presentations." : sales ? "HubSpot - useful when the work needs CRM follow-up and lead tracking." : "Claude - useful when the work needs long-form writing or document analysis.",
    sales ? "Copy.ai - practical for sales copy, outreach variants, and go-to-market content." : "Notion AI - strong if the output needs reusable notes, project docs, or a lightweight knowledge base."
  ];

  return {
    title: `AI tool shortlist for a ${profession}`,
    summary: `For ${task} in ${values.country || "your market"}, start with tools that match a ${complexity} workflow and a ${budget} budget.`,
    sections: [
      { heading: "Recommended tools", body: recommendations },
      {
        heading: "What to avoid",
        body: [
          "Avoid tools that require a heavy setup before the workflow is proven.",
          "Avoid buying annual plans before checking team adoption and data handling.",
          "Avoid using AI outputs directly with clients or customers without review."
        ]
      }
    ],
    ctas: [
      { title: "Browse AI tools", href: "/ai-tools/", description: "Compare the starter tool directory." },
      { title: "Profession guides", href: "/professions/", description: "Find guides for the role closest to this workflow." }
    ]
  };
}

function generateProposal(values: Record<string, string>): FreeToolResult {
  const length = values.length || "standard";
  const sections =
    length === "short"
      ? ["Problem", "Recommended approach", "Timeline", "Investment", "Next step"]
      : length === "detailed"
        ? ["Executive summary", "Current challenge", "Goals", "Scope", "Process", "Timeline", "Responsibilities", "Investment", "Risks", "Next step"]
        : ["Problem", "Objectives", "Scope", "Timeline", "Responsibilities", "Investment", "Next step"];

  return {
    title: `${values.service || "Service"} proposal outline`,
    summary: `A ${values.tone || "clear"} proposal structure for a ${values.businessType || "business"} selling to ${values.clientType || "a client"}.`,
    sections: [
      {
        heading: "Recommended sections",
        body: sections.map((section) => `${section}: add one concise paragraph focused on the client outcome.`)
      },
      {
        heading: "Suggested wording",
        body: [
          `This proposal outlines how ${values.businessType || "we"} can help ${values.clientType || "your team"} implement ${values.service || "the service"} with a practical, low-friction process.`,
          "The goal is to reduce manual work, clarify ownership, and create a repeatable workflow the client can keep using."
        ]
      },
      {
        heading: "Close",
        body: ["If this direction looks right, the next step is a short kickoff call to confirm scope, timeline, and access needs."]
      }
    ],
    ctas: [
      { title: "Client onboarding workflow", href: "/workflows/ai-client-onboarding-workflow/", description: "Use this after the proposal is accepted." },
      { title: "Templates", href: "/templates/", description: "Turn the outline into reusable templates." }
    ]
  };
}

function generateColdEmail(values: Record<string, string>): FreeToolResult {
  return {
    title: `Cold email for ${values.audience || "your audience"}`,
    summary: `A ${values.tone || "direct"} email focused on ${values.painPoint || "the pain point"} and a low-pressure CTA.`,
    sections: [
      {
        heading: "Subject lines",
        body: [
          `Quick idea for ${values.audience || "your team"}`,
          `Reducing ${values.painPoint || "manual work"}`,
          "Worth exploring?"
        ]
      },
      {
        heading: "Email body",
        body: [
          `Hi [Name], I noticed teams like yours often run into ${values.painPoint || "manual follow-up"}.`,
          `We help with ${values.offer || "AI workflow setup"} so the process is easier to manage and less dependent on manual effort.`,
          `Would it be useful if I ${values.cta || "sent over a short example"}?`
        ]
      },
      {
        heading: "Follow-up",
        body: [
          `Hi [Name], just checking whether improving ${values.painPoint || "this workflow"} is a priority this quarter. Happy to send a concise example if useful.`
        ]
      }
    ],
    ctas: [
      { title: "Sales workflow", href: "/workflows/ai-cold-email-follow-up-workflow/", description: "Connect this copy to a follow-up process." },
      { title: "Sales tools", href: "/professions/sales-teams/", description: "Compare AI tools for sales teams." }
    ]
  };
}

function generatePrompt(values: Record<string, string>): FreeToolResult {
  return {
    title: `${values.tool || "AI"} prompt for a ${values.profession || "professional"}`,
    summary: `A reusable prompt for ${values.task || "the task"} with a ${values.outputFormat || "structured"} output.`,
    sections: [
      {
        heading: "Main prompt",
        body: [
          `Act as a ${values.profession || "professional"}. Help me ${values.task || "complete this task"}. Use only the context I provide. Return the answer as a ${values.outputFormat || "structured checklist"}.`
        ]
      },
      {
        heading: "Constraints",
        body: [values.constraints || "Do not invent facts. Flag assumptions. Keep the output concise."]
      },
      {
        heading: "Refinement prompt",
        body: [
          "Rewrite the output for the intended audience, make the assumptions explicit, and add a final checklist of facts I should verify before using it."
        ]
      },
      {
        heading: "Mistakes to avoid",
        body: ["Do not invent names, numbers, credentials, legal claims, pricing, or availability.", "Do not send the first draft without reviewing tone and factual accuracy."]
      }
    ],
    ctas: [
      { title: "Prompt library", href: "/prompts/", description: "Browse related prompt pages." },
      { title: "Recruiter prompt example", href: "/prompts/chatgpt-prompts-for-recruiters/", description: "See a worked profession prompt." }
    ]
  };
}

function generateSaasCost(values: Record<string, string>): FreeToolResult {
  const currency = values.currency || "USD";
  const result = calculateSaasCost({
    users: Number(values.users) || 0,
    monthlyPrice: Number(values.monthlyPrice) || 0,
    setupCost: Number(values.setupCost) || 0,
    annualDiscount: Number(values.annualDiscount) || 0,
    tools: Number(values.tools) || 0
  });

  const format = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency });

  return {
    title: "SaaS cost estimate",
    summary: `Estimated spend for ${values.users || "0"} users across ${values.tools || "0"} tools.`,
    sections: [
      {
        heading: "Cost estimate",
        body: [
          `Monthly cost: ${format(result.monthly)}`,
          `Annual cost before discount: ${format(result.annualBeforeDiscount)}`,
          `Annual discount saving: ${format(result.annualSavings)}`,
          `Annual cost after discount and setup: ${format(result.annual)}`
        ]
      },
      {
        heading: "Buying notes",
        body: [
          "Check whether the vendor bills by seat, workspace, usage, or add-on.",
          "Confirm annual discounts, setup fees, AI usage limits, and cancellation terms.",
          "Budget extra for migration, training, and integrations if the tool touches client or customer data."
        ]
      }
    ],
    ctas: [
      { title: "AI tools directory", href: "/ai-tools/", description: "Compare tools before buying." },
      { title: "Comparison guides", href: "/comparisons/", description: "Review trade-offs between vendors." }
    ]
  };
}
