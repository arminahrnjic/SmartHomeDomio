import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_NAME } from "@/config/siteConfig";
import { isLocale, type Locale } from "@/i18n/locales";

interface Section {
  heading: string;
  paragraphs: string[];
}

const CONTENT: Record<
  Locale,
  { metaDescription: string; title: string; lastUpdated: string; intro: string; sections: Section[] }
> = {
  bs: {
    metaDescription: "Uslovi korištenja sajta i pravila preorder narudžbi.",
    title: "Uslovi korištenja",
    lastUpdated: "Zadnje ažurirano: 25.8.2026.",
    intro:
      "Korištenjem sajta {brand} prihvatate uslove opisane na ovoj stranici. Ako se ne slažete sa nekim od njih, molimo vas da ne koristite sajt.",
    sections: [
      {
        heading: "Šta je preorder",
        paragraphs: [
          "Trenutno prodajemo isključivo putem preordera — to znači da narudžba koju napravite predstavlja rezervaciju interesa za proizvod, ne konačnu, naplaćenu kupovinu. U ovom trenutku sajt ne naplaćuje ništa u momentu narudžbe. Nakon što zabilježimo vašu narudžbu, tim vas kontaktira emailom sa daljim koracima (potvrda, rokovi, način plaćanja).",
          "Preorder ne garantuje fiksnu cijenu niti rok isporuke dok se ne potvrdi direktno s vama — cijene i dostupnost mogu se promijeniti do te potvrde, posebno dok se prva grupna narudžba kod dobavljača ne zatvori.",
        ],
      },
      {
        heading: "Cijene",
        paragraphs: [
          "Zvanična cijena svakog proizvoda izražena je u konvertibilnim markama (KM/BAM) i uključuje sve poznate troškove u trenutku objave. Na engleskoj i njemačkoj verziji sajta cijena se dodatno prikazuje i u dolarima (USD) odnosno eurima (EUR) — ovo je informativni preračun radi lakšeg snalaženja, ne posebna cijena; stvarni iznos koji se potvrđuje s vama uvijek je u KM. Zadržavamo pravo izmjene cijena bez prethodne najave, ali izmjena ne utiče na preorder koji je već potvrđen s vaše strane.",
        ],
      },
      {
        heading: "Sadržaj sajta",
        paragraphs: [
          "Tekst, fotografije, dizajn i drugi sadržaj na ovom sajtu pripadaju {brand} ili se koriste uz dozvolu. Sadržaj se ne smije kopirati ili koristiti u komercijalne svrhe bez odobrenja.",
        ],
      },
      {
        heading: "Ograničenje odgovornosti",
        paragraphs: [
          "Trudimo se da su svi opisi proizvoda i informacije na sajtu tačni, ali ne možemo garantovati da su u svakom trenutku potpuno bez greške. U mjeri dozvoljenoj zakonom, {brand} ne odgovara za indirektnu štetu nastalu korištenjem sajta.",
        ],
      },
      {
        heading: "Izmjene ovih uslova",
        paragraphs: [
          "Uslove možemo povremeno ažurirati kako se posao razvija (npr. kad krene stvarna naplata i isporuka). Datum zadnje izmjene uvijek stoji na vrhu ove stranice.",
        ],
      },
      {
        heading: "Mjerodavno pravo",
        paragraphs: ["Ovi uslovi se tumače u skladu sa zakonima Bosne i Hercegovine."],
      },
      {
        heading: "Kontakt",
        paragraphs: ["Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja."],
      },
    ],
  },
  en: {
    metaDescription: "Terms of use for the site and preorder rules.",
    title: "Terms of Use",
    lastUpdated: "Last updated: August 25, 2026",
    intro:
      "By using the {brand} website you accept the terms described on this page. If you disagree with any of them, please do not use the site.",
    sections: [
      {
        heading: "What a preorder is",
        paragraphs: [
          "We currently sell exclusively through preorder — meaning an order you place is a reservation of interest in the product, not a final, paid purchase. At this time the site does not charge anything at the moment of ordering. After we record your order, our team will contact you by email with next steps (confirmation, timelines, payment method).",
          "A preorder does not guarantee a fixed price or delivery date until it is confirmed directly with you — prices and availability may change before that confirmation, especially until the first group order with the supplier closes.",
        ],
      },
      {
        heading: "Prices",
        paragraphs: [
          "The official price of every product is set in convertible marks (KM/BAM) and includes all known costs at the time of publishing. On the English and German versions of the site, the price is also shown converted to US dollars (USD) or euros (EUR) as a convenience reference, not a separate price — the actual amount confirmed with you is always in KM. We reserve the right to change prices without prior notice, but a change does not affect a preorder you have already confirmed.",
        ],
      },
      {
        heading: "Site content",
        paragraphs: [
          "Text, photos, design and other content on this site belong to {brand} or are used with permission. Content may not be copied or used for commercial purposes without authorization.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "We try to keep all product descriptions and information on the site accurate, but we cannot guarantee they are completely error-free at all times. To the extent permitted by law, {brand} is not liable for indirect damage arising from use of the site.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time as the business develops (e.g. once actual billing and delivery begin). The date of the last update always appears at the top of this page.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: ["These terms are interpreted in accordance with the laws of Bosnia and Herzegovina."],
      },
      {
        heading: "Contact",
        paragraphs: ["We don't have a public contact email yet — this will be added before the official launch."],
      },
    ],
  },
  de: {
    metaDescription: "Nutzungsbedingungen der Website und Regeln für Vorbestellungen.",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: 25.8.2026",
    intro:
      "Durch die Nutzung der {brand}-Website akzeptieren Sie die auf dieser Seite beschriebenen Bedingungen. Wenn Sie mit einem der Punkte nicht einverstanden sind, nutzen Sie die Website bitte nicht.",
    sections: [
      {
        heading: "Was eine Vorbestellung bedeutet",
        paragraphs: [
          "Derzeit verkaufen wir ausschließlich über Vorbestellungen — das bedeutet, dass eine von Ihnen aufgegebene Bestellung eine Interessensreservierung für das Produkt darstellt, keinen endgültigen, bezahlten Kauf. Die Website berechnet zum Zeitpunkt der Bestellung derzeit nichts. Nachdem wir Ihre Bestellung erfasst haben, kontaktiert Sie unser Team per E-Mail mit den nächsten Schritten (Bestätigung, Fristen, Zahlungsart).",
          "Eine Vorbestellung garantiert keinen festen Preis und kein festes Lieferdatum, bis dies direkt mit Ihnen bestätigt wird — Preise und Verfügbarkeit können sich bis zu dieser Bestätigung ändern, insbesondere bis die erste Sammelbestellung beim Lieferanten abgeschlossen ist.",
        ],
      },
      {
        heading: "Preise",
        paragraphs: [
          "Der offizielle Preis jedes Produkts wird in konvertiblen Mark (KM/BAM) festgelegt und beinhaltet alle zum Zeitpunkt der Veröffentlichung bekannten Kosten. Auf der englischen und deutschen Version der Website wird der Preis zusätzlich umgerechnet in US-Dollar (USD) bzw. Euro (EUR) angezeigt — das ist ein informativer Richtwert, kein eigenständiger Preis; der tatsächlich mit Ihnen bestätigte Betrag ist immer in KM. Wir behalten uns das Recht vor, Preise ohne vorherige Ankündigung zu ändern, wobei sich eine Änderung nicht auf eine bereits von Ihnen bestätigte Vorbestellung auswirkt.",
        ],
      },
      {
        heading: "Website-Inhalt",
        paragraphs: [
          "Texte, Fotos, Design und andere Inhalte dieser Website gehören {brand} oder werden mit Genehmigung verwendet. Inhalte dürfen ohne Genehmigung nicht kopiert oder kommerziell genutzt werden.",
        ],
      },
      {
        heading: "Haftungsbeschränkung",
        paragraphs: [
          "Wir bemühen uns, alle Produktbeschreibungen und Informationen auf der Website korrekt zu halten, können aber nicht garantieren, dass sie jederzeit vollständig fehlerfrei sind. Im gesetzlich zulässigen Umfang haftet {brand} nicht für indirekte Schäden, die durch die Nutzung der Website entstehen.",
        ],
      },
      {
        heading: "Änderungen dieser Bedingungen",
        paragraphs: [
          "Wir können diese Bedingungen gelegentlich aktualisieren, während sich das Geschäft weiterentwickelt (z. B. sobald die tatsächliche Abrechnung und Lieferung beginnt). Das Datum der letzten Änderung steht immer oben auf dieser Seite.",
        ],
      },
      {
        heading: "Anwendbares Recht",
        paragraphs: ["Diese Bedingungen werden gemäß den Gesetzen von Bosnien und Herzegowina ausgelegt."],
      },
      {
        heading: "Kontakt",
        paragraphs: [
          "Wir haben derzeit noch keine öffentliche Kontakt-E-Mail — diese wird vor dem offiziellen Start ergänzt.",
        ],
      },
    ],
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

export default async function UsloviKoristenjaPage({
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

            {c.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph.replace("{brand}", BRAND_NAME)}</p>
                ))}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
