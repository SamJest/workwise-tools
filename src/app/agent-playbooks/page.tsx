import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { agentPlaybooks } from "@/lib/agent-playbooks";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Agent Playbooks for Small Business",
  description: "Practical AI agent playbooks with triggers, owners, guardrails, handoff rules, privacy notes, and related workflow recipes.",
  path: "/agent-playbooks/"
});

export default function AgentPlaybooksPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Agent Playbooks", href: "/agent-playbooks/" }
  ];
  const agentTypes = Array.from(new Set(agentPlaybooks.map((playbook) => playbook.agentType)));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: "AI Agent Playbooks", description: "Guardrailed AI agent playbooks for small-business workflows.", path: "/agent-playbooks/" })} />
      <JsonLd data={itemListJsonLd(agentPlaybooks.map((playbook) => ({ name: playbook.title, href: `/agent-playbooks/${playbook.slug}/`, description: playbook.summary })), "AI Agent Playbooks")} />
      <PageHero
        eyebrow="AI Agent Playbooks"
        title="Agent workflows with owners, guardrails, and human handoffs"
        description="Use these playbooks when a workflow needs an AI assistant, but the business still needs review, privacy control, and a clear owner for failures."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/agent-playbooks/speed-to-lead-agent/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Start with speed-to-lead
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/free-tools/agent-readiness-checker/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Check agent readiness
            </Link>
            <Link href="/workflow-library/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Browse recipes
            </Link>
            <Link href="/stack-blueprints/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Stack blueprints
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Agent rule">
            Do not ship an agent unless it has a reliable trigger, a named human owner, a review queue, escalation rules, and a manual fallback.
          </VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Browse by agent type</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {agentTypes.map((type) => <Badge key={type}>{type}</Badge>)}
            </div>
          </section>
          <section>
            <SectionHeader
              eyebrow="Playbooks"
              title="AI agent ideas tied to practical workflow pages"
              description="Every playbook links into workflow recipes, related tools, and the free checker so traffic can move from curiosity to implementation."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {agentPlaybooks.map((playbook) => (
                <Link key={playbook.slug} href={`/agent-playbooks/${playbook.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{playbook.agentType}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{playbook.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{playbook.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{playbook.audience}</Badge>
                    <Badge>{playbook.humanOwner}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again tomorrow">
            Pick one playbook, run the readiness checker, then return through the daily brief to review failed handoffs.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Check trigger, data, review, and fallback readiness." },
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Choose the stack around the agent." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Step-by-step recipes." },
              { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one task tomorrow." }
            ]}
          />
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </>
  );
}
