import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { listWorkflows } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Workflow Guides",
  description: "Step-by-step AI workflows with tools, prompts, templates, automation notes, and related guides.",
  path: "/workflows/"
});

export default async function WorkflowsPage() {
  const workflows = await listWorkflows();

  return (
    <>
      <PageHero eyebrow="Workflows" title="AI workflow guides" description="Practical workflows that connect tools, prompts, templates, and business tasks." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
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
