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
  privacy: {
    title: "Privacy Policy",
    description: "How WorkWise Tools handles analytics, contact messages, cookies, and future advertising data.",
    body: [
      "WorkWise Tools collects only the information needed to operate and improve the site. This may include basic analytics events, pages visited, outbound clicks, free-tool usage events, and information submitted through contact or newsletter forms.",
      "Analytics tools such as Google Analytics may use cookies or similar technologies to understand aggregate traffic patterns. These reports help identify which workflow guides, comparisons, and free tools should be improved.",
      "If display advertising is added later, ad partners may use cookies or identifiers to measure ad performance and serve relevant ads. WorkWise Tools will keep advertising disclosures visible and update this policy when a specific ad network is enabled.",
      "Do not submit sensitive personal, financial, medical, legal, or confidential client data through free tools or contact forms. Free-tool outputs are generated for drafting and planning purposes only.",
      "To request a correction, data update, or removal of a submitted message, use the contact page."
    ]
  },
  cookies: {
    title: "Cookie Policy",
    description: "How cookies and similar technologies may be used for analytics, site performance, and future display ads.",
    body: [
      "WorkWise Tools may use cookies and similar technologies for analytics, site performance, abuse prevention, and future advertising measurement.",
      "Google Analytics is currently used to understand aggregate site usage. Browser controls can usually block or delete cookies, though some analytics and form features may work less reliably.",
      "Advertising cookies should only be introduced after an ad network is configured. When that happens, the site should also add the network's required privacy wording and ads.txt publisher record."
    ]
  },
  terms: {
    title: "Terms of Use",
    description: "The rules for using WorkWise Tools content, free tools, comparisons, and workflow templates.",
    body: [
      "WorkWise Tools provides editorial software information, workflow ideas, prompts, templates, and rule-based free tools for general planning purposes.",
      "Content is not legal, financial, tax, medical, or professional advice. Always verify pricing, availability, data handling, and suitability with the vendor before buying or deploying software.",
      "Free-tool outputs are drafts. Review all claims, facts, compliance requirements, privacy implications, and customer-facing messages before using them.",
      "Vendor names, product names, and trademarks belong to their respective owners. Inclusion in a guide does not imply endorsement unless clearly stated by the vendor."
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
