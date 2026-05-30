import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { agentPlaybookLinks } from "@/lib/agent-playbooks";
import { getTool } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getStackBlueprint, stackBlueprints } from "@/lib/stack-blueprints";
import { workflowRecipeLinks } from "@/lib/workflow-library";

export function generateStaticParams() {
  return stackBlueprints.map((blueprint) => ({ slug: blueprint.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const blueprint = getStackBlueprint(slug);
  if (!blueprint) return {};
  return pageMetadata({
    title: blueprint.title,
    description: `${blueprint.summary} Includes stack layers, rollout steps, risk notes, upgrade triggers, recipes, and agent playbooks.`,
    path: `/stack-blueprints/${blueprint.slug}/`
  });
}

export default async function StackBlueprintPage({ params }: RouteProps) {
  const { slug } = await params;
  const blueprint = getStackBlueprint(slug);
  if (!blueprint) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stack Blueprints", href: "/stack-blueprints/" },
    { name: blueprint.title, href: `/stack-blueprints/${blueprint.slug}/` }
  ];
  const recipeLinks = workflowRecipeLinks(blueprint.relatedWorkflowRecipeSlugs);
  const playbookLinks = agentPlaybookLinks(blueprint.relatedAgentPlaybookSlugs);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: blueprint.title, description: blueprint.summary, path: `/stack-blueprints/${blueprint.slug}/` })} />
      <PageHero eyebrow={blueprint.audience} title={blueprint.title} description={blueprint.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Primary workflow">{blueprint.primaryWorkflow}</VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Stack layers</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {blueprint.stackLayers.map((layer) => (
                <article key={layer.name} className="rounded-md bg-panel p-4">
                  <h3 className="font-semibold text-ink">{layer.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{layer.purpose}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {layer.toolSlugs.map((toolSlug) => {
                      const tool = getTool(toolSlug);
                      return <Badge key={toolSlug}>{tool?.name ?? toolSlug.replaceAll("-", " ")}</Badge>;
                    })}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{layer.setupNote}</p>
                </article>
              ))}
            </div>
          </section>
          <Panel title="Rollout steps" items={blueprint.rolloutSteps} ordered />
          <Panel title="Risk notes" items={blueprint.riskNotes} />
          <Panel title="Upgrade triggers" items={blueprint.upgradeTriggers} />
          <RelatedPages
            links={[
              ...recipeLinks,
              ...playbookLinks,
              { title: "Run the Stack Gap Analyzer", href: "/free-tools/stack-gap-analyzer/", description: "Check missing layers, overlap, and risk." },
              { title: "Related free tool", href: `/free-tools/${blueprint.relatedFreeToolSlug}/`, description: "Use the next practical calculator or generator." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <section className="rounded-md border border-line bg-white p-5">
            <h2 className="font-semibold text-ink">Blueprint fit</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{blueprint.budgetTier}</Badge>
              <Badge>{blueprint.maturityLevel}</Badge>
              <Badge>{blueprint.stackLayers.length} layers</Badge>
            </div>
          </section>
          <RelatedPages
            links={[
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Browse more stack plans." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Open related recipes." },
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Add guarded agents." }
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
