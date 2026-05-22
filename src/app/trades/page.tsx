import Link from "next/link";
import { ArrowRight, Camera, FileText, MapPinned, ReceiptText, Users } from "lucide-react";
import { Breadcrumbs, FAQBlock, PageHero, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { tradeCities, tradeDescription, tradePages } from "@/lib/trade-pages";

export const metadata = pageMetadata({
  title: "Job Management Software for UK Tradespeople",
  description: "Explore Workwise job management guides for plumbers, electricians, builders, gas engineers, carpenters, decorators, roofers, and landscapers.",
  path: "/trades/"
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Trades", href: "/trades/" }
];

const faqs = [
  {
    question: "Which trades can use Workwise?",
    answer: "Workwise is built for UK tradespeople who need estimates, job records, customers, photos, documents, and invoicing handoff in one place."
  },
  {
    question: "Is Workwise only for large trade businesses?",
    answer: "No. The strongest fit is sole traders, owner-operators, and small teams that want less admin without adopting a heavy field-service system."
  },
  {
    question: "Can Workwise help with local trade jobs?",
    answer: "Yes. The city guides cover local admin pressure such as repeat visits, access notes, parking, supplier runs, and quote follow-up."
  }
];

export default function TradesIndexPage() {
  const itemLinks = tradePages.map((trade) => ({
    name: tradePageLabel(trade.name),
    href: `/trades/${trade.slug}/`,
    description: tradeDescription(trade)
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({
        title: "Job Management Software for UK Tradespeople",
        description: "Trade-specific Workwise guides for estimates, jobs, customers, photos, documents, reminders, and invoices.",
        path: "/trades/"
      })} />
      <JsonLd data={itemListJsonLd(itemLinks, "Workwise trade guides")} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Trade guides"
        title="Job management software for UK tradespeople"
        description="Long-tail guides for trades that need faster estimating, cleaner customer records, site photos, job notes, reminders, and easier invoicing handoff."
      >
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/trades/plumbers/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Start with plumbers
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/trades/electricians/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Electrician guide
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <VerdictBox title="Growth focus">
          These pages target searchers who already know the job they need help with: estimating, job tracking, customer records,
          photos, invoicing, and local trade admin. That intent is much closer to signup than generic productivity traffic.
        </VerdictBox>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tradePages.map((trade) => (
              <Link key={trade.slug} href={`/trades/${trade.slug}/`} className="rounded-md border border-line bg-white p-5 shadow-sm hover:border-brand">
                <p className="text-sm font-semibold text-brand">{trade.audience}</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{tradePageLabel(trade.name)}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{tradeDescription(trade)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trade.primaryJobs.slice(0, 3).map((job) => (
                    <span key={job} className="rounded-md border border-line bg-panel px-2 py-1 text-xs font-medium text-muted">
                      {job}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <Feature icon={<FileText />} title="Estimates" text="Create cleaner quotes before the customer cools off." />
        <Feature icon={<Users />} title="Customers" text="Keep details, history, and open quotes in one record." />
        <Feature icon={<Camera />} title="Photos" text="Attach survey, progress, and completion photos to the job." />
        <Feature icon={<ReceiptText />} title="Invoices" text="Push completed work toward Xero or QuickBooks without retyping." />
        <Feature icon={<MapPinned />} title="Local jobs" text="Plan repeat visits, access notes, and follow-up by area." />
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">City pages</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Local trade software guides</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              The first city layer covers high-volume UK areas where tradespeople face different access, scheduling, supplier, and customer follow-up pressures.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {tradeCities.map((city) => (
              <Link key={city.slug} href={`/trades/plumbers/${city.slug}/`} className="rounded-md border border-line bg-white p-4 text-sm font-semibold text-ink hover:border-brand">
                Plumbers in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <FAQBlock faqs={faqs} />
      </section>
    </>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="h-5 w-5 text-brand">{icon}</div>
      <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

function tradePageLabel(name: string) {
  return `${name} job management`;
}
