export const BRAND_NAME = "Domio";

// Dok sajt nije deployan na pravu domenu, ovo ostaje placeholder.
// Kad se poveže Vercel (vidi SETUP.md), postaviti NEXT_PUBLIC_SITE_URL na pravi URL.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

// Brand name se ne prevodi po jeziku — tagline/description koji se razlikuju po jeziku
// žive u src/i18n/dictionary.ts (dict.site), ne ovdje.
export const siteConfig = {
  name: BRAND_NAME,
  url: SITE_URL,
  // Nema još mail domene ni pravih društvenih profila — dodati contact/social ovdje
  // (i vratiti odgovarajuće linkove u Footer/AnnouncementBar/O nama) kad budu spremni.
};
