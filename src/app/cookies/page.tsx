import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages.cookies.title, description: staticPages.cookies.description, path: "/cookies/" });

export default function CookiesPage() {
  return <StaticPage page={staticPages.cookies} />;
}
