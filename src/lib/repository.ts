import "server-only";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AlternativeSet, Comparison, Country, Profession, PromptTemplate, Tool, ToolCategory, Workflow } from "@/types/content";
import {
  getAlternativeSet,
  getAlternativeSets,
  getCategories,
  getComparison,
  getComparisons,
  getCountries,
  getCountry,
  getProfession,
  getProfessions,
  getPromptTemplate,
  getPromptTemplates,
  getRelatedLinks,
  getSeedData,
  getTool,
  getTools,
  getToolsBySlugs,
  getToolsForCountry,
  getToolsForProfession,
  getWorkflow,
  getWorkflows
} from "./data";
import { hasDatabaseUrl, prisma } from "./prisma";

async function fromDb<T>(query: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!hasDatabaseUrl()) return fallback();

  try {
    return await query();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Database read failed; falling back to seed data.", error);
    }
    return fallback();
  }
}

export async function listTools(): Promise<Tool[]> {
  return fromDb(async () => {
    const tools = await prisma.tool.findMany({
      orderBy: { name: "asc" },
      include: { categories: true, professions: true, countries: true }
    });
    return tools.map(mapTool);
  }, getTools);
}

export async function findTool(slug: string): Promise<Tool | undefined> {
  return fromDb(async () => {
    const tool = await prisma.tool.findUnique({
      where: { slug },
      include: { categories: true, professions: true, countries: true }
    });
    return tool ? mapTool(tool) : undefined;
  }, () => getTool(slug));
}

export async function listCategories(): Promise<ToolCategory[]> {
  return fromDb(async () => {
    const categories = await prisma.toolCategory.findMany({ orderBy: { name: "asc" } });
    return categories.map(mapCategory);
  }, getCategories);
}

export async function listProfessions(): Promise<Profession[]> {
  return fromDb(async () => {
    const professions = await prisma.profession.findMany({ orderBy: { name: "asc" } });
    return professions.map(mapProfession);
  }, getProfessions);
}

export async function findProfession(slug: string): Promise<Profession | undefined> {
  return fromDb(async () => {
    const profession = await prisma.profession.findUnique({ where: { slug } });
    return profession ? mapProfession(profession) : undefined;
  }, () => getProfession(slug));
}

export async function listCountries(): Promise<Country[]> {
  return fromDb(async () => {
    const countries = await prisma.country.findMany({ orderBy: { priority: "asc" } });
    return countries.map(mapCountry);
  }, getCountries);
}

export async function findCountry(slug: string): Promise<Country | undefined> {
  return fromDb(async () => {
    const country = await prisma.country.findUnique({ where: { slug } });
    return country ? mapCountry(country) : undefined;
  }, () => getCountry(slug));
}

export async function listComparisons(): Promise<Comparison[]> {
  return fromDb(async () => {
    const comparisons = await prisma.comparison.findMany({ include: { toolA: true, toolB: true } });
    return comparisons.map(mapComparison);
  }, getComparisons);
}

export async function findComparison(slug: string): Promise<Comparison | undefined> {
  return fromDb(async () => {
    const comparison = await prisma.comparison.findUnique({ where: { slug }, include: { toolA: true, toolB: true } });
    return comparison ? mapComparison(comparison) : undefined;
  }, () => getComparison(slug));
}

export async function listAlternativeSets(): Promise<AlternativeSet[]> {
  return fromDb(async () => {
    const sets = await prisma.alternativeSet.findMany({ include: { candidates: true } });
    return sets.map(mapAlternativeSet);
  }, getAlternativeSets);
}

export async function findAlternativeSet(slug: string): Promise<AlternativeSet | undefined> {
  return fromDb(async () => {
    const set = await prisma.alternativeSet.findUnique({ where: { slug }, include: { candidates: true } });
    return set ? mapAlternativeSet(set) : undefined;
  }, () => getAlternativeSet(slug));
}

export async function listWorkflows(): Promise<Workflow[]> {
  return fromDb(async () => {
    const workflows = await prisma.workflow.findMany({ include: { relatedProfession: true } });
    return workflows.map(mapWorkflow);
  }, getWorkflows);
}

export async function findWorkflow(slug: string): Promise<Workflow | undefined> {
  return fromDb(async () => {
    const workflow = await prisma.workflow.findUnique({ where: { slug }, include: { relatedProfession: true } });
    return workflow ? mapWorkflow(workflow) : undefined;
  }, () => getWorkflow(slug));
}

export async function listPromptTemplates(): Promise<PromptTemplate[]> {
  return fromDb(async () => {
    const prompts = await prisma.promptTemplate.findMany({ include: { profession: true } });
    return prompts.map(mapPromptTemplate);
  }, getPromptTemplates);
}

export async function findPromptTemplate(slug: string): Promise<PromptTemplate | undefined> {
  return fromDb(async () => {
    const prompt = await prisma.promptTemplate.findUnique({ where: { slug }, include: { profession: true } });
    return prompt ? mapPromptTemplate(prompt) : undefined;
  }, () => getPromptTemplate(slug));
}

export async function toolsForProfession(slug: string): Promise<Tool[]> {
  return fromDb(async () => {
    const tools = await prisma.tool.findMany({
      where: { professions: { some: { slug } } },
      include: { categories: true, professions: true, countries: true },
      orderBy: [{ affiliateAvailable: "desc" }, { name: "asc" }]
    });
    return tools.map(mapTool);
  }, () => getToolsForProfession(slug));
}

export async function toolsForCountry(slug: string): Promise<Tool[]> {
  return fromDb(async () => {
    const tools = await prisma.tool.findMany({
      where: { countries: { some: { slug } } },
      include: { categories: true, professions: true, countries: true },
      orderBy: [{ affiliateAvailable: "desc" }, { name: "asc" }]
    });
    return tools.map(mapTool);
  }, () => getToolsForCountry(slug));
}

export async function toolsBySlugs(slugs: string[]): Promise<Tool[]> {
  return fromDb(async () => {
    const tools = await prisma.tool.findMany({
      where: { slug: { in: slugs } },
      include: { categories: true, professions: true, countries: true }
    });
    const bySlug = new Map(tools.map((tool) => [tool.slug, mapTool(tool)]));
    return slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as Tool[];
  }, () => getToolsBySlugs(slugs));
}

export async function comparisonTools(comparison: Comparison): Promise<[Tool | undefined, Tool | undefined]> {
  const [toolA, toolB] = await Promise.all([findTool(comparison.toolA), findTool(comparison.toolB)]);
  return [toolA, toolB];
}

export async function relatedLinks(params: {
  tool?: Tool;
  profession?: Profession;
  country?: Country;
  limit?: number;
}) {
  const limit = params.limit ?? 8;
  const links: Array<{ title: string; href: string; description?: string; score: number }> = [];

  if (params.tool) {
    const [professions, countries, comparisons, alternativeSets, workflows, prompts] = await Promise.all([
      listProfessions(),
      listCountries(),
      listComparisons(),
      listAlternativeSets(),
      listWorkflows(),
      listPromptTemplates()
    ]);

    links.push(
      ...professions
        .filter((profession) => params.tool?.professions.includes(profession.slug))
        .map((profession) => ({
          title: `Best AI tools for ${profession.name.toLowerCase()}`,
          href: `/professions/${profession.slug}/`,
          description: profession.commonTasks.slice(0, 2).join(", "),
          score: 80 + profession.monetisationScore
        }))
    );
    links.push(
      ...countries
        .filter((country) => params.tool?.countries.includes(country.slug))
        .slice(0, 4)
        .map((country) => ({
          title: `${params.tool?.name} in ${country.name}`,
          href: `/countries/${country.slug}/`,
          description: `${country.currency} context and regional notes`,
          score: 60 - country.priority
        }))
    );
    links.push(
      ...comparisons
        .filter((comparison) => comparison.toolA === params.tool?.slug || comparison.toolB === params.tool?.slug)
        .map((comparison) => ({
          title: comparison.slug.replaceAll("-", " "),
          href: `/comparisons/${comparison.slug}/`,
          description: comparison.primaryUseCase,
          score: 95
        }))
    );
    links.push(
      ...alternativeSets
        .filter((set) => set.baseToolSlug === params.tool?.slug || set.candidateSlugs.includes(params.tool?.slug ?? ""))
        .map((set) => ({
          title: `${set.baseToolName} alternatives`,
          href: `/alternatives/${set.slug}/`,
          description: set.reason,
          score: 90
        }))
    );
    links.push(
      ...workflows
        .filter((workflow) => workflow.toolsNeeded.some((name) => name.toLowerCase().includes(params.tool?.name.toLowerCase() ?? "")))
        .map((workflow) => ({
          title: workflow.title,
          href: `/workflows/${workflow.slug}/`,
          description: workflow.problem,
          score: 70
        }))
    );
    links.push(
      ...prompts
        .filter((prompt) => params.tool?.bestFor.some((bestFor) => prompt.task.toLowerCase().includes(bestFor.toLowerCase())))
        .map((prompt) => ({
          title: prompt.title,
          href: `/prompts/${prompt.slug}/`,
          description: prompt.task,
          score: 55
        }))
    );
  }

  if (params.profession) {
    const [countries, workflows, prompts, tools] = await Promise.all([
      listCountries(),
      listWorkflows(),
      listPromptTemplates(),
      toolsForProfession(params.profession.slug)
    ]);

    links.push(
      ...tools.slice(0, 5).map((tool, index) => ({
        title: tool.name,
        href: `/ai-tools/${tool.slug}/`,
        description: tool.summary,
        score: 85 - index
      }))
    );
    links.push(
      ...countries.slice(0, 5).map((country) => ({
        title: `${params.profession?.name} AI tools in ${country.name}`,
        href: `/countries/${country.slug}/`,
        description: `${country.currency} pricing context`,
        score: 70 - country.priority
      }))
    );
    links.push(
      ...workflows
        .filter((workflow) => workflow.relatedProfession === params.profession?.slug)
        .map((workflow) => ({
          title: workflow.title,
          href: `/workflows/${workflow.slug}/`,
          description: workflow.problem,
          score: 90
        }))
    );
    links.push(
      ...prompts
        .filter((prompt) => prompt.profession === params.profession?.slug)
        .map((prompt) => ({
          title: prompt.title,
          href: `/prompts/${prompt.slug}/`,
          description: prompt.task,
          score: 88
        }))
    );
  }

  if (params.country) {
    const [professions, tools] = await Promise.all([listProfessions(), toolsForCountry(params.country.slug)]);
    links.push(
      ...professions.slice(0, 6).map((profession) => ({
        title: `AI tools for ${profession.name.toLowerCase()}`,
        href: `/professions/${profession.slug}/`,
        description: `${params.country?.currency} and ${profession.commonTasks[0] || "workflow"} context`,
        score: 75 + profession.monetisationScore
      }))
    );
    links.push(
      ...tools.slice(0, 5).map((tool, index) => ({
        title: tool.name,
        href: `/ai-tools/${tool.slug}/`,
        description: tool.summary,
        score: 70 - index
      }))
    );
  }

  const fallbackLinks = await Promise.resolve(getRelatedLinks(params).map((link) => ({ ...link, score: 10 })));
  const seen = new Set<string>();
  return [...links, ...fallbackLinks]
    .filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((link) => ({
      title: link.title,
      href: link.href,
      description: link.description
    }));
}

export async function loadSeedSnapshot() {
  return getSeedData();
}

function mapTool(tool: any): Tool {
  return {
    name: tool.name,
    slug: tool.slug,
    summary: tool.summary,
    description: tool.description ?? undefined,
    websiteUrl: tool.websiteUrl ?? undefined,
    affiliateUrl: tool.affiliateUrl ?? undefined,
    logoUrl: tool.logoUrl ?? undefined,
    categories: tool.categories?.map((category: any) => category.slug) ?? [],
    pricingModel: tool.pricingModel ?? undefined,
    startingPrice: tool.startingPrice === null || tool.startingPrice === undefined ? null : Number(tool.startingPrice),
    currency: tool.currency ?? "USD",
    freePlanAvailable: tool.freePlanAvailable,
    trialAvailable: tool.trialAvailable,
    bestFor: tool.bestFor ?? [],
    notBestFor: tool.notBestFor ?? [],
    pros: tool.pros ?? [],
    cons: tool.cons ?? [],
    professions: tool.professions?.map((profession: any) => profession.slug) ?? [],
    countries: tool.countries?.map((country: any) => country.slug) ?? [],
    useCases: tool.useCases?.map((useCase: any) => useCase.slug ?? useCase.name) ?? [],
    affiliateAvailable: tool.affiliateAvailable,
    isSponsored: tool.isSponsored,
    lastCheckedAt: tool.lastCheckedAt ? new Date(tool.lastCheckedAt).toISOString() : null
  };
}

function mapCategory(category: any): ToolCategory {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description ?? undefined
  };
}

function mapProfession(profession: any): Profession {
  return {
    name: profession.name,
    slug: profession.slug,
    aliases: profession.aliases ?? [],
    painPoints: profession.painPoints ?? [],
    commonTasks: profession.commonTasks ?? [],
    recommendedCategories: profession.recommendedCategories ?? [],
    monetisationScore: profession.monetisationScore ?? 3
  };
}

function mapCountry(country: any): Country {
  return {
    name: country.name,
    slug: country.slug,
    currency: country.currency,
    region: country.region ?? undefined,
    priority: country.priority ?? 5,
    terminologyNotes: country.terminologyNotes ?? [],
    privacyNotes: country.privacyNotes ?? []
  };
}

function mapComparison(comparison: any): Comparison {
  return {
    slug: comparison.slug,
    toolA: comparison.toolA?.slug ?? comparison.toolA,
    toolB: comparison.toolB?.slug ?? comparison.toolB,
    summaryVerdict: comparison.summaryVerdict,
    primaryUseCase: comparison.primaryUseCase ?? undefined,
    winnerByUseCase: (comparison.winnerByUseCase as Record<string, string> | null) ?? undefined,
    featureRows: (comparison.featureRows as Array<Record<string, string>> | null) ?? undefined,
    pricingNotes: comparison.pricingNotes ?? undefined,
    lastCheckedAt: comparison.lastCheckedAt ? new Date(comparison.lastCheckedAt).toISOString() : null
  };
}

function mapAlternativeSet(set: any): AlternativeSet {
  return {
    slug: set.slug,
    baseToolSlug: set.baseToolSlug,
    baseToolName: set.baseToolName,
    reason: set.reason ?? undefined,
    candidateSlugs: set.candidates?.map((tool: any) => tool.slug) ?? set.candidateSlugs ?? [],
    bestFreeOption: set.bestFreeOption ?? undefined,
    bestBusinessOption: set.bestBusinessOption ?? undefined,
    finalVerdict: set.finalVerdict ?? undefined,
    lastCheckedAt: set.lastCheckedAt ? new Date(set.lastCheckedAt).toISOString() : null
  };
}

function mapWorkflow(workflow: any): Workflow {
  return {
    title: workflow.title,
    slug: workflow.slug,
    problem: workflow.problem,
    toolsNeeded: workflow.toolsNeeded ?? [],
    relatedProfession: workflow.relatedProfession?.slug ?? workflow.relatedProfession ?? undefined,
    steps: workflow.steps ?? [],
    prompts: workflow.prompts ?? [],
    templates: workflow.templates ?? [],
    lastUpdatedAt: workflow.lastUpdatedAt ? new Date(workflow.lastUpdatedAt).toISOString() : null
  };
}

function mapPromptTemplate(prompt: any): PromptTemplate {
  return {
    title: prompt.title,
    slug: prompt.slug,
    profession: prompt.profession?.slug ?? prompt.profession ?? undefined,
    task: prompt.task,
    prompt: prompt.prompt,
    refinementPrompt: prompt.refinementPrompt ?? undefined,
    mistakesToAvoid: prompt.mistakesToAvoid ?? [],
    lastUpdatedAt: prompt.lastUpdatedAt ? new Date(prompt.lastUpdatedAt).toISOString() : null
  };
}
