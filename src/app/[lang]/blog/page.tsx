import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.blogPage.heading,
    description: dict.blogPage.subheading,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = getAllPosts(lang);

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text">
              {dict.blogPage.heading}
            </h1>
            <p className="mt-4 text-base text-text-muted">{dict.blogPage.subheading}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
