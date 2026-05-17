import { notFound } from "next/navigation";
import { Breadcrumbs, MethodologyBox, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { FreeToolForm } from "@/components/FreeToolForm";
import { getFreeTool, freeTools } from "@/lib/free-tools";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return freeTools.map((tool) => ({ slug: tool.slug }));
}

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const tool = getFreeTool(slug);
  if (!tool) return {};
  return pageMetadata({
    title: tool.title,
    description: tool.description,
    path: `/free-tools/${tool.slug}/`
  });
}

export default async function FreeToolPage({ params }: RouteProps) {
  const { slug } = await params;
  const tool = getFreeTool(slug);
  if (!tool) notFound();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Free tools", href: "/free-tools/" },
    { name: tool.title, href: `/free-tools/${tool.slug}/` }
  ];
  const faqs = [
    {
      question: `Is ${tool.title} powered by a paid AI API?`,
      answer: "No. This MVP uses local rule-based generation so it can run without external API keys."
    },
    {
      question: "Can I use the generated output as-is?",
      answer: "Treat outputs as drafts. Review facts, tone, claims, legal/compliance context, pricing, and anything client-facing before use."
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero eyebrow="Free tool" title={tool.title} description={tool.description}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <VerdictBox>Outputs are generated locally with simple rules. They are useful drafts, not legal, financial, or vendor advice.</VerdictBox>
        <FreeToolForm tool={tool} />
        <RelatedPages links={tool.related} />
        <MethodologyBox>
          <p>
            Free tools use deterministic rule sets, validated inputs, and structured outputs. They are designed for fast drafts,
            not final recommendations or verified vendor advice.
          </p>
        </MethodologyBox>
        <NewsletterCTA />
      </section>
    </>
  );
}
