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
    dataHeading: string;
    dataItems: { label: string; text: string }[];
    dataOutro: string;
    usageHeading: string;
    usageBody: string;
    cookiesHeading: string;
    cookiesBody: string;
    rightsHeading: string;
    rightsBody: string;
    securityHeading: string;
    securityBody: string;
    changesHeading: string;
    changesBody: string;
    contactHeading: string;
    contactBody: string;
  }
> = {
  bs: {
    metaDescription: "Koje podatke prikupljamo i kako ih koristimo.",
    title: "Politika privatnosti",
    lastUpdated: "Zadnje ažurirano: 25.8.2026.",
    intro:
      "Ova stranica objašnjava koje podatke {brand} prikuplja kad koristite sajt, i šta s njima radimo. Prikupljamo samo ono što je potrebno da bismo obradili vašu narudžbu ili prijavu na newsletter — ništa više.",
    dataHeading: "Koje podatke prikupljamo",
    dataItems: [
      { label: "Email adresa", text: "kad napravite preorder narudžbu ili se prijavite na newsletter." },
      {
        label: "Sadržaj narudžbe",
        text: "proizvod, izabrane varijante i dodaci, količina i ukupna cijena koju ste vidjeli prije slanja.",
      },
      {
        label: "Sadržaj korpe",
        text: "čuva se lokalno u vašem browseru (localStorage), ne na našim serverima, i briše se kad očistite podatke browsera ili završite narudžbu.",
      },
    ],
    dataOutro: "Ne tražimo niti čuvamo podatke o plaćanju — trenutno se ništa ne naplaćuje kroz sajt.",
    usageHeading: "Kako se podaci koriste",
    usageBody:
      "Email i podaci o narudžbi upisuju se u internu Google Sheet tabelu i koriste se isključivo da vas kontaktiramo o vašoj narudžbi ili da vam pošaljemo newsletter na koji ste se prijavili. Ne prodajemo niti dijelimo vaše podatke sa trećim stranama u marketinške svrhe.",
    cookiesHeading: "Kolačići i praćenje",
    cookiesBody:
      "Sajt trenutno ne koristi kolačiće za analitiku ni marketing praćenje. Jedino što se čuva lokalno u vašem browseru je sadržaj korpe (localStorage), radi funkcionalnosti sajta — ne radi praćenja ponašanja.",
    rightsHeading: "Vaša prava",
    rightsBody:
      "Možete tražiti da vam pokažemo koje podatke o vama imamo, ili da ih obrišemo. Pošto trenutno nemamo javni kontakt email (vidi ispod), ovo pravo je ograničeno u praksi dok se ne uspostavi kanal za takve zahtjeve — dopunjujemo ovo prije zvaničnog lansiranja.",
    securityHeading: "Sigurnost",
    securityBody:
      "Podaci se čuvaju u Google-ovoj infrastrukturi (Google Sheets/Apps Script), zaštićeni istim sigurnosnim standardima kao i ostatak Google Workspace okruženja.",
    changesHeading: "Izmjene ove politike",
    changesBody: "Politiku možemo povremeno ažurirati. Datum zadnje izmjene uvijek stoji na vrhu ove stranice.",
    contactHeading: "Kontakt",
    contactBody: "Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja.",
  },
  en: {
    metaDescription: "What data we collect and how we use it.",
    title: "Privacy Policy",
    lastUpdated: "Last updated: August 25, 2026",
    intro:
      "This page explains what data {brand} collects when you use the site, and what we do with it. We only collect what's needed to process your order or newsletter signup — nothing more.",
    dataHeading: "What data we collect",
    dataItems: [
      { label: "Email address", text: "when you place a preorder or sign up for the newsletter." },
      {
        label: "Order contents",
        text: "product, chosen variants and add-ons, quantity, and the total price you saw before submitting.",
      },
      {
        label: "Cart contents",
        text: "stored locally in your browser (localStorage), not on our servers, and cleared when you clear your browser data or complete an order.",
      },
    ],
    dataOutro: "We don't request or store payment information — nothing is currently charged through the site.",
    usageHeading: "How data is used",
    usageBody:
      "Your email and order details are recorded in an internal Google Sheet and used exclusively to contact you about your order or to send the newsletter you signed up for. We don't sell or share your data with third parties for marketing purposes.",
    cookiesHeading: "Cookies and tracking",
    cookiesBody:
      "The site currently doesn't use cookies for analytics or marketing tracking. The only thing stored locally in your browser is your cart contents (localStorage), for site functionality — not for behavior tracking.",
    rightsHeading: "Your rights",
    rightsBody:
      "You can ask us to show you what data we hold about you, or to delete it. Since we don't have a public contact email yet (see below), this right is limited in practice until a channel for such requests exists — we'll fill this in before the official launch.",
    securityHeading: "Security",
    securityBody:
      "Data is stored in Google's infrastructure (Google Sheets/Apps Script), protected by the same security standards as the rest of the Google Workspace environment.",
    changesHeading: "Changes to this policy",
    changesBody:
      "We may update this policy from time to time. The date of the last update always appears at the top of this page.",
    contactHeading: "Contact",
    contactBody: "We don't have a public contact email yet — this will be added before the official launch.",
  },
  de: {
    metaDescription: "Welche Daten wir erheben und wie wir sie verwenden.",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: 25.8.2026",
    intro:
      "Diese Seite erklärt, welche Daten {brand} bei der Nutzung der Website erhebt und was wir damit tun. Wir erheben nur, was zur Bearbeitung Ihrer Bestellung oder Newsletter-Anmeldung nötig ist — nicht mehr.",
    dataHeading: "Welche Daten wir erheben",
    dataItems: [
      { label: "E-Mail-Adresse", text: "wenn Sie eine Vorbestellung aufgeben oder sich für den Newsletter anmelden." },
      {
        label: "Bestellinhalt",
        text: "Produkt, gewählte Varianten und Zusatzoptionen, Menge und der Gesamtpreis, den Sie vor dem Absenden gesehen haben.",
      },
      {
        label: "Warenkorbinhalt",
        text: "wird lokal in Ihrem Browser gespeichert (localStorage), nicht auf unseren Servern, und gelöscht, wenn Sie Ihre Browserdaten löschen oder eine Bestellung abschließen.",
      },
    ],
    dataOutro: "Wir fragen keine Zahlungsdaten ab und speichern sie nicht — derzeit wird über die Website nichts berechnet.",
    usageHeading: "Wie die Daten verwendet werden",
    usageBody:
      "Ihre E-Mail und Bestelldaten werden in einer internen Google-Sheets-Tabelle erfasst und ausschließlich verwendet, um Sie zu Ihrer Bestellung zu kontaktieren oder Ihnen den Newsletter zu senden, für den Sie sich angemeldet haben. Wir verkaufen oder teilen Ihre Daten nicht zu Marketingzwecken mit Dritten.",
    cookiesHeading: "Cookies und Tracking",
    cookiesBody:
      "Die Website verwendet derzeit keine Cookies für Analyse- oder Marketing-Tracking. Das Einzige, was lokal in Ihrem Browser gespeichert wird, ist der Warenkorbinhalt (localStorage), für die Funktionalität der Website — nicht zur Verhaltensverfolgung.",
    rightsHeading: "Ihre Rechte",
    rightsBody:
      "Sie können verlangen, dass wir Ihnen zeigen, welche Daten wir über Sie haben, oder dass wir sie löschen. Da wir derzeit noch keine öffentliche Kontakt-E-Mail haben (siehe unten), ist dieses Recht in der Praxis eingeschränkt, bis ein Kanal für solche Anfragen eingerichtet ist — wir ergänzen dies vor dem offiziellen Start.",
    securityHeading: "Sicherheit",
    securityBody:
      "Die Daten werden in der Google-Infrastruktur (Google Sheets/Apps Script) gespeichert, geschützt durch dieselben Sicherheitsstandards wie der Rest der Google-Workspace-Umgebung.",
    changesHeading: "Änderungen dieser Richtlinie",
    changesBody:
      "Wir können diese Richtlinie gelegentlich aktualisieren. Das Datum der letzten Änderung steht immer oben auf dieser Seite.",
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

export default async function PolitikaPrivatnostiPage({
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

            <h2>{c.dataHeading}</h2>
            <ul>
              {c.dataItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.text}
                </li>
              ))}
            </ul>
            <p>{c.dataOutro}</p>

            <h2>{c.usageHeading}</h2>
            <p>{c.usageBody}</p>

            <h2>{c.cookiesHeading}</h2>
            <p>{c.cookiesBody}</p>

            <h2>{c.rightsHeading}</h2>
            <p>{c.rightsBody}</p>

            <h2>{c.securityHeading}</h2>
            <p>{c.securityBody}</p>

            <h2>{c.changesHeading}</h2>
            <p>{c.changesBody}</p>

            <h2>{c.contactHeading}</h2>
            <p>{c.contactBody}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
