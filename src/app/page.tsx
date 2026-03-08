import { buildMetadata } from "@/lib/seo";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </>
  );
}