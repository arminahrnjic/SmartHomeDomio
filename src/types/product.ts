export interface VariantOption {
  id: string;
  label: string;
  sublabel?: string;
  price_km?: number;
  price_modifier_km?: number;
  recommended?: boolean;
  downgrade_note?: string;
  images?: string[];
}

export interface VariantGroup {
  id: string;
  label: string;
  default: string;
  options: VariantOption[];
}

export interface Addon {
  id: string;
  label: string;
  description: string;
  price_km: number;
  default_checked: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  short_description: string;
  features: string[];
  variant_groups: VariantGroup[];
  addons: Addon[];
  specs: Record<string, string>;
  images: string[];
  status: "preorder" | "available" | "coming-soon";
  preorder_note?: string;
}

export function getStartingPrice(product: Product): number {
  return product.variant_groups.reduce((total, group) => {
    const cheapest = Math.min(
      ...group.options.map((option) => option.price_km ?? option.price_modifier_km ?? 0)
    );
    return total + cheapest;
  }, 0);
}
