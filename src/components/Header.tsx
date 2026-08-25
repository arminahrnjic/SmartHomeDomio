import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { CartButton } from "@/components/cart/CartButton";

const NAV_LINKS = [
  { href: "/proizvodi", label: "Proizvodi" },
  { href: "/o-nama", label: "O nama" },
  { href: "/#blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-text">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
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
          <CartButton />
        </div>
      </div>
    </header>
  );
}
