@AGENTS.md

# Domio — Smart Home Webshop

> Ime brenda je odlučeno: **Domio** (dom + lakoća/kontrola). Definisano u `src/config/siteConfig.ts` (`BRAND_NAME`) — mijenjati samo tamo, ne po cijelom sajtu.

## O projektu

Webshop za pametne uređaje za dom (smart home), fokus na Balkan tržište (BiH prvenstveno, jezik BS/HR/SR + eng verzija kasnije). Ciljna publika: porodice, studenti, podstanari, vlasnici apartmana/Airbnb-a, vikendice, kancelarije. Ne hoteli — to je sad sporedno.

**Poslovni model:** Preorder (bez lagera). Nema fizičkih proizvoda u startu — marketing ide preko AI/CGI reklama i materijala od proizvođača, ne preko snimanja stvarnog proizvoda (bar ne u početku).

**Budžet:** praktično nula. Sve odluke (hosting, alati, dizajn) moraju biti besplatne ili freemium opcije.

---

## Dizajn sistem — vizuelni identitet

Koncept: **Apple × Tesla × Dyson.** Premium, minimalistički, mnogo negativnog prostora, proizvod kao "hero", ne šareno i ne "webshop-generic".

**Principi:**
- Puno bijelog/svijetlog prostora, proizvod je uvijek fokus
- Velike, čiste fotografije/mockupi proizvoda (full-bleed hero sekcije)
- Suptilne animacije: fade-in na scroll, blagi parallax, hover koji "diše" (scale 1.02–1.04, ne agresivno)
- Nema previše dugmadi/teksta na ekranu odjednom — jedna poruka po sekciji
- Kopija (copy) je kratka, samopouzdana, u drugom licu ("Vaš dom", "Kontrolišite", ne "Mi nudimo...")

**Boje:**
```
--color-primary: #1E8E6A;   /* smaragdno zelena — akcenat, CTA dugmad */
--color-primary-hover: #157255;
--color-bg: #FFFFFF;
--color-bg-alt: #F8F9FA;    /* alternativne sekcije */
--color-text: #222222;
--color-text-muted: #6B6B6B;
--color-border: #E5E5E5;
```

**Tipografija:**
- Font: **Poppins** (Google Fonts) — Bold/700 za naslove, Regular/400 za tekst
- Naslovi veliki, tight letter-spacing, kratki (max 6-8 riječi)
- Hijerarhija: H1 clamp(2.5rem, 5vw, 4.5rem), H2 clamp(1.8rem, 3vw, 2.8rem)

**Animacije:**
- Fade-in-up na scroll (Intersection Observer, ne pretjerivati)
- Smooth scroll
- Hover: blagi scale + shadow na karticama proizvoda
- Bez agresivnih/brzih efekata — sve treba djelovati "skupo" i mirno

**Reference za layout sekcija (redoslijed na Home stranici):**
1. Announcement bar (dostava/garancija — nema kontakt info dok ne postoji prava mail domena/društvene mreže)
2. Sticky header (logo, nav, cart, account)
3. Hero (full-screen, jedan proizvod/scena, 2 CTA dugmeta)
4. "Zašto mi" — 4-5 kartica sa ikonama
5. Featured products (grid, hover-zoom)
6. Interaktivna "Kako funkcioniše" sekcija (3 koraka)
7. Video sekcija (autoplay, muted, proizvod u akciji)
8. Recenzije (carousel)
9. Blog preview (3 članka)
10. Newsletter (puna širina, brand boja pozadina)
11. Footer

---

## Tech stack (preporuka za nulti budžet)

- **Frontend:** Next.js (React) ili čist HTML/CSS/JS ako želimo najjednostavnije — preporuka je **Next.js** jer lakše skalira na webshop funkcionalnosti (routing za proizvode, SEO metadata po stranici).
- **Stilovi:** Tailwind CSS (brzo, lako održavati konzistentan dizajn sistem gore navedenim CSS varijablama)
- **Podaci o proizvodima:** JSON fajl (`/data/products.json`) — NE baza podataka u startu. Ovo je ključno za workflow ispod.
- **Hosting:** Vercel (besplatan tier, savršen za Next.js, automatski deploy sa GitHub-a)
- **Slike/video:** Cloudinary free tier ili direktno u `/public` folderu dok je katalog mali
- **Plaćanje (kasnije):** Stripe ili lokalni BiH payment gateway — ovo je faza 2, nije prioritet dok se ne validira prvi proizvod
- **Blog/SEO:** Markdown fajlovi (`/content/blog/*.md`) — jednostavno, brzo, dobro za SEO

---

## Workflow: kako se dodaju/mijenjaju proizvodi

**Armina NE mora sama editovati kod.** Dogovor:

1. Armina mi (Claude Code, u VS Code terminalu) opiše novi proizvod prirodnim jezikom: naziv, cijena, karakteristike, fotografije (putanja do fajla ili link), kratak opis.
2. Ja ažuriram `/data/products.json` po strukturi ispod, generišem/ažuriram stranicu proizvoda, i pokažem joj diff prije nego što se bilo šta snimi (VS Code Claude Code ekstenzija prikazuje side-by-side diff — ništa se ne mijenja bez njenog odobrenja).
3. Nakon što odobri, ja commit-ujem i (kad poveže Vercel + GitHub) promjena ide live automatski.

Ovo je sigurnija opcija jer:
- Izbjegava se greška u JSON formatu koja bi srušila sajt
- Ja mogu odmah predložiti SEO-friendly slug, alt-tekstove za slike, i konzistentan format opisa

**Struktura jednog proizvoda u `products.json` — sa varijantama i dodacima:**

Proizvod ima **varijante** (kupac bira, npr. način kontrole WiFi/Remote) i **dodatke/add-ons** (opciono, dodaju se u korpu). UI logika: sve select-ove postaviti na najbolju/najskuplju opciju po defaultu (WiFi, ne Remote), kupac svjesno "downgrade-uje" ako želi jeftinije — ne obrnuto. Cijena na stranici se live ažurira dok kupac bira varijante (kao Apple konfigurator).

**Varijanta vs zaseban proizvod:** ako je razlika suštinski "drugi proizvod" (npr. Single vs Double zavjese, ne samo boja/dodatak), napravi **dva zasebna proizvoda** u `products.json` (svaki sa svojom `id`, slikom, cijenom), ne jedan proizvod sa "size" variant grupom — tako je odlučeno za Curtain Robot (vidi katalog ispod). `VariantOption` ipak MOŽE nositi svoj `images` niz za slučajeve gdje varijanta stvarno treba drugu sliku unutar istog proizvoda (npr. boja) — infrastruktura postoji (`ProductPurchasePanel`), samo se trenutno ne koristi ni za jedan proizvod.

```json
{
  "id": "smart-curtain-robot",
  "name": "Smart Curtain Robot",
  "tagline": "Automatski otvarajte i zatvarajte zavjese",
  "badge": "BESTSELLER",
  "short_description": "Pretvorite obične zavjese u pametne. Radi na Roman rod i track rod šinama.",
  "features": [
    "Mobilna aplikacija i glasovna kontrola (Alexa, Google Home) — WiFi varijanta",
    "Tiho otvaranje, brzina 10 sec/metar",
    "Baterija do 6 mjeseci rada, odvojiva, Type-C punjenje",
    "Kompatibilan s većinom šina"
  ],
  "variant_groups": [
    {
      "id": "control",
      "label": "Način kontrole",
      "default": "wifi",
      "options": [
        {
          "id": "wifi",
          "label": "Puna kontrola (App + Glas)",
          "sublabel": "Kontrolišite odakle god se nalazite — telefon, Alexa, Google Home",
          "price_km": 339,
          "recommended": true
        },
        {
          "id": "remote",
          "label": "Osnovna kontrola (Daljinski)",
          "sublabel": "Samo fizički daljinski upravljač, bez app/WiFi funkcija",
          "price_km": 259,
          "recommended": false,
          "downgrade_note": "Bez mogućnosti kontrole na daljinu preko telefona"
        }
      ]
    }
  ],
  "addons": [
    {
      "id": "solar-panel",
      "label": "Solarni punjač",
      "description": "Automatsko punjenje robota preko sunca — nikad ne brinete o bateriji.",
      "price_km": 39,
      "default_checked": false
    }
  ],
  "specs": {
    "dimensions": "170 x 86 x 55mm",
    "power": "12W",
    "battery": "4000mAh, odvojiva, punjenje Type-C",
    "max_stroke": "20m",
    "app": "Tuya / Smart Life"
  },
  "images": ["/products/curtain-robot/1.png"],
  "status": "preorder",
  "preorder_note": "Sljedeća grupa narudžbi zatvara se [DATUM]. Isporuka 10-15 dana nakon slanja iz fabrike."
}
```

(Ovo je stvarni trenutni `smart-curtain-robot` — Double varijanta. Single je zaseban proizvod `smart-curtain-robot-single`, ista struktura, svoje cijene/specs/slika.)

**UX napomena za stranicu proizvoda:** ispod selektora za "Način kontrole", pored Remote opcije dodati kratku napomenu koja blago potcrtava razliku bez da bude nametljivo — npr. "Bez mogućnosti kontrole na daljinu preko telefona" — da kupac razumije šta gubi, ali ne da djeluje kao pritisak na prodaju.

---

## Katalog proizvoda — trenutno stanje (izvor podataka)

### 1. Smart Curtain Robot — HERO proizvod ✅ ima dobavljača

Dobavljač: **Dongguan Lianyou Intelligent Technology Co., Ltd.** (Cassie, luoyixin@lianyousmart.com)
Katalog: aktivan proizvođač, ima R&D tim, vlastitu fabriku (osnovani 2020, Fenggang Town, Dongguan).

**Odluka (ažurirano): Single i Double su dva zasebna proizvoda u katalogu** (`smart-curtain-robot` = Double, `smart-curtain-robot-single` = Single), svaki sa svojom stranicom, slikom i cijenom — ne jedan proizvod sa "veličina" variant grupom kao što je ranije bilo. Unutar svakog od njih, kupac i dalje bira način kontrole (WiFi vs Remote) kroz variant selektor — tu odluka o WiFi-kao-default ostaje ista. Default (predizabrano) je uvijek WiFi — kupac svjesno bira jeftiniju/osnovniju opciju ako želi, ne obrnuto. Ovo je namjerna UX odluka: cilj je da defaultna, najistaknutija opcija bude ona koju želimo da većina kupi (puna kontrola), a izbor ostaje kupcu radi osjećaja kontrole nad kupovinom.

**Trenutne maloprodajne cijene (KM):** Double WiFi 339 / Remote 259 (preračunato 2026-08-25 metodom ispod, od stvarne EXW cijene Double-a — $47.85 WiFi, $35.95 Remote — ne više od Single+45 KM logike). Single WiFi 179 / Remote 139 (ostaje nepromijenjeno, ovo je stara pre-postavljena vrijednost iz spec fajla, nije nezavisno preračunata istom metodom — vrijedi uraditi i za Single ako se traži konzistentnost).

Kalkulacija za Double WiFi: $47.85 × 1.69 KM/USD = 80.87 KM EXW → + ~$2/kom transport (procjena, konsolidovana pošiljka) = 84.25 KM CIF → + 10% carina = 92.68 KM → + 17% PDV = 108.44 KM → + 10% rezerva (bankarski troškovi/pakovanje) = **119.28 KM landed** → uz ~65% marže = 339 KM maloprodaja. Ista metoda za Remote ($35.95 EXW) → ~90.79 KM landed → 259 KM maloprodaja.

| Model | Konekcija | 100 kom (USD/kom EXW) | 500 kom | 1000 kom |
|---|---|---|---|---|
| LY-1668 Single | **WiFi (default)** | $25.76 | $25.26 | $24.76 |
| LY-1668 Single | Remote only | $18.75 | $18.25 | $17.75 |
| LY-1998 Double | **WiFi (default)** | $47.85 | $47.35 | $46.85 |
| LY-1998 Double | Remote only | $35.95 | $35.45 | $34.95 |

**VAŽNO — zašto WiFi mora biti default, ne ravnopravna opcija:** Remote-only verzija nema app/glasovnu kontrolu, što potkopava cijelu marketing priču ("kontrolišite dom gdje god se nalazite", Airbnb/apartman use-case, Alexa/Google integracija). Zato UI treba da WiFi opciju vizuelno istakne (npr. mali badge "Preporučeno" ili "Najprodavanije"), a Remote opciju prikaže kao dostupnu ali manje istaknutu — kupac i dalje ima punu slobodu izbora, samo je dizajn takav da prirodno vodi ka boljoj opciji.

Napomena: EXW cijena = bez carine, PDV-a, transporta, bankarskih troškova, pakovanja. Realna nabavna cijena po komadu će biti znatno viša — treba izračunati ukupan trošak prije određivanja maloprodajne cijene za svaku kombinaciju varijanti posebno (Single/Double × WiFi/Remote su zapravo 4 različita proizvoda sa 4 različite nabavne cijene). Minimalna proizvodnja: 10 radnih dana za 100 kom.

Specifikacije: Single — 152x81x75mm, 4W; Double — 170x86x55mm, 12W, pakovanje 2 komada/kutija (za dvokrilne zavjese/šire prozore). Oba: baterija 4000mAh (odvojiva, Type-C punjenje), brzina 10 sek/metar, max hod 20m, Tuya/Smart Life app, Roman rod i track rod šine.

### Solarni punjač — I zaseban proizvod I add-on

Koristi se LY-113 Solar Charging Board (rotacija 180°, extendable) varijanta, isti dobavljač (Lianyou):

| Tip | 100 kom | 500 kom | 1000 kom |
|---|---|---|---|
| Solar Charging Board (rotacija 180°, extendable) | $5.15 | $4.95 | $4.75 |
| Solar Panel (fiksni, 150x81x8mm) | $3.75 | $3.65 | $3.45 |

Sad je i **zaseban proizvod** u katalogu (`solarni-punjac`, ima svoju stranicu) i dalje **add-on checkbox** na obje Curtain Robot stranice (Single i Double) — ista cijena (39 KM) na svim mjestima, namjerno sinhronizovano jer je isti fizički artikal. Prikazuje se kao "Nikad ne brinite o bateriji — dodajte solarni punjač" odmah ispod glavnog izbora varijanti, checkbox default isključen (kupac svjesno dodaje).

**Metodologija za landed cost / maloprodajnu cijenu** (korištena za solarni punjač, ponoviti za buduće proizvode uključujući preračun Double cijene gore i Smart Plug ispod): EXW USD → KM preko fiksne EUR-KM veze (1.95583) × trenutni USD/EUR kurs (provjeriti, ne pretpostavljati) → + procjena transporta → + BiH carina (istražiti raspon za kategoriju, koristiti razumnu sredinu ako nema tačnog HS koda) → + PDV 17% (fiksno u BiH) → + rezerva ~10% za bankarske troškove/pakovanje → landed cost → maloprodaja = landed cost / (1 − ciljna marža, obično ~60-65% za dodatke). Za solarni punjač: EXW $5.15 → ~13.75 KM landed → **39 KM** maloprodaja.

Ostali proizvodi u ponudi istog dobavljača (za buduće širenje kataloga): Blinds Motor, Smart Door Lock, Smart Switch Pusher, Temperature & Humidity Sensor, PIR+Brightness Sensor, Radar Human Sensor, Human Motion & Presence Sensor, Smart Water Leakage Sensor, Smart Air Quality Monitor, Tire Inflator.

### 2. Smart Plug / Pametna utičnica — ⚠️ NEMA JOŠ DOBAVLJAČA

Trenutno postoji samo referenca sa Temu-a (potrošačka cijena, ne veleprodajna):
- Tuya WiFi utičnica 16-20A, radi sa Alexa/Google/SmartLife: maloprodajna cijena na Temu ~9,80-24,40 KM (zavisi od varijante/paketa)

**TODO prije lansiranja ovog proizvoda:** kontaktirati proizvođača/veleprodaju (Alibaba je dobar početak — Lianyou možda ima ili preporuku partnera, pošto rade i druge Tuya kompatibilne uređaje) i dobiti EXW cijenu na 100+ komada, kao za curtain robot. Bez ovoga se ne može računati profitabilnost — Temu cijena je maloprodajna krajnjem kupcu, ne nabavna.

### Ostali planirani proizvodi (faza 2+)
Smart Door Sensor, Motion Sensor, Temperature & Humidity Sensor — svi dostupni kod istog Lianyou dobavljača, pa je moguće naručiti sve iz jedne fabrike/pošiljke (manji trošak transporta).

---

## Ton i copywriting pravila

- Prodajemo **mir u glavi i sigurnost**, ne uređaje. Svaki opis proizvoda treba da odgovori "koji svakodnevni problem ovo rješava" prije nego što nabroji specifikacije.
- Kratke rečenice. Bez žargona.
- CTA dugmad: "Kupi odmah", "Pogledaj proizvod" — ne "Naruči sada!!!" ili slično agresivno.
- **Topao/ličan ton, ali BEZ identiteta osnivača.** Brend zvuči kao pravi tim, ne bezlična korporacija — ali se nigdje (webshop copy, blog, društvene mreže, "O nama" stranica) ne koristi stvarno ime, lik ili identitet osnivača. Konkretno:
  - Nema prvog lica jednine ("Ja sam...", "Testirala sam...") — uvijek plural/generično ("mi", "tim").
  - Nema imena osnivača ni bilo koje reference koja bi otkrila ko konkretno stoji iza brenda.
  - Umjesto toga koristiti formulacije tipa: "Iza `BRAND_NAME` stoji tim koji lično testira svaki uređaj prije nego što ga preporuči."
  - Ovo pravilo važi za sav budući copy i marketing sadržaj, ne samo za "O nama" stranicu.

---

## Šta NIJE prioritet sada

- Payment integracija (čeka se prvi validiran proizvod)
- Multi-jezična verzija (eng) — kasnije
- Kompletan katalog od 50 proizvoda — samo 1-2 proizvoda za start (Curtain Robot je prioritet jer ima dobavljača; Smart Plug čeka dobavljača)
