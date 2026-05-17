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
  QualityWarning,
  RelatedPages,
  ToolGrid,
  UseCaseWinnerTable,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getCountries } from "@/lib/data";
import { bestUseCaseRows, buildCountryFaqs, buildCountryProfile, countryProfessionLinks } from "@/lib/content-engine";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { findCountry, listProfessions, relatedLinks, toolsForCountry } from "@/lib/repository";
import { currentYear, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCountries().map((country) => ({ country: country.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { country: countrySlug } = await params;
  const country = await findCountry(countrySlug);
  if (!country) return {};
  const tools = await toolsForCountry(country.slug);
  const related = await relatedLinks({ country });
  const profile = buildCountryProfile(country, tools, related);
  const quality = profile.quality;
  return pageMetadata({
    title: `Best AI Tools for Small Businesses in ${country.name} in ${currentYear()}`,
    description: `Compare AI tools for businesses in ${country.name}, including ${country.currency} pricing context, terminology, and privacy notes.`,
    path: `/countries/${country.slug}/`,
    quality
  });
}

export default async function CountryPage({ params }: RouteProps) {
  const { country: countrySlug } = await params;
  const country = await findCountry(countrySlug);
  if (!country) notFound();
  const [tools, professions, baseRelated] = await Promise.all([
    toolsForCountry(country.slug),
    listProfessions(),
    relatedLinks({ country })
  ]);
  const related = [...countryProfessionLinks(country, professions), ...baseRelated];
  const useCaseRows = bestUseCaseRows(tools);
  const faqs = buildCountryFaqs(country, tools);
  const profile = buildCountryProfile(country, tools, related);
  const quality = profile.quality;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries/" },
    { name: country.name, href: `/countries/${country.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Country guide" title={`Best AI Tools for Small Businesses in ${country.name} in ${currentYear()}`} description={`Compare tools with ${country.currency} pricing context, local terminology, and privacy considerations.`}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <QualityWarning quality={quality} />
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={new Date().toISOString()} />
          <VerdictBox>Start with tools that support common small-business workflows, then verify regional availability and data-processing terms.</VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Local notes</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Currency: {country.currency}. Region: {country.region || "not specified"}.</p>
            <p className="mt-3 text-sm leading-6 text-muted">Terminology: {country.terminologyNotes.join(", ")}.</p>
            <p className="mt-3 text-sm leading-6 text-muted">Privacy: {country.privacyNotes.join(" ")}</p>
          </section>
          <ToolGrid tools={tools} />
          <ComparisonTable tools={tools} />
          <UseCaseWinnerTable rows={useCaseRows} />
          <RelatedPages links={related} />
          <FAQBlock faqs={faqs} />
          <MethodologyBox>
            <p>
              Country guides combine regional terminology, currency context, privacy notes, matching tools, and related profession
              routes. Publish only after checking regional vendor availability.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={new Date().toISOString()} />
        </aside>
      </section>
    </>
  );
}
