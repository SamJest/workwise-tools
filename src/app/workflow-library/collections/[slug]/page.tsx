import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Breadcrumbs, NewsletterCTA, PageHero, RelatedPages, VerdictBox } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { getAutomationTemplate } from "@/lib/automation-os";
import { getTool } from "@/lib/data";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getWorkflowCollection, workflowCollections, workflowRecipeLinks } from "@/lib/workflow-library";

export function generateStaticParams() {
  return workflowCollections.map((collection) => ({ slug: collection.slug }));
}

export const dynamicParams = false;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const collection = getWorkflowCollection(slug);
  if (!collection) return {};
  return pageMetadata({ title: collection.title, description: collection.primaryPain, path: `/workflow-library/collections/${collection.slug}/` });
}

export default async function WorkflowCollectionPage({ params }: RouteProps) {
  const { slug } = await params;
  const collection = getWorkflowCollection(slug);
  if (!collection) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Workflow Library", href: "/workflow-library/" },
    { name: collection.title, href: `/workflow-library/collections/${collection.slug}/` }
  ];
  const recipeLinks = workflowRecipeLinks(collection.recipeSlugs);
  const toolLinks = collection.toolSlugs
    .map((toolSlug) => getTool(toolSlug))
    .filter(Boolean)
    .map((tool) => ({ title: tool!.name, href: `/ai-tools/${tool!.slug}/`, description: tool!.summary }));
  const templateLinks = collection.automationTemplateSlugs
    .map((templateSlug) => getAutomationTemplate(templateSlug))
    .filter(Boolean)
    .map((template) => ({ title: template!.title, href: `/automation-os/templates/${template!.slug}/`, description: template!.trigger }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={collectionPageJsonLd({ title: collection.title, description: collection.primaryPain, path: `/workflow-library/collections/${collection.slug}/` })} />
      <JsonLd data={itemListJsonLd(recipeLinks.map((link) => ({ name: link.title, href: link.href, description: link.description })), collection.title)} />
      <PageHero eyebrow="Workflow collection" title={collection.title} description={collection.primaryPain}>
        <Breadcrumbs items={breadcrumbs} />
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <VerdictBox title={collection.audience}>
            Start with the recipe that matches the daily failure your team can see, then use the related free tool before changing software.
          </VerdictBox>
          <section className="grid gap-4 md:grid-cols-2">
            {recipeLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md border border-line bg-white p-5 hover:border-brand">
                <p className="text-sm font-semibold text-brand">Workflow recipe</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{link.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{link.description}</p>
              </Link>
            ))}
          </section>
          <RelatedPages
            links={[
              ...toolLinks.slice(0, 4),
              ...templateLinks.slice(0, 2),
              ...collection.freeToolSlugs.map((freeToolSlug) => ({
                title: freeToolSlug.replaceAll("-", " "),
                href: `/free-tools/${freeToolSlug}/`,
                description: "Run the related free tool."
              }))
            ]}
          />
        </div>
        <aside className="space-y-5">
          <section className="rounded-md border border-line bg-white p-5">
            <h2 className="font-semibold text-ink">Collection signals</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{collection.recipeSlugs.length} recipes</Badge>
              <Badge>{collection.toolSlugs.length} tools</Badge>
              <Badge>{collection.freeToolSlugs.length} free tools</Badge>
            </div>
          </section>
          <RelatedPages links={collection.internalLinks} />
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </>
  );
}
