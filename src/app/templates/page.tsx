import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { listPromptTemplates } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Templates",
  description: "Starter template pages tied to prompts, workflows, and professional tasks.",
  path: "/templates/"
});

export default async function TemplatesPage() {
  const templates = await listPromptTemplates();

  return (
    <>
      <PageHero eyebrow="Templates" title="AI templates" description="Template landing pages use the prompt-template data model until dedicated downloadable assets are added." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {templates.map((template) => (
          <Link key={template.slug} href={`/templates/${template.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">Template-ready prompt</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{template.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{template.task}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
