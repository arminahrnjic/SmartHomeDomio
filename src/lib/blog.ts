import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { CoverTheme } from "@/components/blog/CoverArt";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min čitanja`;
}

function readMeta(slug: string): BlogPostMeta | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    theme: (data.theme as CoverTheme) ?? "home",
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return readSlugs()
    .map((slug) => readMeta(slug))
    .filter((post): post is BlogPostMeta => post !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const meta = readMeta(slug);
  if (!meta) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return {
    ...meta,
    contentHtml: marked.parse(content, { async: false }),
  };
}
