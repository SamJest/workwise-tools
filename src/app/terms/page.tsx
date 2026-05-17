import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages.terms.title, description: staticPages.terms.description, path: "/terms/" });

export default function TermsPage() {
  return <StaticPage page={staticPages.terms} />;
}
