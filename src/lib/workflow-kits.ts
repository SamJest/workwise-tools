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
    comparisonSlugs: ["klaviyo-ai-vs-shopify-magic"],
    alternativeSlugs: ["shopify-magic-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-ecommerce-sellers", "chatgpt-prompts-for-ecommerce-support"],
    freeToolSlug: "workflow-kit-planner",
    countrySlugs: ["us", "uk"]
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
    countrySlugs: ["us", "uk"]
  },
  {
    title: "Real Estate Listing Kit",
    slug: "real-estate-listing-kit",
    audience: "Realtors, estate agents, and property teams",
    priority: 3,
    summary: "Create safer property copy, viewing assets, meeting notes, and CRM follow-up without inventing claims.",
    professionSlug: "real-estate-agents",
    workflowSlug: "ai-real-estate-listing-lead-follow-up-workflow",
    comparisonSlugs: ["hubspot-vs-copy-ai", "fireflies-ai-vs-fathom"],
    alternativeSlugs: ["hubspot-alternatives", "fireflies-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-real-estate-agents"],
    freeToolSlug: "prompt-generator",
    countrySlugs: ["us", "uk"]
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
    countrySlugs: ["us", "uk"]
  },
  {
    title: "Sales Follow-Up Kit",
    slug: "sales-follow-up-kit",
    audience: "Sales reps, BDRs, and small revenue teams",
    priority: 5,
    summary: "Draft outreach, summarise calls, capture objections, and keep follow-up tasks inside the CRM.",
    professionSlug: "sales-teams",
    workflowSlug: "ai-cold-email-follow-up-workflow",
    comparisonSlugs: ["hubspot-vs-copy-ai", "fireflies-ai-vs-fathom"],
    alternativeSlugs: ["hubspot-alternatives", "fireflies-ai-alternatives"],
    promptSlugs: ["chatgpt-prompts-for-sales-teams"],
    freeToolSlug: "ai-cold-email-generator",
    countrySlugs: ["us", "uk"]
  }
];

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
