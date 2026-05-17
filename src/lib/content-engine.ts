import type {
  AlternativeSet,
  Comparison,
  Country,
  PageContentProfile,
  Profession,
  PromptTemplate,
  SiteLink,
  Tool,
  Workflow
} from "@/types/content";
import { getPageQualityScore } from "./quality";
import { currentYear } from "./seo";

export function pricingSummary(tool: Tool) {
  const price = tool.startingPrice === null ? "verify current vendor pricing" : `${tool.currency} ${tool.startingPrice}`;
  const planNotes = [
    tool.freePlanAvailable ? "free plan flagged" : "no free plan flagged",
    tool.trialAvailable ? "trial flagged" : "no trial flagged",
    tool.affiliateAvailable ? "affiliate-ready record" : "no affiliate flag"
  ];

  return {
    price,
    planNotes,
    warning: "Pricing changes frequently. Treat seed pricing as unverified until lastCheckedAt is updated."
  };
}

export function bestUseCaseRows(tools: Tool[]) {
  return tools.slice(0, 6).map((tool) => ({
    useCase: tool.bestFor[0] || tool.useCases[0] || "general workflow support",
    winner: tool.name,
    why: tool.summary
  }));
}

export function buildProfessionFaqs(profession: Profession, tools: Tool[]) {
  return [
    {
      question: `What is the best AI tool for ${profession.name.toLowerCase()}?`,
      answer: tools[0]
        ? `${tools[0].name} is the first seed recommendation because it is tagged for ${profession.commonTasks.slice(0, 2).join(" and ")}. Verify this against current pricing and hands-on testing before publishing.`
        : "This guide needs more matching tools before a recommendation should be indexed."
    },
    {
      question: `Which AI tasks matter most for ${profession.name.toLowerCase()}?`,
      answer: `The seed model prioritises ${profession.commonTasks.slice(0, 4).join(", ")}. Add profession-specific examples before launch.`
    },
    {
      question: "How should these recommendations be checked?",
      answer: "Confirm pricing, regional availability, data handling, integrations, and whether outputs can be reviewed before client or customer use."
    }
  ];
}

export function buildCountryFaqs(country: Country, tools: Tool[]) {
  return [
    {
      question: `What should businesses in ${country.name} check before buying AI software?`,
      answer: `Check ${country.currency} billing, local terminology, regional feature availability, and privacy requirements. ${country.privacyNotes.join(" ")}`
    },
    {
      question: `Are these AI tools available in ${country.name}?`,
      answer: `${tools.length} starter tools are tagged for ${country.name}. Availability and plan details still need vendor verification.`
    }
  ];
}

export function buildToolFaqs(tool: Tool) {
  return [
    {
      question: `What is ${tool.name} best for?`,
      answer: `${tool.name} is tagged for ${tool.bestFor.slice(0, 3).join(", ")} in the starter database.`
    },
    {
      question: `Does ${tool.name} have a free plan?`,
      answer: tool.freePlanAvailable
        ? "The seed data flags a free plan, but this should be verified against the vendor's current pricing page."
        : "The seed data does not flag a free plan. Verify current vendor pricing before publication."
    }
  ];
}

export function professionWorkflowSuggestion(profession: Profession, workflows: Workflow[]) {
  const direct = workflows.find((workflow) => workflow.relatedProfession === profession.slug);
  if (direct) return direct;

  return {
    title: `${profession.name} AI task workflow`,
    slug: `${profession.slug}-ai-task-workflow`,
    problem: `${profession.name} need a repeatable process for ${profession.commonTasks[0] || "routine AI-assisted work"}.`,
    toolsNeeded: profession.recommendedCategories,
    relatedProfession: profession.slug,
    steps: profession.commonTasks.slice(0, 4).map((task) => ({
      title: task,
      description: `Use AI to draft, structure, or review the ${task} output, then check facts and context before using it.`
    })),
    prompts: [
      `Act as an assistant for ${profession.name.toLowerCase()}. Help me ${profession.commonTasks[0] || "complete this task"} using only the context I provide.`
    ],
    templates: [`${profession.name} task checklist`]
  };
}

export function matchingPromptLinks(profession: Profession, prompts: PromptTemplate[]): SiteLink[] {
  return prompts
    .filter((prompt) => prompt.profession === profession.slug)
    .map((prompt) => ({ title: prompt.title, href: `/prompts/${prompt.slug}/`, description: prompt.task }));
}

export function countryProfessionLinks(country: Country, professions: Profession[]): SiteLink[] {
  return professions.slice(0, 6).map((profession) => ({
    title: `${profession.name} AI tools in ${country.name}`,
    href: `/professions/${profession.slug}/`,
    description: `${country.currency} context, local terminology, and ${profession.commonTasks[0] || "workflow"} fit.`
  }));
}

export function metadataDate() {
  return currentYear().toString();
}

export function buildToolProfile(tool: Tool, related: SiteLink[]): PageContentProfile {
  const valueBlocks = ["editorial-verdict", "pros-cons", "best-for", "pricing-summary", "faqs", "related-links"];
  const dataWarnings = [
    ...freshnessWarnings(tool.lastCheckedAt),
    ...(tool.startingPrice === null ? ["Starting price is unverified."] : []),
    ...(tool.websiteUrl ? [] : ["Vendor website URL is missing."])
  ];

  return {
    pageType: "tool-detail",
    valueBlocks,
    uniqueAngles: [
      `${tool.name} is mapped to ${tool.professions.length} professions.`,
      `${tool.name} is mapped to ${tool.countries.length} countries.`,
      `${tool.name} has ${tool.bestFor.length} best-fit use cases.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      matchingTools: [tool],
      valueBlocks,
      intro: tool.summary,
      internalLinks: related,
      lastUpdated: tool.lastCheckedAt,
      hasAuthor: true,
      dataWarnings
    })
  };
}

export function buildProfessionProfile(profession: Profession, tools: Tool[], related: SiteLink[]): PageContentProfile {
  const valueBlocks = [
    "profession-verdict",
    "ranked-tools",
    "comparison-table",
    "use-case-winners",
    "pain-points",
    "workflow-example",
    "prompt-links",
    "faqs"
  ];
  const dataWarnings = [
    ...(tools.length < 3 ? [`Only ${tools.length} matching tools found.`] : []),
    ...tools.flatMap((tool) => freshnessWarnings(tool.lastCheckedAt, tool.name))
  ];

  return {
    pageType: "profession-guide",
    valueBlocks,
    uniqueAngles: [
      `${profession.name} guide uses ${profession.painPoints.length} pain points.`,
      `${profession.name} guide uses ${profession.commonTasks.length} common tasks.`,
      `${tools.length} tools match this profession.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks,
      intro: `${profession.name} need help with ${profession.commonTasks.join(", ")}.`,
      internalLinks: related,
      lastUpdated: new Date().toISOString(),
      hasAuthor: true,
      requiresThreeTools: true,
      dataWarnings
    })
  };
}

export function buildCountryProfile(country: Country, tools: Tool[], related: SiteLink[]): PageContentProfile {
  const valueBlocks = [
    "country-verdict",
    "currency-note",
    "terminology-note",
    "privacy-note",
    "ranked-tools",
    "use-case-winners",
    "faqs"
  ];
  const dataWarnings = [
    ...(tools.length < 3 ? [`Only ${tools.length} matching tools found.`] : []),
    ...(country.privacyNotes.length ? [] : ["Privacy notes are missing."])
  ];

  return {
    pageType: "country-guide",
    valueBlocks,
    uniqueAngles: [
      `${country.name} guide includes ${country.currency} currency context.`,
      `${country.name} guide includes ${country.terminologyNotes.length} terminology notes.`,
      `${tools.length} tools are tagged for this country.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks,
      intro: `${country.name} AI tool guide with ${country.currency} pricing context and ${country.terminologyNotes.join(", ")} terminology.`,
      internalLinks: related,
      lastUpdated: new Date().toISOString(),
      hasAuthor: true,
      requiresThreeTools: true,
      dataWarnings
    })
  };
}

export function buildComparisonProfile(comparison: Comparison, tools: Tool[], related: SiteLink[]): PageContentProfile {
  const valueBlocks = ["quick-verdict", "feature-table", "pricing-summary", "use-case-winners", "pros-cons", "faqs", "alternatives"];
  const dataWarnings = [
    ...(tools.length < 2 ? ["Comparison is missing one or both tools."] : []),
    ...tools.flatMap((tool) => freshnessWarnings(tool.lastCheckedAt, tool.name))
  ];

  return {
    pageType: "comparison",
    valueBlocks,
    uniqueAngles: [
      `Comparison has a primary use case: ${comparison.primaryUseCase || "not specified"}.`,
      `Comparison has ${Object.keys(comparison.winnerByUseCase || {}).length} use-case winners.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks,
      intro: comparison.summaryVerdict,
      internalLinks: related,
      lastUpdated: comparison.lastCheckedAt,
      hasAuthor: true,
      dataWarnings
    })
  };
}

export function buildAlternativeProfile(set: AlternativeSet, tools: Tool[], related: SiteLink[]): PageContentProfile {
  const valueBlocks = ["switching-reason", "ranked-alternatives", "comparison-table", "best-free-option", "best-business-option", "faqs"];
  const dataWarnings = [
    ...(tools.length < 3 ? [`Only ${tools.length} alternatives found.`] : []),
    ...(set.reason ? [] : ["Switching reason is missing."]),
    ...(set.finalVerdict ? [] : ["Final verdict is missing."])
  ];

  return {
    pageType: "alternatives",
    valueBlocks,
    uniqueAngles: [
      `${set.baseToolName} alternatives page has ${tools.length} candidates.`,
      `Best free option: ${set.bestFreeOption || "not set"}.`,
      `Best business option: ${set.bestBusinessOption || "not set"}.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks,
      intro: set.reason,
      internalLinks: related,
      lastUpdated: set.lastCheckedAt,
      hasAuthor: true,
      requiresThreeTools: true,
      dataWarnings
    })
  };
}

export function buildWorkflowProfile(workflow: Workflow, related: SiteLink[]): PageContentProfile {
  const valueBlocks = ["problem", "tools-needed", "step-by-step-workflow", "prompts", "templates", "related-pages"];
  const dataWarnings = [
    ...(workflow.toolsNeeded.length ? [] : ["Workflow has no tools needed."]),
    ...(workflow.steps.length < 3 ? ["Workflow has fewer than 3 steps."] : []),
    ...freshnessWarnings(workflow.lastUpdatedAt)
  ];

  return {
    pageType: "workflow",
    valueBlocks,
    uniqueAngles: [
      `Workflow includes ${workflow.steps.length} steps.`,
      `Workflow includes ${workflow.toolsNeeded.length} tools.`,
      `Workflow includes ${workflow.prompts.length} prompts.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      valueBlocks,
      intro: workflow.problem,
      internalLinks: related,
      lastUpdated: workflow.lastUpdatedAt,
      hasAuthor: true,
      dataWarnings
    })
  };
}

export function buildPromptProfile(prompt: PromptTemplate, related: SiteLink[]): PageContentProfile {
  const valueBlocks = ["task-explanation", "prompt-library", "refinement-prompt", "mistakes-to-avoid", "related-pages"];
  const dataWarnings = [
    ...(prompt.refinementPrompt ? [] : ["Refinement prompt is missing."]),
    ...(prompt.mistakesToAvoid.length ? [] : ["Mistakes-to-avoid list is missing."]),
    ...freshnessWarnings(prompt.lastUpdatedAt)
  ];

  return {
    pageType: "prompt-template",
    valueBlocks,
    uniqueAngles: [
      `Prompt supports task: ${prompt.task}.`,
      `Prompt has ${prompt.mistakesToAvoid.length} mistakes to avoid.`
    ],
    dataWarnings,
    quality: getPageQualityScore({
      valueBlocks,
      intro: prompt.prompt,
      internalLinks: related,
      lastUpdated: prompt.lastUpdatedAt,
      hasAuthor: true,
      dataWarnings
    })
  };
}

function freshnessWarnings(date?: string | null, label = "Record") {
  if (!date) return [`${label} has no verified last-checked date.`];

  const ageDays = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
  return ageDays > 90 ? [`${label} was last checked more than 90 days ago.`] : [];
}
