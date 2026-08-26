import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_NAME } from "@/config/siteConfig";
import { isLocale, type Locale } from "@/i18n/locales";

const CONTENT: Record<
  Locale,
  {
    metaDescription: string;
    heading: string;
    intro: string;
    whyHeading: string;
    whyParagraph1: string;
    whyParagraph2: string;
  }
> = {
  bs: {
    metaDescription:
      "Zašto postojimo i šta nas pokreće — tim koji lično testira svaki uređaj prije nego što ga preporuči.",
    heading: "Mir u glavi. To gradimo.",
    intro:
      "{brand} postoji zbog jedne jednostavne ideje: dom bi trebao brinuti manje, a pružati više sigurnosti i vremena. Ne prodajemo uređaje — prodajemo osjećaj da je sve pod kontrolom, čak i kad niste tu.",
    whyHeading: "Zašto {brand} postoji",
    whyParagraph1:
      "Previše porodica, studenata i vlasnika apartmana brine se o stvarima koje ne bi trebale oduzimati vrijeme — jesu li zavjese zatvorene, je li neko provjerio dom, da li gost zna kako da se snađe. Pravimo proizvode koji te sitne brige uklanjaju, bez skupe ugradnje i bez komplikovanih uputstava.",
    whyParagraph2:
      "Iza {brand} stoji tim koji lično testira svaki uređaj prije nego što ga preporuči — ne stavljamo u ponudu ništa što sami ne bismo koristili u svom domu.",
  },
  en: {
    metaDescription:
      "Why we exist and what drives us — a team that personally tests every device before recommending it.",
    heading: "Peace of mind. That's what we're building.",
    intro:
      "{brand} exists because of one simple idea: a home should demand less worry and give back more security and time. We don't sell devices — we sell the feeling that everything is under control, even when you're not there.",
    whyHeading: "Why {brand} exists",
    whyParagraph1:
      "Too many families, students and apartment owners worry about things that shouldn't take up their time — whether the curtains are closed, whether someone checked the home, whether a guest knows how to find their way around. We build products that remove those small worries, without expensive installation or complicated instructions.",
    whyParagraph2:
      "Behind {brand} is a team that personally tests every device before recommending it — we don't offer anything we wouldn't use in our own home.",
  },
  de: {
    metaDescription:
      "Warum es uns gibt und was uns antreibt — ein Team, das jedes Gerät persönlich testet, bevor es empfohlen wird.",
    heading: "Sorgenfreiheit. Das bauen wir.",
    intro:
      "{brand} gibt es wegen einer einfachen Idee: Ein Zuhause sollte weniger Sorgen bereiten und mehr Sicherheit und Zeit schenken. Wir verkaufen keine Geräte — wir verkaufen das Gefühl, dass alles unter Kontrolle ist, auch wenn Sie nicht da sind.",
    whyHeading: "Warum es {brand} gibt",
    whyParagraph1:
      "Zu viele Familien, Studierende und Wohnungsbesitzer sorgen sich um Dinge, die keine Zeit kosten sollten — ob die Vorhänge geschlossen sind, ob jemand nach dem Zuhause gesehen hat, ob ein Gast sich zurechtfindet. Wir entwickeln Produkte, die diese kleinen Sorgen beseitigen, ohne teure Installation und ohne komplizierte Anleitungen.",
    whyParagraph2:
      "Hinter {brand} steht ein Team, das jedes Gerät persönlich testet, bevor es es empfiehlt — wir bieten nichts an, das wir nicht selbst in unserem eigenen Zuhause verwenden würden.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: CONTENT[lang].heading,
    description: CONTENT[lang].metaDescription,
  };
}

export default async function ONamaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = CONTENT[lang];

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full bg-bg px-6 py-24">
        <div className="animate-fade-in-up mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-text">
            {c.heading}
          </h1>
          <p className="text-lg text-text-muted sm:text-xl">
            {c.intro.replace("{brand}", BRAND_NAME)}
          </p>
        </div>
      </section>

      <section className="w-full bg-bg-alt px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {c.whyHeading.replace("{brand}", BRAND_NAME)}
          </h2>
          <p className="text-base text-text-muted sm:text-lg">{c.whyParagraph1}</p>
          <p className="text-base text-text-muted sm:text-lg">
            {c.whyParagraph2.replace("{brand}", BRAND_NAME)}
          </p>
        </div>
      </section>
    </main>
  );
}
