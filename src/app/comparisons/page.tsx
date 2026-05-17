import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { comparisonTools, listComparisons } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Tool Comparisons",
  description: "Compare AI and SaaS tools side by side by use case, pricing notes, strengths, and workflow fit.",
  path: "/comparisons/"
});

export default async function ComparisonsPage() {
  const comparisons = await listComparisons();
  const rows = await Promise.all(
    comparisons.map(async (comparison) => ({
      comparison,
      tools: await comparisonTools(comparison)
    }))
  );

  return (
    <>
      <PageHero eyebrow="Comparisons" title="AI tool comparisons" description="Side-by-side comparison pages for tools users search together." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {rows.map(({ comparison, tools }) => {
          const [toolA, toolB] = tools;
          return (
            <Link key={comparison.slug} href={`/comparisons/${comparison.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
              <p className="text-sm font-semibold text-brand">{comparison.primaryUseCase || "Comparison"}</p>
              <h2 className="mt-2 text-xl font-bold text-ink">{toolA?.name} vs {toolB?.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{comparison.summaryVerdict}</p>
            </Link>
          );
        })}
      </section>
    </>
  );
}
