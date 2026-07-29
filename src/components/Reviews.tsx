"use client";

import { useState } from "react";

// Placeholder recenzije — zamijeniti stvarnim recenzijama kupaca nakon lansiranja.
const REVIEWS = [
  {
    name: "Amina H.",
    location: "Sarajevo",
    quote:
      "Konačno ne moram ustajati da zatvorim zavjese uveče. Instalacija je trajala pet minuta.",
  },
  {
    name: "Tarik M.",
    location: "Mostar",
    quote:
      "Koristim za apartman koji izdajem — gostima ostavim uputstvo od tri rečenice i to je to.",
  },
  {
    name: "Lejla S.",
    location: "Banja Luka",
    quote: "Aplikacija radi glatko, a glasovna kontrola preko Google Home-a je iznenađujuće precizna.",
  },
];

export function Reviews() {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="w-full bg-bg px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-14 text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
          Šta kažu naši kupci
        </h2>

        <div className="flex flex-col items-center gap-8">
          <p className="animate-fade-in-up text-xl leading-relaxed text-text sm:text-2xl">
            &ldquo;{REVIEWS[active].quote}&rdquo;
          </p>
          <div className="text-sm text-text-muted">
            <span className="font-semibold text-text">{REVIEWS[active].name}</span> — {REVIEWS[active].location}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label="Prethodna recenzija"
              onClick={() => goTo(active - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:bg-bg-alt hover:text-text"
            >
              ←
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  aria-label={`Recenzija ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    active === index ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Sljedeća recenzija"
              onClick={() => goTo(active + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:bg-bg-alt hover:text-text"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
