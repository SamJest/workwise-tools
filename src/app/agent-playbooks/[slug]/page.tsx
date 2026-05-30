import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { agentPlaybooks, getAgentPlaybook } from "@/lib/agent-playbooks";
import { getTool } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { workflowRecipeLinks } from "@/lib/workflow-library";

export function generateStaticParams() {
  return agentPlaybooks.map((playbook) => ({ slug: playbook.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const playbook = getAgentPlaybook(slug);
  if (!playbook) return {};
  return pageMetadata({
    title: playbook.title,
    description: `${playbook.summary} Includes setup steps, guardrails, handoff rules, failure modes, privacy notes, and a related free tool.`,
    path: `/agent-playbooks/${playbook.slug}/`
  });
}

export default async function AgentPlaybookPage({ params }: RouteProps) {
  const { slug } = await params;
  const playbook = getAgentPlaybook(slug);
  if (!playbook) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Agent Playbooks", href: "/agent-playbooks/" },
    { name: playbook.title, href: `/agent-playbooks/${playbook.slug}/` }
  ];
  const toolLinks = playbook.relatedToolSlugs
    .map((toolSlug) => getTool(toolSlug))
    .filter(Boolean)
    .map((tool) => ({ title: tool!.name, href: `/ai-tools/${tool!.slug}/`, description: tool!.summary }));
  const recipeLinks = workflowRecipeLinks(playbook.relatedWorkflowRecipeSlugs);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: playbook.title, description: playbook.summary, path: `/agent-playbooks/${playbook.slug}/` })} />
      <PageHero eyebrow={playbook.agentType} title={playbook.title} description={playbook.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Job to be done">{playbook.jobToBeDone}</VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Playbook snapshot</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{playbook.audience}</Badge>
              <Badge>{playbook.humanOwner}</Badge>
              {playbook.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted"><strong className="text-ink">Trigger:</strong> {playbook.trigger}</p>
          </section>
          <Panel title="Setup steps" items={playbook.setupSteps} ordered />
          <Panel title="Guardrails" items={playbook.guardrails} />
          <Panel title="Handoff rules" items={playbook.handoffRules} />
          <Panel title="Failure modes" items={playbook.failureModes} />
          <Panel title="Privacy notes" items={playbook.privacyNotes} />
          <RelatedPages
            links={[
              ...recipeLinks,
              ...toolLinks.slice(0, 4),
              { title: "Run the Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Score trigger, data, review, and fallback readiness." },
              { title: "Related free tool", href: `/free-tools/${playbook.relatedFreeToolSlug}/`, description: "Use the next practical calculator or generator." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Daily review">{playbook.dailyReview}</VerdictBox>
          <RelatedPages
            links={[
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Browse more agent workflows." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Open related step-by-step recipes." },
              { title: "Automation OS", href: "/automation-os/", description: "Templates and calculators." }
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

function Panel({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <List className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => <li key={item} className="rounded-md bg-panel p-3">{item}</li>)}
      </List>
    </section>
  );
}
