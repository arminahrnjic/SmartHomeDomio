import Link from "next/link";
import { CoverArt } from "@/components/blog/CoverArt";
import type { BlogPostMeta } from "@/lib/blog";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function BlogCard({ post, lang }: { post: BlogPostMeta; lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-transform hover:scale-[1.02]"
    >
      <CoverArt theme={post.theme} className="h-40 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="text-xs font-medium text-text-muted">{post.readingTime}</span>
        <h3 className="text-base font-semibold text-text">{post.title}</h3>
        <p className="text-sm text-text-muted">{post.excerpt}</p>
        <span className="mt-auto pt-4 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
          {dict.blogCard.readMore}
        </span>
      </div>
    </Link>
  );
}
