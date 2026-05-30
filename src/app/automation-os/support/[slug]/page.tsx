import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { automationSupportPages, automationTemplateLinks, getAutomationSupportPage } from "@/lib/automation-os";
import { getTool } from "@/lib/data";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return automationSupportPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationSupportPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.summary, path: `/automation-os/support/${page.slug}/` });
}

export default async function AutomationSupportPage({ params }: RouteProps) {
  const { slug } = await params;
  const page = getAutomationSupportPage(slug);
  if (!page) notFound();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Automation OS", href: "/automation-os/" },
    { name: page.title, href: `/automation-os/support/${page.slug}/` }
  ];
  const toolLinks = page.tools
    .map((tool) => {
      const slug = tool.toLowerCase().replaceAll(" ", "-");
      const record = getTool(slug);
      return record
        ? { title: record.name, href: `/ai-tools/${record.slug}/`, description: "Open the related tool guide." }
        : null;
    })
    .filter((link): link is { title: string; href: string; description: string } => Boolean(link));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: page.title, description: page.summary, path: `/automation-os/support/${page.slug}/` })} />
      <PageHero eyebrow={page.kind} title={page.title} description={page.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Decision rule">
            Choose the tool that your team can maintain weekly. Automation power is less useful than clear ownership, visible errors, and a review step.
          </VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Tools in this decision</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
            </div>
          </section>
          <Panel title="Best for" items={page.bestFor} />
          <Panel title="Trade-offs" items={page.tradeoffs} />
          <RelatedPages
            links={[
              ...automationTemplateLinks(page.relatedTemplateSlugs),
              { title: "Run related free tool", href: `/free-tools/${page.relatedFreeToolSlug}/`, description: "Generate a decision or audit output." },
              { title: "Automation OS hub", href: "/automation-os/", description: "Back to the template library." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <RelatedPages
            links={toolLinks.slice(0, 4)}
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
