import { authorityTopics } from "../src/lib/authority-topics";
import { buyingGuides } from "../src/lib/buying-guides";
import { getSeedData } from "../src/lib/data";
import { freeTools } from "../src/lib/free-tools";
import { buildSeoRoutes } from "../src/lib/route-registry";
import { updateItems } from "../src/lib/updates";

const data = getSeedData();
const routes = buildSeoRoutes(data);
const routePaths = new Set(routes.map((route) => route.path));
const errors: string[] = [];
const warnings: string[] = [];

for (const [field, values] of Object.entries({
  path: routes.map((route) => route.path),
  title: routes.map((route) => route.title)
})) {
  const duplicates = findDuplicates(values);
  if (duplicates.length) {
    errors.push(`Duplicate ${field}s: ${duplicates.join(", ")}`);
  }
}

for (const route of routes) {
  if (!route.path.endsWith("/")) errors.push(`Route missing trailing slash: ${route.path}`);
  if (route.title.length > 70) warnings.push(`Long title (${route.title.length} chars): ${route.path}`);
  if (route.description.length > 160) warnings.push(`Long description (${route.description.length} chars): ${route.path}`);
  if (route.description.length < 50) warnings.push(`Short description (${route.description.length} chars): ${route.path}`);
}

const referencedRoutes = new Set<string>();

for (const tool of data.tools) {
  referencedRoutes.add(`/ai-tools/${tool.slug}/`);
  for (const profession of tool.professions) referencedRoutes.add(`/professions/${profession}/`);
  for (const country of tool.countries) referencedRoutes.add(`/countries/${country}/`);
}

for (const comparison of data.comparisons) {
  referencedRoutes.add(`/comparisons/${comparison.slug}/`);
  referencedRoutes.add(`/ai-tools/${comparison.toolA}/`);
  referencedRoutes.add(`/ai-tools/${comparison.toolB}/`);
}

for (const set of data.alternativeSets) {
  referencedRoutes.add(`/alternatives/${set.slug}/`);
  referencedRoutes.add(`/ai-tools/${set.baseToolSlug}/`);
  for (const candidate of set.candidateSlugs) referencedRoutes.add(`/ai-tools/${candidate}/`);
}

for (const workflow of data.workflows) {
  referencedRoutes.add(`/workflows/${workflow.slug}/`);
  if (workflow.relatedProfession) referencedRoutes.add(`/professions/${workflow.relatedProfession}/`);
}

for (const prompt of data.promptTemplates) {
  referencedRoutes.add(`/prompts/${prompt.slug}/`);
  referencedRoutes.add(`/templates/${prompt.slug}/`);
  if (prompt.profession) referencedRoutes.add(`/professions/${prompt.profession}/`);
}

for (const topic of authorityTopics) {
  referencedRoutes.add(`/topics/${topic.slug}/`);
  for (const link of topic.related) addInternalReference(link.href);
}

for (const guide of buyingGuides) {
  referencedRoutes.add(`/buying-guides/${guide.slug}/`);
  for (const link of guide.related) addInternalReference(link.href);
}

for (const tool of freeTools) {
  referencedRoutes.add(`/free-tools/${tool.slug}/`);
  for (const link of tool.related) addInternalReference(link.href);
}

for (const update of updateItems) {
  for (const href of update.sourceUrls) addInternalReference(href);
}

for (const route of referencedRoutes) {
  if (!routePaths.has(route)) errors.push(`Referenced route does not exist: ${route}`);
}

const noindexRoutes = routes.filter((route) => !route.quality.indexable);
if (noindexRoutes.length) {
  warnings.push(`${noindexRoutes.length} routes are currently noindex by quality rules.`);
}

if (warnings.length) {
  console.warn(`SEO warnings:\n${warnings.map((warning) => `- ${warning}`).join("\n")}`);
}

if (errors.length) {
  console.error(`SEO audit failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`SEO audit passed: ${routes.length} routes checked, ${noindexRoutes.length} noindex routes reported.`);

function findDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function addInternalReference(href: string) {
  if (!href.startsWith("/")) return;
  const [path] = href.split("#");
  if (!path || path === "/") {
    referencedRoutes.add("/");
    return;
  }
  referencedRoutes.add(path.endsWith("/") ? path : `${path}/`);
}
