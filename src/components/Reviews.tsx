import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function Reviews({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section className="w-full bg-bg px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
          {dict.reviews.heading}
        </h2>
        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">{dict.reviews.body}</p>
      </div>
    </section>
  );
}
