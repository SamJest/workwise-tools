import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: staticPages["affiliate-disclosure"].title,
  description: staticPages["affiliate-disclosure"].description,
  path: "/affiliate-disclosure/"
});

export default function AffiliateDisclosurePage() {
  return <StaticPage page={staticPages["affiliate-disclosure"]} />;
}
