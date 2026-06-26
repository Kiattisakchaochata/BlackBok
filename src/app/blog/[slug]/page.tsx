import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BLOG_POSTS } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

function findPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  return BLOG_POSTS.find(
    (post) =>
      post.slug === slug ||
      post.slug === decodedSlug ||
      encodeURIComponent(post.slug) === slug
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | The Black Bok`,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: "/opengraph-image",
  });
}

function articleJsonLd(post: (typeof BLOG_POSTS)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "The Black Bok",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return notFound();

  const jsonLd = articleJsonLd(post);

  return (
    <section className="container-page page-section">
      <Link
        href="/blog"
        className="text-sm font-semibold text-[var(--bb-blue)] hover:underline"
      >
        ← กลับไปหน้าบทความ
      </Link>

      <article className="mt-6 rounded-[28px] border border-black/6 bg-white/90 p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)] md:p-8">
        <div className="text-sm font-medium text-black/45">{post.date}</div>

        <h1 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[-0.03em] text-black md:text-[44px]">
          {post.title}
        </h1>

        <p className="mt-4 max-w-3xl text-[16px] leading-8 text-black/65 md:text-[18px]">
          {post.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--bb-blue)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-5">
          {post.content.map((para, index) => (
            <p
              key={index}
              className="text-[16px] leading-8 text-black/75 md:text-[17px]"
            >
              {para}
            </p>
          ))}
        </div>
      </article>

      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}