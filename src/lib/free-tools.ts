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
