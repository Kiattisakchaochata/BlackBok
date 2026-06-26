import type { Metadata, Viewport } from "next";
import "./globals.css";

import Analytics from "@/components/site/Analytics";
import SiteChrome from "@/components/site/SiteChrome";

import { SITE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "รับทำเว็บไซต์",
    "รับทำเว็บไซต์บริษัท",
    "รับทำเว็บไซต์ SEO",
    "ระบบ CRM",
    "Lead Management",
    "Digital Marketing",
    "The Black Bok",
  ],
  alternates: {
    canonical: SITE.domain,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.brandColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd();
  const web = websiteJsonLd();

  return (
    <html lang="th">
      <body className="min-h-dvh flex flex-col">
        <Analytics />

        <script
          id="jsonld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />

        <script
          id="jsonld-web"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }}
        />

        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}