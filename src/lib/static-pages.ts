export const staticPages = {
  about: {
    title: "About",
    description:
      "WorkWise Tools is a database-driven AI and SaaS decision platform built for practical comparisons, workflows, prompts, and buying guides.",
    body: [
      "WorkWise Tools is designed to grow from structured data rather than one-off hardcoded pages.",
      "The MVP uses demo seed data from the build package. Before launch, tool pricing, availability, claims, affiliate status, and recommendations should be verified."
    ]
  },
  "editorial-policy": {
    title: "Editorial Policy",
    description: "How guides should be researched, updated, disclosed, and improved as the database grows.",
    body: [
      "Pages should help readers choose, compare, replace, or use software. Thin pages should be noindexed until they include enough unique value.",
      "Do not publish fake reviews, unverifiable claims, or unmarked sponsored placements. Pricing and feature details need a last-checked date."
    ]
  },
  "how-we-review-ai-tools": {
    title: "How We Review AI Tools",
    description: "The review framework for evaluating AI and SaaS tools by workflow fit, pricing, use case, and risk.",
    body: [
      "The review model considers practical fit by profession, country, task, budget, integrations, privacy needs, and ease of adoption.",
      "Seed data is not a final review. Production pages should include hands-on checks, current pricing verification, and clear editorial notes."
    ]
  },
  "affiliate-disclosure": {
    title: "Advertising and Affiliate Disclosure",
    description: "How display ads, affiliate links, and sponsored placements should be disclosed on WorkWise Tools.",
    body: [
      "WorkWise Tools is being built as an ad-supported publisher. Pages may later include display ads, sponsorships, or clearly marked affiliate links.",
      "Commercial relationships must not determine editorial conclusions. Sponsored placements should be visibly marked and tool recommendations should remain based on practical workflow fit."
    ]
  },
  contact: {
    title: "Contact",
    description: "Contact page placeholder for editorial corrections, vendor inquiries, and partnership requests.",
    body: [
      "Use this page as the future destination for editorial corrections, vendor data updates, newsletter support, and sponsor inquiries for WorkWise Tools.",
      "Before launch, connect this form or page to an email address, CRM, or support workflow."
    ]
  },
  "media-kit": {
    title: "Media Kit",
    description: "Sponsor and vendor inquiry placeholder for monetisation workflows.",
    body: [
      "This page is a placeholder for sponsorship options, audience information, placement rules, and editorial separation notes.",
      "Do not add traffic, revenue, or conversion claims until analytics data is available."
    ]
  }
} as const;

export type StaticPageSlug = keyof typeof staticPages;
