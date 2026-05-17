import type { Tool } from "@/types/content";

export type ToolOutboundAction = {
  href: string | null;
  label: string;
  rel: string;
  sponsored: boolean;
  missingReason?: string;
};

export function getToolOutboundAction(tool: Tool, placement = "tool-card"): ToolOutboundAction {
  const rawUrl = tool.affiliateAvailable && tool.affiliateUrl ? tool.affiliateUrl : tool.websiteUrl;

  if (!rawUrl) {
    return {
      href: null,
      label: "Vendor link pending",
      rel: "nofollow sponsored",
      sponsored: tool.affiliateAvailable || Boolean(tool.isSponsored),
      missingReason: tool.affiliateAvailable
        ? "Affiliate flag is enabled, but no affiliateUrl or websiteUrl is stored yet."
        : "No websiteUrl is stored yet."
    };
  }

  const sponsored = tool.affiliateAvailable || Boolean(tool.isSponsored);

  return {
    href: addTrackingParams(rawUrl, placement),
    label: tool.affiliateAvailable && tool.affiliateUrl ? `Visit ${tool.name}` : `Open ${tool.name}`,
    rel: sponsored ? "nofollow sponsored noopener noreferrer" : "noopener noreferrer",
    sponsored
  };
}

export function monetisationLabel(tool: Tool): string {
  if (tool.isSponsored) return "Sponsored placement";
  if (tool.affiliateAvailable) return "Affiliate-ready";
  return "Editorial listing";
}

export function needsAffiliateSetup(tool: Tool): boolean {
  return tool.affiliateAvailable && !tool.affiliateUrl;
}

function addTrackingParams(rawUrl: string, placement: string): string {
  try {
    const url = new URL(rawUrl);
    const campaign = process.env.NEXT_PUBLIC_AFFILIATE_CAMPAIGN || "pseo_platform";
    const source = process.env.AFFILIATE_DEFAULT_UTM_SOURCE || "workwisetools";
    const medium = process.env.AFFILIATE_DEFAULT_UTM_MEDIUM || "referral";
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    url.searchParams.set("utm_content", placement);
    return url.toString();
  } catch {
    return rawUrl;
  }
}
