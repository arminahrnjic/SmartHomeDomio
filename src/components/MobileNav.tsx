"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function MobileNav({
  lang,
  navLinks,
}: {
  lang: Locale;
  navLinks: { href: string; label: string }[];
}) {
  const dict = getDictionary(lang);
  const [isOpen, setIsOpen] = useState(false);

  // Meni se zatvara eksplicitno: klik na link (onClick ispod), Escape, ili klik na overlay.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    // md:hidden na cijelom wrapperu — kad se ekran proširi na desktop, i dugme i otvoreni
    // panel nestaju automatski (CSS), bez potrebe za dodatnim resize event listenerom.
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? dict.header.closeMenuAria : dict.header.menuAria}
        className="text-text-muted transition-colors hover:text-text"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {isOpen &&
        // Portal na document.body — header ima backdrop-blur-md, a backdrop-filter na pretku
        // (kao i filter/transform) u CSS-u pravi novi containing block za position:fixed djecu,
        // pa bi "fixed" overlay unutar header-a bio ograničen na header-ovu (64px) visinu umjesto
        // cijelog viewporta. Portal to zaobilazi renderujući izvan header-ovog DOM stabla.
        createPortal(
          <>
            <div
              onClick={() => setIsOpen(false)}
              aria-hidden
              className="fixed inset-0 top-16 z-40 bg-black/20"
            />
            <nav
              id="mobile-nav"
              aria-label={dict.header.menuAria}
              className="animate-fade-in-down fixed top-16 right-0 left-0 z-50 flex flex-col border-b border-border bg-bg px-6 shadow-lg"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-border py-4 text-base font-medium text-text last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </>,
          document.body
        )}
    </div>
  );
}
