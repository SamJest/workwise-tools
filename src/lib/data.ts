import rawSeedData from "@/data/seed-data.json";
import type {
  AlternativeSet,
  Comparison,
  Country,
  Profession,
  PromptTemplate,
  SeedData,
  SiteLink,
  Tool,
  ToolCategory,
  Workflow
} from "@/types/content";
import { applyToolEvidence } from "./tool-evidence";
import { seedDataSchema } from "./validators";

const parsedSeedData = seedDataSchema.parse(rawSeedData) as SeedData;

export function getSeedData(): SeedData {
  return parsedSeedData;
}

export function getDemoNotice(): string {
  return parsedSeedData.metadata.note;
}

export function getTools(): Tool[] {
  return parsedSeedData.tools.map(applyToolEvidence);
}

export function getTool(slug: string): Tool | undefined {
  return getTools().find((tool) => tool.slug === slug);
}

export function getCategories(): ToolCategory[] {
  return parsedSeedData.categories;
}

export function getCategory(slug: string): ToolCategory | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function getProfessions(): Profession[] {
  return parsedSeedData.professions;
}

export function getProfession(slug: string): Profession | undefined {
  return getProfessions().find((profession) => profession.slug === slug);
}

export function getCountries(): Country[] {
  return parsedSeedData.countries;
}

export function getCountry(slug: string): Country | undefined {
  return getCountries().find((country) => country.slug === slug);
}

export function getComparisons(): Comparison[] {
  return parsedSeedData.comparisons;
}

export function getComparison(slug: string): Comparison | undefined {
  return getComparisons().find((comparison) => comparison.slug === slug);
}

export function getAlternativeSets(): AlternativeSet[] {
  return parsedSeedData.alternativeSets;
}

export function getAlternativeSet(slug: string): AlternativeSet | undefined {
  return getAlternativeSets().find((set) => set.slug === slug);
}

export function getWorkflows(): Workflow[] {
  return parsedSeedData.workflows;
}

export function getWorkflow(slug: string): Workflow | undefined {
  return getWorkflows().find((workflow) => workflow.slug === slug);
}

export function getPromptTemplates(): PromptTemplate[] {
  return parsedSeedData.promptTemplates;
}

export function getPromptTemplate(slug: string): PromptTemplate | undefined {
  return getPromptTemplates().find((template) => template.slug === slug);
}

export function getTemplate(slug: string): PromptTemplate | undefined {
  return getPromptTemplate(slug);
}

export function getToolsForProfession(slug: string): Tool[] {
  return getTools().filter((tool) => tool.professions.includes(slug));
}

export function getToolsForCountry(slug: string): Tool[] {
  return getTools().filter((tool) => tool.countries.includes(slug));
}

export function getToolsForCategory(slug: string): Tool[] {
  return getTools().filter((tool) => tool.categories.includes(slug));
}

export function getToolsBySlugs(slugs: string[]): Tool[] {
  const tools = getTools();
  return slugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter(Boolean) as Tool[];
}

export function getComparisonTools(comparison: Comparison): [Tool | undefined, Tool | undefined] {
  return [getTool(comparison.toolA), getTool(comparison.toolB)];
}

export function getRelatedLinks(params: {
  tool?: Tool;
  profession?: Profession;
  country?: Country;
  limit?: number;
}): SiteLink[] {
  const links: SiteLink[] = [];
  const limit = params.limit ?? 8;

  if (params.tool) {
    links.push(
      ...params.tool.professions.slice(0, 3).map((slug) => {
        const profession = getProfession(slug);
        return {
          title: profession ? `Best AI tools for ${profession.name.toLowerCase()}` : slug,
          href: `/professions/${slug}/`
        };
      })
    );
    links.push(
      ...getAlternativeSets()
        .filter((set) => set.baseToolSlug === params.tool?.slug || set.candidateSlugs.includes(params.tool?.slug ?? ""))
        .map((set) => ({ title: `${set.baseToolName} alternatives`, href: `/alternatives/${set.slug}/` }))
    );
    links.push(
      ...getComparisons()
        .filter((comparison) => comparison.toolA === params.tool?.slug || comparison.toolB === params.tool?.slug)
        .map((comparison) => ({ title: comparison.slug.replaceAll("-", " "), href: `/comparisons/${comparison.slug}/` }))
    );
  }

  if (params.profession) {
    links.push(
      ...getCountries()
        .slice(0, 4)
        .map((country) => ({
          title: `${params.profession?.name} AI tools in ${country.name}`,
          href: `/countries/${country.slug}/`
        }))
    );
    links.push(
      ...getPromptTemplates()
        .filter((template) => template.profession === params.profession?.slug)
        .map((template) => ({ title: template.title, href: `/prompts/${template.slug}/` }))
    );
  }

  if (params.country) {
    links.push(
      ...getProfessions()
        .slice(0, 5)
        .map((profession) => ({
          title: `AI tools for ${profession.name.toLowerCase()}`,
          href: `/professions/${profession.slug}/`
        }))
    );
  }

  links.push(
    ...getWorkflows().map((workflow) => ({
      title: workflow.title,
      href: `/workflows/${workflow.slug}/`
    }))
  );

  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }).slice(0, limit);
}

export function titleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
