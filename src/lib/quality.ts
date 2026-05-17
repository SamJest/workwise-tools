import type { PageQuality, SiteLink, Tool } from "@/types/content";

export function getPageQualityScore(params: {
  matchingTools?: Tool[];
  valueBlocks: string[];
  intro?: string;
  internalLinks?: SiteLink[];
  lastUpdated?: string | null;
  hasAuthor?: boolean;
  requiresThreeTools?: boolean;
  requiresFreshness?: boolean;
  dataWarnings?: string[];
}): PageQuality {
  const reasons: string[] = [];
  const warnings = [...(params.dataWarnings ?? [])];
  let score = 0;

  const matchingTools = params.matchingTools ?? [];
  const internalLinks = params.internalLinks ?? [];

  if (!params.requiresThreeTools || matchingTools.length >= 3) {
    score += 2;
  } else {
    reasons.push("Fewer than 3 matching tools.");
  }

  if (params.valueBlocks.filter(Boolean).length >= 3) {
    score += 3;
  } else {
    reasons.push("Fewer than 3 unique value blocks.");
  }

  if (params.intro && params.intro.length > 60) {
    score += 1;
  } else {
    reasons.push("Intro or verdict is too thin.");
  }

  if (internalLinks.length >= 3) {
    score += 1;
  } else {
    reasons.push("Fewer than 3 internal links.");
  }

  if (params.lastUpdated) {
    score += 1;
  } else if (params.requiresFreshness) {
    reasons.push("No verified last-updated date.");
  } else {
    warnings.push("No verified last-updated date.");
  }

  if (params.hasAuthor) {
    score += 1;
  } else {
    reasons.push("No author or reviewer block.");
  }

  return {
    score,
    reasons,
    valueBlocks: params.valueBlocks.filter(Boolean),
    warnings,
    indexable: score >= 6 && reasons.length === 0
  };
}

export function hasDemoDataWarning(): boolean {
  return process.env.NODE_ENV !== "production";
}
