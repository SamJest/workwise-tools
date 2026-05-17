"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedOutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label: string;
  toolSlug?: string;
  placement?: string;
};

export function TrackedOutboundLink({
  href,
  label,
  toolSlug,
  placement,
  onClick,
  children,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackEvent({
          event: "outbound_click",
          label,
          targetUrl: href,
          toolSlug,
          placement
        });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
