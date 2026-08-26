import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/config/siteConfig";
import { locales, isLocale, ogLocale, htmlLang } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${dict.site.tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.site.description,
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: dict.site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: dict.site.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <AnnouncementBar lang={lang} />
          <Header lang={lang} />
          {children}
          <Footer lang={lang} />
          <CartDrawer lang={lang} />
        </CartProvider>
      </body>
    </html>
  );
}
