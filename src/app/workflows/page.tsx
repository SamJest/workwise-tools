import Link from "next/link";
import { PageHero, WorkflowKitCard } from "@/components/Blocks";
import { SectionHeader } from "@/components/Shell";
import { listWorkflows } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { workflowKits } from "@/lib/workflow-kits";

export const metadata = pageMetadata({
  title: "AI Workflow Guides for Small Business",
  description: "Step-by-step AI workflow kits with tools, prompts, templates, comparisons, alternatives, and free planners.",
  path: "/workflows/"
});

export default async function WorkflowsPage() {
  const workflows = await listWorkflows();

  return (
    <>
      <PageHero eyebrow="Workflows" title="AI workflow guides" description="Practical workflows that connect tools, prompts, templates, comparisons, alternatives, and business tasks." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow kits"
          title="Complete topic clusters"
          description="These are the first priority clusters for building topical authority without publishing thin directory pages."
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {workflowKits.map((kit) => (
            <WorkflowKitCard key={kit.slug} kit={kit} />
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {workflows.map((workflow) => (
          <Link key={workflow.slug} href={`/workflows/${workflow.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">{workflow.steps.length} steps</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{workflow.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{workflow.problem}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
