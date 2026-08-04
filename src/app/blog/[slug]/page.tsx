import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { CoverArt } from "@/components/blog/CoverArt";
import { siteConfig } from "@/config/siteConfig";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      locale: "bs_BA",
      siteName: siteConfig.name,
      title: post.title,
      description: post.excerpt,
      images: [`/blog/${slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/blog/${slug}/opengraph-image`],
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("bs-BA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <article className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-3 text-sm text-text-muted">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mb-8 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-tight text-text">
            {post.title}
          </h1>

          <CoverArt theme={post.theme} size="lg" className="mb-10 h-64 w-full rounded-2xl" />

          <div
            className="prose-domio"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </section>
    </main>
  );
}
