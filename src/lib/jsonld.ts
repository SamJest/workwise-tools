import { absoluteUrl, siteConfig } from "./seo";

type JsonLd = Record<string, unknown>;

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function softwareJsonLd(tool: {
  name: string;
  summary: string;
  slug: string;
  pricingModel?: string;
  currency?: string;
  startingPrice?: number | null;
  rating?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.summary,
    url: absoluteUrl(`/ai-tools/${tool.slug}/`),
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      priceCurrency: tool.currency ?? "USD",
      price: tool.startingPrice ?? (tool.pricingModel?.includes("free") ? "0" : undefined),
      availability: "https://schema.org/OnlineOnly"
    }
  };
}

export function productJsonLd(tool: {
  name: string;
  summary: string;
  slug: string;
  currency?: string;
  startingPrice?: number | null;
  affiliateAvailable?: boolean;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.summary,
    url: absoluteUrl(`/ai-tools/${tool.slug}/`),
    brand: {
      "@type": "Brand",
      name: tool.name
    },
    offers: {
      "@type": "Offer",
      priceCurrency: tool.currency ?? "USD",
      price: tool.startingPrice ?? undefined,
      url: absoluteUrl(`/ai-tools/${tool.slug}/`),
      availability: "https://schema.org/OnlineOnly"
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Affiliate available",
        value: tool.affiliateAvailable ? "Yes" : "No"
      }
    ]
  };
}

export function itemListJsonLd(items: Array<{ name: string; href: string; description?: string }>, name: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.href),
      name: item.name,
      description: item.description
    }))
  };
}

export function collectionPageJsonLd(page: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: absoluteUrl(siteConfig.logo)
      }
    }
  };
}

export function articleJsonLd(page: {
  title: string;
  description: string;
  path: string;
  dateModified?: string | null;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: absoluteUrl(page.path),
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo)
      }
    },
    dateModified: page.dateModified || new Date().toISOString()
  };
}
