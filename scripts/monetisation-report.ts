import { data } from "./data-utils";

const affiliateTools = data.tools.filter((tool) => tool.affiliateAvailable);
const sponsoredTools = data.tools.filter((tool) => tool.isSponsored);
const missingAffiliateUrl = affiliateTools.filter((tool) => !tool.affiliateUrl);
const missingWebsiteUrl = data.tools.filter((tool) => !tool.websiteUrl);
const missingPrice = data.tools.filter((tool) => tool.startingPrice === null);
const professionPotential = data.professions
  .map((profession) => {
    const tools = data.tools.filter((tool) => tool.professions.includes(profession.slug));
    const affiliateMatches = tools.filter((tool) => tool.affiliateAvailable);
    return {
      profession,
      tools: tools.length,
      affiliateMatches: affiliateMatches.length,
      score: profession.monetisationScore * 10 + affiliateMatches.length * 3 + tools.length
    };
  })
  .sort((a, b) => b.score - a.score);

console.log("Monetisation report");
console.log(`- Tools: ${data.tools.length}`);
console.log(`- Affiliate-ready tools: ${affiliateTools.length}`);
console.log(`- Sponsored tools: ${sponsoredTools.length}`);
console.log(`- Affiliate-ready tools missing affiliateUrl: ${missingAffiliateUrl.length}`);
console.log(`- Tools missing websiteUrl: ${missingWebsiteUrl.length}`);
console.log(`- Tools missing startingPrice: ${missingPrice.length}`);

if (missingAffiliateUrl.length) {
  console.log("\nAffiliate URL gaps:");
  for (const tool of missingAffiliateUrl) {
    console.log(`- ${tool.name} (${tool.slug})`);
  }
}

console.log("\nTop profession monetisation opportunities:");
for (const item of professionPotential.slice(0, 10)) {
  console.log(
    `- ${item.profession.name} (${item.profession.slug}): score=${item.score}, tools=${item.tools}, affiliateMatches=${item.affiliateMatches}`
  );
}
