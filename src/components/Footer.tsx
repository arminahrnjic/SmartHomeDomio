import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  const columns = [
    {
      title: dict.footer.company,
      links: [
        { href: `/${lang}/o-nama`, label: dict.nav.about },
        { href: `/${lang}#blog`, label: dict.nav.blog },
      ],
    },
    {
      title: dict.footer.productsCol,
      links: [{ href: `/${lang}/proizvodi`, label: dict.footer.allProducts }],
    },
  ];

  const legalLinks = [
    { href: `/${lang}/uslovi-koristenja`, label: dict.footer.legal.terms },
    { href: `/${lang}/politika-privatnosti`, label: dict.footer.legal.privacy },
    { href: `/${lang}/politika-povrata`, label: dict.footer.legal.refund },
  ];

  return (
    <footer className="w-full border-t border-border bg-bg px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold tracking-tight text-text">{siteConfig.name}</span>
          <p className="max-w-xs text-sm text-text-muted">{dict.site.tagline}</p>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text">{column.title}</span>
            {column.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-6xl text-center text-[11px] text-text-muted/70">
        {dict.footer.portfolioNote}
      </p>
    </footer>
  );
}
