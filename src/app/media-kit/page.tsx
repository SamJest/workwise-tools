import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages["media-kit"].title, description: staticPages["media-kit"].description, path: "/media-kit/" });

export default function MediaKitPage() {
  return <StaticPage page={staticPages["media-kit"]} />;
}
