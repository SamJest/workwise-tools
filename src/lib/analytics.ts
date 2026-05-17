"use client";

export type AnalyticsEventName =
  | "outbound_click"
  | "newsletter_submit"
  | "free_tool_copy"
  | "free_tool_reset";

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  route?: string;
  label?: string;
  targetUrl?: string;
  toolSlug?: string;
  placement?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(payload: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  const enriched = {
    ...payload,
    route: payload.route || window.location.pathname
  };

  window.gtag?.("event", enriched.event, {
    event_label: enriched.label,
    link_url: enriched.targetUrl,
    tool_slug: enriched.toolSlug,
    placement: enriched.placement,
    ...enriched.metadata
  });

  window.plausible?.(toPlausibleName(enriched.event), {
    props: {
      label: enriched.label,
      targetUrl: enriched.targetUrl,
      toolSlug: enriched.toolSlug,
      placement: enriched.placement,
      ...enriched.metadata
    }
  });

  const body = JSON.stringify(enriched);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  });
}

function toPlausibleName(event: AnalyticsEventName) {
  return event
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
