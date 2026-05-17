import { getSeedData } from "../src/lib/data";

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
    "/professions/",
    "/countries/",
    "/comparisons/",
    "/alternatives/",
    "/workflows/",
    "/prompts/",
    "/templates/",
    "/free-tools/",
    "/about/",
    "/editorial-policy/",
    "/how-we-review-ai-tools/",
    "/affiliate-disclosure/",
    "/contact/",
    "/media-kit/",
    ...data.tools.map((tool) => `/ai-tools/${tool.slug}/`),
    ...data.professions.map((profession) => `/professions/${profession.slug}/`),
    ...data.countries.map((country) => `/countries/${country.slug}/`),
    ...data.comparisons.map((comparison) => `/comparisons/${comparison.slug}/`),
    ...data.alternativeSets.map((set) => `/alternatives/${set.slug}/`),
    ...data.workflows.map((workflow) => `/workflows/${workflow.slug}/`),
    ...data.promptTemplates.map((prompt) => `/prompts/${prompt.slug}/`),
    ...data.promptTemplates.map((template) => `/templates/${template.slug}/`),
    "/free-tools/ai-tool-recommender/",
    "/free-tools/ai-proposal-generator/",
    "/free-tools/ai-cold-email-generator/",
    "/free-tools/prompt-generator/",
    "/free-tools/saas-cost-calculator/"
  ]);
}

export function isBlank(value: unknown) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}
