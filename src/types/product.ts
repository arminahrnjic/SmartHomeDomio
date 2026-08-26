import type { Localized } from "@/i18n/locales";

export interface VariantOption {
  id: string;
  label: Localized;
  sublabel?: Localized;
  price_km?: number;
  price_modifier_km?: number;
  recommended?: boolean;
  downgrade_note?: Localized;
  images?: string[];
}

export interface VariantGroup {
  id: string;
  label: Localized;
  default: string;
  options: VariantOption[];
}

export interface Addon {
  id: string;
  label: Localized;
  description: Localized;
  price_km: number;
  default_checked: boolean;
}

export interface Product {
  id: string;
  name: Localized;
  tagline: Localized;
  badge?: Localized;
  short_description: Localized;
  features: Localized[];
  variant_groups: VariantGroup[];
  addons: Addon[];
  specs: Record<string, Localized>;
  images: string[];
  status: "preorder" | "available" | "coming-soon";
  preorder_note?: Localized;
}

export function getStartingPrice(product: Product): number {
  return product.variant_groups.reduce((total, group) => {
    const cheapest = Math.min(
      ...group.options.map((option) => option.price_km ?? option.price_modifier_km ?? 0)
    );
    return total + cheapest;
  }, 0);
}
