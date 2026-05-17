import { buildSeoRoutes } from "../src/lib/route-registry";
import { getUseCasePages } from "../src/lib/use-cases";
import { workflowKits } from "../src/lib/workflow-kits";
import { data } from "./data-utils";

type QueueItem = {
  route: string;
  priority: number;
  reasons: string[];
};

const items = new Map<string, QueueItem>();

function add(route: string, priority: number, reason: string) {
  const item = items.get(route) ?? { route, priority, reasons: [] };
  item.priority = Math.max(item.priority, priority);
  item.reasons.push(reason);
  items.set(route, item);
}

for (const profession of data.professions) {
  if (profession.monetisationScore >= 5) {
    add(`/professions/${profession.slug}/`, profession.monetisationScore, `monetisationScore ${profession.monetisationScore}`);
  }
}

for (const kit of workflowKits) {
  add(`/workflow-kits/${kit.slug}/`, 8, "priority workflow kit");
}

for (const category of data.categories) {
  const toolCount = data.tools.filter((tool) => tool.categories.includes(category.slug)).length;
  if (toolCount >= 5) add(`/categories/${category.slug}/`, 6, `${toolCount} tools in category hub`);
}

for (const useCase of getUseCasePages(data.tools)) {
  if (useCase.tools.length >= 3) add(`/use-cases/${useCase.slug}/`, 6, `${useCase.tools.length} tools in use-case hub`);
}

for (const tool of data.tools) {
  const route = `/ai-tools/${tool.slug}/`;
  if (tool.affiliateAvailable) add(route, 8, "affiliateAvailable");
  if (!tool.lastCheckedAt) add(route, 7, "missing lastCheckedAt");
  if (tool.affiliateAvailable && !tool.affiliateUrl) add(route, 8, "affiliate flag without affiliateUrl");
  if (!tool.websiteUrl) add(route, 5, "missing websiteUrl");
}

for (const set of data.alternativeSets) {
  add(`/alternatives/${set.slug}/`, 7, "switching-intent alternatives page");
  if (!set.lastCheckedAt) add(`/alternatives/${set.slug}/`, 6, "missing lastCheckedAt");
}

for (const comparison of data.comparisons) {
  add(`/comparisons/${comparison.slug}/`, 7, "decision-intent comparison page");
  if (!comparison.lastCheckedAt) add(`/comparisons/${comparison.slug}/`, 6, "missing lastCheckedAt");
}

for (const route of buildSeoRoutes(data)) {
  if (!route.quality.indexable) add(route.path, 9, `noindex: ${route.quality.reasons.join("; ")}`);
  if (route.quality.warnings?.length) add(route.path, 4, `warnings: ${route.quality.warnings.join("; ")}`);
}

const queue = [...items.values()].sort((a, b) => b.priority - a.priority || a.route.localeCompare(b.route));

console.log(`Suggested refresh queue (${queue.length} routes):`);
for (const item of queue) {
  console.log(`- P${item.priority} ${item.route} — ${[...new Set(item.reasons)].join(" | ")}`);
}
