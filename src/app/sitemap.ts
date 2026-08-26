import type { MetadataRoute } from "next";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { siteConfig } from "@/config/siteConfig";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/locales";

const ALL_PRODUCTS = products as unknown as Product[];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) => {
    const base = `${siteConfig.url}/${lang}`;

    const staticRoutes: MetadataRoute.Sitemap = [
      { url: base, changeFrequency: "weekly", priority: 1 },
      { url: `${base}/proizvodi`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/o-nama`, changeFrequency: "monthly", priority: 0.5 },
      { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${base}/uslovi-koristenja`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/politika-privatnosti`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/politika-povrata`, changeFrequency: "yearly", priority: 0.2 },
    ];

    const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
      url: `${base}/proizvodi/${product.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = getAllPosts(lang).map((post) => ({
      url: `${base}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
  });
}
