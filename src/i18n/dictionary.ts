import type { Locale } from "./locales";

export interface Dictionary {
  site: {
    tagline: string;
    description: string;
  };
  nav: {
    products: string;
    about: string;
    blog: string;
  };
  header: {
    cartAria: string;
  };
  footer: {
    company: string;
    productsCol: string;
    allProducts: string;
    rights: string;
    legal: {
      terms: string;
      privacy: string;
      refund: string;
    };
  };
  announcement: string;
  hero: {
    badge: string;
    title: string;
    cta1: string;
    cta2: string;
  };
  whyUs: {
    heading: string;
    reasons: { title: string; description: string }[];
  };
  featuredProducts: {
    heading: string;
  };
  howItWorks: {
    heading: string;
    stepLabel: string;
    steps: { title: string; description: string }[];
  };
  videoSection: {
    heading: string;
  };
  reviews: {
    heading: string;
    body: string;
  };
  blogPreview: {
    heading: string;
    readAll: string;
  };
  newsletter: {
    heading: string;
    subheading: string;
    placeholder: string;
    emailAria: string;
    cta: string;
    sending: string;
    success: string;
    error: string;
  };
  blogPage: {
    heading: string;
    subheading: string;
  };
  blogCard: {
    readMore: string;
  };
  productsPage: {
    heading: string;
  };
  productCard: {
    from: string;
    view: string;
  };
  product: {
    specsHeading: string;
    recommended: string;
    included: string;
    quantity: string;
    decreaseAria: string;
    increaseAria: string;
    total: string;
    pricePerUnit: string;
    pricePerUnitSuffix: string;
    addToCart: string;
    added: string;
    imageAltPattern: string;
  };
  cart: {
    title: string;
    closeAria: string;
    empty: string;
    browse: string;
    removeAria: string;
    decreaseAria: string;
    increaseAria: string;
    subtotal: string;
    emailPlaceholder: string;
    emailAria: string;
    submit: string;
    submitting: string;
    thankYou: string;
    willContact: string;
    error: string;
  };
  specsLabels: Record<string, string>;
  languageSwitcher: {
    label: string;
  };
  notFound: {
    heading: string;
    body: string;
    cta: string;
  };
}

const bs: Dictionary = {
  site: {
    tagline: "Vaš dom, pod vašom kontrolom.",
    description:
      "Pametni uređaji za dom — kontrolišite rasvjetu, zavjese i sigurnost odakle god se nalazite.",
  },
  nav: { products: "Proizvodi", about: "O nama", blog: "Blog" },
  header: { cartAria: "Korpa" },
  footer: {
    company: "Kompanija",
    productsCol: "Proizvodi",
    allProducts: "Svi proizvodi",
    rights: "Sva prava zadržana.",
    legal: {
      terms: "Uslovi korištenja",
      privacy: "Politika privatnosti",
      refund: "Preorder i povrat",
    },
  },
  announcement: "Besplatna dostava u BiH · 2 godine garancije",
  hero: {
    badge: "Preorder sada dostupan",
    title: "Vaš dom, pametniji od danas.",
    cta1: "Kupi odmah",
    cta2: "Pogledaj proizvod",
  },
  whyUs: {
    heading: "Zašto baš mi",
    reasons: [
      {
        title: "Kontrola odakle god ste",
        description:
          "Aplikacija i glasovna kontrola (Alexa, Google Home) — upravljajte domom i kad niste tu.",
      },
      {
        title: "Jednostavna ugradnja",
        description: "Montaža bez majstora i bez bušenja — spremno za upotrebu za par minuta.",
      },
      {
        title: "2 godine garancije",
        description: "Stojimo iza kvaliteta — svaki uređaj dolazi sa punom garancijom i podrškom.",
      },
      {
        title: "Brza dostava u BiH",
        description: "Naručite danas, uređaj stiže brzo i sigurno na vašu adresu.",
      },
      {
        title: "Podrška na vašem jeziku",
        description: "Pitanja prije i poslije kupovine? Odgovaramo brzo, direktno i razumljivo.",
      },
    ],
  },
  featuredProducts: { heading: "Izdvojeni proizvodi" },
  howItWorks: {
    heading: "Kako funkcioniše",
    stepLabel: "Korak",
    steps: [
      {
        title: "Naručite",
        description: "Odaberite proizvod i varijantu koja vam odgovara — rezervišete uz preorder.",
      },
      {
        title: "Instalirajte",
        description: "Montaža za par minuta, bez alata i bez majstora.",
      },
      {
        title: "Kontrolišite",
        description: "Povežite se na aplikaciju i upravljajte domom odakle god se nalazite.",
      },
    ],
  },
  videoSection: { heading: "Proizvod u akciji" },
  reviews: {
    heading: "Radije čekamo prave recenzije",
    body: "Ne izmišljamo recenzije da bismo izgledali popularnije. Svaki uređaj lično testira naš tim prije nego što ga preporuči — prve recenzije kupaca stižu ovdje čim prvi preorderi stignu na adresu.",
  },
  blogPreview: { heading: "Sa bloga", readAll: "Pogledaj sve članke →" },
  newsletter: {
    heading: "Budite prvi koji saznaju",
    subheading: "Prijavite se za novosti o proizvodima i preorder ponudama.",
    placeholder: "Vaš email",
    emailAria: "Email adresa",
    cta: "Prijavi se",
    sending: "Šaljem...",
    success: "Hvala na prijavi!",
    error: "Nešto nije uspjelo. Pokušajte ponovo.",
  },
  blogPage: {
    heading: "Sa bloga",
    subheading: "Savjeti i vodiči o pametnom domu — bez žargona, direktno na stvar.",
  },
  blogCard: { readMore: "Čitaj više →" },
  productsPage: { heading: "Svi proizvodi" },
  productCard: { from: "Od", view: "Pogledaj →" },
  product: {
    specsHeading: "Specifikacije",
    recommended: "Preporučeno",
    included: "Uključeno",
    quantity: "Količina",
    decreaseAria: "Smanji količinu",
    increaseAria: "Povećaj količinu",
    total: "Ukupno",
    pricePerUnit: "Cijena po komadu",
    pricePerUnitSuffix: "po komadu",
    addToCart: "Dodaj u korpu",
    added: "Dodano u korpu ✓",
    imageAltPattern: "Slika {n}",
  },
  cart: {
    title: "Korpa",
    closeAria: "Zatvori korpu",
    empty: "Korpa je prazna.",
    browse: "Pogledaj proizvode",
    removeAria: "Ukloni iz korpe",
    decreaseAria: "Smanji količinu",
    increaseAria: "Povećaj količinu",
    subtotal: "Ukupno",
    emailPlaceholder: "Vaš email (za potvrdu narudžbe)",
    emailAria: "Email adresa",
    submit: "Naruči (Preorder)",
    submitting: "Šaljem...",
    thankYou: "Hvala! Narudžba je zabilježena.",
    willContact: "Javićemo vam se na {email} uskoro.",
    error: "Nešto nije uspjelo. Pokušajte ponovo.",
  },
  specsLabels: {
    dimensions: "Dimenzije",
    power: "Snaga",
    battery: "Baterija",
    max_stroke: "Maksimalni hod",
    app: "Aplikacija",
    type: "Tip",
    compatibility: "Kompatibilnost",
  },
  languageSwitcher: { label: "Jezik" },
  notFound: {
    heading: "Stranica nije pronađena",
    body: "Stranica koju tražite ne postoji ili je premještena.",
    cta: "Nazad na početnu",
  },
};

const en: Dictionary = {
  site: {
    tagline: "Your home, under your control.",
    description:
      "Smart home devices — control lighting, curtains and security from wherever you are.",
  },
  nav: { products: "Products", about: "About", blog: "Blog" },
  header: { cartAria: "Cart" },
  footer: {
    company: "Company",
    productsCol: "Products",
    allProducts: "All products",
    rights: "All rights reserved.",
    legal: {
      terms: "Terms of use",
      privacy: "Privacy policy",
      refund: "Preorder & refunds",
    },
  },
  announcement: "Free shipping in BiH · 2-year warranty",
  hero: {
    badge: "Preorder available now",
    title: "Your home, smarter as of today.",
    cta1: "Buy now",
    cta2: "View product",
  },
  whyUs: {
    heading: "Why us",
    reasons: [
      {
        title: "Control from anywhere",
        description:
          "App and voice control (Alexa, Google Home) — manage your home even when you're not there.",
      },
      {
        title: "Simple installation",
        description: "No electrician, no drilling — ready to use within minutes.",
      },
      {
        title: "2-year warranty",
        description: "We stand behind our quality — every device comes with full warranty and support.",
      },
      {
        title: "Fast delivery in BiH",
        description: "Order today, your device arrives quickly and safely at your address.",
      },
      {
        title: "Support in your language",
        description: "Questions before or after buying? We answer quickly, directly, and clearly.",
      },
    ],
  },
  featuredProducts: { heading: "Featured products" },
  howItWorks: {
    heading: "How it works",
    stepLabel: "Step",
    steps: [
      {
        title: "Order",
        description: "Pick the product and variant that suits you — reserve it with a preorder.",
      },
      {
        title: "Install",
        description: "Setup takes a few minutes, no tools and no electrician needed.",
      },
      {
        title: "Control",
        description: "Connect the app and manage your home from wherever you are.",
      },
    ],
  },
  videoSection: { heading: "Product in action" },
  reviews: {
    heading: "We'd rather wait for real reviews",
    body: "We don't make up reviews to look more popular. Our team personally tests every device before recommending it — the first real customer reviews will appear here as soon as the first preorders arrive.",
  },
  blogPreview: { heading: "From the blog", readAll: "View all articles →" },
  newsletter: {
    heading: "Be the first to know",
    subheading: "Sign up for product news and preorder offers.",
    placeholder: "Your email",
    emailAria: "Email address",
    cta: "Sign up",
    sending: "Sending...",
    success: "Thanks for signing up!",
    error: "Something went wrong. Please try again.",
  },
  blogPage: {
    heading: "From the blog",
    subheading: "Tips and guides on smart homes — no jargon, straight to the point.",
  },
  blogCard: { readMore: "Read more →" },
  productsPage: { heading: "All products" },
  productCard: { from: "From", view: "View →" },
  product: {
    specsHeading: "Specifications",
    recommended: "Recommended",
    included: "Included",
    quantity: "Quantity",
    decreaseAria: "Decrease quantity",
    increaseAria: "Increase quantity",
    total: "Total",
    pricePerUnit: "Price per unit",
    pricePerUnitSuffix: "per unit",
    addToCart: "Add to cart",
    added: "Added to cart ✓",
    imageAltPattern: "Image {n}",
  },
  cart: {
    title: "Cart",
    closeAria: "Close cart",
    empty: "Your cart is empty.",
    browse: "Browse products",
    removeAria: "Remove from cart",
    decreaseAria: "Decrease quantity",
    increaseAria: "Increase quantity",
    subtotal: "Total",
    emailPlaceholder: "Your email (to confirm the order)",
    emailAria: "Email address",
    submit: "Order (Preorder)",
    submitting: "Sending...",
    thankYou: "Thank you! Your order has been recorded.",
    willContact: "We'll be in touch at {email} soon.",
    error: "Something went wrong. Please try again.",
  },
  specsLabels: {
    dimensions: "Dimensions",
    power: "Power",
    battery: "Battery",
    max_stroke: "Max stroke",
    app: "App",
    type: "Type",
    compatibility: "Compatibility",
  },
  languageSwitcher: { label: "Language" },
  notFound: {
    heading: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
};

const de: Dictionary = {
  site: {
    tagline: "Ihr Zuhause, unter Ihrer Kontrolle.",
    description:
      "Smarte Geräte für Ihr Zuhause — steuern Sie Beleuchtung, Vorhänge und Sicherheit von überall.",
  },
  nav: { products: "Produkte", about: "Über uns", blog: "Blog" },
  header: { cartAria: "Warenkorb" },
  footer: {
    company: "Unternehmen",
    productsCol: "Produkte",
    allProducts: "Alle Produkte",
    rights: "Alle Rechte vorbehalten.",
    legal: {
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung",
      refund: "Vorbestellung & Rückgabe",
    },
  },
  announcement: "Kostenloser Versand in BiH · 2 Jahre Garantie",
  hero: {
    badge: "Vorbestellung jetzt möglich",
    title: "Ihr Zuhause, ab heute smarter.",
    cta1: "Jetzt kaufen",
    cta2: "Produkt ansehen",
  },
  whyUs: {
    heading: "Warum wir",
    reasons: [
      {
        title: "Kontrolle von überall",
        description:
          "App- und Sprachsteuerung (Alexa, Google Home) — steuern Sie Ihr Zuhause auch, wenn Sie nicht da sind.",
      },
      {
        title: "Einfache Installation",
        description: "Keine Elektriker, kein Bohren — in wenigen Minuten einsatzbereit.",
      },
      {
        title: "2 Jahre Garantie",
        description: "Wir stehen zu unserer Qualität — jedes Gerät kommt mit voller Garantie und Support.",
      },
      {
        title: "Schnelle Lieferung in BiH",
        description: "Heute bestellt, kommt Ihr Gerät schnell und sicher an Ihre Adresse.",
      },
      {
        title: "Support in Ihrer Sprache",
        description: "Fragen vor oder nach dem Kauf? Wir antworten schnell, direkt und verständlich.",
      },
    ],
  },
  featuredProducts: { heading: "Ausgewählte Produkte" },
  howItWorks: {
    heading: "So funktioniert's",
    stepLabel: "Schritt",
    steps: [
      {
        title: "Bestellen",
        description: "Wählen Sie Produkt und Variante — reservieren Sie mit einer Vorbestellung.",
      },
      {
        title: "Installieren",
        description: "Montage in wenigen Minuten, ohne Werkzeug und ohne Handwerker.",
      },
      {
        title: "Steuern",
        description: "Mit der App verbinden und Ihr Zuhause von überall steuern.",
      },
    ],
  },
  videoSection: { heading: "Produkt in Aktion" },
  reviews: {
    heading: "Wir warten lieber auf echte Bewertungen",
    body: "Wir erfinden keine Bewertungen, um beliebter zu wirken. Jedes Gerät wird von unserem Team persönlich getestet, bevor wir es empfehlen — die ersten echten Kundenbewertungen erscheinen hier, sobald die ersten Vorbestellungen ankommen.",
  },
  blogPreview: { heading: "Vom Blog", readAll: "Alle Artikel ansehen →" },
  newsletter: {
    heading: "Seien Sie die Ersten, die es erfahren",
    subheading: "Melden Sie sich für Produktneuigkeiten und Vorbestellungsangebote an.",
    placeholder: "Ihre E-Mail",
    emailAria: "E-Mail-Adresse",
    cta: "Anmelden",
    sending: "Wird gesendet...",
    success: "Danke für Ihre Anmeldung!",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  },
  blogPage: {
    heading: "Vom Blog",
    subheading: "Tipps und Anleitungen rund ums Smart Home — ohne Fachjargon, direkt auf den Punkt.",
  },
  blogCard: { readMore: "Weiterlesen →" },
  productsPage: { heading: "Alle Produkte" },
  productCard: { from: "Ab", view: "Ansehen →" },
  product: {
    specsHeading: "Spezifikationen",
    recommended: "Empfohlen",
    included: "Inbegriffen",
    quantity: "Menge",
    decreaseAria: "Menge verringern",
    increaseAria: "Menge erhöhen",
    total: "Gesamt",
    pricePerUnit: "Preis pro Stück",
    pricePerUnitSuffix: "pro Stück",
    addToCart: "In den Warenkorb",
    added: "Zum Warenkorb hinzugefügt ✓",
    imageAltPattern: "Bild {n}",
  },
  cart: {
    title: "Warenkorb",
    closeAria: "Warenkorb schließen",
    empty: "Ihr Warenkorb ist leer.",
    browse: "Produkte ansehen",
    removeAria: "Aus dem Warenkorb entfernen",
    decreaseAria: "Menge verringern",
    increaseAria: "Menge erhöhen",
    subtotal: "Gesamt",
    emailPlaceholder: "Ihre E-Mail (zur Bestätigung der Bestellung)",
    emailAria: "E-Mail-Adresse",
    submit: "Bestellen (Vorbestellung)",
    submitting: "Wird gesendet...",
    thankYou: "Danke! Ihre Bestellung wurde erfasst.",
    willContact: "Wir melden uns bald bei {email}.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  },
  specsLabels: {
    dimensions: "Abmessungen",
    power: "Leistung",
    battery: "Akku",
    max_stroke: "Max. Hubweg",
    app: "App",
    type: "Typ",
    compatibility: "Kompatibilität",
  },
  languageSwitcher: { label: "Sprache" },
  notFound: {
    heading: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    cta: "Zurück zur Startseite",
  },
};

const dictionaries: Record<Locale, Dictionary> = { bs, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
