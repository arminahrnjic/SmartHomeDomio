"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export function VariantSelector({
  product,
  image,
  selectedOptions,
  onSelectOption,
}: {
  product: Product;
  image?: string;
  selectedOptions: Record<string, string>;
  onSelectOption: (groupId: string, optionId: string) => void;
}) {
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
          groupLabel: group.label,
          optionId: option.id,
          optionLabel: option.label,
          price: option.price_km ?? option.price_modifier_km ?? 0,
        };
      }),
    [product.variant_groups, selectedOptions]
  );

  const selectedAddons = useMemo(
    () =>
      product.addons
        .filter((addon) => addonChecked[addon.id])
        .map((addon) => ({ addonId: addon.id, label: addon.label, price: addon.price_km })),
    [product.addons, addonChecked]
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
        productName: product.name,
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
            <span className="text-sm font-semibold text-text">{group.label}</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              {group.options.map((option) => {
                const selected = option.id === selectedOptions[group.id];
                const isRecommended = option.recommended;
                const priceLabel =
                  option.price_km !== undefined
                    ? `${option.price_km} KM`
                    : option.price_modifier_km
                      ? `+${option.price_modifier_km} KM`
                      : "Uključeno";

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
                        Preporučeno
                      </span>
                    )}
                    <span
                      className={`text-sm font-semibold ${isRecommended ? "text-text" : "text-text-muted"}`}
                    >
                      {option.label}
                    </span>
                    {option.sublabel && (
                      <span className="text-xs text-text-muted">{option.sublabel}</span>
                    )}
                    <span className="mt-1 text-sm font-medium text-text">{priceLabel}</span>
                    {!isRecommended && groupHasRecommended && option.downgrade_note && (
                      <span className="text-xs text-text-muted/80">{option.downgrade_note}</span>
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
                  {addon.label}{" "}
                  <span className="font-normal text-text-muted">+{addon.price_km} KM</span>
                </span>
                <span className="text-xs text-text-muted">{addon.description}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-text-muted">Cijena po komadu</span>
          <span className="text-3xl font-bold tracking-tight text-text">{unitPrice} KM</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">Količina</span>
          <div className="flex items-center gap-4 rounded-full border border-border px-3 py-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Smanji količinu"
              className="flex h-5 w-5 items-center justify-center text-text-muted hover:text-text"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-medium text-text">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Povećaj količinu"
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
          {justAdded ? "Dodano u korpu ✓" : "Dodaj u korpu"}
        </button>

        {product.preorder_note && (
          <p className="text-xs text-text-muted">{product.preorder_note}</p>
        )}
      </div>
    </div>
  );
}
