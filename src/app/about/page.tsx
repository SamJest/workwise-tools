import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages.about.title, description: staticPages.about.description, path: "/about/" });

export default function AboutPage() {
  return <StaticPage page={staticPages.about} />;
}
