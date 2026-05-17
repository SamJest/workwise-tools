import type {
  AlternativeSet,
  Comparison,
  Country,
  PageQuality,
  Profession,
  PromptTemplate,
  SeedData,
  SiteLink,
  Tool,
  ToolCategory,
  Workflow
} from "@/types/content";
import { freeTools } from "./free-tools";
import { getPageQualityScore } from "./quality";
import { currentYear, truncateDescription } from "./seo";
import { getUseCasePages, slugifyUseCase, type UseCasePage } from "./use-cases";
import { workflowKits } from "./workflow-kits";

export type RouteGroup =
  | "static"
  | "tools"
  | "categories"
  | "use-cases"
  | "professions"
  | "countries"
  | "comparisons"
  | "alternatives"
  | "workflows"
  | "workflow-kits"
  | "prompts"
  | "templates"
  | "free-tools"
  | "country-professions";

export type SeoRoute = {
  path: string;
  group: RouteGroup;
  title: string;
  description: string;
  quality: PageQuality;
  canonical?: string;
  parent?: string;
};

const strongStaticQuality: PageQuality = {
  score: 9,
  reasons: [],
  valueBlocks: ["static-page", "trust-copy", "navigation"],
  warnings: [],
  indexable: true
};

export const staticSeoRoutes: SeoRoute[] = [
  {
    path: "/",
    group: "static",
    title: "WorkWise Tools: AI and SaaS Guides for Better Workflows",
    description: "Compare AI and SaaS tools by workflow, profession, country, use case, and budget.",
    quality: strongStaticQuality
  },
  {
    path: "/ai-tools/",
    group: "tools",
    title: "AI Tools Directory",
    description: "Browse AI and SaaS tools by category, pricing model, profession fit, and use case.",
    quality: strongStaticQuality
  },
  {
    path: "/best-ai-tools/",
    group: "static",
    title: "Best AI Tools for Small Business Workflows",
    description: "A workflow-first guide to the best AI tools for US and UK small businesses, with shortlists by use case and team.",
    quality: strongStaticQuality
  },
  {
    path: "/categories/",
    group: "categories",
    title: "AI Tool Categories",
    description: "Browse AI and SaaS tools by practical workflow category, then compare implementation fit.",
    quality: strongStaticQuality
  },
  {
    path: "/use-cases/",
    group: "use-cases",
    title: "AI Tool Use Cases",
    description: "Compare AI and SaaS tools by recurring small-business use case, setup effort, privacy risk, and workflow fit.",
    quality: strongStaticQuality
  },
  {
    path: "/professions/",
    group: "professions",
    title: "Best AI Tools by Profession",
    description: "Explore AI tool guides for accountants, recruiters, sales teams, agencies, freelancers, teachers, developers, and more.",
    quality: strongStaticQuality
  },
  {
    path: "/countries/",
    group: "countries",
    title: "Best AI Tools by Country",
    description: "Country-specific AI software guides with currency, terminology, privacy notes, and local business context.",
    quality: strongStaticQuality
  },
  {
    path: "/comparisons/",
    group: "comparisons",
    title: "AI Tool Comparisons",
    description: "Compare AI and SaaS tools side by side by use case, pricing notes, strengths, and workflow fit.",
    quality: strongStaticQuality
  },
  {
    path: "/alternatives/",
    group: "alternatives",
    title: "Best AI Tool Alternatives",
    description: "Find alternatives to popular AI and SaaS tools by pricing, workflow fit, and use case.",
    quality: strongStaticQuality
  },
  {
    path: "/workflows/",
    group: "workflows",
    title: "AI Workflow Guides",
    description: "Step-by-step AI workflows with tools, prompts, templates, automation notes, and related guides.",
    quality: strongStaticQuality
  },
  {
    path: "/workflow-kits/",
    group: "workflow-kits",
    title: "AI Workflow Kits",
    description: "Complete workflow hubs linking tools, comparisons, alternatives, prompts, free tools, and country context.",
    quality: strongStaticQuality
  },
  {
    path: "/prompts/",
    group: "prompts",
    title: "AI Prompt Library",
    description: "Prompt templates by profession, task, tool, mistakes to avoid, and related workflows.",
    quality: strongStaticQuality
  },
  {
    path: "/templates/",
    group: "templates",
    title: "AI Templates",
    description: "Starter template pages tied to prompts, workflows, and professional tasks.",
    quality: strongStaticQuality
  },
  {
    path: "/free-tools/",
    group: "free-tools",
    title: "Free AI Tools and Calculators",
    description: "Rule-based free tools for AI tool recommendations, proposals, cold email, prompts, and SaaS cost planning.",
    quality: strongStaticQuality
  },
  {
    path: "/about/",
    group: "static",
    title: "About",
    description: "This project is a database-driven AI and SaaS decision platform.",
    quality: strongStaticQuality
  },
  {
    path: "/editorial-policy/",
    group: "static",
    title: "Editorial Policy",
    description: "How guides should be researched, updated, disclosed, and improved.",
    quality: strongStaticQuality
  },
  {
    path: "/how-we-review-ai-tools/",
    group: "static",
    title: "How We Review AI Tools",
    description: "The review framework for evaluating AI and SaaS tools.",
    quality: strongStaticQuality
  },
  {
    path: "/affiliate-disclosure/",
    group: "static",
    title: "Advertising and Affiliate Disclosure",
    description: "How display ads, affiliate links, and sponsored placements should be disclosed.",
    quality: strongStaticQuality
  },
  {
    path: "/privacy/",
    group: "static",
    title: "Privacy Policy",
    description: "How analytics, contact messages, cookies, and future advertising data are handled.",
    quality: strongStaticQuality
  },
  {
    path: "/cookies/",
    group: "static",
    title: "Cookie Policy",
    description: "How cookies may be used for analytics, site performance, and future display ads.",
    quality: strongStaticQuality
  },
  {
    path: "/terms/",
    group: "static",
    title: "Terms of Use",
    description: "Rules for using WorkWise Tools content, free tools, comparisons, and workflow templates.",
    quality: strongStaticQuality
  },
  {
    path: "/contact/",
    group: "static",
    title: "Contact",
    description: "Contact page placeholder for editorial corrections and vendor inquiries.",
    quality: strongStaticQuality
  },
  {
    path: "/media-kit/",
    group: "static",
    title: "Media Kit",
    description: "Sponsor and vendor inquiry placeholder for monetisation workflows.",
    quality: strongStaticQuality
  }
];

export function buildSeoRoutes(data: SeedData): SeoRoute[] {
  const context = createRouteContext(data);
  return [
    ...staticSeoRoutes,
    ...data.tools.map((tool) => toolRoute(tool, context)),
    ...data.categories.map((category) => categoryRoute(category, context)),
    ...context.useCasePages.map((useCase) => useCaseRoute(useCase, context)),
    ...data.professions.map((profession) => professionRoute(profession, context)),
    ...data.countries.map((country) => countryRoute(country, context)),
    ...countryProfessionRoutes(context),
    ...data.comparisons.map((comparison) => comparisonRoute(comparison, context)),
    ...data.alternativeSets.map((set) => alternativeRoute(set, context)),
    ...data.workflows.map((workflow) => workflowRoute(workflow, context)),
    ...workflowKits.map((kit) => workflowKitRoute(kit, context)),
    ...data.promptTemplates.map((prompt) => promptRoute(prompt, context)),
    ...data.promptTemplates.map((template) => templateRoute(template, context)),
    ...freeTools.map((tool) => ({
      path: `/free-tools/${tool.slug}/`,
      group: "free-tools" as const,
      title: tool.title,
      description: tool.description,
      parent: "/free-tools/",
      quality: strongStaticQuality
    }))
  ];
}

export const priorityCountryProfessionPairs = workflowKits.flatMap((kit) =>
  kit.countrySlugs.map((countrySlug) => ({
    country: countrySlug,
    profession: kit.professionSlug
  }))
);

function createRouteContext(data: SeedData) {
  return {
    tools: data.tools,
    categories: data.categories,
    useCasePages: getUseCasePages(data.tools),
    professions: data.professions,
    countries: data.countries,
    comparisons: data.comparisons,
    alternativeSets: data.alternativeSets,
    workflows: data.workflows,
    prompts: data.promptTemplates,
    toolBySlug: new Map(data.tools.map((tool) => [tool.slug, tool])),
    categoryBySlug: new Map(data.categories.map((category) => [category.slug, category])),
    professionBySlug: new Map(data.professions.map((profession) => [profession.slug, profession])),
    countryBySlug: new Map(data.countries.map((country) => [country.slug, country]))
  };
}

function categoryRoute(category: ToolCategory, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const tools = context.tools.filter((tool) => tool.categories.includes(category.slug));
  const intro = `${category.name} tools are grouped here because they support repeatable small-business workflows. Compare ${tools.length} options by setup effort, privacy risk, free-plan reality, team fit, and source-linked verification before choosing a vendor.`;
  return {
    path: `/categories/${category.slug}/`,
    group: "categories",
    title: `${category.name} AI Tools`,
    description: truncateDescription(category.description || `Compare AI and SaaS tools for ${category.name.toLowerCase()} workflows.`, 155),
    parent: "/categories/",
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks: ["category-context", "ranked-tools", "comparison-table", "decision-guide", "faqs", "source-links"],
      intro,
      internalLinks: tools.flatMap((tool) => toolInternalLinks(tool, context)),
      lastUpdated: new Date().toISOString(),
      hasAuthor: true
    })
  };
}

function useCaseRoute(useCase: UseCasePage, context: ReturnType<typeof createRouteContext>): SeoRoute {
  return {
    path: `/use-cases/${useCase.slug}/`,
    group: "use-cases",
    title: `${useCase.label} AI Tools`,
    description: truncateDescription(
      `Compare AI and SaaS tools for ${useCase.label.toLowerCase()} by setup effort, privacy risk, free-plan limits, and workflow fit.`,
      155
    ),
    parent: "/use-cases/",
    quality: getPageQualityScore({
      matchingTools: useCase.tools,
      valueBlocks: ["use-case-context", "comparison-table", "decision-guide", "ranked-tools", "faqs", "free-tool-links"],
      intro: `${useCase.label} tools compared by workflow fit, implementation effort, privacy risk, and small-business usefulness.`,
      internalLinks: useCase.tools.flatMap((tool) => toolInternalLinks(tool, context)),
      lastUpdated: new Date().toISOString(),
      hasAuthor: true
    })
  };
}

function toolRoute(tool: Tool, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const links = toolInternalLinks(tool, context);
  return {
    path: `/ai-tools/${tool.slug}/`,
    group: "tools",
    title: `${tool.name} Review and Use Cases (${currentYear()})`,
    description: tool.summary,
    parent: "/ai-tools/",
    quality: getPageQualityScore({
      matchingTools: [tool],
      valueBlocks: ["verdict", "pros-cons", "related-links", "pricing-summary", "faqs"],
      intro: tool.summary,
      internalLinks: links,
      lastUpdated: tool.lastCheckedAt,
      hasAuthor: true
    })
  };
}

function professionRoute(profession: Profession, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const tools = context.tools.filter((tool) => tool.professions.includes(profession.slug));
  const links = professionInternalLinks(profession, context);
  return {
    path: `/professions/${profession.slug}/`,
    group: "professions",
    title: `AI Tools for ${profession.name} (${currentYear()})`,
    description: `Compare AI tools for ${profession.name.toLowerCase()} by use case, pricing model, pros, cons, workflows, and prompts.`,
    parent: "/professions/",
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks: ["ranked-tools", "comparison-table", "profession-context", "faqs", "workflow", "use-case-winners"],
      intro: `Compare AI tools for ${profession.name}. ${profession.commonTasks.join(", ")}`,
      internalLinks: links,
      lastUpdated: new Date().toISOString(),
      hasAuthor: true,
      requiresThreeTools: true
    })
  };
}

function countryRoute(country: Country, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const tools = context.tools.filter((tool) => tool.countries.includes(country.slug));
  const links = countryInternalLinks(country, context);
  return {
    path: `/countries/${country.slug}/`,
    group: "countries",
    title: `Best AI Tools for Small Businesses in ${country.name} in ${currentYear()}`,
    description: `Compare AI tools for businesses in ${country.name}, including ${country.currency} pricing context, terminology, and privacy notes.`,
    parent: "/countries/",
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks: ["country-note", "ranked-tools", "comparison-table", "faqs", "use-case-winners"],
      intro: `AI tool guide for ${country.name} with ${country.currency} pricing context, local terminology including ${country.terminologyNotes.join(", ")}, and privacy notes: ${country.privacyNotes.join(" ")}`,
      internalLinks: links,
      lastUpdated: new Date().toISOString(),
      hasAuthor: true,
      requiresThreeTools: true
    })
  };
}

function countryProfessionRoutes(context: ReturnType<typeof createRouteContext>): SeoRoute[] {
  return priorityCountryProfessionPairs
    .map(({ country: countrySlug, profession: professionSlug }) => {
      const country = context.countryBySlug.get(countrySlug);
      const profession = context.professionBySlug.get(professionSlug);
      if (!country || !profession) return undefined;
      const tools = context.tools.filter((tool) => tool.countries.includes(country.slug) && tool.professions.includes(profession.slug));

      return {
        path: `/countries/${country.slug}/${profession.slug}/`,
        group: "country-professions" as const,
        title: `${profession.name} AI Tools in ${country.name}`,
        description: truncateDescription(
          `Compare AI tools for ${profession.name.toLowerCase()} in ${country.name}, including ${country.currency} context, local terminology, privacy notes, and workflow fit.`,
          155
        ),
        parent: `/countries/${country.slug}/`,
        quality: getPageQualityScore({
          matchingTools: tools,
          valueBlocks: ["country-note", "profession-context", "ranked-tools", "workflow", "faqs"],
          intro: `${profession.name} AI tools in ${country.name} with ${country.currency} context and ${country.privacyNotes.join(" ")}`,
          internalLinks: [...professionInternalLinks(profession, context), ...countryInternalLinks(country, context)],
          lastUpdated: new Date().toISOString(),
          hasAuthor: true,
          requiresThreeTools: true
        })
      };
    })
    .filter(Boolean) as SeoRoute[];
}

function comparisonRoute(comparison: Comparison, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const toolA = context.toolBySlug.get(comparison.toolA);
  const toolB = context.toolBySlug.get(comparison.toolB);
  const links = [toolA, toolB]
    .filter(Boolean)
    .flatMap((tool) => toolInternalLinks(tool as Tool, context));
  return {
    path: `/comparisons/${comparison.slug}/`,
    group: "comparisons",
    title: `${toolA?.name ?? comparison.toolA} vs ${toolB?.name ?? comparison.toolB} for ${comparison.primaryUseCase || "AI Workflows"}`,
    description: truncateDescription(comparison.summaryVerdict, 155),
    parent: "/comparisons/",
    quality: getPageQualityScore({
      matchingTools: [toolA, toolB].filter(Boolean) as Tool[],
      valueBlocks: ["verdict", "comparison-table", "use-case-winners", "pros-cons", "faqs"],
      intro: comparison.summaryVerdict,
      internalLinks: links,
      lastUpdated: comparison.lastCheckedAt,
      hasAuthor: true
    })
  };
}

function alternativeRoute(set: AlternativeSet, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const tools = set.candidateSlugs.map((slug) => context.toolBySlug.get(slug)).filter(Boolean) as Tool[];
  return {
    path: `/alternatives/${set.slug}/`,
    group: "alternatives",
    title: `${set.baseToolName} Alternatives (${currentYear()})`,
    description: truncateDescription(set.reason || `Compare ${set.baseToolName} alternatives by pricing, features, and practical use case.`, 155),
    parent: "/alternatives/",
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks: ["verdict", "alternatives-table", "best-free", "best-business", "faqs"],
      intro: set.reason,
      internalLinks: tools.flatMap((tool) => toolInternalLinks(tool, context)),
      lastUpdated: set.lastCheckedAt,
      hasAuthor: true,
      requiresThreeTools: true
    })
  };
}

function workflowRoute(workflow: Workflow, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const profession = workflow.relatedProfession ? context.professionBySlug.get(workflow.relatedProfession) : undefined;
  const links = profession ? professionInternalLinks(profession, context) : [];
  return {
    path: `/workflows/${workflow.slug}/`,
    group: "workflows",
    title: workflow.title,
    description: truncateDescription(workflow.problem, 155),
    parent: "/workflows/",
    quality: getPageQualityScore({
      valueBlocks: ["problem", "tools-needed", "steps", "prompts", "templates"],
      intro: workflow.problem,
      internalLinks: links,
      lastUpdated: workflow.lastUpdatedAt,
      hasAuthor: true
    })
  };
}

function workflowKitRoute(kit: (typeof workflowKits)[number], context: ReturnType<typeof createRouteContext>): SeoRoute {
  const profession = context.professionBySlug.get(kit.professionSlug);
  const tools = profession ? context.tools.filter((tool) => tool.professions.includes(profession.slug)) : [];

  return {
    path: `/workflow-kits/${kit.slug}/`,
    group: "workflow-kits",
    title: kit.title,
    description: truncateDescription(kit.summary, 155),
    parent: "/workflow-kits/",
    quality: getPageQualityScore({
      matchingTools: tools,
      valueBlocks: ["kit-overview", "workflow", "tools", "comparisons", "alternatives", "prompts", "country-notes"],
      intro: kit.summary,
      internalLinks: profession ? professionInternalLinks(profession, context) : [],
      lastUpdated: new Date().toISOString(),
      hasAuthor: true,
      requiresThreeTools: true
    })
  };
}

function promptRoute(prompt: PromptTemplate, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const profession = prompt.profession ? context.professionBySlug.get(prompt.profession) : undefined;
  const links = profession ? professionInternalLinks(profession, context) : [];
  return {
    path: `/prompts/${prompt.slug}/`,
    group: "prompts",
    title: prompt.title,
    description: `Prompt template for ${prompt.task}, including refinement notes and mistakes to avoid.`,
    parent: "/prompts/",
    quality: getPageQualityScore({
      valueBlocks: ["task", "prompt", "refinement", "mistakes"],
      intro: prompt.prompt,
      internalLinks: links,
      lastUpdated: prompt.lastUpdatedAt,
      hasAuthor: true
    })
  };
}

function templateRoute(template: PromptTemplate, context: ReturnType<typeof createRouteContext>): SeoRoute {
  const profession = template.profession ? context.professionBySlug.get(template.profession) : undefined;
  const links = profession ? professionInternalLinks(profession, context) : [];
  return {
    path: `/templates/${template.slug}/`,
    group: "templates",
    title: `${template.title} Template`,
    description: `Reusable template for ${template.task}, with prompt copy, refinement notes, and mistakes to avoid.`,
    parent: "/templates/",
    quality: getPageQualityScore({
      valueBlocks: ["template-copy", "customisation", "quality-checks", "cta"],
      intro: template.prompt,
      internalLinks: links,
      lastUpdated: template.lastUpdatedAt,
      hasAuthor: true
    })
  };
}

function toolInternalLinks(tool: Tool, context: ReturnType<typeof createRouteContext>): SiteLink[] {
  const professionLinks = tool.professions.slice(0, 3).map((slug) => ({
    title: context.professionBySlug.get(slug)?.name ?? slug,
    href: `/professions/${slug}/`
  }));
  const countryLinks = tool.countries.slice(0, 2).map((slug) => ({
    title: context.countryBySlug.get(slug)?.name ?? slug,
    href: `/countries/${slug}/`
  }));
  const comparisonLinks = context.comparisons
    .filter((comparison) => comparison.toolA === tool.slug || comparison.toolB === tool.slug)
    .map((comparison) => ({ title: comparison.slug.replaceAll("-", " "), href: `/comparisons/${comparison.slug}/` }));
  const alternativeLinks = context.alternativeSets
    .filter((set) => set.baseToolSlug === tool.slug || set.candidateSlugs.includes(tool.slug))
    .map((set) => ({ title: `${set.baseToolName} alternatives`, href: `/alternatives/${set.slug}/` }));
  const categoryLinks = tool.categories.map((slug) => ({
    title: context.categoryBySlug.get(slug)?.name ?? slug.replaceAll("-", " "),
    href: `/categories/${slug}/`
  }));
  const useCaseLinks = context.useCasePages
    .filter((page) => tool.useCases.some((useCase) => page.slug === slugifyUseCase(useCase)))
    .slice(0, 4)
    .map((page) => ({ title: page.label, href: `/use-cases/${page.slug}/` }));

  return dedupeLinks([...professionLinks, ...categoryLinks, ...useCaseLinks, ...countryLinks, ...comparisonLinks, ...alternativeLinks]);
}

function professionInternalLinks(profession: Profession, context: ReturnType<typeof createRouteContext>): SiteLink[] {
  const countryLinks = context.countries.slice(0, 4).map((country) => ({
    title: `${profession.name} AI tools in ${country.name}`,
    href: `/countries/${country.slug}/`
  }));
  const promptLinks = context.prompts
    .filter((prompt) => prompt.profession === profession.slug)
    .map((prompt) => ({ title: prompt.title, href: `/prompts/${prompt.slug}/` }));
  const workflowLinks = context.workflows
    .filter((workflow) => workflow.relatedProfession === profession.slug)
    .map((workflow) => ({ title: workflow.title, href: `/workflows/${workflow.slug}/` }));

  return dedupeLinks([...countryLinks, ...promptLinks, ...workflowLinks]);
}

function countryInternalLinks(country: Country, context: ReturnType<typeof createRouteContext>): SiteLink[] {
  const professionLinks = context.professions.slice(0, 6).map((profession) => ({
    title: `${profession.name} AI tools in ${country.name}`,
    href: `/professions/${profession.slug}/`
  }));
  const toolLinks = context.tools
    .filter((tool) => tool.countries.includes(country.slug))
    .slice(0, 4)
    .map((tool) => ({ title: tool.name, href: `/ai-tools/${tool.slug}/` }));

  return dedupeLinks([...professionLinks, ...toolLinks]);
}

function dedupeLinks(links: SiteLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}
