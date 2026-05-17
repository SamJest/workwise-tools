import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: staticPages["editorial-policy"].title,
  description: staticPages["editorial-policy"].description,
  path: "/editorial-policy/"
});

export default function EditorialPolicyPage() {
  return <StaticPage page={staticPages["editorial-policy"]} />;
}
