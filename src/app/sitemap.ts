import type { MetadataRoute } from "next";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { siteConfig } from "@/config/siteConfig";

const ALL_PRODUCTS = products as Product[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/proizvodi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/o-nama`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${siteConfig.url}/proizvodi/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
