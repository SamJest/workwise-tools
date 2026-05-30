import type { SiteLink } from "@/types/content";

export type WorkflowKit = {
  title: string;
  slug: string;
  audience: string;
  priority: number;
  summary: string;
  professionSlug: string;
  workflowSlug: string;
  comparisonSlugs: string[];
  alternativeSlugs: string[];
  promptSlugs: string[];
  freeToolSlug: string;
  countrySlugs: string[];
  bestFor: string[];
  outcomes: string[];
  implementationChecklist: string[];
  commonMistakes: string[];
  editorialNotes: string[];
};

export const workflowKits: WorkflowKit[] = [
  {
    title: "Ecommerce Launch Kit",
    slug: "ecommerce-launch-kit",
    audience: "Shopify and online store owners",
    priority: 1,
    summary: "Plan product launches, write product copy, prepare visuals, build lifecycle messages, and triage customer questions.",
    professionSlug: "ecommerce-sellers",
    workflowSlug: "ai-ecommerce-product-launch-workflow",
    comparisonSlugs: ["klaviyo-ai-vs-shopify-magic", "mailchimp-vs-omnisend", "gorgias-vs-zendesk-ai"],
    alternativeSlugs: ["shopify-magic-alternatives", "mailchimp-alternatives", "zendesk-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-ecommerce-sellers", "chatgpt-prompts-for-ecommerce-support"],
    freeToolSlug: "workflow-kit-planner",
    countrySlugs: ["us", "uk"],
    bestFor: [
      "Store owners preparing product launches with limited content support",
      "Teams that need product copy, lifecycle emails, support replies, and launch assets in one workflow",
      "Operators choosing between ecommerce-native AI features and broader marketing automation tools"
    ],
    outcomes: [
      "A launch checklist that connects product pages, email flows, creative assets, and support triage",
      "A short tool stack for product copy, email automation, support automation, and creative production",
      "Prompts and templates that keep product claims specific, reviewable, and consistent"
    ],
    implementationChecklist: [
      "Start with the product brief and approved claims before generating copy",
      "Choose one email or SMS platform before adding extra automation tools",
      "Create a support response library for common pre-launch and post-launch questions",
      "Review country-specific consumer, privacy, and promotional wording before publishing",
      "Measure launch content quality before testing paid traffic"
    ],
    commonMistakes: [
      "Publishing AI-written product claims that the product page cannot prove",
      "Buying separate tools for email, SMS, support, and content before mapping the launch workflow",
      "Ignoring support handoff, which can erase the benefit of faster launch content"
    ],
    editorialNotes: [
      "This kit should stay focused on small ecommerce teams rather than enterprise retail operations.",
      "Exact plan limits should be checked against vendor pricing pages before publishing buying claims.",
      "US and UK variants should use local consumer language where guarantees, discounts, or privacy wording differ."
    ]
  },
  {
    title: "Marketing Agency Campaign Kit",
    slug: "marketing-agency-campaign-kit",
    audience: "Small agencies and fractional marketing teams",
    priority: 2,
    summary: "Turn research, client notes, SEO inputs, and creative direction into campaign briefs and production tasks.",
    professionSlug: "marketing-agencies",
    workflowSlug: "ai-agency-campaign-brief-workflow",
    comparisonSlugs: ["semrush-vs-jasper", "jasper-vs-copy-ai"],
    alternativeSlugs: ["semrush-alternatives", "jasper-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-marketing-agencies"],
    freeToolSlug: "workflow-kit-planner",
    countrySlugs: ["us", "uk"],
    bestFor: [
      "Small agencies turning client notes into briefs, SEO plans, creative concepts, and production tasks",
      "Fractional marketing teams that need repeatable campaign planning without a heavy enterprise stack",
      "Teams deciding where AI belongs across research, writing, scheduling, reporting, and approvals"
    ],
    outcomes: [
      "A campaign workflow from intake to brief, content plan, draft assets, review notes, and reporting",
      "A tool shortlist for SEO research, copy, design, scheduling, video, project tracking, and automation",
      "Prompt and template assets that reduce blank-page time without replacing client strategy"
    ],
    implementationChecklist: [
      "Collect client context, audience, offer, constraints, and approval rules before using AI",
      "Separate research tools from copy tools so weak source material does not become polished nonsense",
      "Assign one owner for quality review, source checking, and client-ready edits",
      "Use project management fields to track AI-assisted tasks and human approvals",
      "Refresh campaign pages when Search Console reveals real query patterns"
    ],
    commonMistakes: [
      "Treating AI drafts as strategy instead of inputs for a strategist to refine",
      "Using copied competitor phrasing without a clear client-specific angle",
      "Skipping approval workflows and letting generated assets scatter across tools"
    ],
    editorialNotes: [
      "This kit should prioritise agency operations and client deliverables rather than generic marketing advice.",
      "Comparison sections should answer tool-stack decisions, not just feature lists.",
      "Refresh this kit first when early GSC data shows impressions for agency, SEO brief, or campaign planning terms."
    ]
  },
  {
    title: "Real Estate Listing Kit",
    slug: "real-estate-listing-kit",
    audience: "Realtors, estate agents, and property teams",
    priority: 3,
    summary: "Create safer property copy, viewing assets, meeting notes, and CRM follow-up without inventing claims.",
    professionSlug: "real-estate-agents",
    workflowSlug: "real-estate-lead-follow-up-workflow",
    comparisonSlugs: ["pipedrive-vs-follow-up-boss", "matterport-vs-canva", "fireflies-ai-vs-fathom"],
    alternativeSlugs: ["pipedrive-alternatives", "hubspot-alternatives", "fireflies-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-real-estate-agents", "chatgpt-prompts-for-estate-agent-viewing-follow-up"],
    freeToolSlug: "prompt-generator",
    countrySlugs: ["us", "uk"],
    bestFor: [
      "Agents who need listing copy, viewing notes, follow-up, and CRM hygiene in a repeatable process",
      "Small teams creating property marketing assets without inventing facts or overpromising",
      "US realtor and UK estate agency workflows that need local terminology and careful claim review"
    ],
    outcomes: [
      "A safer listing workflow from property facts to copy, visuals, viewing notes, and follow-up",
      "A tool shortlist for property assets, meeting notes, CRM, email follow-up, and client updates",
      "Country-aware prompts that keep descriptions grounded in confirmed property details"
    ],
    implementationChecklist: [
      "Separate confirmed facts from persuasive wording before drafting listing copy",
      "Keep human approval on property claims, measurements, school references, and neighbourhood wording",
      "Route viewing notes into the CRM quickly so follow-up happens while buyer intent is fresh",
      "Use local terminology consistently across US and UK pages",
      "Avoid tools that create beautiful assets but do not connect to follow-up workflows"
    ],
    commonMistakes: [
      "Letting AI invent property benefits that cannot be supported by the listing record",
      "Treating image or tour tools as the whole workflow while ignoring lead follow-up",
      "Using US real estate wording on UK estate agency pages, or the reverse"
    ],
    editorialNotes: [
      "This kit should be conservative with claims because real estate pages carry trust and compliance risk.",
      "Country variants should explain terminology differences clearly.",
      "The best pages in this cluster should help readers produce safer, faster follow-up rather than just prettier listings."
    ]
  },
  {
    title: "Consultant Report Kit",
    slug: "consultant-report-kit",
    audience: "Consultants and solo advisory firms",
    priority: 4,
    summary: "Move from research, notes, and interviews to evidence-led reports, recommendations, and next actions.",
    professionSlug: "consultants",
    workflowSlug: "ai-consultant-research-to-report-workflow",
    comparisonSlugs: ["chatgpt-vs-claude", "chatgpt-vs-notion-ai", "fireflies-ai-vs-fathom"],
    alternativeSlugs: ["fireflies-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-consultants"],
    freeToolSlug: "ai-proposal-generator",
    countrySlugs: ["us", "uk"],
    bestFor: [
      "Consultants converting calls, research, and notes into structured reports and implementation plans",
      "Solo advisors who need repeatable delivery without hiring a research or operations assistant",
      "Teams comparing general AI assistants, note tools, and workspace tools for client deliverables"
    ],
    outcomes: [
      "A research-to-report workflow that preserves evidence, assumptions, recommendations, and next actions",
      "A tool shortlist for note capture, synthesis, writing, project documentation, and proposal drafting",
      "A quality-control checklist that keeps recommendations traceable to source material"
    ],
    implementationChecklist: [
      "Create a source folder before asking AI to summarise or recommend anything",
      "Separate facts, assumptions, risks, and recommendations in every generated draft",
      "Use one workspace for client notes, report drafts, and implementation tasks",
      "Review confidentiality and privacy expectations before uploading client material",
      "Turn final recommendations into an implementation plan with owners and deadlines"
    ],
    commonMistakes: [
      "Using AI to create confident recommendations from weak or incomplete source material",
      "Mixing client confidential data into tools without checking privacy and retention settings",
      "Stopping at a polished report instead of creating an actionable implementation plan"
    ],
    editorialNotes: [
      "This kit should compete on decision quality and process clarity rather than flashy AI productivity claims.",
      "Privacy notes matter more here because consultants often handle sensitive client documents.",
      "The strongest supporting pages should connect report writing, proposal generation, and implementation planning."
    ]
  },
  {
    title: "Sales Follow-Up Kit",
    slug: "sales-follow-up-kit",
    audience: "Sales reps, BDRs, and small revenue teams",
    priority: 5,
    summary: "Draft outreach, summarise calls, capture objections, and keep follow-up tasks inside the CRM.",
    professionSlug: "sales-teams",
    workflowSlug: "pipedrive-sales-follow-up-workflow",
    comparisonSlugs: ["pipedrive-vs-hubspot", "hubspot-vs-copy-ai", "fireflies-ai-vs-fathom"],
    alternativeSlugs: ["pipedrive-alternatives", "hubspot-alternatives", "fireflies-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-sales-teams", "chatgpt-prompts-for-sales-crm-hygiene"],
    freeToolSlug: "ai-cold-email-generator",
    countrySlugs: ["us", "uk"],
    bestFor: [
      "Sales reps and small revenue teams improving outreach, call notes, CRM hygiene, and follow-up",
      "Teams deciding between CRM-native AI, meeting note tools, enrichment platforms, and workflow automation",
      "Operators who need repeatable follow-up without turning every message into generic AI copy"
    ],
    outcomes: [
      "A sales workflow from lead context to outreach, call summary, objection capture, CRM update, and next step",
      "A tool shortlist for prospecting, CRM, call notes, scheduling, forms, and automation",
      "Prompt assets that keep personalisation specific and avoid spammy outreach patterns"
    ],
    implementationChecklist: [
      "Define lead source, buyer persona, offer, and qualification rules before generating outreach",
      "Keep call notes, objections, and next steps synced into the CRM",
      "Use enrichment data to improve relevance, not to inflate message volume",
      "Review privacy and consent expectations for US and UK outreach",
      "Measure reply quality and pipeline movement, not just outbound activity"
    ],
    commonMistakes: [
      "Sending more AI-generated outreach before fixing targeting or offer clarity",
      "Leaving call summaries outside the CRM where the rest of the team cannot use them",
      "Using enrichment and automation tools without a review step for relevance and consent"
    ],
    editorialNotes: [
      "This kit should stay focused on useful sales workflow design, not growth-hacking volume claims.",
      "Country notes should be careful around privacy, consent, and outreach language.",
      "Comparison pages should help buyers decide between CRM, note-taking, enrichment, and automation layers."
    ]
  }
];

export function getWorkflowKit(slug: string): WorkflowKit | undefined {
  return workflowKits.find((kit) => kit.slug === slug);
}

export function kitLinks(kit: WorkflowKit): SiteLink[] {
  return [
    {
      title: `Best AI tools for ${kit.audience.toLowerCase()}`,
      href: `/professions/${kit.professionSlug}/`,
      description: "Role-specific tool shortlist and workflow fit."
    },
    {
      title: "Workflow guide",
      href: `/workflows/${kit.workflowSlug}/`,
      description: kit.summary
    },
    ...kit.comparisonSlugs.slice(0, 2).map((slug) => ({
      title: slug.replaceAll("-", " "),
      href: `/comparisons/${slug}/`,
      description: "Side-by-side tool decision page."
    })),
    ...kit.alternativeSlugs.slice(0, 1).map((slug) => ({
      title: slug.replaceAll("-", " "),
      href: `/alternatives/${slug}/`,
      description: "Switching and replacement options."
    })),
    ...kit.promptSlugs.slice(0, 1).map((slug) => ({
      title: slug.replaceAll("-", " "),
      href: `/prompts/${slug}/`,
      description: "Reusable prompt/template asset."
    })),
    {
      title: "Free planner",
      href: `/free-tools/${kit.freeToolSlug}/`,
      description: "Generate a practical first draft."
    }
  ];
}
