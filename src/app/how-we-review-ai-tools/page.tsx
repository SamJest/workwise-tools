import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: staticPages["how-we-review-ai-tools"].title,
  description: staticPages["how-we-review-ai-tools"].description,
  path: "/how-we-review-ai-tools/"
});

export default function HowWeReviewPage() {
  return <StaticPage page={staticPages["how-we-review-ai-tools"]} />;
}
