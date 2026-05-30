import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ComparisonTable,
  DataFreshnessNotice,
  DecisionGuide,
  DisplayAdSlot,
  FAQBlock,
  MethodologyBox,
  PageHero,
  RelatedPages,
  SearchIntentPanel,
  ToolGrid,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listTools, relatedLinks } from "@/lib/repository";
import { getUseCaseIntentBrief } from "@/lib/search-intent";
import { pageMetadata, truncateDescription } from "@/lib/seo";
import { findUseCasePage, getUseCasePages, type UseCasePage } from "@/lib/use-cases";
import { workflowRecipes } from "@/lib/workflow-library";

export async function generateStaticParams() {
  const tools = await listTools();
  return getUseCasePages(tools).map((useCase) => ({ slug: useCase.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const tools = await listTools();
  const useCase = findUseCasePage(tools, slug);
  if (!useCase) return {};
  const intentBrief = getUseCaseIntentBrief(useCase.slug);

  return pageMetadata({
    title: `${useCase.label} AI Tools`,
    description: truncateDescription(
      intentBrief?.description ??
        `Compare AI and SaaS tools for ${useCase.label.toLowerCase()} by setup effort, privacy risk, free-plan limits, and workflow fit.`,
      155
    ),
    path: `/use-cases/${useCase.slug}/`
  });
}

export default async function UseCasePage({ params }: RouteProps) {
  const { slug } = await params;
  const allTools = await listTools();
  const useCase = findUseCasePage(allTools, slug);
  if (!useCase) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Use cases", href: "/use-cases/" },
    { name: useCase.label, href: `/use-cases/${useCase.slug}/` }
  ];
  const intentBrief = getUseCaseIntentBrief(useCase.slug);
  const faqs = [...buildUseCaseFaqs(useCase), ...(intentBrief?.faqs ?? [])];
  const links = await relatedLinks({ tool: useCase.tools[0], limit: 8 });
  const helperLinks = [
    { title: "Workflow Library", href: "/workflow-library/", description: "Find step-by-step recipes tied to this kind of work." },
    { title: "Build an AI stack", href: "/free-tools/ai-stack-builder/", description: "Turn this use case into a practical tool shortlist." },
    { title: "Estimate workflow ROI", href: "/free-tools/ai-workflow-roi-calculator/", description: "Check whether the workflow is worth automating." },
    { title: "Software buying checklist", href: "/free-tools/software-buying-checklist-generator/", description: "Create a buying checklist before choosing a vendor." }
  ];
  const recipeLinks = workflowRecipes
    .filter((recipe) => recipe.workflowType.toLowerCase().includes(useCase.label.toLowerCase()) || useCase.tools.some((tool) => recipe.relatedToolSlugs.includes(tool.slug)))
    .slice(0, 4)
    .map((recipe) => ({ title: recipe.title, href: `/workflow-library/${recipe.slug}/`, description: recipe.summary }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: `${useCase.label} AI Tools`,
          description: `Compare tools for ${useCase.label.toLowerCase()}.`,
          path: `/use-cases/${useCase.slug}/`
        })}
      />
      <JsonLd data={itemListJsonLd(useCase.tools.map((tool) => ({ name: tool.name, href: `/ai-tools/${tool.slug}/`, description: tool.summary })), `${useCase.label} tools`)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Use-case hub"
        title={`${useCase.label} AI tools`}
        description={`Compare tools that support ${useCase.label.toLowerCase()} without relying on a generic "best tools" list.`}
      >
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Shortlist approach">
            Pick a tool for the whole workflow, not just the feature label. Check how it fits your team size, current stack,
            privacy expectations, and how often the task repeats.
          </VerdictBox>
          <SearchIntentPanel brief={intentBrief} />
          <ComparisonTable tools={useCase.tools} />
          <DecisionGuide tools={useCase.tools.slice(0, 6)} />
          <ToolGrid tools={useCase.tools} />
          <RelatedPages links={[...recipeLinks, ...(intentBrief?.links ?? []), ...helperLinks, ...links]} />
          <MethodologyBox>
            <p>
              Use-case hubs are only published when at least two structured tool records support the same task.
              This keeps the page comparative and prevents one-tool tag pages from entering the index.
            </p>
          </MethodologyBox>
          <FAQBlock faqs={faqs} />
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Use-case page ad slot" />
          <AuthorBox />
          <DataFreshnessNotice date={mostRecentDate(useCase.tools.map((tool) => tool.lastVerifiedAt || tool.lastCheckedAt))} />
        </aside>
      </section>
    </>
  );
}

function buildUseCaseFaqs(useCase: UseCasePage) {
  const lower = useCase.label.toLowerCase();
  return [
    {
      question: `What is the best AI tool for ${lower}?`,
      answer: "There is no single default winner. The best choice depends on your workflow, team size, integrations, privacy expectations, and whether the free plan is usable for your volume."
    },
    {
      question: `Should I use a specialist tool or a broader platform for ${lower}?`,
      answer: "Use a specialist when the task is important and repeated often. Use a broader platform when you mainly need a lightweight feature inside an existing workflow."
    },
    {
      question: `How does WorkWise choose tools for ${lower}?`,
      answer: "Tools are included when their structured use-case, profession, category, pricing, verification, and workflow fields make them relevant enough to compare."
    }
  ];
}

function mostRecentDate(values: Array<string | null | undefined>) {
  const dates = values.filter(Boolean).map((value) => new Date(value as string).getTime());
  if (!dates.length) return null;
  return new Date(Math.max(...dates)).toISOString();
}
