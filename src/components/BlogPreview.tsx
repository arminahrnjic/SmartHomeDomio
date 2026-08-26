import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function BlogPreview({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const posts = getAllPosts(lang).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {dict.blogPreview.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/blog`}
            className="text-sm font-medium text-primary transition-transform hover:translate-x-1"
          >
            {dict.blogPreview.readAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
