// Ime brenda još nije odlučeno (vidi CLAUDE.md).
// Kad se odluči finalno ime, promijeni ga samo ovdje.
export const BRAND_NAME = "BRAND_NAME";

// Dok sajt nije deployan na pravu domenu, ovo ostaje placeholder.
// Kad se poveže Vercel (vidi SETUP.md), postaviti NEXT_PUBLIC_SITE_URL na pravi URL.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const siteConfig = {
  name: BRAND_NAME,
  tagline: "Vaš dom, pod vašom kontrolom.",
  description:
    "Pametni uređaji za dom — kontrolišite rasvjetu, zavjese i sigurnost odakle god se nalazite.",
  url: SITE_URL,
  locale: "bs-BA",
  contact: {
    email: "info@example.com",
  },
  // Placeholder linkovi — zamijeniti stvarnim nalozima kad budu otvoreni.
  social: {
    instagram: "#",
    tiktok: "#",
  },
};
