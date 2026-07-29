import products from "@data/products.json";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

const FEATURED = products as Product[];

export function FeaturedProducts() {
  return (
    <section className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            Izdvojeni proizvodi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
