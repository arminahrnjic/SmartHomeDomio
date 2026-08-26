import type { Locale } from "./locales";

// Bosnia's currency board permanently pegs 1 EUR = 1.95583 BAM (KM) — fixed by law since the
// KM was introduced, does not fluctuate. Safe to hardcode, unlike the USD rate below.
export const KM_PER_EUR = 1.95583;

// EUR/USD is a live market rate, NOT a fixed peg — this is a snapshot looked up 2026-08-26
// (EUR/USD ~1.1673). Prices shown in USD will drift from the real market over time; update
// this constant if that drift becomes noticeable. Same caveat as the KM/USD rate already used
// in the landed-cost pricing methodology in CLAUDE.md.
const USD_PER_EUR = 1.1673;

export type Currency = "KM" | "EUR" | "USD";

export const currencyByLocale: Record<Locale, Currency> = {
  bs: "KM",
  en: "USD",
  de: "EUR",
};

const CURRENCY_FORMATTERS: Record<"EUR" | "USD", Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
};

/**
 * Converts a KM amount (the canonical price stored in products.json and in cart/order state)
 * into the display currency for `locale` and formats it. KM stays the source of truth
 * everywhere else (cart totals sent to the Google Sheet, etc.) — only the on-page price text
 * changes with the language.
 */
export function formatPrice(amountKm: number, locale: Locale): string {
  const currency = currencyByLocale[locale];

  if (currency === "KM") {
    return `${Math.round(amountKm)} KM`;
  }

  const eur = amountKm / KM_PER_EUR;
  const amount = currency === "EUR" ? eur : eur * USD_PER_EUR;
  return CURRENCY_FORMATTERS[currency].format(amount);
}

/** Same as formatPrice but prefixes a "+" for add-on / upcharge display, e.g. "+$12.34". */
export function formatPriceDelta(amountKm: number, locale: Locale): string {
  return `+${formatPrice(amountKm, locale)}`;
}
