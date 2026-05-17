import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { listAlternativeSets } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best AI Tool Alternatives",
  description: "Find alternatives to popular AI and SaaS tools by pricing, workflow fit, and use case.",
  path: "/alternatives/"
});

export default async function AlternativesPage() {
  const alternativeSets = await listAlternativeSets();

  return (
    <>
      <PageHero eyebrow="Alternatives" title="AI tool alternatives" description="Switching-intent pages for users comparing replacements and lower-cost options." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {alternativeSets.map((set) => (
          <Link key={set.slug} href={`/alternatives/${set.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">{set.candidateSlugs.length} candidates</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{set.baseToolName} alternatives</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{set.reason}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
