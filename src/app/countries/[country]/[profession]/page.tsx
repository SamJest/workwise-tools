import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  DataFreshnessNotice,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  RelatedPages,
  SearchIntentPanel,
  ToolGrid,
  VerdictBox,
  WorkflowSteps
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { buildProfessionFaqs, professionWorkflowSuggestion } from "@/lib/content-engine";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import {
  findCountry,
  findProfession,
  listPromptTemplates,
  listWorkflows,
  relatedLinks,
  toolsForProfession
} from "@/lib/repository";
import { priorityCountryProfessionPairs } from "@/lib/route-registry";
import { getCountryProfessionIntentBrief } from "@/lib/search-intent";
import { currentYear, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return priorityCountryProfessionPairs.map((pair) => ({ country: pair.country, profession: pair.profession }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ country: string; profession: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { country: countrySlug, profession: professionSlug } = await params;
  const [country, profession] = await Promise.all([findCountry(countrySlug), findProfession(professionSlug)]);
  if (!country || !profession) return {};
  const intentBrief = getCountryProfessionIntentBrief(country, profession);

  return pageMetadata({
    title: `${profession.name} AI Tools in ${country.name}`,
    description:
      intentBrief?.description ??
      `Compare AI tools for ${profession.name.toLowerCase()} in ${country.name}, with ${country.currency} context, terminology, privacy notes, and workflow fit.`,
    path: `/countries/${country.slug}/${profession.slug}/`
  });
}

export default async function CountryProfessionPage({ params }: RouteProps) {
  const { country: countrySlug, profession: professionSlug } = await params;
  const [country, profession] = await Promise.all([findCountry(countrySlug), findProfession(professionSlug)]);
  if (!country || !profession) notFound();

  const [allProfessionTools, workflows, prompts, baseRelated] = await Promise.all([
    toolsForProfession(profession.slug),
    listWorkflows(),
    listPromptTemplates(),
    relatedLinks({ profession })
  ]);
  const tools = allProfessionTools.filter((tool) => tool.countries.includes(country.slug));
  const workflow = professionWorkflowSuggestion(profession, workflows);
  const intentBrief = getCountryProfessionIntentBrief(country, profession);
  const faqs = [
    ...buildProfessionFaqs(profession, tools),
    ...(intentBrief?.faqs ?? []),
    {
      question: `What should ${profession.name.toLowerCase()} in ${country.name} check before using AI tools?`,
      answer: `Check ${country.currency} billing, local terminology such as ${country.terminologyNotes.join(", ")}, regional availability, and privacy requirements. ${country.privacyNotes.join(" ")}`
    }
  ];
  const promptLinks = prompts
    .filter((prompt) => prompt.profession === profession.slug)
    .map((prompt) => ({ title: prompt.title, href: `/prompts/${prompt.slug}/`, description: prompt.task }));
  const related = [
    ...(intentBrief?.links ?? []),
    { title: `${country.name} AI tools`, href: `/countries/${country.slug}/`, description: `${country.currency} and privacy context.` },
    { title: `${profession.name} guide`, href: `/professions/${profession.slug}/`, description: "Full profession-level tool shortlist." },
    ...promptLinks,
    ...baseRelated
  ];
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries/" },
    { name: country.name, href: `/countries/${country.slug}/` },
    { name: profession.name, href: `/countries/${country.slug}/${profession.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Country and profession guide"
        title={`${profession.name} AI Tools in ${country.name} (${currentYear()})`}
        description={`A localised workflow guide for ${profession.name.toLowerCase()} using ${country.currency} context, terminology, privacy notes, and country-aware tool fit.`}
      >
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>
            Use this page when the reader needs local context, not just a generic profession guide. Keep vendor claims conservative until
            availability and pricing are checked for {country.name}.
          </VerdictBox>
          <SearchIntentPanel brief={intentBrief} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Local fit notes</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <LocalMetric label="Currency" value={country.currency} />
              <LocalMetric label="Terminology" value={country.terminologyNotes.slice(0, 3).join(", ")} />
              <LocalMetric label="Matching tools" value={tools.length.toString()} />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">{country.privacyNotes.join(" ")}</p>
          </section>
          <ToolGrid tools={tools} />
          <ComparisonTable tools={tools} />
          <WorkflowSteps workflow={workflow} />
          <RelatedPages links={related} />
          <FAQBlock faqs={faqs} />
          <MethodologyBox>
            <p>
              Country-profession pages are generated only for priority US and UK clusters where local terminology, privacy,
              currency, or business context can improve the reader&apos;s decision.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <DataFreshnessNotice date={new Date().toISOString()} />
          <LastUpdated date={new Date().toISOString()} />
        </aside>
      </section>
    </>
  );
}

function LocalMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
