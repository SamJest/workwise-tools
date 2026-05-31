import type { MetadataRoute } from "next";
import {
  listAlternativeSets,
  listCategories,
  listComparisons,
  listCountries,
  listProfessions,
  listPromptTemplates,
  listTools,
  listWorkflows
} from "@/lib/repository";
import { absoluteUrl } from "@/lib/seo";
import { buildSeoRoutes } from "@/lib/route-registry";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, professions, countries, comparisons, alternativeSets, workflows, promptTemplates, categories] = await Promise.all([
    listTools(),
    listProfessions(),
    listCountries(),
    listComparisons(),
    listAlternativeSets(),
    listWorkflows(),
    listPromptTemplates(),
    listCategories()
  ]);

  const routes = buildSeoRoutes({
    metadata: {
      note: "Runtime sitemap data",
      project: "AI/SaaS PSEO Platform"
    },
    countries,
    professions,
    categories,
    tools,
    comparisons,
    alternativeSets,
    workflows,
    promptTemplates
  }).filter((route) => route.quality.indexable);

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.path === "/" ? 1 : route.group === "static" ? 0.6 : route.group === "trades" ? 0.8 : 0.7
  }));
}
