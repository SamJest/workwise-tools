import { data, routeInventory } from "./data-utils";
import { buildSeoRoutes } from "../src/lib/route-registry";
import { freeTools } from "../src/lib/free-tools";

const routes = routeInventory();
const broken: string[] = [];

function assertRoute(source: string, route: string) {
  if (!routes.has(route)) broken.push(`${source} -> ${route}`);
}

for (const route of buildSeoRoutes(data)) {
  if (route.parent) assertRoute(route.path, route.parent);
}

for (const tool of data.tools) {
  for (const slug of tool.professions) assertRoute(`tool:${tool.slug}`, `/professions/${slug}/`);
  for (const slug of tool.countries) assertRoute(`tool:${tool.slug}`, `/countries/${slug}/`);
  for (const slug of tool.categories) {
    if (!data.categories.some((category) => category.slug === slug)) broken.push(`tool:${tool.slug} -> category:${slug}`);
  }
}

for (const comparison of data.comparisons) {
  assertRoute(`comparison:${comparison.slug}`, `/ai-tools/${comparison.toolA}/`);
  assertRoute(`comparison:${comparison.slug}`, `/ai-tools/${comparison.toolB}/`);
}

for (const set of data.alternativeSets) {
  assertRoute(`alternative:${set.slug}`, `/ai-tools/${set.baseToolSlug}/`);
  for (const slug of set.candidateSlugs) assertRoute(`alternative:${set.slug}`, `/ai-tools/${slug}/`);
}

for (const workflow of data.workflows) {
  if (workflow.relatedProfession) assertRoute(`workflow:${workflow.slug}`, `/professions/${workflow.relatedProfession}/`);
}

for (const prompt of data.promptTemplates) {
  if (prompt.profession) assertRoute(`prompt:${prompt.slug}`, `/professions/${prompt.profession}/`);
}

for (const tool of freeTools) {
  for (const related of tool.related) assertRoute(`free-tool:${tool.slug}`, related.href);
  for (const cta of tool.related) {
    if (!cta.title || !cta.href) broken.push(`free-tool:${tool.slug} has incomplete CTA`);
  }
}

if (broken.length) {
  console.error(`Broken link report failed:\n${broken.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

console.log(`Broken link report passed: ${routes.size} routes checked.`);
