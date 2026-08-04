import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Savjeti i vodiči o pametnom domu, izborima opreme i praktičnoj upotrebi.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text">
              Sa bloga
            </h1>
            <p className="mt-4 text-base text-text-muted">
              Savjeti i vodiči o pametnom domu — bez žargona, direktno na stvar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
