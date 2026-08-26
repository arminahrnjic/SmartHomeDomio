export const locales = ["bs", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bs";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  bs: "Bosanski",
  en: "English",
  de: "Deutsch",
};

// next/font-generated og:locale values
export const ogLocale: Record<Locale, string> = {
  bs: "bs_BA",
  en: "en_US",
  de: "de_DE",
};

// BCP 47 tags used for <html lang> and Date formatting
export const htmlLang: Record<Locale, string> = {
  bs: "bs",
  en: "en",
  de: "de",
};

// Used by Intl.DateTimeFormat / toLocaleDateString for blog post dates
export const dateLocale: Record<Locale, string> = {
  bs: "bs-BA",
  en: "en-US",
  de: "de-DE",
};

/** Every string that appears on the site in more than one language. */
export type Localized = Record<Locale, string>;

export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

/** Swap the locale segment of a path, e.g. ("/en/proizvodi/x", "de") -> "/de/proizvodi/x" */
export function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}
