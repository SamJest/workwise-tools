import { data } from "./data-utils";

const errors: string[] = [];
const toolSlugs = new Set(data.tools.map((tool) => tool.slug));
const professionSlugs = new Set(data.professions.map((profession) => profession.slug));
const countrySlugs = new Set(data.countries.map((country) => country.slug));
const categorySlugs = new Set(data.categories.map((category) => category.slug));

for (const tool of data.tools) {
  for (const category of tool.categories) {
    if (!categorySlugs.has(category)) errors.push(`Tool ${tool.slug} references missing category ${category}`);
  }
  for (const profession of tool.professions) {
    if (!professionSlugs.has(profession)) errors.push(`Tool ${tool.slug} references missing profession ${profession}`);
  }
  for (const country of tool.countries) {
    if (!countrySlugs.has(country)) errors.push(`Tool ${tool.slug} references missing country ${country}`);
  }
}

for (const comparison of data.comparisons) {
  if (!toolSlugs.has(comparison.toolA)) errors.push(`Comparison ${comparison.slug} missing toolA ${comparison.toolA}`);
  if (!toolSlugs.has(comparison.toolB)) errors.push(`Comparison ${comparison.slug} missing toolB ${comparison.toolB}`);
}

for (const set of data.alternativeSets) {
  if (!toolSlugs.has(set.baseToolSlug)) errors.push(`Alternative set ${set.slug} missing base tool ${set.baseToolSlug}`);
  for (const candidate of set.candidateSlugs) {
    if (!toolSlugs.has(candidate)) errors.push(`Alternative set ${set.slug} missing candidate ${candidate}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Data validation passed: ${data.tools.length} tools, ${data.professions.length} professions, ${data.countries.length} countries.`);
