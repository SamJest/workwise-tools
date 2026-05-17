import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getSeedData } from "../src/lib/data";
import type { SeedData } from "../src/types/content";
import { seedDataSchema } from "../src/lib/validators";

const prisma = new PrismaClient();
const data = loadSeedData();

async function main() {
  for (const category of data.categories) {
    await prisma.toolCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  for (const country of data.countries) {
    await prisma.country.upsert({
      where: { slug: country.slug },
      update: country,
      create: country
    });
  }

  for (const profession of data.professions) {
    await prisma.profession.upsert({
      where: { slug: profession.slug },
      update: profession,
      create: profession
    });
  }

  for (const tool of data.tools) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {
        name: tool.name,
        summary: tool.summary,
        description: tool.description,
        websiteUrl: tool.websiteUrl,
        affiliateUrl: tool.affiliateUrl,
        pricingPageUrl: tool.pricingPageUrl,
        sourceUrls: tool.sourceUrls,
        verificationStatus: tool.verificationStatus,
        setupDifficulty: tool.setupDifficulty,
        freePlanReality: tool.freePlanReality,
        privacyRisk: tool.privacyRisk,
        bestForTeams: tool.bestForTeams,
        logoUrl: tool.logoUrl,
        pricingModel: tool.pricingModel,
        startingPrice: tool.startingPrice,
        currency: tool.currency,
        freePlanAvailable: tool.freePlanAvailable,
        trialAvailable: tool.trialAvailable,
        bestFor: tool.bestFor,
        notBestFor: tool.notBestFor,
        pros: tool.pros,
        cons: tool.cons,
        affiliateAvailable: tool.affiliateAvailable,
        isSponsored: tool.isSponsored ?? false,
        lastCheckedAt: tool.lastCheckedAt ? new Date(tool.lastCheckedAt) : null,
        lastVerifiedAt: tool.lastVerifiedAt ? new Date(tool.lastVerifiedAt) : null,
        categories: { set: [], connect: tool.categories.map((slug) => ({ slug })) },
        professions: { set: [], connect: tool.professions.map((slug) => ({ slug })) },
        countries: { set: [], connect: tool.countries.map((slug) => ({ slug })) }
      },
      create: {
        name: tool.name,
        slug: tool.slug,
        summary: tool.summary,
        description: tool.description,
        websiteUrl: tool.websiteUrl,
        affiliateUrl: tool.affiliateUrl,
        pricingPageUrl: tool.pricingPageUrl,
        sourceUrls: tool.sourceUrls,
        verificationStatus: tool.verificationStatus,
        setupDifficulty: tool.setupDifficulty,
        freePlanReality: tool.freePlanReality,
        privacyRisk: tool.privacyRisk,
        bestForTeams: tool.bestForTeams,
        logoUrl: tool.logoUrl,
        pricingModel: tool.pricingModel,
        startingPrice: tool.startingPrice,
        currency: tool.currency,
        freePlanAvailable: tool.freePlanAvailable,
        trialAvailable: tool.trialAvailable,
        bestFor: tool.bestFor,
        notBestFor: tool.notBestFor,
        pros: tool.pros,
        cons: tool.cons,
        affiliateAvailable: tool.affiliateAvailable,
        isSponsored: tool.isSponsored ?? false,
        lastCheckedAt: tool.lastCheckedAt ? new Date(tool.lastCheckedAt) : null,
        lastVerifiedAt: tool.lastVerifiedAt ? new Date(tool.lastVerifiedAt) : null,
        categories: { connect: tool.categories.map((slug) => ({ slug })) },
        professions: { connect: tool.professions.map((slug) => ({ slug })) },
        countries: { connect: tool.countries.map((slug) => ({ slug })) }
      }
    });
  }

  for (const workflow of data.workflows) {
    await prisma.workflow.upsert({
      where: { slug: workflow.slug },
      update: {
        title: workflow.title,
        problem: workflow.problem,
        toolsNeeded: workflow.toolsNeeded,
        steps: workflow.steps,
        prompts: workflow.prompts,
        templates: workflow.templates,
        lastUpdatedAt: workflow.lastUpdatedAt ? new Date(workflow.lastUpdatedAt) : null,
        relatedProfession: workflow.relatedProfession ? { connect: { slug: workflow.relatedProfession } } : undefined
      },
      create: {
        title: workflow.title,
        slug: workflow.slug,
        problem: workflow.problem,
        toolsNeeded: workflow.toolsNeeded,
        steps: workflow.steps,
        prompts: workflow.prompts,
        templates: workflow.templates,
        lastUpdatedAt: workflow.lastUpdatedAt ? new Date(workflow.lastUpdatedAt) : null,
        relatedProfession: workflow.relatedProfession ? { connect: { slug: workflow.relatedProfession } } : undefined
      }
    });
  }

  for (const prompt of data.promptTemplates) {
    await prisma.promptTemplate.upsert({
      where: { slug: prompt.slug },
      update: {
        title: prompt.title,
        task: prompt.task,
        prompt: prompt.prompt,
        refinementPrompt: prompt.refinementPrompt,
        mistakesToAvoid: prompt.mistakesToAvoid,
        lastUpdatedAt: prompt.lastUpdatedAt ? new Date(prompt.lastUpdatedAt) : null,
        profession: prompt.profession ? { connect: { slug: prompt.profession } } : undefined
      },
      create: {
        title: prompt.title,
        slug: prompt.slug,
        task: prompt.task,
        prompt: prompt.prompt,
        refinementPrompt: prompt.refinementPrompt,
        mistakesToAvoid: prompt.mistakesToAvoid,
        lastUpdatedAt: prompt.lastUpdatedAt ? new Date(prompt.lastUpdatedAt) : null,
        profession: prompt.profession ? { connect: { slug: prompt.profession } } : undefined
      }
    });
  }

  for (const comparison of data.comparisons) {
    const toolA = await prisma.tool.findUniqueOrThrow({ where: { slug: comparison.toolA } });
    const toolB = await prisma.tool.findUniqueOrThrow({ where: { slug: comparison.toolB } });
    await prisma.comparison.upsert({
      where: { slug: comparison.slug },
      update: {
        toolAId: toolA.id,
        toolBId: toolB.id,
        summaryVerdict: comparison.summaryVerdict,
        primaryUseCase: comparison.primaryUseCase,
        winnerByUseCase: comparison.winnerByUseCase,
        featureRows: comparison.featureRows,
        pricingNotes: comparison.pricingNotes,
        lastCheckedAt: comparison.lastCheckedAt ? new Date(comparison.lastCheckedAt) : null
      },
      create: {
        slug: comparison.slug,
        toolAId: toolA.id,
        toolBId: toolB.id,
        summaryVerdict: comparison.summaryVerdict,
        primaryUseCase: comparison.primaryUseCase,
        winnerByUseCase: comparison.winnerByUseCase,
        featureRows: comparison.featureRows,
        pricingNotes: comparison.pricingNotes,
        lastCheckedAt: comparison.lastCheckedAt ? new Date(comparison.lastCheckedAt) : null
      }
    });
  }

  for (const set of data.alternativeSets) {
    await prisma.alternativeSet.upsert({
      where: { slug: set.slug },
      update: {
        baseToolName: set.baseToolName,
        baseToolSlug: set.baseToolSlug,
        reason: set.reason,
        bestFreeOption: set.bestFreeOption,
        bestBusinessOption: set.bestBusinessOption,
        finalVerdict: set.finalVerdict,
        lastCheckedAt: set.lastCheckedAt ? new Date(set.lastCheckedAt) : null,
        candidates: { set: [], connect: set.candidateSlugs.map((slug) => ({ slug })) }
      },
      create: {
        slug: set.slug,
        baseToolName: set.baseToolName,
        baseToolSlug: set.baseToolSlug,
        reason: set.reason,
        bestFreeOption: set.bestFreeOption,
        bestBusinessOption: set.bestBusinessOption,
        finalVerdict: set.finalVerdict,
        lastCheckedAt: set.lastCheckedAt ? new Date(set.lastCheckedAt) : null,
        candidates: { connect: set.candidateSlugs.map((slug) => ({ slug })) }
      }
    });
  }
}

function loadSeedData(): SeedData {
  const [, , fileArg] = process.argv;
  if (!fileArg) return getSeedData();

  const filePath = resolve(fileArg);
  const raw = JSON.parse(readFileSync(filePath, "utf8"));
  return seedDataSchema.parse(raw) as SeedData;
}

main()
  .then(async () => {
    console.log("Seed complete.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
