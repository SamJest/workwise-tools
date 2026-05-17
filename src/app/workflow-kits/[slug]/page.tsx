import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  DataFreshnessNotice,
  DisplayAdSlot,
  FAQBlock,
  LastUpdated,
  MethodologyBox,
  PageHero,
  PublisherTrustPanel,
  RelatedPages,
  ToolGrid,
  VerdictBox,
  WorkflowSteps
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import {
  comparisonTools,
  findCountry,
  findComparison,
  findProfession,
  findWorkflow,
  listPromptTemplates,
  toolsForProfession
} from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { getWorkflowKit, kitLinks, type WorkflowKit, workflowKits } from "@/lib/workflow-kits";
import type { Tool } from "@/types/content";

export function generateStaticParams() {
  return workflowKits.map((kit) => ({ slug: kit.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const kit = getWorkflowKit(slug);
  if (!kit) return {};

  return pageMetadata({
    title: kit.title,
    description: kit.summary,
    path: `/workflow-kits/${kit.slug}/`
  });
}

export default async function WorkflowKitPage({ params }: RouteProps) {
  const { slug } = await params;
  const kit = getWorkflowKit(slug);
  if (!kit) notFound();

  const [profession, workflow, tools, prompts, countries] = await Promise.all([
    findProfession(kit.professionSlug),
    findWorkflow(kit.workflowSlug),
    toolsForProfession(kit.professionSlug),
    listPromptTemplates(),
    Promise.all(kit.countrySlugs.map((countrySlug) => findCountry(countrySlug)))
  ]);

  if (!profession || !workflow) notFound();

  const promptLinks = prompts
    .filter((prompt) => kit.promptSlugs.includes(prompt.slug))
    .map((prompt) => ({ title: prompt.title, href: `/prompts/${prompt.slug}/`, description: prompt.task }));

  const comparisons = (
    await Promise.all(
      kit.comparisonSlugs.map(async (comparisonSlug) => {
        const comparison = await findComparison(comparisonSlug);
        if (!comparison) return { comparisonSlug, tools: [] };
        const [toolA, toolB] = await comparisonTools(comparison);
        return { comparisonSlug, tools: [toolA, toolB].filter((tool): tool is Tool => Boolean(tool)) };
      })
    )
  ).filter((row) => row.tools.length);

  const related = [...kitLinks(kit), ...promptLinks];
  const countryLinks = countries.filter(Boolean).map((country) => ({
    title: `${profession.name} AI tools in ${country!.name}`,
    href: `/countries/${country!.slug}/${profession.slug}/`,
    description: `${country!.currency} context, terminology, and privacy notes.`
  }));
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflow kits", href: "/workflow-kits/" },
    { name: kit.title, href: `/workflow-kits/${kit.slug}/` }
  ];
  const faqs = buildKitFaqs(kit);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={articleJsonLd({ title: kit.title, description: kit.summary, path: `/workflow-kits/${kit.slug}/` })} />
      <JsonLd data={itemListJsonLd(related.map((link) => ({ name: link.title, href: link.href, description: link.description })), kit.title)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Workflow kit" title={kit.title} description={kit.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Recommended path">
            Start with the workflow, shortlist tools that match the team and privacy needs, then use comparisons and alternatives
            to avoid buying a tool that only solves one part of the process.
          </VerdictBox>
          <KitEditorialOverview kit={kit} />
          <WorkflowSteps workflow={workflow} />
          <ToolGrid tools={tools.slice(0, 9)} />
          {comparisons.map(({ comparisonSlug, tools: comparisonTools }) => (
            <section key={comparisonSlug} className="rounded-md border border-line bg-white p-6">
              <h2 className="text-2xl font-bold capitalize text-ink">{comparisonSlug.replaceAll("-", " ")}</h2>
              <div className="mt-5">
                <ComparisonTable tools={comparisonTools} />
              </div>
            </section>
          ))}
          <KitImplementationSections kit={kit} />
          <RelatedPages links={[...countryLinks, ...related]} />
          <PublisherTrustPanel />
          <MethodologyBox>
            <p>
              Workflow kits are built as topic clusters. Each kit includes a role hub, workflow, supporting tools,
              comparisons, alternatives, prompt/template assets, free utilities, country-specific context, and a refresh path
              for improving pages once Search Console data appears.
            </p>
          </MethodologyBox>
          <FAQBlock faqs={faqs} />
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Workflow kit ad slot" />
          <AuthorBox />
          <DataFreshnessNotice date={new Date().toISOString()} />
          <LastUpdated date={new Date().toISOString()} />
        </aside>
      </section>
    </>
  );
}

function KitEditorialOverview({ kit }: { kit: WorkflowKit }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Who this kit is for</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {kit.bestFor.map((item) => (
          <div key={item} className="rounded-md bg-panel p-4">
            <p className="text-sm leading-6 text-muted">{item}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-8 text-2xl font-bold text-ink">What this workflow should produce</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {kit.outcomes.map((item) => (
          <div key={item} className="rounded-md border border-line p-4">
            <p className="text-sm leading-6 text-muted">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KitImplementationSections({ kit }: { kit: WorkflowKit }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <KitList title="Implementation checklist" items={kit.implementationChecklist} />
      <KitList title="Mistakes to avoid" items={kit.commonMistakes} />
      <KitList title="Editorial notes" items={kit.editorialNotes} wide />
    </section>
  );
}

function KitList({ title, items, wide = false }: { title: string; items: string[]; wide?: boolean }) {
  return (
    <div className={`rounded-md border border-line bg-white p-6 ${wide ? "lg:col-span-2" : ""}`}>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-panel p-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildKitFaqs(kit: WorkflowKit) {
  return [
    {
      question: `Who should use the ${kit.title}?`,
      answer: kit.bestFor.join(" ")
    },
    {
      question: "What should I set up first?",
      answer: kit.implementationChecklist[0] || "Start by mapping the workflow before choosing tools."
    },
    {
      question: "What is the biggest risk with this workflow?",
      answer: kit.commonMistakes[0] || "The biggest risk is buying tools before the workflow and review process are clear."
    },
    {
      question: "How should this kit be improved over time?",
      answer: "Use Search Console impressions, tool pricing updates, new vendor source URLs, and reader questions to refresh the workflow, comparison, alternatives, and prompt sections."
    }
  ];
}
