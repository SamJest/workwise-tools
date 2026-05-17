import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages.privacy.title, description: staticPages.privacy.description, path: "/privacy/" });

export default function PrivacyPage() {
  return <StaticPage page={staticPages.privacy} />;
}
