import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function VideoSection({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {dict.videoSection.heading}
          </h2>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-text to-text/80">
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/videos/curtain-robot-demo.mp4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
