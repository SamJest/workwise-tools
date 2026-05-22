import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, FAQBlock, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { currentYear, pageMetadata } from "@/lib/seo";
import { getTrade, tradeCities, tradeDescription, tradeFaqs, tradePageTitle, tradePages, tradePluralLabel } from "@/lib/trade-pages";

export function generateStaticParams() {
  return tradePages.map((trade) => ({ trade: trade.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ trade: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { trade: tradeSlug } = await params;
  const trade = getTrade(tradeSlug);
  if (!trade) return {};

  return pageMetadata({
    title: `${tradePageTitle(trade)} (${currentYear()})`,
    description: tradeDescription(trade),
    path: `/trades/${trade.slug}/`,
    type: "article"
  });
}

export default async function TradePage({ params }: RouteProps) {
  const { trade: tradeSlug } = await params;
  const trade = getTrade(tradeSlug);
  if (!trade) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Trades", href: "/trades/" },
    { name: trade.name, href: `/trades/${trade.slug}/` }
  ];
  const faqs = tradeFaqs(trade);
  const cityLinks = tradeCities.map((city) => ({
    name: `${tradePluralLabel(trade)} in ${city.name}`,
    href: `/trades/${trade.slug}/${city.slug}/`,
    description: `${tradeDescription(trade, city)} ${city.region} context.`
  }));
  const related = cityLinks.slice(0, 8).map((link) => ({
    title: link.name,
    href: link.href,
    description: link.description
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({
        title: `${tradePageTitle(trade)} (${currentYear()})`,
        description: tradeDescription(trade),
        path: `/trades/${trade.slug}/`
      })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={itemListJsonLd(cityLinks, `${trade.name} local Workwise guides`)} />
      <PageHero
        eyebrow="Trade software guide"
        title={`${tradePageTitle(trade)} in ${currentYear()}`}
        description={tradeDescription(trade)}
      >
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="https://app.workwise.tools" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Create free account
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href={`/trades/${trade.slug}/london/`} className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            London guide
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>
            Workwise is strongest for {trade.audience} that need a light operating system for estimates, jobs, customer records,
            photos, documents, reminders, and invoice handoff without enterprise field-service overhead.
          </VerdictBox>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Where Workwise helps {trade.plural}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <List title="Common jobs" items={trade.primaryJobs} />
              <List title="Admin pressure" items={trade.paperworkPain} />
              <List title="Workflow wins" items={trade.workflowWins} />
            </div>
          </section>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">A simple job workflow</h2>
            <ol className="mt-5 space-y-4">
              {[
                `Create the customer record and capture the enquiry details before quoting the ${trade.primaryJobs[0]} work.`,
                "Build the estimate with clear line items, notes, and any customer assumptions that affect price.",
                "Convert accepted work into a job, then keep photos, documents, and progress notes attached.",
                "When the work is complete, move the job toward invoicing and accounting without re-keying the details."
              ].map((step, index) => (
                <li key={step} className="rounded-md bg-panel p-4">
                  <p className="font-semibold text-ink">{index + 1}. {step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Supplier and compliance notes</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="font-semibold text-ink">Useful supplier context</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {trade.supplierExamples.map((supplier) => (
                    <li key={supplier} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                      <span>{supplier}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-ink">Keep specialist records separate</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {trade.complianceNotes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <RelatedPages links={related} />
          <FAQBlock faqs={faqs} />
        </div>

        <aside className="space-y-5">
          <div className="rounded-md border border-line bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Best fit</p>
            <p className="mt-2 text-lg font-bold text-ink">{trade.audience}</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Start with estimates and job notes, then add photos, reminders, and accounting sync once the workflow is settled.
            </p>
          </div>
          <div className="rounded-md border border-line bg-white p-5">
            <p className="font-semibold text-ink">Popular local guides</p>
            <div className="mt-4 space-y-2">
              {tradeCities.slice(0, 6).map((city) => (
                <Link key={city.slug} href={`/trades/${trade.slug}/${city.slug}/`} className="block rounded-md border border-line p-3 text-sm font-semibold text-ink hover:border-brand">
                  {tradePluralLabel(trade)} in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
