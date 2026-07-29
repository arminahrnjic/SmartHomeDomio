import Link from "next/link";
import products from "@data/products.json";
import { getStartingPrice, type Product } from "@/types/product";

const FEATURED = products as Product[];

export function FeaturedProducts() {
  return (
    <section id="proizvodi" className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            Izdvojeni proizvodi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((product) => (
            <Link
              key={product.id}
              href={`/proizvodi/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg"
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-b from-bg-alt to-bg">
                {/* Placeholder za fotografiju/CGI proizvoda dok materijal nije spreman */}
                <div className="h-32 w-32 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110" />
                {product.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="text-lg font-semibold text-text">{product.name}</h3>
                <p className="text-sm text-text-muted">{product.tagline}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-base font-semibold text-text">
                    Od {getStartingPrice(product)} KM
                  </span>
                  <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                    Pogledaj →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
