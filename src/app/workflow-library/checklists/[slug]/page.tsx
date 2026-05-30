import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getWorkflowChecklist, workflowChecklists, workflowRecipeLinks } from "@/lib/workflow-library";

export function generateStaticParams() {
  return workflowChecklists.map((checklist) => ({ slug: checklist.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const checklist = getWorkflowChecklist(slug);
  if (!checklist) return {};
  return pageMetadata({ title: checklist.title, description: checklist.summary, path: `/workflow-library/checklists/${checklist.slug}/` });
}

export default async function WorkflowChecklistPage({ params }: RouteProps) {
  const { slug } = await params;
  const checklist = getWorkflowChecklist(slug);
  if (!checklist) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflow Library", href: "/workflow-library/" },
    { name: checklist.title, href: `/workflow-library/checklists/${checklist.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: checklist.title, description: checklist.summary, path: `/workflow-library/checklists/${checklist.slug}/` })} />
      <PageHero eyebrow={checklist.checklistType} title={checklist.title} description={checklist.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title={checklist.audience}>
            Use this checklist before publishing, migrating, or expanding a workflow. The goal is fewer brittle automations and cleaner daily habits.
          </VerdictBox>
          <Panel title="Checklist steps" items={checklist.steps} ordered />
          <Panel title="Review questions" items={checklist.reviewQuestions} />
          <RelatedPages
            links={[
              ...workflowRecipeLinks(checklist.relatedRecipeSlugs),
              { title: "Run the related free tool", href: `/free-tools/${checklist.relatedFreeToolSlug}/`, description: "Generate the next practical output." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Browse recipes and collections." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <section className="rounded-md border border-line bg-white p-5">
            <h2 className="font-semibold text-ink">Checklist type</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{checklist.checklistType}</Badge>
              <Badge>{checklist.steps.length} steps</Badge>
              <Badge>{checklist.reviewQuestions.length} review questions</Badge>
            </div>
          </section>
          <RelatedPages
            links={[
              { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Choose another workflow." },
              { title: "Automation OS", href: "/automation-os/", description: "Templates and audits." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return tomorrow." }
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
