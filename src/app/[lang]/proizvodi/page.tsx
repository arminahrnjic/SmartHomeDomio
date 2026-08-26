import type { Metadata } from "next";
import { notFound } from "next/navigation";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/locales";

const ALL_PRODUCTS = products as unknown as Product[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.productsPage.heading,
    description: dict.site.description,
  };
}

export default async function ProizvodiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text">
              {dict.productsPage.heading}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
