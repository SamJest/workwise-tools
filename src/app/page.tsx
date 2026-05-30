import Link from "next/link";
import { ArrowRight, CalendarClock, Database, FileSearch, GitCompare, ListChecks, Sparkles, Tags } from "lucide-react";
import {
  AffiliateDisclosure,
  DisplayAdSlot,
  NewsletterCTA,
  PageHero,
  PublisherTrustPanel,
  RelatedPages,
  ToolGrid,
  VerdictBox,
  WorkflowKitCard
} from "@/components/Blocks";
import { SectionHeader } from "@/components/Shell";
import { agentPlaybooks } from "@/lib/agent-playbooks";
import { authorityClusters, authorityTopics, authorityTopicsByCluster } from "@/lib/authority-topics";
import { automationTemplates } from "@/lib/automation-os";
import { freeTools } from "@/lib/free-tools";
import {
  listAlternativeSets,
  listCategories,
  listComparisons,
  listCountries,
  listProfessions,
  listPromptTemplates,
  listTools,
  listWorkflows
} from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { stackBlueprints } from "@/lib/stack-blueprints";
import { latestUpdates } from "@/lib/updates";
import { getUseCasePages } from "@/lib/use-cases";
import { workflowRecipes } from "@/lib/workflow-library";
import { workflowKits } from "@/lib/workflow-kits";

export const metadata = pageMetadata({
  title: "WorkWise Tools: AI Workflows for Small Business",
  description:
    "Find AI and SaaS tools, build practical workflows, compare options, use free calculators, and follow daily AI workflow updates.",
  path: "/"
});

export default async function HomePage() {
  const [tools, categories, professions, countries, comparisons, alternatives, workflows, prompts] = await Promise.all([
    listTools(),
    listCategories(),
    listProfessions(),
    listCountries(),
    listComparisons(),
    listAlternativeSets(),
    listWorkflows(),
    listPromptTemplates()
  ]);
  const useCases = getUseCasePages(tools);
  const updates = latestUpdates(3);
  const priorityTools = tools.filter((tool) =>
    ["pipedrive", "hubspot", "follow-up-boss", "zapier", "make", "canva", "calendly", "typeform", "matterport"].includes(tool.slug)
  );

  return (
    <>
      <PageHero
        eyebrow="WorkWise Tools"
        title="Build better AI workflows before you buy another app."
        description="Workflow-first AI and SaaS guides for small businesses: find tools, compare trade-offs, build repeatable processes, use free calculators, and track what changed this week."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-tools/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Find a tool
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/automation-os/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Open Automation OS
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/workflow-library/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Open Workflow Library
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/agent-playbooks/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Agent Playbooks
          </Link>
          <Link href="/stack-blueprints/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Stack Blueprints
          </Link>
          <Link href="/workflow-kits/" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
            Build a workflow
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/comparisons/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Compare options
          </Link>
          <Link href="/free-tools/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Use a free tool
          </Link>
          <Link href="/updates/" className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
            Latest updates
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Stat icon={<Database />} label="Tools" value={tools.length} />
          <Stat icon={<Tags />} label="Categories" value={categories.length} />
          <Stat icon={<ListChecks />} label="Use cases" value={useCases.length} />
          <Stat icon={<CalendarClock />} label="Recipes" value={workflowRecipes.length} />
          <Stat icon={<FileSearch />} label="Topic pages" value={authorityTopics.length} />
          <Stat icon={<Sparkles />} label="Agent playbooks" value={agentPlaybooks.length} />
          <Stat icon={<Database />} label="Stack blueprints" value={stackBlueprints.length} />
          <Stat icon={<FileSearch />} label="Professions" value={professions.length} />
          <Stat icon={<GitCompare />} label="Comparisons" value={comparisons.length} />
          <Stat icon={<Sparkles />} label="Free tools" value={freeTools.length} />
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Authority clusters"
            title="Start where search demand is already appearing"
            description="The growth wedges now cover CRM, real estate, automation, agent workflows, stack blueprints, marketing, finance, recruiting, reporting, compliance, customer success, ecommerce, support, and local-service workflows. Each cluster links tools, workflows, comparisons, prompts, calculators, and updates."
            action={{ href: "/topics/", label: "View all topic pages" }}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {authorityClusters.map((cluster) => (
              <Link key={cluster.slug} href={cluster.href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                <p className="text-sm font-semibold text-brand">{authorityTopicsByCluster(cluster.slug).length} topic pages</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{cluster.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{cluster.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-10">
          <VerdictBox title="Why WorkWise should win">
            Competitors often stop at rankings or broad software lists. WorkWise goes deeper: workflow examples, setup checks,
            pricing caution, privacy notes, alternatives, prompts, calculators, and an update loop that gives readers a reason to return.
          </VerdictBox>

          <section>
            <SectionHeader
              eyebrow="Automation OS"
              title="Templates, audits, and calculators for repeatable work"
              description="The next growth surface turns automation searches into useful actions: pick a template, audit the workflow, choose the right builder, and return through the daily brief."
              action={{ href: "/automation-os/", label: "Open Automation OS" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {automationTemplates.slice(0, 4).map((template) => (
                <Link key={template.slug} href={`/automation-os/templates/${template.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold capitalize text-brand">{template.riskLevel} risk</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{template.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{template.dailyUseCase}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Workflow Library"
              title="Step-by-step recipes for long-tail workflow searches"
              description="Recipes turn practical searches into action: trigger, setup steps, review checks, failure modes, privacy notes, related tools, and the free tool to use next."
              action={{ href: "/workflow-library/", label: "Browse recipes" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {workflowRecipes.slice(0, 4).map((recipe) => (
                <Link key={recipe.slug} href={`/workflow-library/${recipe.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{recipe.workflowType}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{recipe.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{recipe.dailyHabit}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Agent Playbooks"
              title="AI agent workflows with guardrails and human handoffs"
              description="Playbooks capture the next wave of search demand without pretending agents can run risky workflows alone."
              action={{ href: "/agent-playbooks/", label: "Browse agent playbooks" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {agentPlaybooks.slice(0, 4).map((playbook) => (
                <Link key={playbook.slug} href={`/agent-playbooks/${playbook.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{playbook.agentType}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{playbook.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{playbook.dailyReview}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Stack Blueprints"
              title="Buyer-ready AI stacks by workflow and maturity"
              description="Blueprints help readers decide which tools belong together, which layer to add next, and when to upgrade."
              action={{ href: "/stack-blueprints/", label: "Browse blueprints" }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stackBlueprints.slice(0, 4).map((blueprint) => (
                <Link key={blueprint.slug} href={`/stack-blueprints/${blueprint.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{blueprint.audience}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{blueprint.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{blueprint.summary}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Workflow kits"
              title="Complete paths from problem to implementation"
              description="Each kit connects a profession or use case, workflow guide, comparison, alternatives page, prompt/template, and free tool."
              action={{ href: "/workflow-kits/", label: "Browse kits" }}
            />
            <div className="grid gap-5 xl:grid-cols-2">
              {workflowKits.slice(0, 4).map((kit) => (
                <WorkflowKitCard key={kit.slug} kit={kit} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              eyebrow="Priority shortlist"
              title="Tools to verify and compare first"
              description="These tools support the current authority wedges. Exact pricing should stay conservative until the source checks are refreshed."
              action={{ href: "/ai-tools/", label: "View directory" }}
            />
            <ToolGrid tools={priorityTools.slice(0, 6)} />
          </section>

          <PublisherTrustPanel />
        </div>
        <aside className="space-y-5">
          <DisplayAdSlot label="Homepage display ad slot" />
          <VerdictBox title="Daily return loop">
            Readers should come back for the daily brief, updated tool watchlist, calculators, prompts, and workflow checklists.
          </VerdictBox>
          <RelatedPages
            links={[
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "One useful workflow idea each day." },
              { title: "Workflow Library", href: "/workflow-library/", description: "Step-by-step recipes for repeatable work." },
              { title: "Agent Playbooks", href: "/agent-playbooks/", description: "Guardrailed AI agent workflows." },
              { title: "Stack Blueprints", href: "/stack-blueprints/", description: "Buyer-ready AI stack plans." },
              { title: "Latest updates", href: "/updates/", description: "Fresh guide and watchlist notes." },
              { title: "AI workflow ROI calculator", href: "/free-tools/ai-workflow-roi-calculator/", description: "Estimate automation value." },
              { title: "AI stack builder", href: "/free-tools/ai-stack-builder/", description: "Build a practical starter stack." }
            ]}
          />
        </aside>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Latest updates"
            title="Fresh reasons to explore today"
            description="Short update notes help returning readers see what changed, which tools need checking, and which workflows are worth trying."
            action={{ href: "/updates/", label: "Read updates" }}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {updates.map((update) => (
              <Link key={update.slug} href={`/updates/#${update.slug}`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                  {update.type.replaceAll("-", " ")}
                </p>
                <h2 className="mt-2 text-xl font-bold text-ink">{update.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{update.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Explore by path"
          title="Move from broad intent to the exact decision"
          description="Readers can browse by use case, profession, country, comparison, alternative, prompt, template, or free tool without leaving the workflow context."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ClusterCard title="Use-case hubs" href="/use-cases/" count={useCases.length} />
          <ClusterCard title="Profession guides" href="/professions/" count={professions.length} />
          <ClusterCard title="Country guides" href="/countries/" count={countries.length} />
          <ClusterCard title="Alternatives" href="/alternatives/" count={alternatives.length} />
          <ClusterCard title="Comparisons" href="/comparisons/" count={comparisons.length} />
          <ClusterCard title="Workflow pages" href="/workflows/" count={workflows.length} />
          <ClusterCard title="Workflow recipes" href="/workflow-library/" count={workflowRecipes.length} />
          <ClusterCard title="Agent playbooks" href="/agent-playbooks/" count={agentPlaybooks.length} />
          <ClusterCard title="Stack blueprints" href="/stack-blueprints/" count={stackBlueprints.length} />
          <ClusterCard title="Prompt library" href="/prompts/" count={prompts.length} />
          <ClusterCard title="Free tools" href="/free-tools/" count={freeTools.length} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
        <div className="mt-6">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="h-5 w-5 text-brand">{icon}</div>
      <p className="mt-4 text-3xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function ClusterCard({ title, href, count }: { title: string; href: string; count: number }) {
  return (
    <Link href={href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm font-semibold text-brand">{count ? `${count} live pages` : "Open library"}</p>
      <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm text-muted">Open the route family and continue the workflow journey.</p>
    </Link>
  );
}
