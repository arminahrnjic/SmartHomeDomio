import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { CartButton } from "@/components/cart/CartButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";

export function Header({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  const navLinks = [
    { href: `/${lang}/proizvodi`, label: dict.nav.products },
    { href: `/${lang}/o-nama`, label: dict.nav.about },
    { href: `/${lang}#blog`, label: dict.nav.blog },
  ];

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="text-lg font-bold tracking-tight text-text">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <CartButton lang={lang} />
          <MobileNav lang={lang} navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
