import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { getStartingPrice, type Product } from "@/types/product";
import { getDictionary } from "@/i18n/dictionary";
import { t, type Locale } from "@/i18n/locales";
import { formatPrice } from "@/i18n/currency";

function getExistingImage(images: string[]) {
  return images.find((image) => fs.existsSync(path.join(process.cwd(), "public", image)));
}

export function ProductCard({ product, lang }: { product: Product; lang: Locale }) {
  const dict = getDictionary(lang);
  const image = getExistingImage(product.images);
  const name = t(product.name, lang);

  return (
    <Link
      href={`/${lang}/proizvodi/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-b from-bg-alt to-bg">
        {image ? (
          <Image
            src={image}
            alt={name}
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
            {t(product.badge, lang)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-semibold text-text">{name}</h3>
        <p className="text-sm text-text-muted">{t(product.tagline, lang)}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-base font-semibold text-text">
            {dict.productCard.from} {formatPrice(getStartingPrice(product), lang)}
          </span>
          <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
            {dict.productCard.view}
          </span>
        </div>
      </div>
    </Link>
  );
}
