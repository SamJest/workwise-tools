import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { stackBlueprints } from "@/lib/stack-blueprints";

export const metadata = pageMetadata({
  title: "AI Stack Blueprints for Small Business",
  description: "Practical AI and SaaS stack blueprints by workflow, audience, budget tier, maturity level, tools, rollout steps, and upgrade triggers.",
  path: "/stack-blueprints/"
});

export default function StackBlueprintsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stack Blueprints", href: "/stack-blueprints/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: "AI Stack Blueprints", description: "Practical AI and SaaS stack blueprints for small-business workflows.", path: "/stack-blueprints/" })} />
      <JsonLd data={itemListJsonLd(stackBlueprints.map((blueprint) => ({ name: blueprint.title, href: `/stack-blueprints/${blueprint.slug}/`, description: blueprint.summary })), "AI Stack Blueprints")} />
      <PageHero
        eyebrow="Stack Blueprints"
        title="AI and SaaS stacks that match the workflow, not the hype"
        description="Use these blueprints to decide what tools belong together, what to set up first, when to upgrade, and where the risks sit."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/stack-blueprints/real-estate-agent-ai-stack/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Real estate stack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/free-tools/stack-gap-analyzer/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Analyze stack gaps
            </Link>
            <Link href="/workflow-library/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Browse recipes
            </Link>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Stack rule">
            A good stack starts with one repeated workflow, then adds only the layers needed for intake, records, automation, review, and reporting.
          </VerdictBox>
          <section>
            <SectionHeader
              eyebrow="Blueprints"
              title="Commercial-intent stack pages"
              description="Each blueprint connects tools, rollout steps, risks, upgrade triggers, workflow recipes, and agent playbooks."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stackBlueprints.map((blueprint) => (
                <Link key={blueprint.slug} href={`/stack-blueprints/${blueprint.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{blueprint.audience}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{blueprint.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{blueprint.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{blueprint.budgetTier}</Badge>
                    <Badge>{blueprint.maturityLevel}</Badge>
                    <Badge>{blueprint.stackLayers.length} layers</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again tomorrow">
            Run the gap analyzer after every tool change, then return to the matching blueprint before upgrading plans.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Stack Gap Analyzer", href: "/free-tools/stack-gap-analyzer/", description: "Find missing layers and risky overlap." },
              { title: "AI Stack Builder", href: "/free-tools/ai-stack-builder/", description: "Build a starter stack from inputs." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Connect the stack to recipes." },
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Add guarded agent workflows." }
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
