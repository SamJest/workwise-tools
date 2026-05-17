import type { Metadata } from "next";
import { AlertTriangle, Database, FileInput, ListChecks, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/Blocks";
import { getSeedData } from "@/lib/data";
import { buildSeoRoutes } from "@/lib/route-registry";

export const metadata: Metadata = {
  title: "Admin Operations",
  description: "Internal content operations dashboard for the PSEO platform.",
  robots: {
    index: false,
    follow: false
  }
};

const checks = [
  { command: "npm run data:validate", label: "Validate seed shape" },
  { command: "npm run data:duplicates", label: "Find duplicate slugs" },
  { command: "npm run data:missing", label: "Report missing fields" },
  { command: "npm run links:check", label: "Check internal references" },
  { command: "npm run data:stale", label: "Find stale records" },
  { command: "npm run content:quality", label: "Score page quality" },
  { command: "npm run content:refresh-queue", label: "Prioritise refreshes" },
  { command: "npm run monetisation:report", label: "Review monetisation gaps" },
  { command: "npm run seo:audit", label: "Audit SEO routes" },
  { command: "npm run free-tools:audit", label: "Audit free tools" }
];

export default function AdminPage() {
  const data = getSeedData();
  const routes = buildSeoRoutes(data);
  const indexableRoutes = routes.filter((route) => route.quality.indexable);
  const noindexRoutes = routes.filter((route) => !route.quality.indexable);
  const affiliateTools = data.tools.filter((tool) => tool.affiliateAvailable);
  const missingAffiliateUrls = affiliateTools.filter((tool) => !tool.affiliateUrl);

  return (
    <>
      <PageHero
        eyebrow="Internal ops"
        title="Admin and content operations"
        description="A noindex foundation for managing data quality, refresh queues, imports, affiliate setup, and launch checks."
      />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 flex-none" aria-hidden="true" />
            <p>
              This is an internal placeholder, not an authenticated CMS. Keep it behind platform auth, middleware, or a private deployment
              before production use.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard icon={<Database className="h-5 w-5" />} label="Tools" value={data.tools.length} />
          <MetricCard icon={<ShieldCheck className="h-5 w-5" />} label="Indexable routes" value={indexableRoutes.length} />
          <MetricCard icon={<AlertTriangle className="h-5 w-5" />} label="Noindex routes" value={noindexRoutes.length} />
          <MetricCard icon={<FileInput className="h-5 w-5" />} label="Affiliate gaps" value={missingAffiliateUrls.length} />
        </div>

        <section className="rounded-md border border-line bg-white p-6">
          <div className="flex items-center gap-3">
            <ListChecks className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-ink">Operational checks</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checks.map((check) => (
              <div key={check.command} className="rounded-md border border-line bg-panel p-4">
                <p className="font-semibold text-ink">{check.label}</p>
                <code className="mt-2 block rounded-md bg-white px-3 py-2 text-sm text-muted">{check.command}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <OpsPanel
            title="Import and export"
            rows={[
              "npm run data:export -- exports/seed-export.json",
              "npm run data:import -- tools imports/tools.csv imported-tools.json",
              "npm run db:import -- imported-tools.json",
              "npm run data:validate"
            ]}
          />
          <OpsPanel
            title="Monetisation readiness"
            rows={[
              `${affiliateTools.length} tools flagged affiliate-ready`,
              `${missingAffiliateUrls.length} affiliate-ready tools need affiliateUrl`,
              "Set NEXT_PUBLIC_AFFILIATE_CAMPAIGN to control outbound UTM campaign values"
            ]}
          />
        </section>

        <div className="rounded-md border border-line bg-white p-5 text-sm leading-6 text-muted">
          Detailed workflow notes live in <code className="rounded-md bg-panel px-2 py-1 text-ink">docs/data-operations.md</code>.
        </div>
      </section>
    </>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="flex items-center gap-2 text-brand">{icon}</div>
      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

function OpsPanel({ title, rows }: { title: string; rows: string[] }) {
  return (
    <section className="rounded-md border border-line bg-white p-6">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {rows.map((row) => (
          <li key={row} className="rounded-md bg-panel p-3">
            {row.startsWith("npm ") ? <code>{row}</code> : row}
          </li>
        ))}
      </ul>
    </section>
  );
}
