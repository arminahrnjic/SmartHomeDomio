import products from "@data/products.json";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

const FEATURED = products as unknown as Product[];

export function FeaturedProducts({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {dict.featuredProducts.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
