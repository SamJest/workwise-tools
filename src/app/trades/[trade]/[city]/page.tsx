import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, FAQBlock, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { currentYear, pageMetadata } from "@/lib/seo";
import {
  getTrade,
  getTradeCity,
  getTradeCityPairs,
  tradeCities,
  tradeDescription,
  tradeFaqs,
  tradePageTitle,
  tradePluralLabel,
  tradePages
} from "@/lib/trade-pages";

export function generateStaticParams() {
  return getTradeCityPairs();
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ trade: string; city: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { trade: tradeSlug, city: citySlug } = await params;
  const trade = getTrade(tradeSlug);
  const city = getTradeCity(citySlug);
  if (!trade || !city) return {};

  return pageMetadata({
    title: `${tradePageTitle(trade, city)} (${currentYear()})`,
    description: tradeDescription(trade, city),
    path: `/trades/${trade.slug}/${city.slug}/`,
    type: "article"
  });
}

export default async function TradeCityPage({ params }: RouteProps) {
  const { trade: tradeSlug, city: citySlug } = await params;
  const trade = getTrade(tradeSlug);
  const city = getTradeCity(citySlug);
  if (!trade || !city) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Trades", href: "/trades/" },
    { name: trade.name, href: `/trades/${trade.slug}/` },
    { name: city.name, href: `/trades/${trade.slug}/${city.slug}/` }
  ];
  const faqs = tradeFaqs(trade, city);
  const relatedTradeLinks = tradePages
    .filter((candidate) => candidate.slug !== trade.slug)
    .slice(0, 4)
    .map((candidate) => ({
      title: `${tradePluralLabel(candidate)} in ${city.name}`,
      href: `/trades/${candidate.slug}/${city.slug}/`,
      description: tradeDescription(candidate, city)
    }));
  const nearbyCityLinks = tradeCities
    .filter((candidate) => candidate.slug !== city.slug)
    .slice(0, 4)
    .map((candidate) => ({
      title: `${tradePluralLabel(trade)} in ${candidate.name}`,
      href: `/trades/${trade.slug}/${candidate.slug}/`,
      description: tradeDescription(trade, candidate)
    }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({
        title: `${tradePageTitle(trade, city)} (${currentYear()})`,
        description: tradeDescription(trade, city),
        path: `/trades/${trade.slug}/${city.slug}/`
      })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow={`${city.region} trade guide`}
        title={`${tradePageTitle(trade, city)} in ${currentYear()}`}
        description={tradeDescription(trade, city)}
      >
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="https://app.workwise.tools" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Create free account
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href={`/trades/${trade.slug}/`} className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            All {trade.plural}
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>
            {tradePluralLabel(trade)} in {city.name} need fast quote follow-up, tidy customer notes, and photos that stay attached to the job.
            Workwise keeps that admin close to the work so less of it gets pushed into evenings and weekends.
          </VerdictBox>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Why {city.name} changes the workflow</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {city.localTerms.map((term) => (
                <div key={term} className="rounded-md bg-panel p-4">
                  <p className="font-semibold capitalize text-ink">{term}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Add clear job notes so pricing, access, timing, and follow-up stay visible after the first visit.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Best Workwise setup for {trade.plural} in {city.name}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Checklist
                title="Before the visit"
                items={[
                  `Capture the enquiry, postcode, photos, and likely ${trade.primaryJobs[0]} scope.`,
                  "Save customer access details, parking notes, and preferred appointment windows.",
                  "Prepare estimate line items so common work can be quoted quickly."
                ]}
              />
              <Checklist
                title="After the job"
                items={[
                  "Attach completion photos and any customer approvals to the job record.",
                  "Update status so open estimates, active jobs, and finished work are easy to separate.",
                  "Move the completed job toward invoice draft or accounting sync."
                ]}
              />
            </div>
          </section>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Local search intent this page covers</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                `job management app for ${trade.plural} in ${city.name}`,
                `estimate app for ${trade.plural} ${city.name}`,
                `${trade.name.toLowerCase()} invoicing software ${city.name}`,
                `${trade.name.toLowerCase()} customer management app ${city.name}`
              ].map((query) => (
                <div key={query} className="rounded-md bg-panel p-4 text-sm font-semibold text-ink">{query}</div>
              ))}
            </div>
          </section>

          <RelatedPages links={[...nearbyCityLinks, ...relatedTradeLinks]} />
          <FAQBlock faqs={faqs} />
        </div>

        <aside className="space-y-5">
          <div className="rounded-md border border-line bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Local guide</p>
            <p className="mt-2 text-lg font-bold text-ink">{city.name}, {city.region}</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Focus on the local admin that makes jobs leak margin: repeat visits, access issues, material runs, quote follow-up, and missing photos.
            </p>
          </div>
          <div className="rounded-md border border-line bg-white p-5">
            <p className="font-semibold text-ink">Trade fit</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {trade.workflowWins.map((win) => (
                <li key={win} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-panel p-5">
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-brand" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
