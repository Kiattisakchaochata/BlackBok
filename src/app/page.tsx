import Script from "next/script";
import { buildMetadata, SITE } from "@/lib/seo";
import Hero from "@/components/site/Hero";
import ServicesGrid from "@/components/site/ServicesGrid";
import CaseStudies from "@/components/site/CaseStudies";
import Testimonials from "@/components/site/Testimonials";
import CTA from "@/components/site/CTA";
import ClientLogos from "@/components/site/ClientLogos";

export const metadata = buildMetadata({
  title: "รับทำเว็บไซต์ รับทำระบบ รับทำ Digital Marketing | The Black Bok",
  description:
    "รับทำเว็บไซต์/ระบบหลังบ้าน/เขียนโปรแกรม พร้อมทำ SEO, ยิงแอด Facebook & TikTok, ติดตั้ง Pixel/GA4/GTM วัดผลได้จริง ให้ค้นหาเจอและเพิ่มยอดขาย",
  path: "/",
  ogImage: "/opengraph-image",
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "บริการของ The Black Bok",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: `${SITE.domain}/services`,
      item: {
        "@type": "Service",
        name: "รับทำเว็บไซต์บริษัท",
        description:
          "ออกแบบและพัฒนาเว็บไซต์บริษัท เว็บไซต์ธุรกิจ และ Landing Page ที่โหลดเร็ว รองรับ SEO และพร้อมใช้งานจริง",
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.domain,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      url: `${SITE.domain}/services`,
      item: {
        "@type": "Service",
        name: "รับทำระบบ CRM และระบบหลังบ้าน",
        description:
          "พัฒนาระบบ CRM, Lead Management, Admin Dashboard และระบบหลังบ้านสำหรับติดตามลูกค้าและงานขาย",
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.domain,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      url: `${SITE.domain}/services`,
      item: {
        "@type": "Service",
        name: "Digital Marketing และ SEO",
        description:
          "วางระบบ SEO, Google Analytics, Google Tag Manager, Facebook Pixel, TikTok Pixel และ Conversion Tracking",
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.domain,
        },
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="ld-home-services"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </>
  );
}