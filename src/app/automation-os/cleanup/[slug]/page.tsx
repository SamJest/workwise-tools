import { notFound } from "next/navigation";
import { Breadcrumbs, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { automationCleanupPages, automationTemplateLinks, getAutomationCleanupPage } from "@/lib/automation-os";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return automationCleanupPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationCleanupPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.summary, path: `/automation-os/cleanup/${page.slug}/` });
}

export default async function AutomationCleanupPage({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationCleanupPage(slug);
  if (!page) notFound();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Automation OS", href: "/automation-os/" },
    { name: page.title, href: `/automation-os/cleanup/${page.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: page.title, description: page.summary, path: `/automation-os/cleanup/${page.slug}/` })} />
      <PageHero eyebrow="Workflow audit" title={page.title} description={page.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Symptom">{page.symptom}</VerdictBox>
          <Panel title="Diagnosis steps" items={page.diagnosisSteps} />
          <Panel title="Repair steps" items={page.repairSteps} />
          <RelatedPages links={automationTemplateLinks(page.relatedTemplateSlugs)} />
        </div>
        <aside className="space-y-5">
          <RelatedPages
            links={[
              { title: "Run related free tool", href: `/free-tools/${page.relatedFreeToolSlug}/`, description: "Generate an audit or ROI output." },
              { title: "Automation OS hub", href: "/automation-os/", description: "Return to the automation library." },
              { title: "Latest updates", href: "/updates/", description: "Track template and tool changes." }
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
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="rounded-md bg-panel p-3 text-sm leading-6 text-muted">
            <strong className="text-ink">{index + 1}.</strong> {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
