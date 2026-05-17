import { getSeedData } from "../src/lib/data";
import { buildSeoRoutes } from "../src/lib/route-registry";

const routes = buildSeoRoutes(getSeedData());
const noindexRoutes = routes.filter((route) => !route.quality.indexable);

if (!noindexRoutes.length) {
  console.log("No noindex routes found.");
  process.exit(0);
}

console.log(`Noindex routes (${noindexRoutes.length}):`);
for (const route of noindexRoutes) {
  console.log(`- ${route.path} [${route.group}] score=${route.quality.score}: ${route.quality.reasons.join(" ")}`);
}
