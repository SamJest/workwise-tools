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
  ToolGrid,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listCategories, relatedLinks, toolsForCategory } from "@/lib/repository";
import { pageMetadata, truncateDescription } from "@/lib/seo";
import type { ToolCategory } from "@/types/content";

export async function generateStaticParams() {
  const categories = await listCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

async function loadCategory(slug: string) {
  const categories = await listCategories();
  return categories.find((category) => category.slug === slug);
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) return {};

  return pageMetadata({
    title: `${category.name} AI Tools`,
    description: truncateDescription(category.description || `Compare the best AI and SaaS tools for ${category.name.toLowerCase()} workflows.`, 155),
    path: `/categories/${category.slug}/`
  });
}

export default async function CategoryPage({ params }: RouteProps) {
  const { slug } = await params;
  const [category, tools] = await Promise.all([loadCategory(slug), toolsForCategory(slug)]);
  if (!category || !tools.length) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories/" },
    { name: category.name, href: `/categories/${category.slug}/` }
  ];
  const faqs = buildCategoryFaqs(category);
  const links = await relatedLinks({ tool: tools[0], limit: 8 });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: `${category.name} AI Tools`,
          description: category.description || `Compare tools for ${category.name.toLowerCase()} workflows.`,
          path: `/categories/${category.slug}/`
        })}
      />
      <JsonLd data={itemListJsonLd(tools.map((tool) => ({ name: tool.name, href: `/ai-tools/${tool.slug}/`, description: tool.summary })), `${category.name} tools`)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Category hub" title={`${category.name} AI tools`} description={category.description || `Compare tools for ${category.name.toLowerCase()} workflows.`}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Category verdict">
            Use this hub to shortlist tools by workflow fit first, then check setup difficulty, free-plan reality, privacy risk,
            and whether the tool has enough supporting evidence for your team.
          </VerdictBox>
          <ComparisonTable tools={tools} />
          <DecisionGuide tools={tools.slice(0, 6)} />
          <ToolGrid tools={tools} />
          <RelatedPages links={links} />
          <MethodologyBox>
            <p>
              Category hubs are built from structured tool fields, not vendor copy. Tools are grouped by workflow category,
              then reviewed against setup effort, use-case fit, source URLs, privacy notes, and supporting pages.
            </p>
          </MethodologyBox>
          <FAQBlock faqs={faqs} />
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Category page ad slot" />
          <AuthorBox />
          <DataFreshnessNotice date={mostRecentDate(tools.map((tool) => tool.lastVerifiedAt || tool.lastCheckedAt))} />
        </aside>
      </section>
    </>
  );
}

function buildCategoryFaqs(category: ToolCategory) {
  const lower = category.name.toLowerCase();
  return [
    {
      question: `How should I choose a ${lower} tool?`,
      answer: "Start with the workflow you need to improve, then compare setup effort, privacy risk, free-plan limits, integrations, and whether the tool supports the team using it every week."
    },
    {
      question: `Are all ${lower} tools suitable for small businesses?`,
      answer: "No. Some tools are better for solo operators, while others assume process maturity, admin time, integrations, or larger data volumes."
    },
    {
      question: "Why does WorkWise avoid exact pricing on some pages?",
      answer: "Pricing changes often. Exact prices should only be published when they have been checked against the vendor pricing page and a last-verified date is recorded."
    }
  ];
}

function mostRecentDate(values: Array<string | null | undefined>) {
  const dates = values.filter(Boolean).map((value) => new Date(value as string).getTime());
  if (!dates.length) return null;
  return new Date(Math.max(...dates)).toISOString();
}
