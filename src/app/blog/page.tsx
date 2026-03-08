import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BLOG_POSTS } from "@/data/blog";

export const metadata = buildMetadata({
  title: "บทความ | SEO & Digital Marketing | The Black Bok",
  description:
    "บทความความรู้เรื่องทำเว็บไซต์ ทำระบบ SEO และยิงแอด Facebook/TikTok แบบ Full Funnel เพื่อให้ธุรกิจโตแบบวัดผลได้",
  path: "/blog",
  ogImage: "/opengraph-image",
});

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="container-page page-section">
      <h1 className="text-4xl font-extrabold tracking-tight">บทความ</h1>
      <p className="mt-3 text-black/70">
        รวมความรู้สำหรับธุรกิจ: ทำเว็บให้ค้นหาเจอ + ยิงแอดให้คุ้ม + วัดผลเป็นระบบ
      </p>

      <div className="mt-10 grid gap-4">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-3xl border border-black/10 p-6 bg-white">
            <div className="text-sm text-black/60">{p.date}</div>
            <h2 className="mt-2 text-2xl font-extrabold">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-black/70">{p.description}</p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full px-3 py-1 border border-black/10"
                  style={{ background: "rgba(67,136,198,0.08)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <Link href={`/blog/${p.slug}`} className="btn-outline">
                อ่านต่อ
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}