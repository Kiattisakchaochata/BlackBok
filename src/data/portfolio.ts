export type PortfolioItem = {
  id: string;
  title: string;
  category: "Landing" | "Website" | "System" | "Tracking";
  summary: string;
  image: string; // path in /public
  stack: string[];
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Landing Page ยิงแอด (Lead Generation)",
    category: "Landing",
    summary: "หน้า Landing + Thank You + Event Tracking เพื่อวัด Conversion และทำ Retargeting",
    image: "/portfolio/portfolio-1.jpg",
    stack: ["Next.js", "SEO", "GA4", "GTM", "FB Pixel"],
  },
  {
    id: "p2",
    title: "เว็บไซต์บริษัท (SEO Ready)",
    category: "Website",
    summary: "โครงสร้าง SEO + OpenGraph แชร์สวย + sitemap/robots พร้อมทำอันดับ",
    image: "/portfolio/portfolio-2.jpg",
    stack: ["Next.js", "Tailwind", "OpenGraph", "Schema"],
  },
  {
    id: "p3",
    title: "ระบบหลังบ้าน Dashboard",
    category: "System",
    summary: "Admin/CRUD/Permissions/Report และเชื่อม API ตาม requirement",
    image: "/portfolio/portfolio-3.jpg",
    stack: ["Node.js", "API", "Dashboard", "CRUD"],
  },
  {
    id: "p4",
    title: "Tracking & Analytics Setup",
    category: "Tracking",
    summary: "ติดตั้ง Pixel/GA4/GTM + ตั้ง Event/Conversion + Report เพื่อ Optimize",
    image: "/portfolio/portfolio-4.jpg",
    stack: ["GA4", "GTM", "FB Pixel", "TikTok Pixel"],
  },
];