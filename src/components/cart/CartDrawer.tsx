"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { submitToSheet } from "@/lib/submitToSheet";
import type { CartItem } from "@/types/cart";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { formatPrice } from "@/i18n/currency";

function itemDetails(item: CartItem) {
  const variants = item.selections.map((s) => s.optionLabel).join(", ");
  const addons = item.addons.map((a) => a.label).join(", ");
  return { variants, addons };
}

export function CartDrawer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const prevItemCount = useRef(items.length);

  // CartDrawer ostaje montiran cijelu sesiju (u root layoutu), pa "success" stanje
  // ostaje i nakon zatvaranja korpe. Ako korisnik nakon uspješne narudžbe doda nešto
  // novo, resetuj status — inače bi vidio staru poruku "Hvala" umjesto nove korpe.
  useEffect(() => {
    if (status === "success" && items.length > prevItemCount.current) {
      setStatus("idle");
      setEmail("");
    }
    prevItemCount.current = items.length;
  }, [items.length, status]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  async function handleCheckout(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      await submitToSheet({
        type: "order",
        items: items.map((item) => {
          const { variants, addons } = itemDetails(item);
          return {
            product: item.productName,
            variants,
            addons,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.unitPrice * item.quantity,
          };
        }),
        total: totalPrice,
        email,
      });
      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      // `inert` (ne aria-hidden) — kad je korpa zatvorena, cijeli drawer ostaje montiran u DOM-u
      // (vidi komentar iznad) ali sadrži fokusabilne elemente (dugme za zatvaranje, linkove).
      // aria-hidden na kontejneru sa fokusabilnom djecom je WCAG 4.1.2 greška (aria-hidden-focus)
      // jer tastatura i dalje može doći do njih iako su vizuelno/za AT sakriveni. inert i vizuelno
      // sakriva iz accessibility stabla i uklanja iz tab reda/klika u isto vrijeme.
      inert={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.cart.title}
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-bg shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold text-text">{dict.cart.title}</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label={dict.cart.closeAria}
            className="text-text-muted transition-colors hover:text-text"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-base font-medium text-text">{dict.cart.thankYou}</p>
            <p className="text-sm text-text-muted">{dict.cart.willContact.replace("{email}", email)}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-text-muted">{dict.cart.empty}</p>
            <Link
              href={`/${lang}/proizvodi`}
              onClick={closeCart}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              {dict.cart.browse}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-5">
                {items.map((item) => {
                  const { variants, addons } = itemDetails(item);
                  return (
                    <li key={item.cartItemId} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bg-alt">
                        {item.image ? (
                          <Image src={item.image} alt={item.productName} fill sizes="80px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-alt to-border">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-primary/40">
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <circle cx="9" cy="10.5" r="2" />
                              <path d="m5 17 4.5-4.5a2 2 0 0 1 2.8 0L19 19" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold text-text">{item.productName}</span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId)}
                            aria-label={dict.cart.removeAria}
                            className="text-text-muted transition-colors hover:text-text"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M6 6l12 12M18 6 6 18" />
                            </svg>
                          </button>
                        </div>

                        {variants && <span className="text-xs text-text-muted">{variants}</span>}
                        {addons && <span className="text-xs text-text-muted">+ {addons}</span>}

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              aria-label={dict.cart.decreaseAria}
                              className="flex h-5 w-5 items-center justify-center text-text-muted hover:text-text"
                            >
                              −
                            </button>
                            <span className="w-4 text-center text-sm font-medium text-text">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              aria-label={dict.cart.increaseAria}
                              className="flex h-5 w-5 items-center justify-center text-text-muted hover:text-text"
                            >
                              +
                            </button>
                          </div>
                          <span data-testid="cart-line-total" className="text-sm font-semibold text-text">
                            {formatPrice(item.unitPrice * item.quantity, lang)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-border px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-text-muted">{dict.cart.subtotal}</span>
                <span data-testid="cart-subtotal" className="text-2xl font-bold tracking-tight text-text">
                  {formatPrice(totalPrice, lang)}
                </span>
              </div>

              <form onSubmit={handleCheckout} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dict.cart.emailPlaceholder}
                  aria-label={dict.cart.emailAria}
                  className="w-full rounded-full border border-border bg-bg px-5 py-3.5 text-base text-text outline-none placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-all hover:scale-[1.01] hover:bg-primary-hover disabled:opacity-70"
                >
                  {status === "loading" ? dict.cart.submitting : dict.cart.submit}
                </button>
              </form>

              {status === "error" && (
                <p className="text-sm text-text-muted">{dict.cart.error}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
