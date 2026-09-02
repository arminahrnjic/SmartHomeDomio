"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { getDictionary } from "@/i18n/dictionary";
import { t, type Locale } from "@/i18n/locales";
import { formatPrice, formatPriceDelta } from "@/i18n/currency";

export function VariantSelector({
  product,
  image,
  lang,
  selectedOptions,
  onSelectOption,
}: {
  product: Product;
  image?: string;
  lang: Locale;
  selectedOptions: Record<string, string>;
  onSelectOption: (groupId: string, optionId: string) => void;
}) {
  const dict = getDictionary(lang);
  const { addItem, openCart } = useCart();

  const [addonChecked, setAddonChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(product.addons.map((addon) => [addon.id, addon.default_checked]))
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  const selections = useMemo(
    () =>
      product.variant_groups.map((group) => {
        const option =
          group.options.find((o) => o.id === selectedOptions[group.id]) ?? group.options[0];
        return {
          groupId: group.id,
          groupLabel: t(group.label, lang),
          optionId: option.id,
          optionLabel: t(option.label, lang),
          price: option.price_km ?? option.price_modifier_km ?? 0,
        };
      }),
    [product.variant_groups, selectedOptions, lang]
  );

  const selectedAddons = useMemo(
    () =>
      product.addons
        .filter((addon) => addonChecked[addon.id])
        .map((addon) => ({ addonId: addon.id, label: t(addon.label, lang), price: addon.price_km })),
    [product.addons, addonChecked, lang]
  );

  const unitPrice = useMemo(
    () =>
      selections.reduce((sum, s) => sum + s.price, 0) +
      selectedAddons.reduce((sum, a) => sum + a.price, 0),
    [selections, selectedAddons]
  );

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        productName: t(product.name, lang),
        image,
        selections,
        addons: selectedAddons,
        unitPrice,
      },
      quantity
    );
    setJustAdded(true);
    openCart();
  }

  return (
    <div className="flex flex-col gap-8">
      {product.variant_groups.map((group) => {
        const groupHasRecommended = group.options.some((option) => option.recommended);

        return (
          <div key={group.id} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text">{t(group.label, lang)}</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              {group.options.map((option) => {
                const selected = option.id === selectedOptions[group.id];
                const isRecommended = option.recommended;
                const priceLabel =
                  option.price_km !== undefined
                    ? formatPrice(option.price_km, lang)
                    : option.price_modifier_km
                      ? formatPriceDelta(option.price_modifier_km, lang)
                      : dict.product.included;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelectOption(group.id, option.id)}
                    className={`relative flex flex-1 flex-col gap-1 rounded-xl border px-5 py-4 text-left transition-all ${
                      isRecommended
                        ? selected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-primary/40 bg-primary/[0.02] hover:border-primary"
                        : selected
                          ? "border-text/40 bg-bg-alt"
                          : "border-border bg-bg hover:bg-bg-alt"
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {dict.product.recommended}
                      </span>
                    )}
                    <span
                      className={`text-sm font-semibold ${isRecommended ? "text-text" : "text-text-muted"}`}
                    >
                      {t(option.label, lang)}
                    </span>
                    {option.sublabel && (
                      <span className="text-xs text-text-muted">{t(option.sublabel, lang)}</span>
                    )}
                    <span className="mt-1 text-sm font-medium text-text">{priceLabel}</span>
                    {/* text-text-muted, ne /80 — smanjena opacity je spuštala kontrast
                        ispod WCAG AA 4.5:1 na 12px tekstu (otkriveno accessibility
                        test suite-om 2026-08-28) */}
                    {!isRecommended && groupHasRecommended && option.downgrade_note && (
                      <span className="text-xs text-text-muted">
                        {t(option.downgrade_note, lang)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {product.addons.length > 0 && (
        <div className="flex flex-col gap-3">
          {product.addons.map((addon) => (
            <label
              key={addon.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border px-5 py-4"
            >
              <input
                type="checkbox"
                checked={addonChecked[addon.id] ?? false}
                onChange={(event) =>
                  setAddonChecked((prev) => ({ ...prev, [addon.id]: event.target.checked }))
                }
                className="mt-1 h-4 w-4 accent-primary"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-text">
                  {t(addon.label, lang)}{" "}
                  <span className="font-normal text-text-muted">
                    {formatPriceDelta(addon.price_km, lang)}
                  </span>
                </span>
                <span className="text-xs text-text-muted">{t(addon.description, lang)}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-muted">
              {quantity > 1 ? dict.product.total : dict.product.pricePerUnit}
            </span>
            <span data-testid="product-total-price" className="text-3xl font-bold tracking-tight text-text">
              {formatPrice(unitPrice * quantity, lang)}
            </span>
          </div>
          {quantity > 1 && (
            <span className="text-right text-xs text-text-muted">
              {formatPrice(unitPrice, lang)} {dict.product.pricePerUnitSuffix}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{dict.product.quantity}</span>
          <div className="flex items-center gap-4 rounded-full border border-border px-3 py-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label={dict.product.decreaseAria}
              className="flex h-5 w-5 items-center justify-center text-text-muted hover:text-text"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-medium text-text">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label={dict.product.increaseAria}
              className="flex h-5 w-5 items-center justify-center text-text-muted hover:text-text"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-all hover:scale-[1.01] hover:bg-primary-hover"
        >
          {justAdded ? dict.product.added : dict.product.addToCart}
        </button>

        {product.preorder_note && (
          <p className="text-xs text-text-muted">{t(product.preorder_note, lang)}</p>
        )}
      </div>
    </div>
  );
}
