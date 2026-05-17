import Link from "next/link";
import { Badge, PageHero, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/Shell";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listTools } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { getUseCasePages } from "@/lib/use-cases";

export const metadata = pageMetadata({
  title: "AI Tool Use Cases",
  description: "Compare AI and SaaS tools by recurring small-business use case, including setup, privacy, workflow fit, and free-plan reality.",
  path: "/use-cases/"
});

export default async function UseCasesPage() {
  const tools = await listTools();
  const useCases = getUseCasePages(tools);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          title: "AI Tool Use Cases",
          description: "Compare AI and SaaS tools by recurring small-business use case.",
          path: "/use-cases/"
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          useCases.map((useCase) => ({
            name: useCase.label,
            href: `/use-cases/${useCase.slug}/`,
            description: `${useCase.tools.length} tools mapped to ${useCase.label.toLowerCase()}.`
          })),
          "AI tool use cases"
        )}
      />
      <PageHero
        eyebrow="Use cases"
        title="AI tools by real business use case"
        description="Start from the task people actually search for, then compare tools that can help with that job across setup effort, privacy, free-plan limits, and workflow fit."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <VerdictBox title="Why this matters">
          Use-case hubs help WorkWise avoid generic listicles. A page only appears here when multiple tools support the task,
          which keeps the site useful and avoids thin programmatic pages.
        </VerdictBox>
        <div className="mt-10">
          <SectionHeader
            eyebrow="Browse"
            title="Use-case hubs"
            description="These pages are generated from structured tool records and only published when there is enough overlap to make comparison useful."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((useCase) => (
              <Link key={useCase.slug} href={`/use-cases/${useCase.slug}/`} className="rounded-md border border-line bg-white p-5 shadow-sm hover:border-brand">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-ink">{useCase.label}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      Compare tools for {useCase.label.toLowerCase()} with buyer-focused notes, implementation fit, and related workflow links.
                    </p>
                  </div>
                  <Badge>{useCase.tools.length} tools</Badge>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {useCase.tools.slice(0, 4).map((tool) => (
                    <Badge key={tool.slug}>{tool.name}</Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
