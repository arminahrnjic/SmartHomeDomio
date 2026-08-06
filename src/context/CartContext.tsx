"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "domio_cart";
const EMPTY_CART: CartItem[] = [];

let cartSnapshot: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function getSnapshot(): CartItem[] {
  if (cartSnapshot === null) {
    cartSnapshot = readFromStorage();
  }
  return cartSnapshot;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setCart(next: CartItem[]) {
  cartSnapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Korpa se ne može sačuvati (blokiran localStorage) — i dalje radi u memoriji za ovu posjetu.
  }
  listeners.forEach((listener) => listener());
}

function buildCartItemId(
  productId: string,
  selections: CartItem["selections"],
  addons: CartItem["addons"]
) {
  const selectionKey = selections
    .map((s) => `${s.groupId}:${s.optionId}`)
    .sort()
    .join("|");
  const addonKey = addons
    .map((a) => a.addonId)
    .sort()
    .join("|");
  return `${productId}__${selectionKey}__${addonKey}`;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartItemId" | "quantity">, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback<CartContextValue["addItem"]>((item, quantity = 1) => {
    const cartItemId = buildCartItemId(item.productId, item.selections, item.addons);
    const current = getSnapshot();
    const existing = current.find((i) => i.cartItemId === cartItemId);
    const next = existing
      ? current.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        )
      : [...current, { ...item, cartItemId, quantity }];
    setCart(next);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setCart(getSnapshot().filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    const current = getSnapshot();
    if (quantity <= 0) {
      setCart(current.filter((i) => i.cartItemId !== cartItemId));
      return;
    }
    setCart(current.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setCart(EMPTY_CART), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      openCart,
      closeCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart mora biti korišten unutar CartProvider-a");
  return ctx;
}
