import { PageHero } from "./Blocks";

export function StaticPage({
  page,
  showContactForm = false
}: {
  page: { title: string; description: string; body: readonly string[] };
  showContactForm?: boolean;
}) {
  return (
    <>
      <PageHero eyebrow="Trust and operations" title={page.title} description={page.description} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-5 text-base leading-8 text-muted">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {showContactForm ? (
          <form className="mt-8 grid gap-4 rounded-md border border-line bg-white p-5">
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Email
              <input name="email" type="email" className="rounded-md border border-line px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Message
              <textarea name="message" rows={5} className="rounded-md border border-line px-3 py-2 font-normal" />
            </label>
            <button className="w-fit rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white">Send placeholder</button>
          </form>
        ) : null}
      </section>
    </>
  );
}
