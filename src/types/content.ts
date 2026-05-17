export type SiteLink = {
  title: string;
  href: string;
  description?: string;
};

export type Country = {
  name: string;
  slug: string;
  currency: string;
  region?: string;
  priority: number;
  terminologyNotes: string[];
  privacyNotes: string[];
};

export type Profession = {
  name: string;
  slug: string;
  aliases: string[];
  painPoints: string[];
  commonTasks: string[];
  recommendedCategories: string[];
  monetisationScore: number;
};

export type ToolCategory = {
  name: string;
  slug: string;
  description?: string;
};

export type Tool = {
  name: string;
  slug: string;
  summary: string;
  description?: string;
  websiteUrl?: string;
  affiliateUrl?: string;
  logoUrl?: string;
  categories: string[];
  pricingModel?: string;
  startingPrice: number | null;
  currency: string;
  freePlanAvailable: boolean;
  trialAvailable: boolean;
  bestFor: string[];
  notBestFor: string[];
  pros: string[];
  cons: string[];
  professions: string[];
  countries: string[];
  useCases: string[];
  affiliateAvailable: boolean;
  isSponsored?: boolean;
  lastCheckedAt: string | null;
};

export type Comparison = {
  slug: string;
  toolA: string;
  toolB: string;
  summaryVerdict: string;
  primaryUseCase?: string;
  winnerByUseCase?: Record<string, string>;
  featureRows?: Array<Record<string, string>>;
  pricingNotes?: string;
  lastCheckedAt?: string | null;
};

export type AlternativeSet = {
  slug: string;
  baseToolSlug: string;
  baseToolName: string;
  reason?: string;
  candidateSlugs: string[];
  bestFreeOption?: string;
  bestBusinessOption?: string;
  finalVerdict?: string;
  lastCheckedAt?: string | null;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type Workflow = {
  title: string;
  slug: string;
  problem: string;
  toolsNeeded: string[];
  relatedProfession?: string;
  steps: WorkflowStep[];
  prompts: string[];
  templates: string[];
  lastUpdatedAt?: string | null;
};

export type PromptTemplate = {
  title: string;
  slug: string;
  profession?: string;
  task: string;
  prompt: string;
  refinementPrompt?: string;
  mistakesToAvoid: string[];
  lastUpdatedAt?: string | null;
};

export type SeedData = {
  metadata: {
    note: string;
    project: string;
  };
  countries: Country[];
  professions: Profession[];
  categories: ToolCategory[];
  tools: Tool[];
  comparisons: Comparison[];
  alternativeSets: AlternativeSet[];
  workflows: Workflow[];
  promptTemplates: PromptTemplate[];
};

export type PageQuality = {
  score: number;
  reasons: string[];
  valueBlocks?: string[];
  warnings?: string[];
  indexable: boolean;
};

export type PageContentProfile = {
  pageType: string;
  valueBlocks: string[];
  uniqueAngles: string[];
  dataWarnings: string[];
  quality: PageQuality;
};
