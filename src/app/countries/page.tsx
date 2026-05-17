import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { listCountries, toolsForCountry } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best AI Tools by Country",
  description: "Country-specific AI software guides with currency, terminology, privacy notes, and local business context.",
  path: "/countries/"
});

export default async function CountriesPage() {
  const countries = await listCountries();
  const toolCounts = new Map(
    await Promise.all(countries.map(async (country) => [country.slug, (await toolsForCountry(country.slug)).length] as const))
  );

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ title: "Best AI Tools by Country", description: "Country-specific AI software guides with currency, terminology, privacy notes, and local business context.", path: "/countries/" })} />
      <JsonLd data={itemListJsonLd(countries.map((country) => ({ name: country.name, href: `/countries/${country.slug}/`, description: `${country.currency} · ${country.region || "country guide"}` })), "AI tools by country")} />
      <PageHero
        eyebrow="Country guides"
        title="AI tool guides by country"
        description="Prioritise English-speaking markets with country-specific currency, terminology, privacy, and profession context."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {countries.map((country) => (
          <Link key={country.slug} href={`/countries/${country.slug}/`} className="rounded-md border border-line bg-white p-5 hover:border-brand">
            <p className="text-sm font-semibold text-brand">{country.currency} · {toolCounts.get(country.slug) ?? 0} tools</p>
            <h2 className="mt-2 text-xl font-bold text-ink">{country.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{country.terminologyNotes.join(", ")}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
