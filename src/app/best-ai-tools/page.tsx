import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AffiliateDisclosure,
  Breadcrumbs,
  ComparisonTable,
  DisplayAdSlot,
  MethodologyBox,
  PageHero,
  PublisherTrustPanel,
  RelatedPages,
  ToolGrid,
  VerdictBox,
  WorkflowKitCard
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listCategories, listProfessions, listTools } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { getUseCasePages } from "@/lib/use-cases";
import { workflowKits } from "@/lib/workflow-kits";
import type { Tool } from "@/types/content";

export const metadata = pageMetadata({
  title: "Best AI Tools for Small Business Workflows",
  description: "A workflow-first guide to the best AI tools for US and UK small businesses, with shortlists by use case, team, setup effort, and privacy risk.",
  path: "/best-ai-tools/"
});

export default async function BestAiToolsPage() {
  const [tools, categories, professions] = await Promise.all([listTools(), listCategories(), listProfessions()]);
  const useCases = getUseCasePages(tools);
  const shortlistedTools = [...tools].sort((a, b) => scoreTool(b) - scoreTool(a) || a.name.localeCompare(b.name)).slice(0, 9);
  const decisionTools = shortlistedTools.slice(0, 6);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Best AI tools", href: "/best-ai-tools/" }
  ];
  const related = [
    { title: "AI tool categories", href: "/categories/", description: "Browse by workflow category." },
    { title: "AI tool use cases", href: "/use-cases/", description: "Compare tools by recurring task." },
    { title: "Workflow kits", href: "/workflow-kits/", description: "Open complete topic clusters." },
    { title: "Free AI stack builder", href: "/free-tools/ai-stack-builder/", description: "Generate a practical starter stack." }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "Best AI Tools for Small Business Workflows",
          description: "Workflow-first AI tool recommendations for small businesses.",
          path: "/best-ai-tools/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          shortlistedTools.map((tool) => ({ name: tool.name, href: `/ai-tools/${tool.slug}/`, description: tool.summary })),
          "Best AI tools for small business workflows"
        )}
      />
      <PageHero
        eyebrow="Best AI tools"
        title="Best AI tools for small business workflows"
        description="A practical shortlist for US and UK small teams that need better workflows, not another giant list of tools with no implementation path."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/free-tools/ai-stack-builder/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Build a starter stack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/workflow-kits/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Browse workflow kits
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Editorial verdict">
            The best AI tool is usually the one that fits a repeated workflow, has a realistic setup path, and does not create
            extra review or privacy work for the team. WorkWise starts with workflow kits, then narrows tools by use case.
          </VerdictBox>

          <section>
            <SectionHeader
              eyebrow="Start here"
              title="Best AI tool stacks by workflow"
              description="These clusters are the strongest entry points because each one connects role guidance, workflows, comparisons, alternatives, prompts, free tools, and country context."
            />
            <div className="grid gap-5 xl:grid-cols-2">
              {workflowKits.map((kit) => (
                <WorkflowKitCard key={kit.slug} kit={kit} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Shortlist"
              title="Tools worth comparing first"
              description="This is a structured shortlist, not a hands-on ranking claim. Exact pricing and feature claims stay conservative until records are verified."
            />
            <ComparisonTable tools={decisionTools} />
          </section>

          <section>
            <SectionHeader
              eyebrow="Explore"
              title="Popular ways to narrow the choice"
              description="Move from broad intent to a page that answers the exact decision a reader is trying to make."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <RouteCard title="By profession" href="/professions/" count={professions.length} description="Best tools for sales teams, agencies, consultants, ecommerce sellers, and more." />
              <RouteCard title="By category" href="/categories/" count={categories.length} description="Workflow categories such as CRM, SEO, meeting notes, customer support, and automation." />
              <RouteCard title="By use case" href="/use-cases/" count={useCases.length} description="Recurring jobs such as meeting notes, email marketing, cold email, and project management." />
            </div>
          </section>

          <ToolGrid tools={shortlistedTools} />
          <PublisherTrustPanel />
          <MethodologyBox>
            <p>
              Tools are prioritised by structured evidence: source-linked records, pricing-page availability, workflow relevance,
              use-case breadth, profession fit, category coverage, setup difficulty, privacy risk, and freshness fields.
            </p>
          </MethodologyBox>
          <RelatedPages links={related} />
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Best tools guide ad slot" />
          <VerdictBox title="Refresh cycle">
            Search Console impressions should decide the next edits: improve pages with impressions first, then publish new pages
            only when a real query pattern appears.
          </VerdictBox>
        </aside>
      </section>
    </>
  );
}

function scoreTool(tool: Tool) {
  return [
    tool.sourceUrls.length ? 3 : 0,
    tool.pricingPageUrl ? 3 : 0,
    tool.lastVerifiedAt ? 2 : 0,
    tool.freePlanAvailable ? 1 : 0,
    tool.trialAvailable ? 1 : 0,
    Math.min(tool.professions.length, 5),
    Math.min(tool.useCases.length, 5),
    Math.min(tool.categories.length, 3)
  ].reduce((total, score) => total + score, 0);
}

function RouteCard({ title, href, count, description }: { title: string; href: string; count: number; description: string }) {
  return (
    <Link href={href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm font-semibold text-brand">{count} live hubs</p>
      <h2 className="mt-2 text-xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </Link>
  );
}
