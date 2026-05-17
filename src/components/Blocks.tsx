import Link from "next/link";
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, ExternalLink, Info, ShieldCheck, Star } from "lucide-react";
import type { PageContentProfile, PageQuality, SiteLink, Tool, Workflow } from "@/types/content";
import { getToolOutboundAction, monetisationLabel } from "@/lib/affiliate";
import { hasDemoDataWarning } from "@/lib/quality";
import { NewsletterSignupForm } from "./NewsletterSignupForm";
import { TrackedOutboundLink } from "./TrackedOutboundLink";

export function PageHero({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-5xl text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ name: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <Link href={item.href} className="hover:text-ink">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function VerdictBox({ title = "Quick verdict", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-teal-200 bg-teal-50 p-5">
      <div className="flex gap-3">
        <Info className="mt-1 h-5 w-5 flex-none text-brand" aria-hidden="true" />
        <div>
          <p className="font-semibold text-ink">{title}</p>
          <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AffiliateDisclosure() {
  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
      <strong>Advertising disclosure:</strong> WorkWise Tools is being built as an ad-supported publisher. Some pages may later include
      display ads, sponsorships, or marked affiliate links, but editorial recommendations should remain based on practical workflow fit.
    </div>
  );
}

export function DemoDataNotice() {
  if (!hasDemoDataWarning()) return null;

  return (
    <div className="rounded-md border border-line bg-white p-4 text-sm leading-6 text-muted">
      <strong className="text-ink">Development notice:</strong> this page is using starter seed data from the build package.
    </div>
  );
}

export function LastUpdated({ date }: { date?: string | null }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted">
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span>{date ? `Last checked ${new Date(date).toLocaleDateString("en-GB")}` : "Pricing and features need verification"}</span>
    </div>
  );
}

export function AuthorBox() {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <p className="font-semibold text-ink">Editorial team</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Guides are built from structured data and reviewed against the editorial policy before publication. Demo seed content is not a
        substitute for live product testing.
      </p>
    </div>
  );
}

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-md border border-line bg-white p-5">
        <p className="font-semibold text-ink">Pros</p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-md border border-line bg-white p-5">
        <p className="font-semibold text-ink">Cons</p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {cons.map((con) => (
            <li key={con} className="flex gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BestForGrid({ items, title = "Best for" }: { items: string[]; title?: string }) {
  if (!items.length) return null;

  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-panel p-4">
            <p className="font-semibold capitalize text-ink">{item}</p>
            <p className="mt-2 text-sm leading-6 text-muted">Use this fit as a starting point, then validate against real workflow needs.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NotBestForBlock({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Not best for</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <AlertCircle className="mt-1 h-4 w-4 flex-none text-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ToolCard({ tool, rank }: { tool: Tool; rank?: number }) {
  const outbound = getToolOutboundAction(tool, "tool-card");

  return (
    <article className="rounded-md border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand">{rank ? `#${rank}` : tool.pricingModel || "AI tool"}</p>
          <h3 className="mt-2 text-xl font-bold text-ink">
            <Link href={`/ai-tools/${tool.slug}/`}>{tool.name}</Link>
          </h3>
        </div>
        {tool.affiliateAvailable ? <SponsoredBadge label="Partner-ready" /> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{tool.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.freePlanAvailable ? <Badge>Free plan</Badge> : null}
        {tool.trialAvailable ? <Badge>Trial</Badge> : null}
        {tool.categories.slice(0, 2).map((category) => (
          <Badge key={category}>{category.replaceAll("-", " ")}</Badge>
        ))}
      </div>
      <Link href={`/ai-tools/${tool.slug}/`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
        View guide
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
      {outbound.href ? (
        <TrackedOutboundLink
          href={outbound.href}
          label={outbound.label}
          toolSlug={tool.slug}
          placement="tool-card"
          rel={outbound.rel}
          target="_blank"
          className="ml-4 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
        >
          {outbound.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </TrackedOutboundLink>
      ) : null}
    </article>
  );
}

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool, index) => (
        <ToolCard key={tool.slug} tool={tool} rank={index + 1} />
      ))}
    </div>
  );
}

export function ComparisonTable({ tools }: { tools: Tool[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="bg-panel text-left text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">Tool</th>
              <th className="px-4 py-3 font-semibold">Pricing</th>
              <th className="px-4 py-3 font-semibold">Best for</th>
              <th className="px-4 py-3 font-semibold">Limitations</th>
              <th className="px-4 py-3 font-semibold">Disclosure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tools.map((tool) => (
              <tr key={tool.slug}>
                <td className="px-4 py-4 font-semibold text-ink">
                  <Link href={`/ai-tools/${tool.slug}/`}>{tool.name}</Link>
                </td>
                <td className="px-4 py-4 text-muted">{tool.pricingModel || "Verify pricing"}</td>
                <td className="px-4 py-4 text-muted">{tool.bestFor.slice(0, 2).join(", ")}</td>
                <td className="px-4 py-4 text-muted">{tool.notBestFor[0] || "Not yet reviewed"}</td>
                <td className="px-4 py-4 text-muted">{tool.affiliateAvailable ? "Affiliate-ready" : "No affiliate flag"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingSummary({ tool }: { tool: Tool }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Pricing summary</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Metric label="Pricing model" value={tool.pricingModel || "Verify"} />
        <Metric label="Starting price" value={tool.startingPrice === null ? "Verify" : `${tool.currency} ${tool.startingPrice}`} />
        <Metric label="Free/trial" value={[tool.freePlanAvailable ? "Free plan" : null, tool.trialAvailable ? "Trial" : null].filter(Boolean).join(" + ") || "Not flagged"} />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Pricing is intentionally conservative in the MVP. Do not publish exact claims until the vendor page has been checked and
        `lastCheckedAt` is updated.
      </p>
    </section>
  );
}

export function VendorCtaCard({ tool, placement = "tool-detail-sidebar" }: { tool: Tool; placement?: string }) {
  const outbound = getToolOutboundAction(tool, placement);

  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">Vendor CTA</p>
          <p className="mt-2 text-lg font-bold text-ink">{monetisationLabel(tool)}</p>
        </div>
        {outbound.sponsored ? <SponsoredBadge /> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">
        {outbound.missingReason || "Outbound links are centralised so affiliate tracking and disclosures can be managed consistently."}
      </p>
      {outbound.href ? (
        <TrackedOutboundLink
          href={outbound.href}
          label={outbound.label}
          toolSlug={tool.slug}
          placement={placement}
          rel={outbound.rel}
          target="_blank"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          {outbound.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </TrackedOutboundLink>
      ) : (
        <Link
          href="/media-kit/"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-brand"
        >
          Configure placement
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export function UseCaseWinnerTable({ rows }: { rows: Array<{ useCase: string; winner: string; why: string }> }) {
  if (!rows.length) return null;

  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Best tool by use case</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="text-left text-ink">
            <tr>
              <th className="py-3 pr-4 font-semibold">Use case</th>
              <th className="px-4 py-3 font-semibold">Best fit</th>
              <th className="px-4 py-3 font-semibold">Why</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={`${row.useCase}-${row.winner}`}>
                <td className="py-4 pr-4 font-semibold capitalize text-ink">{row.useCase}</td>
                <td className="px-4 py-4 text-muted">{row.winner}</td>
                <td className="px-4 py-4 text-muted">{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function WorkflowSteps({ workflow }: { workflow: Workflow }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Recommended workflow</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{workflow.problem}</p>
      <ol className="mt-5 space-y-4">
        {workflow.steps.map((step, index) => (
          <li key={`${workflow.slug}-${step.title}`} className="rounded-md bg-panel p-4">
            <p className="font-semibold text-ink">{index + 1}. {step.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
      {workflow.prompts[0] ? (
        <pre className="mt-5 whitespace-pre-wrap rounded-md border border-line bg-white p-4 text-sm leading-6 text-ink">{workflow.prompts[0]}</pre>
      ) : null}
    </section>
  );
}

export function PromptExamples({ prompts }: { prompts: string[] }) {
  if (!prompts.length) return null;

  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Prompt examples</h2>
      <div className="mt-5 space-y-4">
        {prompts.map((prompt) => (
          <pre key={prompt} className="whitespace-pre-wrap rounded-md bg-panel p-4 text-sm leading-6 text-ink">{prompt}</pre>
        ))}
      </div>
    </section>
  );
}

export function TemplateDownloads({ templates }: { templates: string[] }) {
  if (!templates.length) return null;

  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Template downloads</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {templates.map((template) => (
          <div key={template} className="rounded-md border border-line bg-panel p-4">
            <p className="font-semibold text-ink">{template}</p>
            <p className="mt-2 text-sm leading-6 text-muted">Download handling is staged for the MVP; connect this to a file or email gate later.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DataFreshnessNotice({ date }: { date?: string | null }) {
  return (
    <div className="rounded-md border border-line bg-white p-5 text-sm leading-6 text-muted">
      <div className="flex gap-3">
        <ShieldCheck className="mt-1 h-5 w-5 flex-none text-brand" aria-hidden="true" />
        <div>
          <p className="font-semibold text-ink">Data freshness</p>
          <p className="mt-1">
            {date
              ? `This record was last checked on ${new Date(date).toLocaleDateString("en-GB")}.`
              : "This record does not yet have a verified last-checked date and should remain conservative."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MethodologyBox({ children }: { children?: React.ReactNode }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">Methodology</h2>
      <div className="mt-3 text-sm leading-6 text-muted">
        {children || (
          <p>
            Recommendations are generated from structured fields including profession fit, country support, pricing model,
            use cases, pros, cons, and internal-link coverage. Production pages should add hands-on checks before launch.
          </p>
        )}
      </div>
    </section>
  );
}

export function RelatedPages({ links }: { links: SiteLink[] }) {
  if (!links.length) return null;

  return (
    <div className="rounded-md border border-line bg-white p-5">
      <p className="font-semibold text-ink">Related guides</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md border border-line p-4 text-sm hover:border-brand">
            <span className="font-semibold text-ink">{link.title}</span>
            {link.description ? <span className="mt-1 block text-muted">{link.description}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FAQBlock({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded-md border border-line bg-white p-5">
          <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
          <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function NewsletterCTA() {
  return (
    <div className="rounded-md bg-ink p-6 text-white">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-bold">Get new tool guides and refresh notes</p>
          <p className="mt-2 text-sm text-white/75">Newsletter integration is staged; wire this to your provider before launch.</p>
        </div>
        <NewsletterSignupForm placement="newsletter-cta" />
      </div>
    </div>
  );
}

export function QualityWarning({ quality }: { quality: PageQuality }) {
  if (quality.indexable || !hasDemoDataWarning()) return null;

  return (
    <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
      <strong>Development quality warning:</strong> this page is marked noindex. Reasons: {quality.reasons.join(" ")}
    </div>
  );
}

export function ContentQualityPanel({ profile }: { profile: PageContentProfile }) {
  if (!hasDemoDataWarning()) return null;

  return (
    <div className="rounded-md border border-line bg-white p-5 text-sm leading-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold text-ink">Content quality profile</p>
          <p className="mt-1 text-muted">
            {profile.pageType} · score {profile.quality.score} · {profile.quality.indexable ? "indexable" : "noindex"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.valueBlocks.map((block) => (
            <Badge key={block}>{block.replaceAll("-", " ")}</Badge>
          ))}
        </div>
      </div>
      {profile.uniqueAngles.length ? (
        <div className="mt-4">
          <p className="font-semibold text-ink">Unique angles</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {profile.uniqueAngles.map((angle) => <li key={angle}>{angle}</li>)}
          </ul>
        </div>
      ) : null}
      {profile.dataWarnings.length ? (
        <div className="mt-4 rounded-md bg-amber-50 p-3 text-amber-950">
          <p className="font-semibold">Data warnings</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {profile.dataWarnings.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function SponsoredBadge({ label = "Sponsored" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">
      <Star className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-line bg-panel px-2 py-1 text-xs font-medium capitalize text-muted">{children}</span>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-lg font-bold text-ink">{value}</p>
    </div>
  );
}
