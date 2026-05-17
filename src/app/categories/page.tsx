import Link from "next/link";
import { Badge, PageHero, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listCategories, listTools } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Tool Categories",
  description: "Browse AI and SaaS tools by practical workflow category, then compare tools, use cases, and implementation fit.",
  path: "/categories/"
});

export default async function CategoriesPage() {
  const [categories, tools] = await Promise.all([listCategories(), listTools()]);
  const rows = categories
    .map((category) => ({
      category,
      tools: tools.filter((tool) => tool.categories.includes(category.slug))
    }))
    .filter((row) => row.tools.length > 0)
    .sort((a, b) => b.tools.length - a.tools.length || a.category.name.localeCompare(b.category.name));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          title: "AI Tool Categories",
          description: "Browse AI and SaaS tools by practical workflow category.",
          path: "/categories/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          rows.map((row) => ({
            name: row.category.name,
            href: `/categories/${row.category.slug}/`,
            description: row.category.description
          })),
          "AI tool categories"
        )}
      />
      <PageHero
        eyebrow="Categories"
        title="AI tool categories by workflow"
        description="Use category hubs to compare tools that solve the same type of work, then move into use cases, workflow kits, and tool reviews."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <VerdictBox title="How to use these hubs">
          Start with a category when you know the workflow problem but not the vendor. Each hub keeps the list practical,
          source-linked, and connected to deeper guides instead of acting like a shallow directory tag page.
        </VerdictBox>
        <div className="mt-10">
          <SectionHeader
            eyebrow="Browse"
            title="Category hubs"
            description="Every category page includes matching tools, decision criteria, privacy and setup notes, and internal links into the wider WorkWise cluster."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rows.map(({ category, tools: matchingTools }) => (
              <Link key={category.slug} href={`/categories/${category.slug}/`} className="rounded-md border border-line bg-white p-5 shadow-sm hover:border-brand">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-ink">{category.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{category.description || "Tools mapped to this workflow category."}</p>
                  </div>
                  <Badge>{matchingTools.length} tools</Badge>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {matchingTools.slice(0, 4).map((tool) => (
                    <Badge key={tool.slug}>{tool.name}</Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
