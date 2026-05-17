import { notFound } from "next/navigation";
import {
  AffiliateDisclosure,
  AuthorBox,
  Breadcrumbs,
  ContentQualityPanel,
  DataFreshnessNotice,
  LastUpdated,
  MethodologyBox,
  NewsletterCTA,
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
  return getPromptTemplates().map((template) => ({ slug: template.slug }));
}

export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const template = await findPromptTemplate(slug);
  if (!template) return {};
  return pageMetadata({
    title: `${template.title} Template`,
    description: `Reusable template for ${template.task}, with prompt copy, refinement notes, and mistakes to avoid.`,
    path: `/templates/${template.slug}/`
  });
}

export default async function TemplatePage({ params }: RouteProps) {
  const { slug } = await params;
  const template = await findPromptTemplate(slug);
  if (!template) notFound();
  const profession = template.profession ? await findProfession(template.profession) : undefined;
  const related = profession ? await relatedLinks({ profession }) : [];
  const profile = buildPromptProfile(template, related);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates/" },
    { name: template.title, href: `/templates/${template.slug}/` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero eyebrow="Template" title={`${template.title} Template`} description={`A reusable working template for ${template.task}.`}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox>
            Use this template as a draft structure. Replace bracketed context with real details and verify any claims before use.
          </VerdictBox>
          <ContentQualityPanel profile={profile} />
          <DataFreshnessNotice date={template.lastUpdatedAt} />
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Template copy</h2>
            <pre className="mt-4 whitespace-pre-wrap rounded-md bg-panel p-4 text-sm leading-6 text-ink">{template.prompt}</pre>
          </section>
          {template.refinementPrompt ? (
            <section className="rounded-md border border-line bg-white p-6">
              <h2 className="text-2xl font-bold text-ink">Customisation prompt</h2>
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-panel p-4 text-sm leading-6 text-ink">{template.refinementPrompt}</pre>
            </section>
          ) : null}
          <section className="rounded-md border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-ink">Quality checks</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {template.mistakesToAvoid.map((mistake) => <li key={mistake}>{mistake}</li>)}
              <li>Check that the output matches the reader, country, and task before publishing or sending.</li>
            </ul>
          </section>
          <RelatedPages links={related} />
          <NewsletterCTA />
          <MethodologyBox>
            <p>
              Template pages are separate from prompt pages so downloadable assets, gated forms, and template CTAs can be added later
              without changing the prompt library URL structure.
            </p>
          </MethodologyBox>
          <AffiliateDisclosure />
        </div>
        <aside className="space-y-5">
          <AuthorBox />
          <LastUpdated date={template.lastUpdatedAt} />
        </aside>
      </section>
    </>
  );
}
