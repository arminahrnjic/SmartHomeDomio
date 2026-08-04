import type { Metadata } from "next";
import products from "@data/products.json";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

const ALL_PRODUCTS = products as Product[];

export const metadata: Metadata = {
  title: "Proizvodi",
  description: "Svi proizvodi u ponudi — pametni uređaji za dom, dostupni za preorder.",
};

export default function ProizvodiPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text">
              Svi proizvodi
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
