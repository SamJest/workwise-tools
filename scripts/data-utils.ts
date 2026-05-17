import { getSeedData } from "../src/lib/data";
import { freeTools } from "../src/lib/free-tools";
import { priorityCountryProfessionPairs } from "../src/lib/route-registry";
import { getUseCasePages } from "../src/lib/use-cases";
import { workflowKits } from "../src/lib/workflow-kits";

export const data = getSeedData();

export function collectSlugs() {
  return {
    tools: data.tools.map((item) => item.slug),
    professions: data.professions.map((item) => item.slug),
    countries: data.countries.map((item) => item.slug),
    categories: data.categories.map((item) => item.slug),
    comparisons: data.comparisons.map((item) => item.slug),
    alternativeSets: data.alternativeSets.map((item) => item.slug),
    workflows: data.workflows.map((item) => item.slug),
    promptTemplates: data.promptTemplates.map((item) => item.slug)
  };
}

export function duplicates(values: string[]) {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

export function routeInventory() {
  return new Set([
    "/",
    "/ai-tools/",
    "/best-ai-tools/",
    "/categories/",
    "/use-cases/",
    "/professions/",
    "/countries/",
    "/comparisons/",
    "/alternatives/",
    "/workflows/",
    "/workflow-kits/",
    "/prompts/",
    "/templates/",
    "/free-tools/",
    "/about/",
    "/editorial-policy/",
    "/how-we-review-ai-tools/",
    "/affiliate-disclosure/",
    "/contact/",
    "/media-kit/",
    "/privacy/",
    "/cookies/",
    "/terms/",
    ...data.tools.map((tool) => `/ai-tools/${tool.slug}/`),
    ...data.categories.map((category) => `/categories/${category.slug}/`),
    ...getUseCasePages(data.tools).map((useCase) => `/use-cases/${useCase.slug}/`),
    ...data.professions.map((profession) => `/professions/${profession.slug}/`),
    ...data.countries.map((country) => `/countries/${country.slug}/`),
    ...priorityCountryProfessionPairs.map((pair) => `/countries/${pair.country}/${pair.profession}/`),
    ...data.comparisons.map((comparison) => `/comparisons/${comparison.slug}/`),
    ...data.alternativeSets.map((set) => `/alternatives/${set.slug}/`),
    ...data.workflows.map((workflow) => `/workflows/${workflow.slug}/`),
    ...workflowKits.map((kit) => `/workflow-kits/${kit.slug}/`),
    ...data.promptTemplates.map((prompt) => `/prompts/${prompt.slug}/`),
    ...data.promptTemplates.map((template) => `/templates/${template.slug}/`),
    ...freeTools.map((tool) => `/free-tools/${tool.slug}/`)
  ]);
}

export function isBlank(value: unknown) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}
