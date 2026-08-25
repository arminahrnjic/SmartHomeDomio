import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

const COLUMNS = [
  {
    title: "Kompanija",
    links: [
      { href: "/o-nama", label: "O nama" },
      { href: "/#blog", label: "Blog" },
    ],
  },
  {
    title: "Proizvodi",
    links: [{ href: "/proizvodi", label: "Svi proizvodi" }],
  },
];

const LEGAL_LINKS = [
  { href: "/uslovi-koristenja", label: "Uslovi korištenja" },
  { href: "/politika-privatnosti", label: "Politika privatnosti" },
  { href: "/politika-povrata", label: "Preorder i povrat" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-bg px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold tracking-tight text-text">{siteConfig.name}</span>
          <p className="max-w-xs text-sm text-text-muted">{siteConfig.tagline}</p>
        </div>

        {COLUMNS.map((column) => (
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
          © {new Date().getFullYear()} {siteConfig.name}. Sva prava zadržana.
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
