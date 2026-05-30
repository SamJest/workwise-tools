import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { workflowChecklists, workflowCollections, workflowRecipes } from "@/lib/workflow-library";

export const metadata = pageMetadata({
  title: "Workflow Library for Small Business Automation",
  description: "Step-by-step workflow recipes for sales, real estate, agencies, ecommerce, support, finance, admin, and local service teams.",
  path: "/workflow-library/"
});

const filterGroups = [
  { title: "Profession", values: ["sales teams", "real estate", "consultants", "agencies", "ecommerce", "support", "finance", "trades"] },
  { title: "Workflow type", values: ["lead follow-up", "CRM cleanup", "meeting notes", "support triage", "reporting", "customer follow-up"] },
  { title: "Setup effort", values: ["45-90 minutes", "medium difficulty", "high risk", "daily use"] }
];

export default function WorkflowLibraryPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflow Library", href: "/workflow-library/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: "Workflow Library", description: "Step-by-step workflow recipes for small-business automation.", path: "/workflow-library/" })} />
      <JsonLd data={itemListJsonLd(workflowRecipes.map((recipe) => ({ name: recipe.title, href: `/workflow-library/${recipe.slug}/`, description: recipe.summary })), "Workflow Library recipes")} />
      <PageHero
        eyebrow="Workflow Library"
        title="Step-by-step recipes for the work small teams repeat every week"
        description="Pick a practical workflow, follow the setup steps, check the failure modes, then use the related free tool before you automate it."
      >
        <div className="space-y-5">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex flex-wrap gap-3">
            <Link href="/workflow-library/collections/real-estate/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
              Start with real estate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/workflow-library/sales-call-notes-to-pipedrive/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Sales call to CRM
            </Link>
            <Link href="/free-tools/workflow-recipe-finder/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              Find a recipe
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
          <VerdictBox title="Library rule">
            A recipe is useful only if it names the trigger, owner, review step, failure modes, privacy concern, and the tool to use next.
          </VerdictBox>

          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Browse by filter</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {filterGroups.map((group) => (
                <div key={group.title} className="rounded-md bg-panel p-4">
                  <p className="font-semibold text-ink">{group.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.values.map((value) => <Badge key={value}>{value}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Collections"
              title="Workflow recipes by team"
              description="Each collection points to recipes, tools, Automation OS templates, and the free tool that moves the reader forward."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {workflowCollections.map((collection) => (
                <Link key={collection.slug} href={`/workflow-library/collections/${collection.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{collection.audience}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{collection.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{collection.primaryPain}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{collection.recipeSlugs.length} recipes</Badge>
                    <Badge>{collection.toolSlugs.length} tools</Badge>
                    <Badge>{collection.freeToolSlugs.length} free tools</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Recipes"
              title="High-intent workflow pages"
              description="The first 36 recipes target long-tail workflow searches and connect directly into tools, calculators, and Automation OS templates."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Use again tomorrow">
            Save the finder share link after choosing a recipe, then return through the daily brief to fix one workflow failure at a time.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Workflow Recipe Finder", href: "/free-tools/workflow-recipe-finder/", description: "Choose a recipe by team, tool, difficulty, and risk." },
              { title: "Stack Gap Analyzer", href: "/free-tools/stack-gap-analyzer/", description: "Check the tool stack around a recipe." },
              { title: "Agent Readiness Checker", href: "/free-tools/agent-readiness-checker/", description: "Check whether a recipe is ready for an agent." },
              { title: "Workflow readiness checklist", href: "/workflow-library/checklists/workflow-readiness/", description: "Check whether a workflow is ready." },
              { title: "Automation OS", href: "/automation-os/", description: "Templates, audits, and calculators." },
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "One workflow task to run today." }
            ]}
          />
          <section className="rounded-md border border-line bg-white p-5">
            <h2 className="font-semibold text-ink">Checklists</h2>
            <div className="mt-3 grid gap-2">
              {workflowChecklists.map((checklist) => (
                <Link key={checklist.slug} href={`/workflow-library/checklists/${checklist.slug}/`} className="text-sm font-semibold text-brand hover:text-ink">
                  {checklist.title}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </>
  );
}

function RecipeCard({ recipe }: { recipe: (typeof workflowRecipes)[number] }) {
  return (
    <Link href={`/workflow-library/${recipe.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm font-semibold text-brand">{recipe.workflowType}</p>
      <h2 className="mt-2 text-lg font-bold text-ink">{recipe.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{recipe.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{recipe.difficulty} difficulty</Badge>
        <Badge>{recipe.riskLevel} risk</Badge>
        <Badge>{recipe.setupTime}</Badge>
      </div>
    </Link>
  );
}
