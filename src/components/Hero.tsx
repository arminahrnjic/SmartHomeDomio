import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function Hero({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-6 py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-alt to-bg"
      />

      <div className="animate-fade-in-up flex max-w-3xl flex-col items-center gap-6">
        <span className="rounded-full border border-border bg-bg-alt px-4 py-1 text-sm font-medium text-text-muted">
          {dict.hero.badge}
        </span>

        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-text">
          {dict.hero.title}
        </h1>

        <p className="max-w-xl text-lg text-text-muted sm:text-xl">{dict.site.description}</p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/${lang}/proizvodi`}
            className="rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-all hover:scale-[1.03] hover:bg-primary-hover"
          >
            {dict.hero.cta1}
          </Link>
          <Link
            href={`/${lang}/proizvodi/smart-curtain-robot`}
            className="rounded-full border border-border px-8 py-3.5 text-base font-medium text-text transition-all hover:scale-[1.03] hover:bg-bg-alt"
          >
            {dict.hero.cta2}
          </Link>
        </div>
      </div>

      <div className="relative mt-16 w-full max-w-xl">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative aspect-square w-full">
          <Image
            src="/products/curtain-robot/1.png"
            alt="Smart Curtain Robot"
            fill
            sizes="(min-width: 640px) 36rem, 90vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
