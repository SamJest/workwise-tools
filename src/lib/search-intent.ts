import type { Country, Profession, SiteLink } from "@/types/content";

export type SearchIntentSection = {
  title: string;
  description: string;
  bullets?: string[];
};

export type SearchIntentBrief = {
  title: string;
  description: string;
  sections: SearchIntentSection[];
  links?: SiteLink[];
  faqs?: Array<{ question: string; answer: string }>;
};

const toolBriefs: Record<string, SearchIntentBrief> = {
  pipedrive: {
    title: "Pipedrive use cases to check first",
    description:
      "Early Search Console data is showing Pipedrive discovery, especially around use cases. Treat this page as a practical CRM workflow guide before it becomes a pricing or feature checklist.",
    sections: [
      {
        title: "Sales pipeline and deal tracking",
        description:
          "Use Pipedrive when the main job is moving leads through named stages, assigning next activities, and keeping deal ownership clear.",
        bullets: ["Create one pipeline per repeatable sales motion", "Keep stage names tied to buyer actions", "Review stale deals weekly"]
      },
      {
        title: "Real estate lead follow-up",
        description:
          "For agents and small property teams, Pipedrive can work as a lightweight lead-follow-up layer when property enquiries need fast tasks, reminders, and notes.",
        bullets: ["Capture enquiry source", "Log viewing notes", "Create follow-up tasks while buyer intent is fresh"]
      },
      {
        title: "Consulting and service sales",
        description:
          "Consultants can use Pipedrive for discovery calls, proposal stages, client onboarding handoffs, and renewal reminders without adopting a heavier customer platform.",
        bullets: ["Track discovery, proposal, negotiation, and won stages", "Attach proposal notes", "Trigger onboarding tasks after close"]
      },
      {
        title: "Reporting and automation",
        description:
          "Check reporting, dashboards, and automation plan limits before committing. The useful workflow is not just storing deals; it is seeing bottlenecks and prompting follow-up."
      }
    ],
    links: [
      { title: "Pipedrive vs HubSpot", href: "/comparisons/pipedrive-vs-hubspot/", description: "Focused CRM vs broader customer platform." },
      { title: "Pipedrive alternatives", href: "/alternatives/pipedrive-alternatives/", description: "Compare CRM and sales workflow substitutes." },
      { title: "Sales follow-up workflow", href: "/workflows/pipedrive-sales-follow-up-workflow/", description: "Turn lead context into CRM tasks and follow-up." },
      { title: "Real estate lead workflow", href: "/workflows/real-estate-lead-follow-up-workflow/", description: "Route property leads, viewing notes, and follow-up." }
    ],
    faqs: [
      {
        question: "What are the best Pipedrive use cases?",
        answer:
          "Pipedrive is strongest for sales pipelines, deal tracking, lead follow-up, activity reminders, and lightweight CRM reporting. It is less suitable when the team needs a full marketing, service, and content platform in one system."
      },
      {
        question: "Is Pipedrive useful for real estate agents?",
        answer:
          "It can be useful for agents who need a simple CRM for enquiries, viewing notes, and follow-up tasks. Real-estate-specific CRMs such as Follow Up Boss may fit better when lead routing, team accountability, or property integrations are central."
      },
      {
        question: "When should a business hire Pipedrive consulting help?",
        answer:
          "Consulting help is usually worth considering when the pipeline has multiple teams, custom fields, automations, imports, reporting needs, or CRM hygiene problems that would slow down adoption."
      }
    ]
  }
};

const countryProfessionBriefs: Record<string, SearchIntentBrief> = {
  "us/real-estate-agents": {
    title: "US real estate workflows to solve first",
    description:
      "Search data is clustering around real estate agent tools and AI software. Prioritise practical lead, listing, and follow-up workflows over a broad software directory.",
    sections: [
      {
        title: "Lead capture and routing",
        description:
          "Connect portals, website forms, open-house leads, and referrals to a CRM so every enquiry has an owner and next action.",
        bullets: ["Track source and urgency", "Assign follow-up owner", "Add response-time reminders"]
      },
      {
        title: "Listing marketing",
        description:
          "Use AI for first drafts of listing descriptions, brochures, social captions, and email copy, while keeping property facts and local claims verified."
      },
      {
        title: "Viewing notes and buyer follow-up",
        description:
          "Summarise viewing feedback, extract objections, and create follow-up tasks without inventing buyer intent or property details."
      },
      {
        title: "Brokerage operations",
        description:
          "Brokerages should compare tools by team visibility, handoff rules, lead ownership, compliance review, and reporting rather than one-agent productivity alone."
      }
    ],
    links: [
      { title: "Real estate lead follow-up workflow", href: "/workflows/real-estate-lead-follow-up-workflow/", description: "A CRM-first lead workflow for agents." },
      { title: "Pipedrive for real estate workflows", href: "/ai-tools/pipedrive/", description: "Pipeline and activity tracking for property leads." },
      { title: "Pipedrive vs Follow Up Boss", href: "/comparisons/pipedrive-vs-follow-up-boss/", description: "Generic CRM vs real-estate-specific CRM." },
      { title: "ChatGPT prompts for real estate agents", href: "/prompts/chatgpt-prompts-for-real-estate-agents/", description: "Listing, social, and follow-up prompts." }
    ],
    faqs: [
      {
        question: "What tools do real estate agents need first?",
        answer:
          "Most agents should solve CRM follow-up, listing marketing, scheduling, viewing notes, and reviewable client communication before adding more specialised AI tools."
      },
      {
        question: "What is the difference between real estate AI software and general AI tools?",
        answer:
          "General AI tools help draft and summarise. Real estate software is more useful when it connects the draft to property facts, lead records, appointments, team ownership, and follow-up tasks."
      },
      {
        question: "Should realtors use Pipedrive or a real-estate-specific CRM?",
        answer:
          "Pipedrive can fit simple pipeline and follow-up work. A real-estate-specific CRM may be better for brokerages, lead routing, property-team accountability, and integrations built around agent workflows."
      }
    ]
  }
};

const useCaseBriefs: Record<string, SearchIntentBrief> = {
  automation: {
    title: "Automation examples worth comparing",
    description:
      "Search impressions are appearing for workplace automation tools. Anchor this hub around repeatable handoffs that save time without hiding review steps.",
    sections: [
      {
        title: "Sales follow-up automation",
        description:
          "Move form fills, booked calls, call notes, and deal updates into the CRM so follow-up happens on time."
      },
      {
        title: "Real estate lead routing",
        description:
          "Route enquiries to an agent, create a CRM record, send a safe acknowledgement, and trigger a viewing or qualification task."
      },
      {
        title: "Agency reporting automation",
        description:
          "Collect campaign inputs, generate draft summaries, and turn approvals into project tasks without inventing performance claims."
      },
      {
        title: "Consultant onboarding automation",
        description:
          "Connect intake forms, kickoff notes, document folders, and implementation tasks so the first week of a project is repeatable."
      }
    ],
    links: [
      { title: "Zapier vs Make", href: "/comparisons/zapier-vs-make/", description: "Compare two core automation builders." },
      { title: "Client onboarding workflow", href: "/workflows/ai-client-onboarding-workflow/", description: "Automate intake and handoff steps." },
      { title: "Sales follow-up workflow", href: "/workflows/pipedrive-sales-follow-up-workflow/", description: "Use CRM tasks to keep follow-up moving." }
    ],
    faqs: [
      {
        question: "What are workplace automation tools?",
        answer:
          "Workplace automation tools connect apps, records, reminders, approvals, and AI-assisted drafting so repeat tasks move through a workflow with fewer manual handoffs."
      },
      {
        question: "What should small businesses automate first?",
        answer:
          "Start with repeated handoffs such as lead capture, CRM follow-up, meeting-note summaries, client onboarding, support triage, and reporting drafts."
      }
    ]
  }
};

export function getToolIntentBrief(slug: string) {
  return toolBriefs[slug];
}

export function getCountryProfessionIntentBrief(country: Country, profession: Profession) {
  return countryProfessionBriefs[`${country.slug}/${profession.slug}`];
}

export function getUseCaseIntentBrief(slug: string) {
  return useCaseBriefs[slug];
}
