import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import {
  automationCleanupPages,
  automationClusters,
  automationSupportPages,
  automationTemplates
} from "@/lib/automation-os";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { workflowRecipes } from "@/lib/workflow-library";

export const metadata = pageMetadata({
  title: "Automation OS for Small Business",
  description: "Workflow templates, automation audits, tool comparisons, calculators, and daily operating habits for small-business automation.",
  path: "/automation-os/"
});

export default function AutomationOsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Automation OS", href: "/automation-os/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: "Automation OS for Small Business", description: "Templates, audits, tools, and calculators for small-business automation.", path: "/automation-os/" })} />
      <JsonLd data={itemListJsonLd(automationTemplates.map((template) => ({ name: template.title, href: `/automation-os/templates/${template.slug}/`, description: template.trigger })), "Automation OS templates")} />
      <PageHero
        eyebrow="Automation OS"
        title="Build automations your team can actually run tomorrow"
        description="Start with a workflow template, check the failure modes, choose the right tools, and use a calculator before adding another subscription."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/automation-os/templates/speed-to-lead-ai-qualifier/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Start with speed-to-lead
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/free-tools/workflow-audit-generator/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Audit a workflow
            </Link>
            <Link href="/free-tools/zapier-make-n8n-picker/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Pick an automation tool
            </Link>
            <Link href="/workflow-library/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Browse recipes
            </Link>
            <Link href="/agent-playbooks/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Agent playbooks
            </Link>
            <Link href="/stack-blueprints/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Stack blueprints
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Automation OS rule">
            Every useful automation needs a trigger, clean inputs, a system of record, a human review step, and a named owner for failures.
          </VerdictBox>

          <section>
            <SectionHeader
              eyebrow="Templates"
              title="Reusable automation templates"
              description="Each template includes trigger, inputs, steps, tools, risk level, review step, failure modes, and a related free tool."
              action={{ href: "/automation-os/templates/speed-to-lead-ai-qualifier/", label: "Open first template" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {automationTemplates.slice(0, 8).map((template) => (
                <TemplateCard key={template.slug} href={`/automation-os/templates/${template.slug}/`} title={template.title} meta={template.riskLevel} body={template.trigger} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Clusters" title="Automation paths by operating pain" description="Move from a pain point to templates, comparisons, tools, prompts, and calculators." />
            <div className="grid gap-4 md:grid-cols-2">
              {automationClusters.map((cluster) => (
                <Link key={cluster.slug} href={`/automation-os/templates/${cluster.templateSlugs[0]}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{cluster.audience}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{cluster.primaryPain}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{cluster.templateSlugs.length} templates</Badge>
                    <Badge>{cluster.toolSlugs.length} tools</Badge>
                    <Badge>{cluster.freeToolSlugs.length} free tools</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Workflow Library"
              title="Recipes that make the templates actionable"
              description="Use these pages when the reader wants the exact setup flow rather than the wider operating system."
              action={{ href: "/workflow-library/", label: "Browse all recipes" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowRecipes.slice(0, 6).map((recipe) => (
                <TemplateCard key={recipe.slug} href={`/workflow-library/${recipe.slug}/`} title={recipe.title} meta={recipe.workflowType} body={recipe.summary} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Support pages" title="Tool decisions and cleanup plays" description="Comparison, alternative, and repair pages support high-intent automation searches." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[...automationSupportPages.slice(0, 5), ...automationCleanupPages.slice(0, 4)].map((page) => {
                const href = "kind" in page ? `/automation-os/support/${page.slug}/` : `/automation-os/cleanup/${page.slug}/`;
                return <TemplateCard key={page.slug} href={href} title={page.title} meta={"kind" in page ? page.kind : "workflow audit"} body={page.summary} />;
              })}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again tomorrow">
            Start with one template, run the audit generator, then return through the daily brief to check one automation failure or improvement.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Today's daily brief", href: "/daily-ai-workflow-brief/", description: "Get one automation task to run today." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Step-by-step workflow recipes." },
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Guardrailed AI agent workflows." },
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Choose the tools around the workflow." },
              { title: "Automation ROI Calculator v2", href: "/free-tools/automation-roi-calculator-v2/", description: "Estimate value, risk, and payback." },
              { title: "Lead Follow-Up SLA Calculator", href: "/free-tools/lead-follow-up-sla-calculator/", description: "Set response targets before leads go cold." },
              { title: "Latest updates", href: "/updates/", description: "Follow templates and tool-change notes." }
            ]}
          />
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </>
  );
}

function TemplateCard({ href, title, meta, body }: { href: string; title: string; meta: string; body: string }) {
  return (
    <Link href={href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm font-semibold capitalize text-brand">{meta.replaceAll("-", " ")}</p>
      <h2 className="mt-2 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </Link>
  );
}
