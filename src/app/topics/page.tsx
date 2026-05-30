import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, MethodologyBox, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { authorityClusters, authorityTopics, authorityTopicsByCluster } from "@/lib/authority-topics";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Workflow Topic Clusters",
  description: "Explore WorkWise authority clusters for AI tools, CRM, real estate, automation, agents, stacks, ecommerce, support, and local services.",
  path: "/topics/"
});

export default function TopicsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Topics", href: "/topics/" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: "AI Workflow Topic Clusters",
          description: "WorkWise authority clusters for small-business AI and SaaS workflows.",
          path: "/topics/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          authorityTopics.map((topic) => ({ name: topic.title, href: `/topics/${topic.slug}/`, description: topic.summary })),
          "AI workflow topic clusters"
        )}
      />
      <PageHero
        eyebrow="Topic clusters"
        title="AI workflow clusters built for depth, not directory sprawl"
        description="Start with workflow-first clusters for CRM, real estate, automation, agent playbooks, stack blueprints, ecommerce, support, and local services."
      >
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <VerdictBox title="Cluster strategy">
          Each topic page exists to support a complete search journey: answer the query, show the workflow, link to tools and comparisons,
          and give readers a reason to return with calculators, prompts, and daily briefs.
        </VerdictBox>

        {authorityClusters.map((cluster) => (
          <section key={cluster.slug}>
            <SectionHeader eyebrow="Authority cluster" title={cluster.title} description={cluster.summary} action={{ href: cluster.href, label: "Open lead topic" }} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {authorityTopicsByCluster(cluster.slug).map((topic) => (
                <Link key={topic.slug} href={`/topics/${topic.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                  <p className="text-sm font-semibold text-brand">{topic.primaryIntent}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{topic.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{topic.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Read topic
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <MethodologyBox>
          <p>
            Topic pages are published only when they can link into an existing hub, workflow, comparison, prompt, or free tool.
            This keeps expansion tied to real topical authority instead of isolated programmatic pages.
          </p>
        </MethodologyBox>
        <RelatedPages
          links={[
            { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "A daily reason to return." },
            { title: "Latest updates", href: "/updates/", description: "Fresh cluster and tool-watch notes." },
            { title: "Workflow kits", href: "/workflow-kits/", description: "Complete implementation clusters." },
            { title: "Free tools", href: "/free-tools/", description: "Calculators, planners, and prompt generators." }
          ]}
        />
      </section>
    </>
  );
}
