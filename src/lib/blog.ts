import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { CoverTheme } from "@/components/blog/CoverArt";
import type { Locale } from "@/i18n/locales";

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  theme: CoverTheme;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

const READING_TIME_UNIT: Record<Locale, string> = {
  bs: "min čitanja",
  en: "min read",
  de: "Min. Lesezeit",
};

function blogDir(locale: Locale): string {
  return path.join(BLOG_ROOT, locale);
}

function readSlugs(locale: Locale): string[] {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function estimateReadingTime(text: string, locale: Locale): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} ${READING_TIME_UNIT[locale]}`;
}

function readMeta(slug: string, locale: Locale): BlogPostMeta | undefined {
  const filePath = path.join(blogDir(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    theme: (data.theme as CoverTheme) ?? "home",
    readingTime: estimateReadingTime(content, locale),
  };
}

export function getAllPosts(locale: Locale): BlogPostMeta[] {
  return readSlugs(locale)
    .map((slug) => readMeta(slug, locale))
    .filter((post): post is BlogPostMeta => post !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | undefined {
  const filePath = path.join(blogDir(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const meta = readMeta(slug, locale);
  if (!meta) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return {
    ...meta,
    contentHtml: marked.parse(content, { async: false }),
  };
}
