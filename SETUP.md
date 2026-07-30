# Podešavanje — Google Sheets (preorder + newsletter) i Vercel deploy

Ovaj fajl prati dvije stvari koje ti treba da uradiš van koda, jednom:
1. Google Sheet koji prima preorder i newsletter prijave sa sajta
2. Deploy sajta na Vercel (besplatan hosting)

---

## 1. Google Sheet + Apps Script (prima prijave sa sajta)

Sajt trenutno **ne šalje nigdje** prijave dok ovo ne uradiš — dugmad rade, ali podaci se gube. Ovo je jednokratno podešavanje, traje ~10 minuta.

### Korak 1 — Napravi Google Sheet

1. Idi na [sheets.google.com](https://sheets.google.com) (ulogovana na email koji želiš koristiti — npr. `hrnjicarmina17@gmail.com`)
2. Napravi novi prazan sheet, nazovi ga npr. **"Smarthome — Prijave"**

### Korak 2 — Dodaj Apps Script

1. U sheet-u idi na meni **Extensions → Apps Script** (Ekstenzije → Apps Script)
2. Obriši sav postojeći kod u editoru i zalijepi ovo:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = data.type === "preorder" ? "Preorders" : "Newsletter";

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (data.type === "preorder") {
      sheet.appendRow(["Datum", "Proizvod", "Način kontrole", "Veličina", "Dodaci", "Ukupno (KM)", "Email"]);
    } else {
      sheet.appendRow(["Datum", "Email"]);
    }
  }

  const timestamp = new Date();
  if (data.type === "preorder") {
    sheet.appendRow([
      timestamp,
      data.product || "",
      data.control || "",
      data.size || "",
      data.addons || "",
      data.total || "",
      data.email || "",
    ]);
  } else {
    sheet.appendRow([timestamp, data.email || ""]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

3. Klikni disketu (Save) gore lijevo, daj projektu ime npr. "Sheet forma"

### Korak 3 — Deploy kao Web App

1. Gore desno klikni **Deploy → New deployment**
2. Kraj "Select type" klikni na zupčanik i odaberi **Web app**
3. Podesi:
   - **Execute as:** Me (tvoj email)
   - **Who has access:** Anyone
4. Klikni **Deploy**
5. Google će tražiti da autorizuješ pristup (klikni kroz "Advanced" → "Go to ... (unsafe)" — ovo je tvoj vlastiti skript, sigurno je)
6. Kopiraj URL koji dobiješ (izgleda kao `https://script.google.com/macros/s/XXXXXXX/exec`)

### Korak 4 — Pošalji mi taj URL (ili ga sama dodaj)

Ako mi pošalješ URL, ja ću ga dodati u projekat. Ili sama:

1. U korijenu projekta napravi fajl `.env.local` (kopija `.env.example`)
2. Ubaci: `NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXXXX/exec`
3. Restartuj dev server (`npm run dev`)

Nakon toga, svaki preorder ili newsletter prijava sa sajta upisuje red u tvoj Sheet (dva taba: "Preorders" i "Newsletter", prave se automatski).

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
