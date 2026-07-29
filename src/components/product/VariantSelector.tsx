"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";

export function VariantSelector({ product }: { product: Product }) {
  const controlGroup = product.variant_groups.find((group) => group.id === "control");
  const sizeGroup = product.variant_groups.find((group) => group.id === "size");

  const [controlId, setControlId] = useState(controlGroup?.default ?? "");
  const [sizeId, setSizeId] = useState(sizeGroup?.default ?? "");
  const [addonChecked, setAddonChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(product.addons.map((addon) => [addon.id, addon.default_checked]))
  );
  const [ordered, setOrdered] = useState(false);

  const selectedControl = controlGroup?.options.find((option) => option.id === controlId);
  const selectedSize = sizeGroup?.options.find((option) => option.id === sizeId);

  const totalPrice = useMemo(() => {
    const controlPrice = selectedControl?.price_km ?? 0;
    const sizePrice = selectedSize?.price_modifier_km ?? 0;
    const addonsPrice = product.addons.reduce(
      (sum, addon) => sum + (addonChecked[addon.id] ? addon.price_km : 0),
      0
    );
    return controlPrice + sizePrice + addonsPrice;
  }, [selectedControl, selectedSize, addonChecked, product.addons]);

  return (
    <div className="flex flex-col gap-8">
      {controlGroup && (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-text">{controlGroup.label}</span>
          <div className="flex flex-col gap-3 sm:flex-row">
            {controlGroup.options.map((option) => {
              const selected = option.id === controlId;
              const isRecommended = option.recommended;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setControlId(option.id)}
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
                  <span className="mt-1 text-sm font-medium text-text">{option.price_km} KM</span>
                  {!isRecommended && (
                    <span className="mt-1 text-xs text-text-muted/80">
                      Bez mogućnosti kontrole na daljinu preko telefona
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizeGroup && (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-text">{sizeGroup.label}</span>
          <div className="flex gap-3">
            {sizeGroup.options.map((option) => {
              const selected = option.id === sizeId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSizeId(option.id)}
                  className={`flex-1 rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${
                    selected
                      ? "border-text/40 bg-bg-alt text-text"
                      : "border-border text-text-muted hover:bg-bg-alt"
                  }`}
                >
                  {option.label}
                  {option.price_modifier_km ? ` (+${option.price_modifier_km} KM)` : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                  {addon.label} <span className="font-normal text-text-muted">+{addon.price_km} KM</span>
                </span>
                <span className="text-xs text-text-muted">{addon.description}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-text-muted">Ukupno</span>
          <span className="text-3xl font-bold tracking-tight text-text">{totalPrice} KM</span>
        </div>

        {ordered ? (
          <p className="rounded-xl bg-bg-alt px-5 py-4 text-sm font-medium text-text">
            Hvala! Vaš preorder je zabilježen — javićemo vam se uskoro.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setOrdered(true)}
            className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-all hover:scale-[1.01] hover:bg-primary-hover"
          >
            Naruči odmah (Preorder)
          </button>
        )}

        {product.preorder_note && (
          <p className="text-xs text-text-muted">{product.preorder_note}</p>
        )}
      </div>
    </div>
  );
}
