import type { Tool } from "@/types/content";

type ToolEvidence = Pick<
  Tool,
  | "testedAt"
  | "testedBy"
  | "testingSummary"
  | "evidenceUrls"
  | "pricingLastCheckedAt"
  | "featureLastCheckedAt"
  | "changeLog"
  | "workflowFitScore"
  | "setupEffortScore"
  | "privacyRiskNotes"
  | "bestForUseCases"
  | "dailyUseCases"
>;

const evidenceBySlug: Record<string, ToolEvidence> = {
  pipedrive: {
    testedAt: "2026-05-17",
    testedBy: "WorkWise editorial",
    testingSummary:
      "Source-linked record reviewed for sales CRM workflow fit. Strongest current angle is use cases, real estate lead follow-up, and sales activity discipline rather than generic CRM claims.",
    evidenceUrls: ["https://www.pipedrive.com/", "https://www.pipedrive.com/en/pricing"],
    pricingLastCheckedAt: "2026-05-17",
    featureLastCheckedAt: "2026-05-17",
    changeLog: ["Retargeted around Pipedrive use cases, real estate follow-up, consulting sales, automation, and reporting."],
    workflowFitScore: 9,
    setupEffortScore: 4,
    privacyRiskNotes: "Review CRM permissions, imported contacts, notes, call summaries, and automation access before rollout.",
    bestForUseCases: ["sales pipeline", "lead follow-up", "CRM reporting", "real estate lead follow-up"],
    dailyUseCases: ["Review stale deals", "Create next activities", "Check follow-up tasks"]
  },
  hubspot: priorityEvidence("https://www.hubspot.com/", "https://www.hubspot.com/pricing", "broader CRM and marketing-suite comparison point", 8, 6),
  "follow-up-boss": priorityEvidence("https://www.followupboss.com/", "https://www.followupboss.com/pricing", "real-estate-specific CRM contrast for Pipedrive and agent workflow pages", 9, 5),
  zapier: priorityEvidence("https://zapier.com/", "https://zapier.com/pricing", "default automation builder for small-business handoffs and CRM workflows", 9, 3),
  make: priorityEvidence("https://www.make.com/en", "https://www.make.com/en/pricing", "visual automation builder for more controlled multi-step workflows", 8, 6),
  calendly: priorityEvidence("https://calendly.com/", "https://calendly.com/pricing", "scheduling layer for sales, consulting, and real estate workflows", 8, 2),
  typeform: priorityEvidence("https://www.typeform.com/", "https://www.typeform.com/pricing/", "intake layer for lead capture, client onboarding, and workflow triggers", 8, 3),
  canva: priorityEvidence("https://www.canva.com/", "https://www.canva.com/pricing/", "recurring marketing asset tool for real estate and small-business workflows", 8, 2),
  matterport: priorityEvidence("https://matterport.com/", "https://matterport.com/pricing", "virtual-tour option inside the real estate marketing workflow", 7, 6),
  fathom: priorityEvidence("https://fathom.video/", "https://fathom.video/pricing", "meeting-note layer for sales, consulting, and onboarding workflows", 8, 3)
};

export function applyToolEvidence(tool: Tool): Tool {
  const evidence = evidenceBySlug[tool.slug];
  if (!evidence) return tool;

  return {
    ...tool,
    ...evidence,
    evidenceUrls: evidence.evidenceUrls?.length ? evidence.evidenceUrls : tool.sourceUrls
  };
}

function priorityEvidence(homeUrl: string, pricingUrl: string, angle: string, workflowFitScore: number, setupEffortScore: number): ToolEvidence {
  return {
    testedAt: "2026-05-17",
    testedBy: "WorkWise editorial",
    testingSummary: `Source-linked record reviewed as a ${angle}.`,
    evidenceUrls: [homeUrl, pricingUrl],
    pricingLastCheckedAt: "2026-05-17",
    featureLastCheckedAt: "2026-05-17",
    changeLog: ["Added to the priority tool watchlist for workflow-led cluster pages."],
    workflowFitScore,
    setupEffortScore,
    privacyRiskNotes: "Review connected accounts, user permissions, stored customer data, and automation access before rollout.",
    bestForUseCases: ["workflow support", "small-business operations", "repeatable handoffs"],
    dailyUseCases: ["Check current tasks", "Review outputs", "Improve one repeated handoff"]
  };
}
