import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  ContentQualityPanel,
  DataFreshnessNotice,
  DisplayAdSlot,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  QualityWarning,
  RelatedPages,
  ToolGrid,
  UseCaseWinnerTable,
  VerdictBox,
  WorkflowSteps
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getProfessions } from "@/lib/data";
import {
  bestUseCaseRows,
  buildProfessionFaqs,
  buildProfessionProfile,
  matchingPromptLinks,
  professionWorkflowSuggestion
} from "@/lib/content-engine";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getPageQualityScore } from "@/lib/quality";
import { findProfession, listPromptTemplates, listWorkflows, relatedLinks, toolsForProfession } from "@/lib/repository";
import { currentYear, pageMetadata } from "@/lib/seo";
import { workflowRecipes } from "@/lib/workflow-library";

export function generateStaticParams() {
  return getProfessions().map((profession) => ({ slug: profession.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const profession = await findProfession(slug);
  if (!profession) return {};
  const tools = await toolsForProfession(profession.slug);
  const related = await relatedLinks({ profession });
  const quality = getPageQualityScore({
    matchingTools: tools,
    valueBlocks: ["ranked-tools", "comparison-table", "profession-context", "faqs", "workflow", "use-case-winners"],
    intro: `Compare AI tools for ${profession.name}.`,
    internalLinks: related,
    lastUpdated: new Date().toISOString(),
    hasAuthor: true,
    requiresThreeTools: true
  });
  return pageMetadata({
    title: `AI Tools for ${profession.name} (${currentYear()})`,
    description: `Compare AI tools for ${profession.name.toLowerCase()} by use case, pricing model, pros, cons, workflows, and prompts.`,
    path: `/professions/${profession.slug}/`,
    quality
  });
}

export default async function ProfessionPage({ params }: RouteProps) {
  const { slug } = await params;
  const profession = await findProfession(slug);
  if (!profession) notFound();
  const [tools, workflows, prompts, baseRelated] = await Promise.all([
    toolsForProfession(profession.slug),
    listWorkflows(),
    listPromptTemplates(),
    relatedLinks({ profession })
  ]);
  const promptLinks = matchingPromptLinks(profession, prompts);
  const recipeLinks = workflowRecipes
    .filter((recipe) => recipe.professionSlug === profession.slug)
    .slice(0, 4)
    .map((recipe) => ({ title: recipe.title, href: `/workflow-library/${recipe.slug}/`, description: recipe.summary }));
  const related = [...recipeLinks, ...promptLinks, ...baseRelated];
  const workflow = professionWorkflowSuggestion(profession, workflows);
  const useCaseRows = bestUseCaseRows(tools);
  const profile = buildProfessionProfile(profession, tools, related);
  const quality = profile.quality;
  const faqs = buildProfessionFaqs(profession, tools);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Professions", href: "/professions/" },
    { name: profession.name, href: `/professions/${profession.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={articleJsonLd({ title: `Best AI Tools for ${profession.name}`, description: profession.painPoints.join(", "), path: `/professions/${profession.slug}/` })} />
      <PageHero eyebrow="Profession guide" title={`Best AI Tools for ${profession.name} in ${currentYear()}`} description={`Compare tools for ${profession.commonTasks.slice(0, 3).join(", ")} and related ${profession.name.toLowerCase()} workflows.`}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <QualityWarning quality={quality} />
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={new Date().toISOString()} />
          <VerdictBox>{tools[0]?.name || "The top tools"} should be checked first because the seed data links it to this profession and common tasks.</VerdictBox>
          <ToolGrid tools={tools} />
          <ComparisonTable tools={tools} />
          <UseCaseWinnerTable rows={useCaseRows} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Common tasks and pain points</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <List title="Pain points" items={profession.painPoints} />
              <List title="Common tasks" items={profession.commonTasks} />
            </div>
          </section>
          <WorkflowSteps workflow={workflow} />
          <RelatedPages links={related} />
          <FAQBlock faqs={faqs} />
          <MethodologyBox>
            <p>
              This guide weighs matching tools, profession task fit, pricing-model clarity, internal alternatives, prompt coverage,
              and whether the page has enough unique value blocks to be indexable.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Profession guide ad slot" />
          <AuthorBox />
          <LastUpdated date={new Date().toISOString()} />
        </aside>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
