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
  RelatedPages,
  VerdictBox
} from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getPromptTemplates } from "@/lib/data";
import { buildPromptProfile } from "@/lib/content-engine";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { findProfession, findPromptTemplate, relatedLinks } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPromptTemplates().map((prompt) => ({ slug: prompt.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const prompt = await findPromptTemplate(slug);
  if (!prompt) return {};
  return pageMetadata({
    title: prompt.title,
    description: `Prompt template for ${prompt.task}, including refinement notes and mistakes to avoid.`,
    path: `/prompts/${prompt.slug}/`
  });
}

export default async function PromptPage({ params }: RouteProps) {
  const { slug } = await params;
  const prompt = await findPromptTemplate(slug);
  if (!prompt) notFound();
  const profession = prompt.profession ? await findProfession(prompt.profession) : undefined;
  const related = profession ? await relatedLinks({ profession }) : [];
  const profile = buildPromptProfile(prompt, related);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Prompts", href: "/prompts/" },
    { name: prompt.title, href: `/prompts/${prompt.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero eyebrow="Prompt template" title={prompt.title} description={`Use this prompt for ${prompt.task}.`}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>Prompts should be customised with real context and checked before sending to clients, candidates, or customers.</VerdictBox>
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={prompt.lastUpdatedAt} />
          <PromptBlock title="Main prompt" text={prompt.prompt} />
          {prompt.refinementPrompt ? <PromptBlock title="Refinement prompt" text={prompt.refinementPrompt} /> : null}
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Mistakes to avoid</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {prompt.mistakesToAvoid.map((mistake) => <li key={mistake}>{mistake}</li>)}
            </ul>
          </section>
          <RelatedPages links={related} />
          <MethodologyBox>
            <p>
              Prompt pages should explain the task, provide reusable prompt text, include refinement guidance, and flag mistakes
              that could create legal, factual, hiring, or client-service risk.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={prompt.lastUpdatedAt} />
        </aside>
      </section>
    </>
  );
}

function PromptBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <pre className="mt-4 whitespace-pre-wrap rounded-md bg-panel p-4 text-sm leading-6 text-ink">{text}</pre>
    </section>
  );
}
