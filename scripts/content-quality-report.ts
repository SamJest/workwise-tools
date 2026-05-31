import {
  buildAlternativeProfile,
  buildBuyingGuideProfile,
  buildComparisonProfile,
  buildCountryProfile,
  buildProfessionProfile,
  buildPromptProfile,
  buildToolProfile,
  buildWorkflowProfile
} from "../src/lib/content-engine";
import { buyingGuides } from "../src/lib/buying-guides";
import {
  getAlternativeSets,
  getComparisonTools,
  getComparisons,
  getCountries,
  getProfessions,
  getPromptTemplates,
  getRelatedLinks,
  getTools,
  getToolsBySlugs,
  getToolsForCountry,
  getToolsForProfession,
  getWorkflows
} from "../src/lib/data";
import type { PageContentProfile, Tool } from "../src/types/content";

const profiles: Array<{ route: string; profile: PageContentProfile }> = [];

for (const tool of getTools()) {
  profiles.push({
    route: `/ai-tools/${tool.slug}/`,
    profile: buildToolProfile(tool, getRelatedLinks({ tool }))
  });
}

for (const profession of getProfessions()) {
  const tools = getToolsForProfession(profession.slug);
  const related = getRelatedLinks({ profession });
  profiles.push({
    route: `/professions/${profession.slug}/`,
    profile: buildProfessionProfile(profession, tools, related)
  });
}

for (const country of getCountries()) {
  profiles.push({
    route: `/countries/${country.slug}/`,
    profile: buildCountryProfile(country, getToolsForCountry(country.slug), getRelatedLinks({ country }))
  });
}

for (const comparison of getComparisons()) {
  const tools = getComparisonTools(comparison).filter((tool): tool is Tool => Boolean(tool));
  const related = tools.flatMap((tool) => getRelatedLinks({ tool, limit: 4 }));
  profiles.push({
    route: `/comparisons/${comparison.slug}/`,
    profile: buildComparisonProfile(comparison, tools, related)
  });
}

for (const set of getAlternativeSets()) {
  const baseTool = getTools().find((tool) => tool.slug === set.baseToolSlug);
  profiles.push({
    route: `/alternatives/${set.slug}/`,
    profile: buildAlternativeProfile(set, getToolsBySlugs(set.candidateSlugs), baseTool ? getRelatedLinks({ tool: baseTool }) : [])
  });
}

for (const guide of buyingGuides) {
  profiles.push({
    route: `/buying-guides/${guide.slug}/`,
    profile: buildBuyingGuideProfile(guide)
  });
}

for (const workflow of getWorkflows()) {
  const profession = workflow.relatedProfession ? getProfessions().find((item) => item.slug === workflow.relatedProfession) : undefined;
  profiles.push({
    route: `/workflows/${workflow.slug}/`,
    profile: buildWorkflowProfile(workflow, profession ? getRelatedLinks({ profession }) : [])
  });
}

for (const prompt of getPromptTemplates()) {
  const profession = prompt.profession ? getProfessions().find((item) => item.slug === prompt.profession) : undefined;
  const related = profession ? getRelatedLinks({ profession }) : [];
  profiles.push({
    route: `/prompts/${prompt.slug}/`,
    profile: buildPromptProfile(prompt, related)
  });
  profiles.push({
    route: `/templates/${prompt.slug}/`,
    profile: buildPromptProfile(prompt, related)
  });
}

const noindex = profiles.filter(({ profile }) => !profile.quality.indexable);
const warnings = profiles.filter(({ profile }) => profile.dataWarnings.length || profile.quality.warnings?.length);

console.log(`Content profiles checked: ${profiles.length}`);
console.log(`Noindex profiles: ${noindex.length}`);
console.log(`Profiles with warnings: ${warnings.length}`);

for (const { route, profile } of warnings.slice(0, 50)) {
  const allWarnings = [...new Set([...profile.dataWarnings, ...(profile.quality.warnings ?? [])])];
  console.log(`- ${route} [${profile.pageType}] score=${profile.quality.score}: ${allWarnings.join(" ")}`);
}

if (noindex.length) {
  console.log("\nNoindex detail:");
  for (const { route, profile } of noindex) {
    console.log(`- ${route}: ${profile.quality.reasons.join(" ")}`);
  }
}
