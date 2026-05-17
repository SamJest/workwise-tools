import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { listPromptTemplates } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Prompt Library",
  description: "Prompt templates by profession, task, tool, mistakes to avoid, and related workflows.",
  path: "/prompts/"
});

export default async function PromptsPage() {
  const prompts = await listPromptTemplates();

  return (
    <>
      <PageHero eyebrow="Prompts" title="AI prompt library" description="Reusable prompt pages for profession and task clusters." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {prompts.map((prompt) => (
          <Link key={prompt.slug} href={`/prompts/${prompt.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">{prompt.task}</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{prompt.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{prompt.prompt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
