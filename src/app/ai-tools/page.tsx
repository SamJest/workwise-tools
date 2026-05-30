import Link from "next/link";
import { Badge, DemoDataNotice, PageHero, ToolGrid, VerdictBox } from "@/components/Blocks";
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
  const categoryRows = categories
    .map((category) => ({
      category,
      tools: tools.filter((tool) => tool.categories.includes(category.slug))
    }))
    .filter((row) => row.tools.length > 0)
    .sort((a, b) => b.tools.length - a.tools.length);

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ title: "AI Tools Directory", description: "Browse AI and SaaS tools by category, pricing model, profession fit, and use case.", path: "/ai-tools/" })} />
      <JsonLd data={itemListJsonLd(tools.map((tool) => ({ name: tool.name, href: `/ai-tools/${tool.slug}/`, description: tool.summary })), "AI tools directory")} />
      <PageHero
        eyebrow="Tool directory"
        title="Workflow-first AI tools directory"
        description="Browse tools by the workflows they support, then move into profession guides, comparisons, alternatives, prompts, and free planners."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <DemoDataNotice />
        <div className="mt-6">
          <VerdictBox title="Directory strategy">
            WorkWise intentionally prioritises practical workflow coverage over a giant undifferentiated tool database. Use categories
            to find candidates, then validate fit through the linked workflow and comparison pages.
          </VerdictBox>
        </div>
        <section className="mt-8 rounded-md border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">Filter by workflow fit</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Start with the operating question, then narrow by setup effort, privacy risk, team size, and daily-use frequency.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <FilterCard title="Workflow type" href="/automation-os/" body="Templates, audits, and repeatable handoffs." />
            <FilterCard title="Team size" href="/professions/" body="Role and team-specific software guides." />
            <FilterCard title="Setup effort" href="/free-tools/zapier-make-n8n-picker/" body="Choose a builder your team can maintain." />
            <FilterCard title="Privacy risk" href="/free-tools/software-buying-checklist-generator/" body="Check data and review requirements." />
            <FilterCard title="Daily-use frequency" href="/daily-ai-workflow-brief/" body="Return for one practical task each day." />
          </div>
        </section>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryRows.map(({ category, tools: matchingTools }) => (
            <Link key={category.slug} href={`/categories/${category.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-ink">{category.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{category.description || "Tools mapped to this workflow category."}</p>
                </div>
                <Badge>{matchingTools.length} tools</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {matchingTools.slice(0, 5).map((tool) => (
                  <Badge key={tool.slug}>{tool.name}</Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ToolGrid tools={tools} />
        </div>
      </section>
    </>
  );
}

function FilterCard({ title, href, body }: { title: string; href: string; body: string }) {
  return (
    <Link href={href} className="rounded-md border border-line bg-panel p-4 hover:border-brand">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </Link>
  );
}
