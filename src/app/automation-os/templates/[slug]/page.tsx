import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { automationTemplates, getAutomationTemplate } from "@/lib/automation-os";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return automationTemplates.map((template) => ({ slug: template.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const template = getAutomationTemplate(slug);
  if (!template) return {};
  return pageMetadata({
    title: template.title,
    description: `${template.trigger} Includes inputs, steps, tools, risk, review checks, failure modes, and a related free tool.`,
    path: `/automation-os/templates/${template.slug}/`
  });
}

export default async function AutomationTemplatePage({ params }: RouteProps) {
  const { slug } = await params;
  const template = getAutomationTemplate(slug);
  if (!template) notFound();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Automation OS", href: "/automation-os/" },
    { name: template.title, href: `/automation-os/templates/${template.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: template.title, description: template.trigger, path: `/automation-os/templates/${template.slug}/` })} />
      <PageHero eyebrow="Automation template" title={template.title} description={template.trigger}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Daily use case">{template.dailyUseCase}</VerdictBox>
          <Panel title="Inputs" items={template.inputs} />
          <Panel title="Workflow steps" items={template.steps} ordered />
          <Panel title="Failure modes to watch" items={template.failureModes} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Review and risk</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{template.riskLevel} risk</Badge>
              {template.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{template.reviewStep}</p>
          </section>
          <RelatedPages
            links={[
              ...template.relatedToolSlugs.slice(0, 4).map((slug) => ({ title: slug.replaceAll("-", " "), href: `/ai-tools/${slug}/`, description: "Related tool record." })),
              { title: "Run the related free tool", href: `/free-tools/${template.relatedFreeToolSlug}/`, description: "Turn this template into a practical output." },
              { title: "Automation OS hub", href: "/automation-os/", description: "Browse more templates and cleanup plays." }
            ]}
          />
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again tomorrow">Copy the related free-tool share link after filling it out so this workflow can become a repeatable operating habit.</VerdictBox>
          <RelatedPages links={[{ title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Find today's automation task." }]} />
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
