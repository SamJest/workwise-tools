import { StaticPage } from "@/components/StaticPage";
import { staticPages } from "@/lib/static-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: staticPages.contact.title, description: staticPages.contact.description, path: "/contact/" });

export default function ContactPage() {
  return <StaticPage page={staticPages.contact} showContactForm />;
}
