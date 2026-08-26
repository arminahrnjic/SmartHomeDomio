"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { t, type Locale } from "@/i18n/locales";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";

export function ProductPurchasePanel({
  product,
  images,
  lang,
  children,
}: {
  product: Product;
  images: string[];
  lang: Locale;
  children?: React.ReactNode;
}) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variant_groups.map((group) => [group.id, group.default]))
  );

  const currentImages = useMemo(() => {
    for (const group of product.variant_groups) {
      const option = group.options.find((o) => o.id === selectedOptions[group.id]);
      if (option?.images && option.images.length > 0) return option.images;
    }
    return images;
  }, [product.variant_groups, selectedOptions, images]);

  return (
    <>
      <ProductGallery images={currentImages} alt={t(product.name, lang)} lang={lang} />

      <div className="flex flex-col gap-6">
        {children}
        <VariantSelector
          product={product}
          image={currentImages[0]}
          lang={lang}
          selectedOptions={selectedOptions}
          onSelectOption={(groupId, optionId) =>
            setSelectedOptions((prev) => ({ ...prev, [groupId]: optionId }))
          }
        />
      </div>
    </>
  );
}
