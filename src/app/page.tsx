import Link from "next/link";
import { ArrowRight, Database, FileSearch, GitCompare, ListChecks, Tags } from "lucide-react";
import { AffiliateDisclosure, DemoDataNotice, DisplayAdSlot, NewsletterCTA, PageHero, PublisherTrustPanel, ToolGrid, VerdictBox, WorkflowKitCard } from "@/components/Blocks";
import { SectionHeader } from "@/components/Shell";
import { freeTools } from "@/lib/free-tools";
import { listAlternativeSets, listCategories, listComparisons, listCountries, listProfessions, listTools, listWorkflows } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { tradeCities, tradePages } from "@/lib/trade-pages";
import { getUseCasePages } from "@/lib/use-cases";
import { workflowKits } from "@/lib/workflow-kits";

export const metadata = pageMetadata({
  title: "WorkWise Tools: Workflow Guides for Trades and Small Businesses",
  description: "Explore Workwise guides for UK tradespeople, job management, estimates, invoices, AI tools, workflows, prompts, templates, and free planners.",
  path: "/"
});

export default async function HomePage() {
  const [tools, categories, professions, countries, comparisons, alternatives, workflows] = await Promise.all([
    listTools(),
    listCategories(),
    listProfessions(),
    listCountries(),
    listComparisons(),
    listAlternativeSets(),
    listWorkflows()
  ]);
  const useCases = getUseCasePages(tools);

  return (
    <>
      <PageHero
        eyebrow="WorkWise Tools"
        title="Build cleaner workflows for the jobs you actually run."
        description="Trade-first Workwise guides for estimates, job tracking, customer records, photos, invoices, and practical software choices for small teams."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/trades/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Explore trade guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/ai-tools/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Browse tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/best-ai-tools/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Best AI tools
          </Link>
          <Link href="/free-tools/ai-tool-recommender/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Use recommender
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Stat icon={<ListChecks />} label="Trade pages" value={tradePages.length + tradePages.length * tradeCities.length} />
          <Stat icon={<Database />} label="Tools" value={tools.length} />
          <Stat icon={<Tags />} label="Categories" value={categories.length} />
          <Stat icon={<ListChecks />} label="Use cases" value={useCases.length} />
          <Stat icon={<FileSearch />} label="Professions" value={professions.length} />
          <Stat icon={<GitCompare />} label="Comparisons" value={comparisons.length} />
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trade search"
            title="Long-tail pages for tradespeople who are ready to solve admin"
            description="The new trade hub targets practical queries around estimates, job management, customer records, site photos, invoices, and local UK trade workflows."
            action={{ href: "/trades/", label: "View trade guides" }}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tradePages.slice(0, 8).map((trade) => (
              <Link key={trade.slug} href={`/trades/${trade.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                <p className="text-sm font-semibold text-brand">{trade.audience}</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{trade.name} job management</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Guides for {trade.primaryJobs.slice(0, 3).join(", ")}, estimates, job notes, customer records, and invoice handoff.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Workflow kits"
            title="Start with a complete workflow, not a giant tool dump"
            description="Each kit connects the profession hub, workflow guide, comparisons, alternatives, prompt/template page, and a free planner so the site builds topical authority around real work."
            action={{ href: "/workflow-kits/", label: "View workflow kits" }}
          />
          <div className="grid gap-5 xl:grid-cols-2">
            {workflowKits.slice(0, 4).map((kit) => (
              <WorkflowKitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PublisherTrustPanel />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Starter directory"
          title="Featured tools for smarter workflows"
          description="Seed tools are marked as demo content until pricing, availability, features, and affiliate details are verified."
          action={{ href: "/ai-tools/", label: "View all tools" }}
        />
        <ToolGrid tools={tools.slice(0, 6)} />
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Page families"
            title="Guides built around how people actually work"
            description="Each route family has a clean data model, internal links, metadata hooks, and quality checks for noindex decisions."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ClusterCard title="Profession pages" href="/professions/" count={professions.length} />
            <ClusterCard title="Category hubs" href="/categories/" count={categories.length} />
            <ClusterCard title="Use-case hubs" href="/use-cases/" count={useCases.length} />
            <ClusterCard title="Country guides" href="/countries/" count={countries.length} />
            <ClusterCard title="Alternatives" href="/alternatives/" count={alternatives.length} />
            <ClusterCard title="Comparisons" href="/comparisons/" count={comparisons.length} />
            <ClusterCard title="Workflow pages" href="/workflows/" count={workflows.length} />
            <ClusterCard title="Free tools" href="/free-tools/" count={freeTools.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <VerdictBox>
          The MVP is intentionally data-first: content comes from seed JSON today, while Prisma/PostgreSQL is ready for production data
          entry, validation, freshness reporting, and admin workflows.
        </VerdictBox>
        <div className="space-y-4">
          <DisplayAdSlot label="Homepage display ad slot" />
          <DemoDataNotice />
          <AffiliateDisclosure />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="h-5 w-5 text-brand">{icon}</div>
      <p className="mt-4 text-3xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function ClusterCard({ title, href, count }: { title: string; href: string; count: number }) {
  return (
    <Link href={href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm font-semibold text-brand">{count} starter pages</p>
      <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm text-muted">Open the route family and grow it from structured data.</p>
    </Link>
  );
}
