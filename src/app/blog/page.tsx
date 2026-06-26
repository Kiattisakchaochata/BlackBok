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
      <div className="max-w-2xl">
        <h1 className="text-[34px] font-extrabold tracking-[-0.03em] text-black md:text-[44px]">
          บทความ
        </h1>

        <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
          รวมความรู้สำหรับธุรกิจ: ทำเว็บให้ค้นหาเจอ + ยิงแอดให้คุ้ม + วัดผลเป็นระบบ
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-[28px] border border-black/6 bg-white/90 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]"
          >
            <div className="text-sm font-medium text-black/45">{post.date}</div>

            <h2 className="mt-2 text-[24px] font-extrabold leading-tight tracking-tight text-black md:text-[28px]">
              <Link href={`/blog/${post.slug}`} className="hover:text-[var(--bb-blue)]">
                {post.title}
              </Link>
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-black/65 md:text-[16px]">
              {post.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--bb-blue)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <Link href={`/blog/${post.slug}`} className="btn-outline">
                อ่านต่อ
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}