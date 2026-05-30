import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  BestForGrid,
  Breadcrumbs,
  ContentQualityPanel,
  DataFreshnessNotice,
  DemoDataNotice,
  DisplayAdSlot,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  PricingSummary,
  ProsCons,
  NotBestForBlock,
  QualityWarning,
  RelatedPages,
  SearchIntentPanel,
  ToolVerificationPanel,
  VendorCtaCard,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getTools } from "@/lib/data";
import { buildToolFaqs, buildToolProfile } from "@/lib/content-engine";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, softwareJsonLd } from "@/lib/jsonld";
import { getPageQualityScore } from "@/lib/quality";
import { findTool, relatedLinks } from "@/lib/repository";
import { getToolIntentBrief } from "@/lib/search-intent";
import { currentYear, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const tool = await findTool(slug);
  if (!tool) return {};
  const related = await relatedLinks({ tool });
  const intentBrief = getToolIntentBrief(tool.slug);
  const quality = getPageQualityScore({
    matchingTools: [tool],
    valueBlocks: ["verdict", "pros-cons", "related-links", "pricing-summary", "faqs"],
    intro: tool.summary,
    internalLinks: related,
    lastUpdated: tool.lastCheckedAt,
    hasAuthor: true
  });

  return pageMetadata({
    title: intentBrief ? `${tool.name} Use Cases and Review (${currentYear()})` : `${tool.name} Review and Use Cases (${currentYear()})`,
    description: intentBrief?.description ?? tool.summary,
    path: `/ai-tools/${tool.slug}/`,
    quality
  });
}

export default async function ToolDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const tool = await findTool(slug);
  if (!tool) notFound();

  const related = await relatedLinks({ tool });
  const faqs = buildToolFaqs(tool);
  const profile = buildToolProfile(tool, related);
  const quality = profile.quality;
  const intentBrief = getToolIntentBrief(tool.slug);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "AI tools", href: "/ai-tools/" },
    { name: tool.name, href: `/ai-tools/${tool.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={softwareJsonLd(tool)} />
      <JsonLd data={productJsonLd(tool)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Tool guide" title={tool.name} description={tool.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <DemoDataNotice />
          <QualityWarning quality={quality} />
          <ContentQualityPanel profile={profile} />
          <VerdictBox>
            {tool.name} is currently tagged for {tool.bestFor.slice(0, 3).join(", ")}. Treat this as a structured starter
            recommendation until pricing and feature claims are verified.
          </VerdictBox>
          <DataFreshnessNotice date={tool.lastCheckedAt} />
          <SearchIntentPanel brief={intentBrief} />
          <ToolVerificationPanel tool={tool} />
          <ProsCons pros={tool.pros} cons={tool.cons} />
          <BestForGrid items={tool.bestFor} />
          <NotBestForBlock items={tool.notBestFor} />
          <PricingSummary tool={tool} />
          <FAQBlock faqs={faqs} />
          <RelatedPages links={[...(intentBrief?.links ?? []), ...related]} />
          <MethodologyBox />
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <VendorCtaCard tool={tool} />
          <DisplayAdSlot label="Tool guide ad slot" />
          <AuthorBox />
          <LastUpdated date={tool.lastCheckedAt} />
        </aside>
      </section>
    </>
  );
}
