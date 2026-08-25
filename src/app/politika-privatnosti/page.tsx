import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Koje podatke prikupljamo i kako ih koristimo.",
};

export default function PolitikaPrivatnostiPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <article className="mx-auto max-w-2xl">
          <div className="mb-8 text-sm text-text-muted">Zadnje ažurirano: 25.8.2026.</div>

          <h1 className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-tight text-text">
            Politika privatnosti
          </h1>

          <div className="prose-domio">
            <p>
              Ova stranica objašnjava koje podatke {BRAND_NAME} prikuplja kad koristite sajt, i šta
              s njima radimo. Prikupljamo samo ono što je potrebno da bismo obradili vašu narudžbu
              ili prijavu na newsletter — ništa više.
            </p>

            <h2>Koje podatke prikupljamo</h2>
            <ul>
              <li>
                <strong>Email adresa</strong> — kad napravite preorder narudžbu ili se prijavite na
                newsletter.
              </li>
              <li>
                <strong>Sadržaj narudžbe</strong> — proizvod, izabrane varijante i dodaci, količina
                i ukupna cijena koju ste vidjeli prije slanja.
              </li>
              <li>
                <strong>Sadržaj korpe</strong> — čuva se lokalno u vašem browseru (localStorage), ne
                na našim serverima, i briše se kad očistite podatke browsera ili završite narudžbu.
              </li>
            </ul>
            <p>Ne tražimo niti čuvamo podatke o plaćanju — trenutno se ništa ne naplaćuje kroz sajt.</p>

            <h2>Kako se podaci koriste</h2>
            <p>
              Email i podaci o narudžbi upisuju se u internu Google Sheet tabelu i koriste se
              isključivo da vas kontaktiramo o vašoj narudžbi ili da vam pošaljemo newsletter na
              koji ste se prijavili. Ne prodajemo niti dijelimo vaše podatke sa trećim stranama u
              marketinške svrhe.
            </p>

            <h2>Kolačići i praćenje</h2>
            <p>
              Sajt trenutno ne koristi kolačiće za analitiku ni marketing praćenje. Jedino što se
              čuva lokalno u vašem browseru je sadržaj korpe (localStorage), radi funkcionalnosti
              sajta — ne radi praćenja ponašanja.
            </p>

            <h2>Vaša prava</h2>
            <p>
              Možete tražiti da vam pokažemo koje podatke o vama imamo, ili da ih obrišemo. Pošto
              trenutno nemamo javni kontakt email (vidi ispod), ovo pravo je ograničeno u praksi dok
              se ne uspostavi kanal za takve zahtjeve — dopunjujemo ovo prije zvaničnog lansiranja.
            </p>

            <h2>Sigurnost</h2>
            <p>
              Podaci se čuvaju u Google-ovoj infrastrukturi (Google Sheets/Apps Script), zaštićeni
              istim sigurnosnim standardima kao i ostatak Google Workspace okruženja.
            </p>

            <h2>Izmjene ove politike</h2>
            <p>
              Politiku možemo povremeno ažurirati. Datum zadnje izmjene uvijek stoji na vrhu ove
              stranice.
            </p>

            <h2>Kontakt</h2>
            <p>Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
