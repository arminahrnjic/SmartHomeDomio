import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Uslovi korištenja",
  description: "Uslovi korištenja sajta i pravila preorder narudžbi.",
};

export default function UsloviKoristenjaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full px-6 py-16">
        <article className="mx-auto max-w-2xl">
          <div className="mb-8 text-sm text-text-muted">Zadnje ažurirano: 25.8.2026.</div>

          <h1 className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-tight text-text">
            Uslovi korištenja
          </h1>

          <div className="prose-domio">
            <p>
              Korištenjem sajta {BRAND_NAME} prihvatate uslove opisane na ovoj stranici. Ako se ne
              slažete sa nekim od njih, molimo vas da ne koristite sajt.
            </p>

            <h2>Šta je preorder</h2>
            <p>
              Trenutno prodajemo isključivo putem preordera — to znači da narudžba koju napravite
              predstavlja rezervaciju interesa za proizvod, ne konačnu, naplaćenu kupovinu. U ovom
              trenutku sajt <strong>ne naplaćuje ništa</strong> u momentu narudžbe. Nakon što
              zabilježimo vašu narudžbu, tim vas kontaktira emailom sa daljim koracima (potvrda,
              rokovi, način plaćanja).
            </p>
            <p>
              Preorder ne garantuje fiksnu cijenu niti rok isporuke dok se ne potvrdi direktno s
              vama — cijene i dostupnost mogu se promijeniti do te potvrde, posebno dok se prva
              grupna narudžba kod dobavljača ne zatvori.
            </p>

            <h2>Cijene</h2>
            <p>
              Cijene na sajtu su izražene u konvertibilnim markama (KM) i uključuju sve poznate
              troškove u trenutku objave. Zadržavamo pravo izmjene cijena bez prethodne najave, ali
              izmjena ne utiče na preorder koji je već potvrđen s vaše strane.
            </p>

            <h2>Sadržaj sajta</h2>
            <p>
              Tekst, fotografije, dizajn i drugi sadržaj na ovom sajtu pripadaju {BRAND_NAME} ili se
              koriste uz dozvolu. Sadržaj se ne smije kopirati ili koristiti u komercijalne svrhe
              bez odobrenja.
            </p>

            <h2>Ograničenje odgovornosti</h2>
            <p>
              Trudimo se da su svi opisi proizvoda i informacije na sajtu tačni, ali ne možemo
              garantovati da su u svakom trenutku potpuno bez greške. U mjeri dozvoljenoj zakonom,{" "}
              {BRAND_NAME} ne odgovara za indirektnu štetu nastalu korištenjem sajta.
            </p>

            <h2>Izmjene ovih uslova</h2>
            <p>
              Uslove možemo povremeno ažurirati kako se posao razvija (npr. kad krene stvarna
              naplata i isporuka). Datum zadnje izmjene uvijek stoji na vrhu ove stranice.
            </p>

            <h2>Mjerodavno pravo</h2>
            <p>Ovi uslovi se tumače u skladu sa zakonima Bosne i Hercegovine.</p>

            <h2>Kontakt</h2>
            <p>Trenutno nemamo javni kontakt email — ovo će biti dopunjeno prije zvaničnog lansiranja.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
