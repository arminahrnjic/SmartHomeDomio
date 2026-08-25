import type { MetadataRoute } from "next";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { siteConfig } from "@/config/siteConfig";
import { getAllPosts } from "@/lib/blog";

const ALL_PRODUCTS = products as unknown as Product[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/proizvodi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/o-nama`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${siteConfig.url}/proizvodi/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
