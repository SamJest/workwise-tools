import Link from "next/link";
import { Breadcrumbs, MethodologyBox, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { latestUpdates } from "@/lib/updates";

export const metadata = pageMetadata({
  title: "Latest AI Workflow Updates",
  description: "Fresh WorkWise notes on AI workflow clusters, tool watchlists, pricing checks, and new practical guides.",
  path: "/updates/"
});

export default function UpdatesPage() {
  const updates = latestUpdates();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Updates", href: "/updates/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "Latest AI Workflow Updates",
          description: "WorkWise update log for workflow clusters and tool watchlists.",
          path: "/updates/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          updates.map((update) => ({ name: update.title, href: `/updates/#${update.slug}`, description: update.summary })),
          "Latest AI workflow updates"
        )}
      />
      <PageHero
        eyebrow="Latest updates"
        title="What changed in the workflow stack"
        description="A lightweight update log for new guides, priority cluster changes, tool-watch notes, and daily workflow ideas."
      >
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-5">
          {updates.map((update) => (
            <article key={update.slug} id={update.slug} className="scroll-mt-24 rounded-md border border-line bg-white p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand">{update.type.replaceAll("-", " ")}</p>
                  <h2 className="mt-2 text-2xl font-bold text-ink">{update.title}</h2>
                </div>
                <time className="text-sm text-muted" dateTime={update.publishedAt}>
                  {new Date(update.publishedAt).toLocaleDateString("en-GB")}
                </time>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{update.summary}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <MetaList label="Tools" items={update.affectedTools} />
                <MetaList label="Clusters" items={update.affectedClusters} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {update.sourceUrls.map((href) => (
                  <Link key={href} href={href} className="text-sm font-semibold text-brand">
                    Source or related page
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Why return?">
            This page should become the live pulse of the site: new workflow ideas, new topic pages, pricing checks, and tools
            that need re-review before stronger recommendations are made.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Today's practical workflow idea." },
              { title: "Buying guides", href: "/buying-guides/", description: "High-intent software decision pages." },
              { title: "Topic clusters", href: "/topics/", description: "CRM, automation, marketing, finance, recruiting, reporting, compliance, and retention." },
              { title: "AI workflow ROI calculator", href: "/free-tools/ai-workflow-roi-calculator/", description: "Estimate the value of a workflow." }
            ]}
          />
          <MethodologyBox>
            <p>
              Updates are editorial notes, not vendor announcements. Pricing or feature claims still need source checks before
              they become strong recommendations.
            </p>
          </MethodologyBox>
        </aside>
      </section>
    </>
  );
}

function MetaList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-md bg-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink">{items.join(", ")}</p>
    </div>
  );
}
