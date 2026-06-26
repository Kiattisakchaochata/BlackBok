import type { Metadata } from "next";

export const SITE = {
  name: "THE BLACK BOK",
  tagline: "THE BUSINESS 100%",
  description: "Digital Marketing Website",

  domain: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  brandColor: "#4388C6",
  locale: "th_TH",

  phone: "+66657151099",
  email: "ck.complete@gmail.com",
  address: "Bangkok, Thailand",
};
export function buildMetadata(params: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const base = new URL(SITE.domain);
  const url = new URL(params.path ?? "/", base).toString();
  const ogImageUrl = new URL(params.ogImage ?? "/opengraph-image", base).toString();

  return {
    title: params.title,
    description: params.description,
    metadataBase: base,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: params.title,
      description: params.description,
      locale: SITE.locale,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: [ogImageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.tagline,
    url: SITE.domain,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address,
      addressCountry: "TH",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.domain}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
export function articleJsonLd(post: {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  description?: string;
}) {
  const url = `${SITE.domain}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.description || post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE.name,
      alternateName: SITE.tagline,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      alternateName: SITE.tagline,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}