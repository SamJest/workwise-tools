import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, MethodologyBox, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crawl Quality Review for WorkWise",
  description: "A crawl-quality checklist for WorkWise: live sitemap coverage, duplicate URL checks, status sampling, canonical domain checks, and internal-link audits.",
  path: "/crawl-quality/"
});

const findings = [
  {
    title: "Canonical host",
    body: "The live apex domain redirects to the www host, and the www homepage returns 200.",
    checks: ["https://workwisetools.com/ -> https://www.workwisetools.com/", "Homepage status 200", "Vercel prerender cache active"]
  },
  {
    title: "Sitemap coverage",
    body: "The public sitemap exposes the new buying guides, quality scorecard, topic pages, free tools, and workflow libraries.",
    checks: ["Buying guides indexed", "Quality scorecard indexed", "Workflow and topic families present"]
  },
  {
    title: "Duplicate URL cleanup",
    body: "The live crawl found duplicate trade URLs in the sitemap. The sitemap generator now uses the route registry once instead of appending trade URLs twice.",
    checks: ["Trade routes deduped", "Registry remains source of truth", "Future SEO audit catches internal references"]
  },
  {
    title: "Status sampling",
    body: "Sampled live pages returned 200 for buying guides, reporting topics, local trade pages, and free tools.",
    checks: ["Buying guide page 200", "Topic page 200", "Free tool page 200"]
  }
];

const routine = [
  "Fetch the public sitemap and compare total URLs with unique URLs.",
  "Sample one URL from each major route family after every deployment.",
  "Check apex-to-www redirect behavior and sitemap host consistency.",
  "Run local SEO audit and content-quality audit before pushing.",
  "Log crawl findings in the updates page when they change site quality."
];

export default function CrawlQualityPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Crawl Quality", href: "/crawl-quality/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "Crawl Quality Review for WorkWise",
          description: "Live crawl checks and sitemap quality standards for WorkWise.",
          path: "/crawl-quality/"
        })}
      />
      <PageHero
        eyebrow="Crawl quality"
        title="Live crawl checks for cleaner search expansion"
        description="A practical review page for sitemap coverage, duplicate URL checks, live status sampling, canonical host behavior, and the next crawl-quality fixes."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/quality-scorecard/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Open quality scorecard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/updates/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Latest updates
            </Link>
            <Link href="/buying-guides/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Buying guides
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Live crawl finding">
            The public site is deployed and serving the latest growth surfaces. The main issue found was duplicated trade-family
            URLs in the sitemap, now fixed by removing the duplicate append path from sitemap generation.
          </VerdictBox>
          <section className="grid gap-4 md:grid-cols-2">
            {findings.map((finding) => (
              <article key={finding.title} className="rounded-md border border-line bg-white p-6">
                <h2 className="text-2xl font-bold text-ink">{finding.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{finding.body}</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted">
                  {finding.checks.map((check) => (
                    <li key={check} className="rounded-md bg-panel p-3">{check}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Repeat crawl routine</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {routine.map((item) => (
                <li key={item} className="rounded-md bg-panel p-3">{item}</li>
              ))}
            </ol>
          </section>
          <MethodologyBox>
            <p>
              Crawl quality is checked separately from page quality because a strong page can still waste search visibility if
              sitemaps duplicate URLs, internal links drift, or deployed paths are missing from the public build.
            </p>
          </MethodologyBox>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again">
            Re-run this review after each deployment and after large route-family expansions.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Quality scorecard", href: "/quality-scorecard/", description: "Editorial page-quality standards." },
              { title: "Updates", href: "/updates/", description: "Log crawl and quality changes." },
              { title: "Sitemap", href: "/sitemap.xml", description: "Public sitemap for search engines." },
              { title: "Robots", href: "/robots.txt", description: "Public crawler instructions." }
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
