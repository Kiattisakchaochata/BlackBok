import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Analytics from "@/components/site/Analytics";
import FloatingContact from "@/components/site/FloatingContact";

import { SITE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} — ${SITE.description}`,
  applicationName: SITE.name,
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
        <Navbar />

        <main className="flex-1 min-h-[calc(100dvh-74px)] pt-[74px] md:min-h-[calc(100dvh-72px)] md:pt-[72px]">
          {children}
        </main>

        <Footer />
        <FloatingContact />

        <Script
          id="jsonld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <Script
          id="jsonld-web"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }}
        />
      </body>
    </html>
  );
}