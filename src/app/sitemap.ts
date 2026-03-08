import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // หน้า static
  const routes = ["/", "/services", "/contact", "/thank-you", "/blog", "/about", "/pricing", "/portfolio"].map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  // หน้า blog
  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${SITE.domain}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}