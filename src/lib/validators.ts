import { z } from "zod";

const stringArray = z.array(z.string());

export const countrySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  currency: z.string().min(3),
  region: z.string().optional(),
  priority: z.number().int(),
  terminologyNotes: stringArray,
  privacyNotes: stringArray
});

export const professionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  aliases: stringArray,
  painPoints: stringArray,
  commonTasks: stringArray,
  recommendedCategories: stringArray,
  monetisationScore: z.number().int().min(1).max(5)
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional()
});

export const toolSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  affiliateUrl: z.string().url().optional(),
  logoUrl: z.string().optional(),
  categories: stringArray,
  pricingModel: z.string().optional(),
  startingPrice: z.number().nullable(),
  currency: z.string().min(3),
  freePlanAvailable: z.boolean(),
  trialAvailable: z.boolean(),
  bestFor: stringArray,
  notBestFor: stringArray,
  pros: stringArray,
  cons: stringArray,
  professions: stringArray,
  countries: stringArray,
  useCases: stringArray,
  affiliateAvailable: z.boolean(),
  isSponsored: z.boolean().optional(),
  lastCheckedAt: z.string().nullable()
});

export const seedDataSchema = z.object({
  metadata: z.object({
    note: z.string(),
    project: z.string()
  }),
  countries: z.array(countrySchema),
  professions: z.array(professionSchema),
  categories: z.array(categorySchema),
  tools: z.array(toolSchema),
  comparisons: z.array(
    z.object({
      slug: z.string(),
      toolA: z.string(),
      toolB: z.string(),
      summaryVerdict: z.string(),
      primaryUseCase: z.string().optional(),
      winnerByUseCase: z.record(z.string()).optional(),
      featureRows: z.array(z.record(z.string())).optional(),
      pricingNotes: z.string().optional(),
      lastCheckedAt: z.string().nullable().optional()
    })
  ),
  alternativeSets: z.array(
    z.object({
      slug: z.string(),
      baseToolSlug: z.string(),
      baseToolName: z.string(),
      reason: z.string().optional(),
      candidateSlugs: stringArray,
      bestFreeOption: z.string().optional(),
      bestBusinessOption: z.string().optional(),
      finalVerdict: z.string().optional(),
      lastCheckedAt: z.string().nullable().optional()
    })
  ),
  workflows: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      problem: z.string(),
      toolsNeeded: stringArray,
      relatedProfession: z.string().optional(),
      steps: z.array(z.object({ title: z.string(), description: z.string() })),
      prompts: stringArray,
      templates: stringArray,
      lastUpdatedAt: z.string().nullable().optional()
    })
  ),
  promptTemplates: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      profession: z.string().optional(),
      task: z.string(),
      prompt: z.string(),
      refinementPrompt: z.string().optional(),
      mistakesToAvoid: stringArray,
      lastUpdatedAt: z.string().nullable().optional()
    })
  )
});
