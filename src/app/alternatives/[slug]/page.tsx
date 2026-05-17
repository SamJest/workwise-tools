import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  ContentQualityPanel,
  DataFreshnessNotice,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  RelatedPages,
  ToolGrid,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getAlternativeSets } from "@/lib/data";
import { buildAlternativeProfile } from "@/lib/content-engine";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { findAlternativeSet, findTool, relatedLinks, toolsBySlugs } from "@/lib/repository";
import { currentYear, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAlternativeSets().map((set) => ({ slug: set.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const set = await findAlternativeSet(slug);
  if (!set) return {};
  return pageMetadata({
    title: `${set.baseToolName} Alternatives (${currentYear()})`,
    description: set.reason || `Compare ${set.baseToolName} alternatives by pricing, features, and practical use case.`,
    path: `/alternatives/${set.slug}/`
  });
}

export default async function AlternativesPage({ params }: RouteProps) {
  const { slug } = await params;
  const set = await findAlternativeSet(slug);
  if (!set) notFound();
  const baseTool = await findTool(set.baseToolSlug);
  const candidates = await toolsBySlugs(set.candidateSlugs);
  const related = baseTool ? await relatedLinks({ tool: baseTool }) : [];
  const profile = buildAlternativeProfile(set, candidates, related);
  const faqs = [
    {
      question: `Why look for ${set.baseToolName} alternatives?`,
      answer: set.reason || "Common reasons include pricing, workflow fit, feature depth, regional availability, or team adoption needs."
    },
    {
      question: "How should alternatives be evaluated?",
      answer: "Compare pricing, free-plan limits, data handling, integrations, and whether each candidate solves the specific use case."
    }
  ];
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Alternatives", href: "/alternatives/" },
    { name: `${set.baseToolName} alternatives`, href: `/alternatives/${set.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Alternatives" title={`${set.baseToolName} Alternatives (${currentYear()})`} description={set.reason || "Compare practical alternatives and replacement options."}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>{set.finalVerdict || "Choose based on workflow fit, pricing, and verified feature needs."}</VerdictBox>
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={set.lastCheckedAt} />
          <ToolGrid tools={candidates} />
          <ComparisonTable tools={candidates} />
          <section className="grid gap-4 md:grid-cols-2">
            <Choice title="Best free option" value={set.bestFreeOption || "Verify from candidates"} />
            <Choice title="Best business option" value={set.bestBusinessOption || "Verify from candidates"} />
          </section>
          <RelatedPages links={related} />
          <FAQBlock faqs={faqs} />
          <MethodologyBox>
            <p>
              Alternatives pages are built for switching intent. Candidate tools are selected from structured alternative sets and
              should be re-ranked after hands-on checks and current pricing verification.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={set.lastCheckedAt} />
        </aside>
      </section>
    </>
  );
}

function Choice({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <p className="text-sm font-semibold text-brand">{title}</p>
      <p className="mt-2 text-xl font-bold text-ink">{value}</p>
    </div>
  );
}
