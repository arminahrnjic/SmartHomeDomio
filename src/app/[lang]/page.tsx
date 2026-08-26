import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/locales";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HowItWorks } from "@/components/HowItWorks";
import { VideoSection } from "@/components/VideoSection";
import { Reviews } from "@/components/Reviews";
import { BlogPreview } from "@/components/BlogPreview";
import { Newsletter } from "@/components/Newsletter";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Hero lang={lang} />
      <WhyUs lang={lang} />
      <FeaturedProducts lang={lang} />
      <HowItWorks lang={lang} />
      <VideoSection lang={lang} />
      <Reviews lang={lang} />
      <BlogPreview lang={lang} />
      <Newsletter lang={lang} />
    </main>
  );
}
