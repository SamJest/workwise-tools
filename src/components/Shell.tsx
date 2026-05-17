import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { WorkWiseLogo } from "@/components/Logo";
import { siteConfig } from "@/lib/seo";

const navItems = [
  { href: "/ai-tools/", label: "AI tools" },
  { href: "/professions/", label: "Professions" },
  { href: "/countries/", label: "Countries" },
  { href: "/comparisons/", label: "Comparisons" },
  { href: "/workflows/", label: "Workflows" },
  { href: "/free-tools/", label: "Free tools" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-ink">
          <WorkWiseLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/free-tools/ai-tool-recommender/"
          aria-label="Recommend tools"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-brand sm:px-4"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Recommend tools</span>
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-ink">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Practical AI and SaaS guides for better workflows, smarter tool choices, and useful software comparisons.
          </p>
        </div>
        <FooterColumn
          title="Research"
          links={[
            { href: "/ai-tools/", label: "Tool directory" },
            { href: "/comparisons/", label: "Comparisons" },
            { href: "/alternatives/", label: "Alternatives" },
            { href: "/prompts/", label: "Prompts" }
          ]}
        />
        <FooterColumn
          title="Trust"
          links={[
            { href: "/editorial-policy/", label: "Editorial policy" },
            { href: "/how-we-review-ai-tools/", label: "How we review" },
            { href: "/affiliate-disclosure/", label: "Advertising disclosure" },
            { href: "/privacy/", label: "Privacy policy" },
            { href: "/cookies/", label: "Cookie policy" },
            { href: "/terms/", label: "Terms of use" },
            { href: "/contact/", label: "Contact" }
          ]}
        />
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
