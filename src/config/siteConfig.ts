export const BRAND_NAME = "Domio";

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
  // Nema još mail domene ni pravih društvenih profila — dodati contact/social ovdje
  // (i vratiti odgovarajuće linkove u Footer/AnnouncementBar/O nama) kad budu spremni.
};
