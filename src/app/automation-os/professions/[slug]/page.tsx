import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { automationProfessionPages, automationTemplateLinks, getAutomationProfessionPage } from "@/lib/automation-os";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return automationProfessionPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationProfessionPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.summary, path: `/automation-os/professions/${page.slug}/` });
}

export default async function AutomationProfessionPage({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationProfessionPage(slug);
  if (!page) notFound();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Automation OS", href: "/automation-os/" },
    { name: page.title, href: `/automation-os/professions/${page.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: page.title, description: page.summary, path: `/automation-os/professions/${page.slug}/` })} />
      <PageHero eyebrow={page.audience} title={page.title} description={page.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Daily habit">{page.dailyHabit}</VerdictBox>
          <Panel title="Automation pains to solve first" items={page.painPoints} />
          <RelatedPages links={automationTemplateLinks(page.recommendedTemplates)} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Tools to compare</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.toolSlugs.map((tool) => <Badge key={tool}>{tool.replaceAll("-", " ")}</Badge>)}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <RelatedPages
            links={[
              { title: "Workflow audit generator", href: "/free-tools/workflow-audit-generator/", description: "Find weak points in this workflow." },
              { title: "Automation OS hub", href: "/automation-os/", description: "Browse all automation paths." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one daily task." }
            ]}
          />
        </aside>
      </section>
    </>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => <li key={item} className="rounded-md bg-panel p-3 text-sm leading-6 text-muted">{item}</li>)}
      </ul>
    </section>
  );
}
