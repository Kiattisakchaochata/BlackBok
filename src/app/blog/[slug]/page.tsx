import Script from "next/script";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BLOG_POSTS } from "@/data/blog";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
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

export default function BlogDetailPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const jsonLd = articleJsonLd(post);

  return (
    <section className="container-page page-section">
      <div className="text-sm text-black/60">{post.date}</div>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-black/70">{post.description}</p>

      <div className="mt-8 grid gap-4">
        {post.content.map((para, i) => (
          <p key={i} className="text-black/80 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}