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
  pricingPageUrl?: string;
  sourceUrls: string[];
  verificationStatus: "starter" | "source-linked" | "verified";
  setupDifficulty?: "low" | "medium" | "high";
  freePlanReality?: string;
  privacyRisk?: "low" | "medium" | "high";
  bestForTeams: string[];
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
  lastVerifiedAt: string | null;
  testedAt?: string | null;
  testedBy?: string;
  testingSummary?: string;
  evidenceUrls?: string[];
  pricingLastCheckedAt?: string | null;
  featureLastCheckedAt?: string | null;
  changeLog?: string[];
  workflowFitScore?: number;
  setupEffortScore?: number;
  privacyRiskNotes?: string;
  bestForUseCases?: string[];
  dailyUseCases?: string[];
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

export type UpdateItem = {
  title: string;
  slug: string;
  type: "daily-brief" | "price-watch" | "new-guide" | "workflow-idea" | "verification" | "template" | "tool-change" | "workflow-audit";
  summary: string;
  affectedTools: string[];
  affectedClusters: string[];
  sourceUrls: string[];
  publishedAt: string;
};

export type AutomationTemplate = {
  title: string;
  slug: string;
  trigger: string;
  inputs: string[];
  steps: string[];
  tools: string[];
  riskLevel: "low" | "medium" | "high";
  reviewStep: string;
  failureModes: string[];
  relatedToolSlugs: string[];
  relatedFreeToolSlug: string;
  dailyUseCase: string;
};

export type AutomationCluster = {
  slug: string;
  audience: string;
  primaryPain: string;
  templateSlugs: string[];
  comparisonSlugs: string[];
  toolSlugs: string[];
  promptSlugs: string[];
  freeToolSlugs: string[];
};

export type WorkflowRecipe = {
  title: string;
  slug: string;
  audience: string;
  professionSlug: string;
  workflowType: string;
  summary: string;
  trigger: string;
  outcome: string;
  tools: string[];
  setupTime: string;
  difficulty: "low" | "medium" | "high";
  riskLevel: "low" | "medium" | "high";
  inputs: string[];
  steps: string[];
  prompts: string[];
  reviewChecks: string[];
  failureModes: string[];
  privacyNotes: string[];
  relatedToolSlugs: string[];
  relatedAutomationTemplateSlugs: string[];
  relatedFreeToolSlug: string;
  dailyHabit: string;
};

export type WorkflowCollection = {
  title: string;
  slug: string;
  audience: string;
  primaryPain: string;
  recipeSlugs: string[];
  toolSlugs: string[];
  automationTemplateSlugs: string[];
  freeToolSlugs: string[];
  internalLinks: SiteLink[];
};

export type AgentPlaybook = {
  title: string;
  slug: string;
  audience: string;
  agentType: string;
  summary: string;
  jobToBeDone: string;
  trigger: string;
  humanOwner: string;
  tools: string[];
  relatedToolSlugs: string[];
  relatedWorkflowRecipeSlugs: string[];
  relatedFreeToolSlug: string;
  setupSteps: string[];
  guardrails: string[];
  handoffRules: string[];
  failureModes: string[];
  privacyNotes: string[];
  dailyReview: string;
};

export type StackLayer = {
  name: string;
  purpose: string;
  toolSlugs: string[];
  setupNote: string;
};

export type StackBlueprint = {
  title: string;
  slug: string;
  audience: string;
  budgetTier: "lean" | "balanced" | "scaling";
  maturityLevel: "starter" | "growing" | "advanced";
  summary: string;
  primaryWorkflow: string;
  stackLayers: StackLayer[];
  rolloutSteps: string[];
  riskNotes: string[];
  upgradeTriggers: string[];
  relatedWorkflowRecipeSlugs: string[];
  relatedAgentPlaybookSlugs: string[];
  relatedFreeToolSlug: string;
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
