import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Preorder i povrat",
  description: "Kako funkcioniše preorder, otkazivanje i povrat.",
};

export default function PolitikaPovrataPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <article className="mx-auto max-w-2xl">
          <div className="mb-8 text-sm text-text-muted">Zadnje ažurirano: 25.8.2026.</div>

          <h1 className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-tight text-text">
            Preorder i povrat
          </h1>

          <div className="prose-domio">
            <p>
              {BRAND_NAME} trenutno prodaje isključivo putem preordera. Ova stranica objašnjava šta
              to znači u praksi — prije, tokom i poslije narudžbe.
            </p>

            <h2>Prije narudžbe: šta preorder znači</h2>
            <p>
              Preorder je rezervacija interesa za proizvod, ne odmah potvrđena i naplaćena kupovina.
              Kad pošaljete narudžbu iz korpe, ona se bilježi kod nas, ali{" "}
              <strong>ne naplaćuje se ništa u tom trenutku</strong> — sajt trenutno nema aktivno
              plaćanje. Tim vas kontaktira emailom sa daljim koracima.
            </p>

            <h2>Otkazivanje preordera</h2>
            <p>
              Pošto se ništa ne naplaćuje pri slanju preordera, možete se predomisliti u bilo kojem
              trenutku prije nego što se dogovori stvarno plaćanje — jednostavno nam javite (kad
              kontakt kanal bude dostupan, vidi ispod) da otkažete.
            </p>

            <h2>Kad se aktivira plaćanje</h2>
            <p>
              Plaćanje i tačan način naplate uvodimo u kasnijoj fazi, nakon što se prva grupna
              narudžba kod dobavljača potvrdi. Prije nego što se od vas išta naplati, jasno ćemo vas
              obavijestiti i tražiti vašu potvrdu — ništa se ne dešava automatski.
            </p>

            <h2>Isporuka</h2>
            <p>
              Isporuka počinje 10-15 dana nakon što narudžba bude poslana iz fabrike, prema
              napomeni na stranici svakog proizvoda. Tačan datum zavisi od toga kad se zatvori
              trenutna grupna narudžba.
            </p>

            <h2>Povrat nakon isporuke</h2>
            <p>
              Pravila za povrat nakon što proizvod stvarno stigne do kupca biće detaljno objavljena
              prije nego što isporuke i naplata zaista počnu — u skladu sa zakonom o zaštiti
              potrošača u Bosni i Hercegovini (uključujući pravo na odustanak u zakonskom roku za
              online kupovinu).
            </p>

            <h2>Kontakt</h2>
            <p>Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
