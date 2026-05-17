import Link from "next/link";
import { PageHero, WorkflowKitCard } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { workflowKits } from "@/lib/workflow-kits";

export const metadata = pageMetadata({
  title: "AI Workflow Kits",
  description: "Complete AI workflow hubs for small business teams, with tools, comparisons, alternatives, prompts, and free planners.",
  path: "/workflow-kits/"
});

export default function WorkflowKitsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          title: "AI Workflow Kits",
          description: "Complete AI workflow hubs for small business teams.",
          path: "/workflow-kits/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          workflowKits.map((kit) => ({ name: kit.title, href: `/workflow-kits/${kit.slug}/`, description: kit.summary })),
          "AI workflow kits"
        )}
      />
      <PageHero
        eyebrow="Workflow kits"
        title="AI workflow kits"
        description="Start with the job to be done, then move through the right tools, comparisons, alternatives, prompts, free planners, and US/UK notes."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Priority clusters"
          title="Built for topical authority"
          description="Each kit is a complete internal-link cluster rather than a standalone directory page."
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {workflowKits.map((kit) => (
            <WorkflowKitCard key={kit.slug} kit={kit} />
          ))}
        </div>
        <div className="mt-8 rounded-md border border-line bg-panel p-5 text-sm leading-6 text-muted">
          New kit pages should only be added when there is enough supporting content: a workflow, comparison, alternatives page,
          prompt/template, free tool, and at least three relevant tool records.
          <Link href="/editorial-policy/" className="ml-1 font-semibold text-brand">
            Read the editorial policy.
          </Link>
        </div>
      </section>
    </>
  );
}
