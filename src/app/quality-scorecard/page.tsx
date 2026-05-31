import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, MethodologyBox, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WorkWise Content Quality Scorecard",
  description: "The WorkWise quality scorecard for useful AI and SaaS pages: evidence, workflow fit, pricing caution, privacy risk, links, and return value.",
  path: "/quality-scorecard/"
});

const scorecard = [
  {
    title: "Workflow usefulness",
    body: "The page should help a reader complete or improve a repeatable business workflow.",
    checks: ["Clear job to be done", "Setup or rollout steps", "Failure modes or red flags"]
  },
  {
    title: "Evidence and freshness",
    body: "Recommendations should separate verified source notes from assumptions and refresh targets.",
    checks: ["Source URLs", "Last checked date", "What changed or needs verification"]
  },
  {
    title: "Buying clarity",
    body: "Commercial pages should make trade-offs visible before pushing readers toward a vendor.",
    checks: ["Pricing reality", "Not-best-for guidance", "Alternative path"]
  },
  {
    title: "Risk controls",
    body: "AI workflows should name privacy, data, review, and customer-facing risks.",
    checks: ["Data sensitivity", "Human review step", "Fallback or escalation"]
  },
  {
    title: "Internal journey",
    body: "A page should move readers into a related tool, workflow, checklist, comparison, or daily habit.",
    checks: ["At least 3 internal links", "Related free tool", "Return reason"]
  },
  {
    title: "Ad-friendly experience",
    body: "Pages should earn display ad revenue by being useful, readable, and trustworthy.",
    checks: ["Strong above-the-fold answer", "No thin filler", "Clear disclosure"]
  }
];

export default function QualityScorecardPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Quality Scorecard", href: "/quality-scorecard/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "WorkWise Content Quality Scorecard",
          description: "Quality standards for AI and SaaS workflow pages.",
          path: "/quality-scorecard/"
        })}
      />
      <PageHero
        eyebrow="Quality system"
        title="The scorecard behind stronger WorkWise pages"
        description="A practical editorial checklist for building pages that can rank, help readers make better software decisions, and give them a reason to return."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/buying-guides/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Open buying guides
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/how-we-review-ai-tools/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Review method
            </Link>
            <Link href="/editorial-policy/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Editorial policy
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Quality rule">
            Expansion only helps if every new page has a clear workflow reason, internal journey, evidence posture, and practical
            return action. This scorecard keeps future growth from becoming thin directory sprawl.
          </VerdictBox>
          <section className="grid gap-4 md:grid-cols-2">
            {scorecard.map((item) => (
              <article key={item.title} className="rounded-md border border-line bg-white p-6">
                <h2 className="text-2xl font-bold text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted">
                  {item.checks.map((check) => (
                    <li key={check} className="rounded-md bg-panel p-3">{check}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
          <MethodologyBox>
            <p>
              The automated quality report now includes buying-guide profiles in addition to the existing tool, profession,
              country, comparison, alternative, workflow, prompt, and template checks.
            </p>
          </MethodologyBox>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again">
            Use this scorecard before publishing new clusters, refreshing pages in positions 8-30, or adding display ad placements.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Buying guides", href: "/buying-guides/", description: "Commercial pages with pricing and rollout checks." },
              { title: "How we review AI tools", href: "/how-we-review-ai-tools/", description: "Tool review framework." },
              { title: "Editorial policy", href: "/editorial-policy/", description: "Disclosure and source standards." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "Return loop for readers." }
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
