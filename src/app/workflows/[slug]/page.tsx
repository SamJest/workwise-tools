import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ContentQualityPanel,
  DataFreshnessNotice,
  LastUpdated,
  MethodologyBox,
  PageHero,
  PromptExamples,
  RelatedPages,
  TemplateDownloads,
  VerdictBox,
  WorkflowSteps
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getWorkflows } from "@/lib/data";
import { buildWorkflowProfile } from "@/lib/content-engine";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { findProfession, findWorkflow, relatedLinks } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getWorkflows().map((workflow) => ({ slug: workflow.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const workflow = await findWorkflow(slug);
  if (!workflow) return {};
  return pageMetadata({
    title: `${workflow.title}: Tools, Prompts & Step-by-Step Setup`,
    description: workflow.problem,
    path: `/workflows/${workflow.slug}/`
  });
}

export default async function WorkflowPage({ params }: RouteProps) {
  const { slug } = await params;
  const workflow = await findWorkflow(slug);
  if (!workflow) notFound();
  const profession = workflow.relatedProfession ? await findProfession(workflow.relatedProfession) : undefined;
  const related = profession ? await relatedLinks({ profession }) : [];
  const profile = buildWorkflowProfile(workflow, related);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflows", href: "/workflows/" },
    { name: workflow.title, href: `/workflows/${workflow.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero eyebrow="Workflow" title={workflow.title} description={workflow.problem}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>Use this as a repeatable operating workflow, then verify tools, permissions, and data handling before rollout.</VerdictBox>
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={workflow.lastUpdatedAt} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Tools needed</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {workflow.toolsNeeded.map((tool) => <li key={tool} className="rounded-md bg-panel p-3 text-sm text-muted">{tool}</li>)}
            </ul>
          </section>
          <WorkflowSteps workflow={workflow} />
          <TemplateDownloads templates={workflow.templates} />
          <PromptExamples prompts={workflow.prompts} />
          <RelatedPages links={related} />
          <MethodologyBox>
            <p>
              Workflow pages should be practical enough to execute: problem, tools, steps, prompts, templates, mistakes to avoid,
              and related profession/tool pages.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={workflow.lastUpdatedAt} />
        </aside>
      </section>
    </>
  );
}
