export interface CartSelection {
  groupId: string;
  groupLabel: string;
  optionId: string;
  optionLabel: string;
  price: number;
}

export interface CartAddon {
  addonId: string;
  label: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  image?: string;
  selections: CartSelection[];
  addons: CartAddon[];
  unitPrice: number;
  quantity: number;
}
