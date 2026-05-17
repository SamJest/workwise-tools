import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  ContentQualityPanel,
  DataFreshnessNotice,
  DecisionGuide,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  PricingSummary,
  ProsCons,
  RelatedPages,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getComparisons } from "@/lib/data";
import { buildComparisonProfile } from "@/lib/content-engine";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { comparisonTools, findComparison, relatedLinks } from "@/lib/repository";
import { currentYear, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getComparisons().map((comparison) => ({ slug: comparison.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const comparison = await findComparison(slug);
  if (!comparison) return {};
  const [toolA, toolB] = await comparisonTools(comparison);
  return pageMetadata({
    title: `${toolA?.name} vs ${toolB?.name} for ${comparison.primaryUseCase || "AI Workflows"}`,
    description: comparison.summaryVerdict,
    path: `/comparisons/${comparison.slug}/`
  });
}

export default async function ComparisonPage({ params }: RouteProps) {
  const { slug } = await params;
  const comparison = await findComparison(slug);
  if (!comparison) notFound();
  const [toolA, toolB] = await comparisonTools(comparison);
  if (!toolA || !toolB) notFound();
  const tools = [toolA, toolB];
  const faqs = [
    {
      question: `Is ${toolA.name} or ${toolB.name} better?`,
      answer: comparison.summaryVerdict
    },
    {
      question: "Should pricing be verified?",
      answer: "Yes. Pricing and plan availability change frequently and should be checked before publishing."
    }
  ];
  const related = [...(await relatedLinks({ tool: toolA, limit: 4 })), ...(await relatedLinks({ tool: toolB, limit: 4 }))];
  const profile = buildComparisonProfile(comparison, tools, related);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Comparisons", href: "/comparisons/" },
    { name: `${toolA.name} vs ${toolB.name}`, href: `/comparisons/${comparison.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Comparison" title={`${toolA.name} vs ${toolB.name} (${currentYear()})`} description={comparison.summaryVerdict}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>{comparison.summaryVerdict}</VerdictBox>
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={comparison.lastCheckedAt} />
          <DecisionGuide tools={tools} />
          <ComparisonTable tools={tools} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Use-case winners</h2>
            <dl className="mt-4 grid gap-3 md:grid-cols-2">
              {Object.entries(comparison.winnerByUseCase || {}).map(([useCase, winner]) => (
                <div key={useCase} className="rounded-md bg-panel p-4">
                  <dt className="text-sm font-semibold capitalize text-ink">{useCase}</dt>
                  <dd className="mt-1 text-sm text-muted">{winner}</dd>
                </div>
              ))}
            </dl>
          </section>
          <div className="grid gap-6 md:grid-cols-2">
            <ProsCons pros={toolA.pros} cons={toolA.cons} />
            <ProsCons pros={toolB.pros} cons={toolB.cons} />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <PricingSummary tool={toolA} />
            <PricingSummary tool={toolB} />
          </div>
          <FAQBlock faqs={faqs} />
          <RelatedPages links={related} />
          <MethodologyBox>
            <p>
              Comparison pages combine summary verdicts, use-case winners, pricing flags, pros and cons, alternatives,
              and related profession pages. Pricing rows stay conservative until verified.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={comparison.lastCheckedAt} />
        </aside>
      </section>
    </>
  );
}
