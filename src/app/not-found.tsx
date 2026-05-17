import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-4 text-muted">This guide may not exist yet, or the slug may need to be added to the database.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">
        Return home
      </Link>
    </section>
  );
}
