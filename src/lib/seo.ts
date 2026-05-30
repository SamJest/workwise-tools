import type { Metadata } from "next";
import type { PageQuality } from "@/types/content";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "WorkWise Tools",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.workwisetools.com",
  domain: "workwisetools.com",
  logo: "/logo.svg",
  ogImage: "/og-image.svg",
  description:
    "Practical workflow guides for UK tradespeople, small businesses, software choices, prompts, templates, and free calculators."
};

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function canonical(path: string): string {
  return absoluteUrl(path.endsWith("/") ? path : `${path}/`);
}

export function pageMetadata(params: {
  title: string;
  description: string;
  path: string;
  quality?: PageQuality;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string | null;
}): Metadata {
  const indexable = params.quality?.indexable ?? true;
  const normalizedDescription = truncateDescription(params.description);

  return {
    title: params.title,
    description: normalizedDescription,
    alternates: {
      canonical: canonical(params.path)
    },
    openGraph: {
      title: params.title,
      description: normalizedDescription,
      url: canonical(params.path),
      siteName: siteConfig.name,
      type: params.type ?? "website",
      publishedTime: params.publishedTime,
      modifiedTime: params.modifiedTime ?? undefined,
      images: [{ url: absoluteUrl(params.image || siteConfig.ogImage) }]
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: normalizedDescription,
      images: [absoluteUrl(params.image || siteConfig.ogImage)]
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1
      }
    }
  };
}

export function currentYear(): number {
  return new Date().getFullYear();
}

export function truncateDescription(description: string, maxLength = 155): string {
  if (description.length <= maxLength) return description;
  const shortened = description.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : maxLength - 1).trim()}.`;
}

export function normalizePath(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}
