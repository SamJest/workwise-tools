import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, MethodologyBox, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { buyingGuides, getBuyingGuide } from "@/lib/buying-guides";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return buyingGuides.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.summary,
    path: `/buying-guides/${guide.slug}/`
  });
}

export default async function BuyingGuidePage({ params }: RouteProps) {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);
  if (!guide) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Buying Guides", href: "/buying-guides/" },
    { name: guide.title, href: `/buying-guides/${guide.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: guide.title, description: guide.summary, path: `/buying-guides/${guide.slug}/` })} />
      <PageHero eyebrow={guide.searchIntent} title={guide.title} description={guide.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Quick answer">{guide.quickAnswer}</VerdictBox>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Best for</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{guide.audience}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.bestFor.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">What to evaluate</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {guide.evaluationCriteria.map((criterion) => (
                <article key={criterion.title} className="rounded-md bg-panel p-4">
                  <h3 className="font-semibold text-ink">{criterion.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{criterion.body}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    {criterion.checks.map((check) => (
                      <li key={check} className="rounded-md bg-white p-2">{check}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <InfoPanel title="Pricing reality" body={guide.pricingReality} />
            <InfoPanel title="Privacy and data risk" body={guide.privacyRisk} />
          </section>

          <ListPanel title="Rollout plan" items={guide.rolloutPlan} ordered />
          <ListPanel title="Red flags" items={guide.redFlags} />
          <RelatedPages links={guide.related} />
          <MethodologyBox>
            <p>
              Buying guides are written for commercial investigation intent. They intentionally push readers toward a checklist,
              workflow recipe, calculator, or stack blueprint before recommending a paid commitment.
            </p>
          </MethodologyBox>
        </div>

        <aside className="space-y-5">
          <VerdictBox title="Use again">{guide.dailyReturn}</VerdictBox>
          <RelatedPages
            links={[
              { title: "All buying guides", href: "/buying-guides/", description: "Browse every software decision page." },
              { title: "Software Buying Checklist Generator", href: "/free-tools/software-buying-checklist-generator/", description: "Turn this guide into vendor questions." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return for one practical workflow action." }
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

function InfoPanel({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </section>
  );
}

function ListPanel({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
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
