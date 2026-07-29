"use client";

import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full bg-primary px-6 py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-white">
          Budite prvi koji saznaju
        </h2>
        <p className="text-base text-white/85">
          Prijavite se za novosti o proizvodima i preorder ponudama.
        </p>

        {submitted ? (
          <p className="text-base font-medium text-white">Hvala na prijavi!</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Vaš email"
              aria-label="Email adresa"
              className="w-full rounded-full border-0 bg-white px-5 py-3.5 text-base text-text outline-none placeholder:text-text-muted"
            />
            <button
              type="submit"
              className="rounded-full bg-text px-8 py-3.5 text-base font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Prijavi se
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
