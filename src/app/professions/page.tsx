import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listProfessions, toolsForProfession } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best AI Tools by Profession",
  description: "Explore AI tool guides for accountants, recruiters, sales teams, agencies, freelancers, teachers, developers, and more.",
  path: "/professions/"
});

export default async function ProfessionsPage() {
  const professions = await listProfessions();
  const toolCounts = new Map(
    await Promise.all(professions.map(async (profession) => [profession.slug, (await toolsForProfession(profession.slug)).length] as const))
  );

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ title: "Best AI Tools by Profession", description: "AI tool guides for professionals and business teams.", path: "/professions/" })} />
      <JsonLd data={itemListJsonLd(professions.map((profession) => ({ name: profession.name, href: `/professions/${profession.slug}/`, description: profession.commonTasks.join(", ") })), "AI tools by profession")} />
      <PageHero
        eyebrow="Profession guides"
        title="Best AI tools by profession"
        description="Use structured profession data to build useful guides with pain points, task recommendations, workflows, prompts, and tool tables."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {professions.map((profession) => (
          <Link key={profession.slug} href={`/professions/${profession.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">{toolCounts.get(profession.slug) ?? 0} matching tools</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{profession.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{profession.painPoints.slice(0, 3).join(", ")}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
