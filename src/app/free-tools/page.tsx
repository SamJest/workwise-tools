import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { freeTools } from "@/lib/free-tools";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free AI Tools and Calculators",
  description: "Rule-based free tools for workflow recipes, stack gaps, agent readiness, AI tool recommendations, automation audits, and SaaS cost planning.",
  path: "/free-tools/"
});

export default function FreeToolsPage() {
  return (
    <>
      <JsonLd data={collectionPageJsonLd({ title: "Free AI Tools and Calculators", description: "Rule-based free tools for AI workflows and SaaS planning.", path: "/free-tools/" })} />
      <JsonLd data={itemListJsonLd(freeTools.map((tool) => ({ name: tool.title, href: `/free-tools/${tool.slug}/`, description: tool.description })), "Free AI tools")} />
      <PageHero eyebrow="Free tools" title="Free AI tools and calculators" description="Lightweight utilities for finding workflow recipes, analyzing stack gaps, checking agent readiness, choosing tools, and planning SaaS spend without paid APIs." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {freeTools.map((tool) => (
          <Link key={tool.slug} href={`/free-tools/${tool.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">Rule-based MVP</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{tool.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{tool.description}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="rounded-md bg-panel p-3">
                <dt className="font-semibold text-ink">Inputs</dt>
                <dd className="mt-1 text-muted">{tool.inputSummary}</dd>
              </div>
              <div className="rounded-md bg-panel p-3">
                <dt className="font-semibold text-ink">Output</dt>
                <dd className="mt-1 text-muted">{tool.outputSummary}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </>
  );
}
