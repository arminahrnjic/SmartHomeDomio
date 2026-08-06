import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { siteConfig } from "@/config/siteConfig";

const ALL_PRODUCTS = products as Product[];

function getProduct(id: string) {
  return ALL_PRODUCTS.find((product) => product.id === id);
}

function getExistingImages(images: string[]) {
  return images.filter((image) => fs.existsSync(path.join(process.cwd(), "public", image)));
}

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};

  const images = getExistingImages(product.images);
  // Nema pravih fotografija za ovaj proizvod jos -> koristi generisanu brend OG sliku sa root nivoa.
  const ogImages = images.length > 0 ? images : ["/opengraph-image"];

  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      type: "website",
      locale: "bs_BA",
      siteName: siteConfig.name,
      title: product.name,
      description: product.short_description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.short_description,
      images: ogImages,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const images = getExistingImages(product.images);

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
          <ProductGallery images={images} alt={product.name} />

          <div className="flex flex-col gap-6">
            {product.badge && (
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}
            <div className="flex flex-col gap-3">
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text">
                {product.name}
              </h1>
              <p className="text-lg text-text-muted">{product.tagline}</p>
              <p className="text-base text-text-muted">{product.short_description}</p>
            </div>

            <ul className="flex flex-col gap-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-text">
                  <span className="text-primary">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <VariantSelector product={product} image={images[0]} />
          </div>
        </div>
      </section>

      <section className="w-full bg-bg-alt px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-xl font-semibold text-text">Specifikacije</h2>
          <dl className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-sm text-text-muted capitalize">{key.replace(/_/g, " ")}</dt>
                <dd className="text-sm font-medium text-text">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
