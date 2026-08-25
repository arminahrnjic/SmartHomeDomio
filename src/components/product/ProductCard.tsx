import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { getStartingPrice, type Product } from "@/types/product";

function getExistingImage(images: string[]) {
  return images.find((image) => fs.existsSync(path.join(process.cwd(), "public", image)));
}

export function ProductCard({ product }: { product: Product }) {
  const image = getExistingImage(product.images);

  return (
    <Link
      href={`/proizvodi/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-b from-bg-alt to-bg">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Placeholder za fotografiju/CGI proizvoda dok materijal nije spreman
          <div className="h-32 w-32 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110" />
        )}
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
  );
}
