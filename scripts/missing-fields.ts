import { data, isBlank } from "./data-utils";

type Severity = "required" | "recommended";
type Finding = {
  entity: string;
  slug: string;
  field: string;
  severity: Severity;
};

const findings: Finding[] = [];

function check(entity: string, slug: string, record: Record<string, unknown>, required: string[], recommended: string[]) {
  for (const field of required) {
    if (isBlank(record[field])) findings.push({ entity, slug, field, severity: "required" });
  }
  for (const field of recommended) {
    if (isBlank(record[field])) findings.push({ entity, slug, field, severity: "recommended" });
  }
}

for (const tool of data.tools) {
  const recommended = ["startingPrice", "description"];
  if (tool.affiliateAvailable) recommended.push("affiliateUrl");

  check(
    "tool",
    tool.slug,
    tool as unknown as Record<string, unknown>,
    [
      "name",
      "slug",
      "summary",
      "websiteUrl",
      "pricingPageUrl",
      "sourceUrls",
      "verificationStatus",
      "setupDifficulty",
      "freePlanReality",
      "privacyRisk",
      "bestForTeams",
      "lastCheckedAt",
      "lastVerifiedAt",
      "categories",
      "professions",
      "countries",
      "bestFor",
      "pros",
      "cons"
    ],
    recommended
  );
}

for (const profession of data.professions) {
  check(
    "profession",
    profession.slug,
    profession as unknown as Record<string, unknown>,
    ["name", "slug", "painPoints", "commonTasks", "recommendedCategories"],
    ["aliases"]
  );
}

for (const country of data.countries) {
  check(
    "country",
    country.slug,
    country as unknown as Record<string, unknown>,
    ["name", "slug", "currency", "priority", "terminologyNotes", "privacyNotes"],
    ["region"]
  );
}

for (const comparison of data.comparisons) {
  check(
    "comparison",
    comparison.slug,
    comparison as unknown as Record<string, unknown>,
    ["slug", "toolA", "toolB", "summaryVerdict"],
    ["primaryUseCase", "winnerByUseCase", "pricingNotes", "lastCheckedAt"]
  );
}

for (const set of data.alternativeSets) {
  check(
    "alternativeSet",
    set.slug,
    set as unknown as Record<string, unknown>,
    ["slug", "baseToolSlug", "baseToolName", "candidateSlugs", "finalVerdict"],
    ["reason", "bestFreeOption", "bestBusinessOption", "lastCheckedAt"]
  );
}

for (const workflow of data.workflows) {
  check(
    "workflow",
    workflow.slug,
    workflow as unknown as Record<string, unknown>,
    ["title", "slug", "problem", "toolsNeeded", "steps"],
    ["prompts", "templates", "relatedProfession", "lastUpdatedAt"]
  );
}

for (const prompt of data.promptTemplates) {
  check(
    "promptTemplate",
    prompt.slug,
    prompt as unknown as Record<string, unknown>,
    ["title", "slug", "task", "prompt", "mistakesToAvoid"],
    ["profession", "refinementPrompt", "lastUpdatedAt"]
  );
}

const required = findings.filter((finding) => finding.severity === "required");
const recommended = findings.filter((finding) => finding.severity === "recommended");

if (findings.length) {
  console.log(`Missing field report: ${required.length} required, ${recommended.length} recommended.`);
  for (const finding of findings) {
    console.log(`- [${finding.severity}] ${finding.entity}:${finding.slug} missing ${finding.field}`);
  }
}

if (required.length) {
  process.exit(1);
}

if (!findings.length) {
  console.log("Missing field report passed: no missing fields.");
}
