import { DemoDataNotice, PageHero, ToolGrid } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listCategories, listTools } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Tools Directory",
  description: "Browse AI and SaaS tools by category, pricing model, profession fit, and use case.",
  path: "/ai-tools/"
});

export default async function AiToolsPage() {
  const [tools, categories] = await Promise.all([listTools(), listCategories()]);

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ title: "AI Tools Directory", description: "Browse AI and SaaS tools by category, pricing model, profession fit, and use case.", path: "/ai-tools/" })} />
      <JsonLd data={itemListJsonLd(tools.map((tool) => ({ name: tool.name, href: `/ai-tools/${tool.slug}/`, description: tool.summary })), "AI tools directory")} />
      <PageHero
        eyebrow="Tool directory"
        title="AI tools directory"
        description="Browse starter tool records that can be expanded into verified review, comparison, alternative, and workflow pages."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <DemoDataNotice />
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category.slug} className="rounded-md border border-line bg-panel px-3 py-2 text-sm text-muted">
              {category.name}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <ToolGrid tools={tools} />
        </div>
      </section>
    </>
  );
}
