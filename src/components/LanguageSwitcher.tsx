"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, withLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const dict = getDictionary(lang);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as Locale;
    router.push(withLocale(pathname, next));
  }

  return (
    <label className="relative flex items-center">
      <span className="sr-only">{dict.languageSwitcher.label}</span>
      <select
        value={lang}
        onChange={handleChange}
        aria-label={dict.languageSwitcher.label}
        className="cursor-pointer appearance-none rounded-full border border-border bg-bg py-1.5 pl-3 pr-7 text-sm font-medium text-text-muted outline-none transition-colors hover:text-text"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-2 text-text-muted"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
