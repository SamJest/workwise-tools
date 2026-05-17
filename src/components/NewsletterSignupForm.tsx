"use client";

import { Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterSignupForm({ placement }: { placement: string }) {
  return (
    <form
      className="flex w-full max-w-md gap-2"
      action="/contact/"
      onSubmit={() => {
        trackEvent({
          event: "newsletter_submit",
          label: "Newsletter placeholder",
          placement
        });
      }}
    >
      <label className="sr-only" htmlFor={`email-${placement}`}>
        Email
      </label>
      <input
        id={`email-${placement}`}
        name="email"
        type="email"
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-md px-3 py-2 text-ink"
      />
      <button className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">
        <Mail className="h-4 w-4" aria-hidden="true" />
        Join
      </button>
    </form>
  );
}
