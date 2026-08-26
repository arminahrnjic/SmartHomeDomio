import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_NAME } from "@/config/siteConfig";
import { isLocale, type Locale } from "@/i18n/locales";

const CONTENT: Record<
  Locale,
  {
    metaDescription: string;
    title: string;
    lastUpdated: string;
    intro: string;
    beforeHeading: string;
    beforePre: string;
    beforeStrong: string;
    beforePost: string;
    cancelHeading: string;
    cancelBody: string;
    paymentHeading: string;
    paymentBody: string;
    deliveryHeading: string;
    deliveryBody: string;
    returnsHeading: string;
    returnsBody: string;
    contactHeading: string;
    contactBody: string;
  }
> = {
  bs: {
    metaDescription: "Kako funkcioniše preorder, otkazivanje i povrat.",
    title: "Preorder i povrat",
    lastUpdated: "Zadnje ažurirano: 25.8.2026.",
    intro:
      "{brand} trenutno prodaje isključivo putem preordera. Ova stranica objašnjava šta to znači u praksi — prije, tokom i poslije narudžbe.",
    beforeHeading: "Prije narudžbe: šta preorder znači",
    beforePre: "Preorder je rezervacija interesa za proizvod, ne odmah potvrđena i naplaćena kupovina. Kad pošaljete narudžbu iz korpe, ona se bilježi kod nas, ali ",
    beforeStrong: "ne naplaćuje se ništa u tom trenutku",
    beforePost: " — sajt trenutno nema aktivno plaćanje. Tim vas kontaktira emailom sa daljim koracima.",
    cancelHeading: "Otkazivanje preordera",
    cancelBody:
      "Pošto se ništa ne naplaćuje pri slanju preordera, možete se predomisliti u bilo kojem trenutku prije nego što se dogovori stvarno plaćanje — jednostavno nam javite (kad kontakt kanal bude dostupan, vidi ispod) da otkažete.",
    paymentHeading: "Kad se aktivira plaćanje",
    paymentBody:
      "Plaćanje i tačan način naplate uvodimo u kasnijoj fazi, nakon što se prva grupna narudžba kod dobavljača potvrdi. Prije nego što se od vas išta naplati, jasno ćemo vas obavijestiti i tražiti vašu potvrdu — ništa se ne dešava automatski.",
    deliveryHeading: "Isporuka",
    deliveryBody:
      "Isporuka počinje 10-15 dana nakon što narudžba bude poslana iz fabrike, prema napomeni na stranici svakog proizvoda. Tačan datum zavisi od toga kad se zatvori trenutna grupna narudžba.",
    returnsHeading: "Povrat nakon isporuke",
    returnsBody:
      "Pravila za povrat nakon što proizvod stvarno stigne do kupca biće detaljno objavljena prije nego što isporuke i naplata zaista počnu — u skladu sa zakonom o zaštiti potrošača u Bosni i Hercegovini (uključujući pravo na odustanak u zakonskom roku za online kupovinu).",
    contactHeading: "Kontakt",
    contactBody: "Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja.",
  },
  en: {
    metaDescription: "How preorder, cancellation and refunds work.",
    title: "Preorder & Refunds",
    lastUpdated: "Last updated: August 25, 2026",
    intro:
      "{brand} currently sells exclusively through preorder. This page explains what that means in practice — before, during and after an order.",
    beforeHeading: "Before ordering: what a preorder means",
    beforePre: "A preorder is a reservation of interest in a product, not an immediately confirmed and paid purchase. When you submit an order from the cart, it's recorded with us, but ",
    beforeStrong: "nothing is charged at that moment",
    beforePost: " — the site currently has no active payment processing. Our team will contact you by email with next steps.",
    cancelHeading: "Cancelling a preorder",
    cancelBody:
      "Since nothing is charged when you submit a preorder, you can change your mind at any point before actual payment is arranged — simply let us know (once a contact channel is available, see below) to cancel.",
    paymentHeading: "When payment gets activated",
    paymentBody:
      "We'll introduce payment and the exact billing method at a later stage, once the first group order with the supplier is confirmed. Before anything is charged to you, we'll clearly notify you and ask for your confirmation — nothing happens automatically.",
    deliveryHeading: "Delivery",
    deliveryBody:
      "Delivery begins 10-15 days after the order is shipped from the factory, per the note on each product's page. The exact date depends on when the current group order closes.",
    returnsHeading: "Returns after delivery",
    returnsBody:
      "Return rules for after a product actually reaches the customer will be published in detail before deliveries and billing actually begin — in accordance with consumer protection law in Bosnia and Herzegovina (including the statutory right of withdrawal for online purchases).",
    contactHeading: "Contact",
    contactBody: "We don't have a public contact email yet — this will be added before the official launch.",
  },
  de: {
    metaDescription: "Wie Vorbestellung, Stornierung und Rückgabe funktionieren.",
    title: "Vorbestellung & Rückgabe",
    lastUpdated: "Zuletzt aktualisiert: 25.8.2026",
    intro:
      "{brand} verkauft derzeit ausschließlich über Vorbestellungen. Diese Seite erklärt, was das in der Praxis bedeutet — vor, während und nach einer Bestellung.",
    beforeHeading: "Vor der Bestellung: was eine Vorbestellung bedeutet",
    beforePre: "Eine Vorbestellung ist eine Interessensreservierung für ein Produkt, kein sofort bestätigter und bezahlter Kauf. Wenn Sie eine Bestellung aus dem Warenkorb absenden, wird sie bei uns erfasst, aber ",
    beforeStrong: "zu diesem Zeitpunkt wird nichts berechnet",
    beforePost: " — die Website hat derzeit keine aktive Zahlungsabwicklung. Unser Team kontaktiert Sie per E-Mail mit den nächsten Schritten.",
    cancelHeading: "Vorbestellung stornieren",
    cancelBody:
      "Da beim Absenden einer Vorbestellung nichts berechnet wird, können Sie es sich jederzeit anders überlegen, bevor eine tatsächliche Zahlung vereinbart wird — teilen Sie uns dies einfach mit (sobald ein Kontaktkanal verfügbar ist, siehe unten), um zu stornieren.",
    paymentHeading: "Wann die Zahlung aktiviert wird",
    paymentBody:
      "Wir führen Zahlung und die genaue Abrechnungsart in einer späteren Phase ein, sobald die erste Sammelbestellung beim Lieferanten bestätigt ist. Bevor Ihnen etwas berechnet wird, informieren wir Sie klar und bitten um Ihre Bestätigung — nichts geschieht automatisch.",
    deliveryHeading: "Lieferung",
    deliveryBody:
      "Die Lieferung beginnt 10-15 Tage, nachdem die Bestellung ab Werk versandt wurde, gemäß dem Hinweis auf der Seite jedes Produkts. Das genaue Datum hängt davon ab, wann die aktuelle Sammelbestellung abgeschlossen wird.",
    returnsHeading: "Rückgabe nach Lieferung",
    returnsBody:
      "Die Rückgaberegeln für die Zeit, nachdem ein Produkt tatsächlich beim Kunden angekommen ist, werden im Detail veröffentlicht, bevor Lieferungen und Abrechnung tatsächlich beginnen — gemäß dem Verbraucherschutzrecht in Bosnien und Herzegowina (einschließlich des gesetzlichen Widerrufsrechts für Online-Käufe).",
    contactHeading: "Kontakt",
    contactBody: "Wir haben derzeit noch keine öffentliche Kontakt-E-Mail — diese wird vor dem offiziellen Start ergänzt.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: CONTENT[lang].title, description: CONTENT[lang].metaDescription };
}

export default async function PolitikaPovrataPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = CONTENT[lang];

  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <article className="mx-auto max-w-2xl">
          <div className="mb-8 text-sm text-text-muted">{c.lastUpdated}</div>

          <h1 className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-tight text-text">
            {c.title}
          </h1>

          <div className="prose-domio">
            <p>{c.intro.replace("{brand}", BRAND_NAME)}</p>

            <h2>{c.beforeHeading}</h2>
            <p>
              {c.beforePre}
              <strong>{c.beforeStrong}</strong>
              {c.beforePost}
            </p>

            <h2>{c.cancelHeading}</h2>
            <p>{c.cancelBody}</p>

            <h2>{c.paymentHeading}</h2>
            <p>{c.paymentBody}</p>

            <h2>{c.deliveryHeading}</h2>
            <p>{c.deliveryBody}</p>

            <h2>{c.returnsHeading}</h2>
            <p>{c.returnsBody}</p>

            <h2>{c.contactHeading}</h2>
            <p>{c.contactBody}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
