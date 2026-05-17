import { data } from "./data-utils";

const maxAgeDays = 60;
const now = Date.now();

const staleTools = data.tools.filter((tool) => {
  if (!tool.lastCheckedAt) return true;
  const ageDays = (now - new Date(tool.lastCheckedAt).getTime()) / (1000 * 60 * 60 * 24);
  return ageDays > maxAgeDays;
});

console.log(`Tools needing pricing/feature refresh (${staleTools.length}):`);
for (const tool of staleTools) {
  console.log(`- ${tool.name} (${tool.slug})`);
}
