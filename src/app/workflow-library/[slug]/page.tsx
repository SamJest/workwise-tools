import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getAutomationTemplate } from "@/lib/automation-os";
import { getTool } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getWorkflowRecipe, workflowRecipes } from "@/lib/workflow-library";

export function generateStaticParams() {
  return workflowRecipes.map((recipe) => ({ slug: recipe.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const recipe = getWorkflowRecipe(slug);
  if (!recipe) return {};
  return pageMetadata({
    title: recipe.title,
    description: `${recipe.summary} Includes trigger, setup steps, review checks, failure modes, privacy notes, and a related free tool.`,
    path: `/workflow-library/${recipe.slug}/`
  });
}

export default async function WorkflowRecipePage({ params }: RouteProps) {
  const { slug } = await params;
  const recipe = getWorkflowRecipe(slug);
  if (!recipe) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflow Library", href: "/workflow-library/" },
    { name: recipe.title, href: `/workflow-library/${recipe.slug}/` }
  ];
  const toolLinks = recipe.relatedToolSlugs
    .map((toolSlug) => getTool(toolSlug))
    .filter(Boolean)
    .map((tool) => ({ title: tool!.name, href: `/ai-tools/${tool!.slug}/`, description: tool!.summary }));
  const templateLinks = recipe.relatedAutomationTemplateSlugs
    .map((templateSlug) => getAutomationTemplate(templateSlug))
    .filter(Boolean)
    .map((template) => ({ title: template!.title, href: `/automation-os/templates/${template!.slug}/`, description: template!.trigger }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: recipe.title, description: recipe.summary, path: `/workflow-library/${recipe.slug}/` })} />
      <PageHero eyebrow={recipe.workflowType} title={recipe.title} description={recipe.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Outcome">{recipe.outcome}</VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Recipe snapshot</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{recipe.audience}</Badge>
              <Badge>{recipe.setupTime}</Badge>
              <Badge>{recipe.difficulty} difficulty</Badge>
              <Badge>{recipe.riskLevel} risk</Badge>
              {recipe.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted"><strong className="text-ink">Trigger:</strong> {recipe.trigger}</p>
          </section>
          <Panel title="Inputs" items={recipe.inputs} />
          <Panel title="Setup steps" items={recipe.steps} ordered />
          <Panel title="Prompts to reuse" items={recipe.prompts} />
          <Panel title="Review checks" items={recipe.reviewChecks} />
          <Panel title="Failure modes" items={recipe.failureModes} />
          <Panel title="Privacy notes" items={recipe.privacyNotes} />
          <RelatedPages
            links={[
              ...toolLinks.slice(0, 4),
              ...templateLinks.slice(0, 2),
              { title: "Run the related free tool", href: `/free-tools/${recipe.relatedFreeToolSlug}/`, description: "Turn this recipe into a practical output." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Browse more workflow recipes." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Daily habit">{recipe.dailyHabit}</VerdictBox>
          <RelatedPages
            links={[
              { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Find another recipe by team or tool." },
              { title: "Workflow readiness checklist", href: "/workflow-library/checklists/workflow-readiness/", description: "Check the workflow before automation." },
              { title: "Automation QA checklist", href: "/workflow-library/checklists/automation-qa/", description: "Test before launch." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one workflow task tomorrow." }
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
