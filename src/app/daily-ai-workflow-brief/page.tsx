import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { latestUpdates } from "@/lib/updates";

export const metadata = pageMetadata({
  title: "Daily AI Workflow Brief",
  description: "A daily WorkWise routine with one workflow idea, one tool check, one prompt, and one free-tool action.",
  path: "/daily-ai-workflow-brief/"
});

export default function DailyAiWorkflowBriefPage() {
  const updates = latestUpdates(3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/" }
  ];
  const today = new Date("2026-05-30");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "Daily AI Workflow Brief",
          description: "A daily WorkWise routine for practical AI and SaaS workflows.",
          path: "/daily-ai-workflow-brief/"
        })}
      />
      <PageHero
        eyebrow="Daily brief"
        title="One useful AI workflow to improve today"
        description="A return habit for small teams: check one workflow, one tool, one prompt, and one calculator before adding another app."
      >
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title={`Brief for ${today.toLocaleDateString("en-GB")}`}>
            Focus on lead follow-up. If a lead, viewing, sales call, or client intake does not have an owner and next action,
            no AI tool will rescue the workflow.
          </VerdictBox>

          <div className="grid gap-4 md:grid-cols-2">
            <BriefCard
              title="Today's automation task"
              body="Pick one workflow with a visible failure mode, then run the audit generator before changing any tools."
              href="/free-tools/workflow-audit-generator/"
              label="Audit workflow"
            />
            <BriefCard
              title="Topic to explore"
              body="Open the new finance, recruiting, marketing, reporting, compliance, or retention clusters if today's bottleneck sits outside CRM."
              href="/topics/"
              label="Browse topics"
            />
            <BriefCard
              title="Workflow of the day"
              body="Use the portal lead to agent follow-up recipe if a property enquiry, sales lead, or intake form needs a faster owner and next action."
              href="/workflow-library/portal-lead-to-agent-follow-up/"
              label="Open recipe"
            />
            <BriefCard
              title="Workflow idea"
              body="Turn every new enquiry into a CRM record, next task, and follow-up draft before the day ends."
              href="/workflows/pipedrive-sales-follow-up-workflow/"
              label="Open workflow"
            />
            <BriefCard
              title="Tool to check"
              body="Review Pipedrive if you need a lightweight sales pipeline, then compare Follow Up Boss for real estate routing."
              href="/ai-tools/pipedrive/"
              label="Open Pipedrive guide"
            />
            <BriefCard
              title="Prompt to reuse"
              body="Ask AI to convert notes into CRM fields, objections, buying signals, next tasks, and a concise follow-up email."
              href="/prompts/chatgpt-prompts-for-consultants/"
              label="Open prompt page"
            />
            <BriefCard
              title="Stack check"
              body="Before upgrading a plan, check whether the stack is missing an intake, record, automation, review, or reporting layer."
              href="/free-tools/stack-gap-analyzer/"
              label="Analyze stack"
            />
            <BriefCard
              title="Buying check"
              body="Before starting a new software trial, use a buying guide to check pricing traps, privacy risk, rollout steps, and red flags."
              href="/buying-guides/"
              label="Open buying guides"
            />
            <BriefCard
              title="Agent check"
              body="Before turning any workflow into an agent, confirm the trigger, owner, review queue, fallback path, and escalation rules."
              href="/free-tools/agent-readiness-checker/"
              label="Check readiness"
            />
            <BriefCard
              title="Free tool action"
              body="Estimate whether automating this workflow is worth the tool spend, setup time, and review overhead."
              href="/free-tools/ai-workflow-roi-calculator/"
              label="Run calculator"
            />
            <BriefCard
              title="Automation OS template"
              body="Start with speed-to-lead if leads, enquiries, or booked calls are not getting a fast owner and next action."
              href="/automation-os/templates/speed-to-lead-ai-qualifier/"
              label="Open template"
            />
          </div>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Recent update notes</h2>
            <div className="mt-5 grid gap-4">
              {updates.map((update) => (
                <Link key={update.slug} href={`/updates/#${update.slug}`} className="rounded-md border border-line p-4 hover:border-brand">
                  <span className="text-sm font-semibold text-brand">{update.type.replaceAll("-", " ")}</span>
                  <span className="mt-1 block font-semibold text-ink">{update.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted">{update.summary}</span>
                </Link>
              ))}
            </div>
          </section>

          <NewsletterCTA />
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Daily return loop">
            The brief should stay short enough to read daily and useful enough to send readers into a calculator, prompt, workflow,
            or watchlist entry.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Latest updates", href: "/updates/", description: "Follow the changelog." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Step-by-step recipes." },
              { title: "Buying Guides", href: "/buying-guides/", description: "Software decisions with rollout checks." },
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Guardrailed agent workflows." },
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Buyer-ready AI stack plans." },
              { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." },
              { title: "Topic clusters", href: "/topics/", description: "Explore the authority pages." },
              { title: "Free tools", href: "/free-tools/", description: "Use calculators and generators." }
            ]}
          />
        </aside>
      </section>
    </>
  );
}

function BriefCard({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <article className="rounded-md border border-line bg-white p-5">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
      <Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
