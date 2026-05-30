import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  Breadcrumbs,
  MethodologyBox,
  NewsletterCTA,
  PageHero,
  RelatedPages,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { authorityTopics, getAuthorityTopic } from "@/lib/authority-topics";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return authorityTopics.map((topic) => ({ slug: topic.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const topic = getAuthorityTopic(slug);
  if (!topic) return {};
  return pageMetadata({
    title: topic.title,
    description: topic.summary,
    path: `/topics/${topic.slug}/`
  });
}

export default async function AuthorityTopicPage({ params }: RouteProps) {
  const { slug } = await params;
  const topic = getAuthorityTopic(slug);
  if (!topic) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Topics", href: "/topics/" },
    { name: topic.title, href: `/topics/${topic.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: topic.title,
          description: topic.summary,
          path: `/topics/${topic.slug}/`
        })}
      />
      <PageHero eyebrow={topic.primaryIntent} title={topic.title} description={topic.summary}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title="Why this page exists">{topic.whyItMatters}</VerdictBox>
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Who this helps</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{topic.audience}</p>
          </section>
          <section className="grid gap-4">
            {topic.sections.map((section) => (
              <article key={section.title} className="rounded-md border border-line bg-white p-6">
                <h2 className="text-2xl font-bold text-ink">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{section.body}</p>
                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-md bg-panel p-3 text-sm font-semibold text-ink">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
          <RelatedPages links={topic.related} />
          <MethodologyBox>
            <p>
              This topic page is intentionally linked to existing WorkWise assets so the reader can move from search intent
              to a practical workflow, comparison, calculator, or prompt instead of hitting a dead-end article.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <VerdictBox title="Return habit">{topic.dailyReturn}</VerdictBox>
          <RelatedPages
            links={[
              { title: "Daily AI Workflow Brief", href: "/daily-ai-workflow-brief/", description: "One workflow idea, tool check, and prompt." },
              { title: "Latest updates", href: "/updates/", description: "Fresh cluster and tool-watch notes." },
              { title: "AI stack builder", href: "/free-tools/ai-stack-builder/", description: "Generate a practical starter stack." }
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
