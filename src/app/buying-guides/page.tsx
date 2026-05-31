import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { buyingGuides } from "@/lib/buying-guides";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Software Buying Guides for Small Business",
  description: "Workflow-first software buying guides for CRM, automation, AI writing, support, accounting, recruiting, reporting, scheduling, and more.",
  path: "/buying-guides/"
});

export default function BuyingGuidesPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Buying Guides", href: "/buying-guides/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "Software Buying Guides",
          description: "Workflow-first buying guides for small-business AI and SaaS decisions.",
          path: "/buying-guides/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          buyingGuides.map((guide) => ({ name: guide.title, href: `/buying-guides/${guide.slug}/`, description: guide.summary })),
          "Software buying guides"
        )}
      />
      <PageHero
        eyebrow="Buying guides"
        title="Buy software around the workflow, not the feature list"
        description="Commercial-intent software guides for small teams choosing CRM, automation, AI writing, support, accounting, recruiting, analytics, scheduling, forms, chatbots, and more."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/buying-guides/best-crm-for-small-business/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Start with CRM
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/free-tools/software-buying-checklist-generator/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Generate checklist
            </Link>
            <Link href="/stack-blueprints/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Open stack blueprints
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Buying rule">
            Every guide starts with the repeat workflow, then checks pricing, privacy, implementation effort, red flags, and the
            free tool or recipe that proves the decision before a paid plan.
          </VerdictBox>

          <section>
            <SectionHeader
              eyebrow={`${buyingGuides.length} guides`}
              title="High-intent software decisions"
              description="These pages are built for readers close to a purchase, but they still route into calculators, workflows, topic clusters, and updates."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {buyingGuides.map((guide) => (
                <Link key={guide.slug} href={`/buying-guides/${guide.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{guide.category}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{guide.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{guide.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{guide.searchIntent}</Badge>
                    <Badge>{guide.bestFor.length} fit checks</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Daily return hook">
            Use buying guides before trials, plan upgrades, renewals, and migrations. Each page points to a checklist or workflow
            readers can reuse when the vendor shortlist changes.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Software Buying Checklist Generator", href: "/free-tools/software-buying-checklist-generator/", description: "Generate vendor questions and red flags." },
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "See what belongs together." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Test the workflow before buying." },
              { title: "Latest updates", href: "/updates/", description: "Track new and refreshed guides." }
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
