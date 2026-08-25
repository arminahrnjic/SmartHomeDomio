# Podešavanje — Google Sheets (narudžbe + newsletter) i Vercel deploy

Ovaj fajl prati dvije stvari koje ti treba da uradiš van koda, jednom:
1. Google Sheet koji prima narudžbe (iz korpe) i newsletter prijave sa sajta, plus email obavještenje na tvoj privatni mail za svaku novu narudžbu
2. Deploy sajta na Vercel (besplatan hosting) — ovo uradi tek kad budeš spremna da sajt ide live, ne prije

---

## 1. Google Sheet + Apps Script (prima narudžbe i šalje ti email)

Sajt trenutno **ne šalje nigdje** narudžbe dok ovo ne uradiš — korpa i checkout rade, ali podaci se gube. Ovo je jednokratno podešavanje, traje ~10 minuta. Korisno je i prije nego sajt ide live — možeš testirati narudžbu sama na localhost-u i vidjeti da li stiže u Sheet/email.

### Korak 1 — Napravi Google Sheet

1. Idi na [sheets.google.com](https://sheets.google.com) (ulogovana na email koji želiš koristiti — npr. `hrnjicarmina17@gmail.com`)
2. Napravi novi prazan sheet, nazovi ga npr. **"Domio — Narudžbe"**

### Korak 2 — Dodaj Apps Script

1. U sheet-u idi na meni **Extensions → Apps Script** (Ekstenzije → Apps Script)
2. Obriši sav postojeći kod u editoru i zalijepi ovo:

```javascript
// Ovdje ostaje TVOJ privatni mail — Apps Script radi u tvom Google nalogu,
// ova adresa se nikad ne šalje na sajt niti se pojavljuje u kodu stranice.
const NOTIFY_EMAIL = "hrnjicarmina17@gmail.com";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timestamp = new Date();

  if (data.type === "order") {
    let sheet = ss.getSheetByName("Narudžbe");
    if (!sheet) {
      sheet = ss.insertSheet("Narudžbe");
      sheet.appendRow([
        "Datum", "Email", "Proizvod", "Varijante", "Dodaci",
        "Količina", "Cijena/kom (KM)", "Ukupno stavka (KM)", "Ukupno narudžba (KM)",
      ]);
    }

    (data.items || []).forEach(function (item, index) {
      sheet.appendRow([
        timestamp,
        data.email || "",
        item.product || "",
        item.variants || "",
        item.addons || "",
        item.quantity || "",
        item.unitPrice || "",
        item.lineTotal || "",
        index === 0 ? (data.total || "") : "",
      ]);
    });

    const itemsList = (data.items || [])
      .map(function (item) {
        var details = [item.variants, item.addons].filter(Boolean).join(", ");
        return item.quantity + "x " + item.product + (details ? " (" + details + ")" : "");
      })
      .join("\n");

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Nova narudžba — " + (data.total || "") + " KM",
      body: "Nova narudžba sa sajta:\n\n" + itemsList + "\n\nUkupno: " + data.total + " KM\nEmail kupca: " + data.email,
    });
  } else {
    let sheet = ss.getSheetByName("Newsletter");
    if (!sheet) {
      sheet = ss.insertSheet("Newsletter");
      sheet.appendRow(["Datum", "Email"]);
    }
    sheet.appendRow([timestamp, data.email || ""]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Nova prijava za newsletter",
      body: "Nova email adresa prijavljena na newsletter:\n\n" + (data.email || ""),
    });
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

3. Zamijeni `hrnjicarmina17@gmail.com` u prvoj liniji koda sa mailom na koji stvarno želiš da stižu obavještenja o narudžbama, ako je drugačiji
4. Klikni disketu (Save) gore lijevo, daj projektu ime npr. "Sheet forma"

**Napomena:** `MailApp.sendEmail` je besplatan dio Google Apps Scripta (nije potreban nikakav dodatni servis) — limit je 100 mailova dnevno za običan Gmail nalog, što je više nego dovoljno dok se ne validira obim narudžbi.

**Već si jednom postavila ovaj skript?** Kod iznad je ažuriran (dodato slanje mail obavještenja i za newsletter prijave, ne samo za narudžbe). Da ga primijeniš na već postojeći deployment (URL ti ostaje isti, ne treba dirati `.env.local`):

1. Otvori isti Sheet → **Extensions → Apps Script**
2. Zamijeni sav kod novom verzijom iznad, Save (disketa)
3. Gore desno **Deploy → Manage deployments**
4. Klikni olovčicu (Edit) na postojećem deploymentu
5. Kraj "Version" odaberi **New version**, pa **Deploy**

Ovo je bitno — samo Save u editoru NE ažurira live URL, mora se eksplicitno napraviti "New version" kroz Manage deployments.

### Korak 3 — Deploy kao Web App (samo ako ovo radiš prvi put)

1. Gore desno klikni **Deploy → New deployment**
2. Kraj "Select type" klikni na zupčanik i odaberi **Web app**
3. Podesi:
   - **Execute as:** Me (tvoj email)
   - **Who has access:** Anyone
4. Klikni **Deploy**
5. Google će tražiti da autorizuješ pristup (klikni kroz "Advanced" → "Go to ... (unsafe)" — ovo je tvoj vlastiti skript, sigurno je). Ovaj put će tražiti i dozvolu da šalje mailove u tvoje ime (zbog obavještenja o narudžbi) — to je očekivano, odobri.
6. Kopiraj URL koji dobiješ (izgleda kao `https://script.google.com/macros/s/XXXXXXX/exec`)

### Korak 4 — Pošalji mi taj URL (ili ga sama dodaj)

Ako mi pošalješ URL, ja ću ga dodati u projekat. Ili sama:

1. U korijenu projekta napravi fajl `.env.local` (kopija `.env.example`)
2. Ubaci: `NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXXXX/exec`
3. Restartuj dev server (`npm run dev`)

Nakon toga, svaka narudžba iz korpe upisuje po jedan red **za svaku stavku** u tab "Narudžbe" (tako vidiš tačno šta je naručeno — proizvod, varijante, dodaci, količina) i odmah dobijaš email na `hrnjicarmina17@gmail.com` sa sažetkom narudžbe. Newsletter prijave idu u poseban tab "Newsletter" **i sad takođe šalju email obavještenje** (isto na `hrnjicarmina17@gmail.com`) — ranije nisu slale mail, samo upisivale red u Sheet. Oba taba se prave automatski pri prvoj prijavi.

**Napomena:** ista vrijednost mora ići i na Vercel (vidi Korak 4 ispod) da radi i na živom sajtu, ne samo lokalno.

---

## 2. Deploy na Vercel

Imaš već GitHub nalog. Fali samo Vercel nalog i povezivanje.

### Korak 1 — Push koda na GitHub

1. Na [github.com](https://github.com) napravi novi **prazan** repozitorij (bez README-a), npr. nazovi ga `smarthome`
2. Pošalji mi link tog repozitorija (ili mi reci da si ga napravila) — ja ću odraditi push postojećeg koda

### Korak 2 — Napravi Vercel nalog

1. Idi na [vercel.com](https://vercel.com) → **Sign Up** → **Continue with GitHub** (najjednostavnije, besplatno)

### Korak 3 — Import projekta

1. Na Vercel dashboardu klikni **Add New → Project**
2. Odaberi `smarthome` repozitorij sa GitHub-a
3. Prije klika na Deploy, otvori **Environment Variables** i dodaj:
   - Name: `NEXT_PUBLIC_SHEETS_ENDPOINT`
   - Value: (isti URL iz Koraka 1 gore)
4. Klikni **Deploy**

Nakon par minuta dobićeš pravi javni link (npr. `smarthome.vercel.app`) koji možeš dijeliti. Svaki naredni `git push` na GitHub automatski ažurira live sajt.
