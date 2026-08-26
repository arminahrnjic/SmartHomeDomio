"use client";

import { useState } from "react";
import { submitToSheet } from "@/lib/submitToSheet";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function Newsletter({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      await submitToSheet({ type: "newsletter", email });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="w-full bg-primary px-6 py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-white">
          {dict.newsletter.heading}
        </h2>
        <p className="text-base text-white/85">{dict.newsletter.subheading}</p>

        {status === "success" ? (
          <p className="text-base font-medium text-white">{dict.newsletter.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={dict.newsletter.placeholder}
              aria-label={dict.newsletter.emailAria}
              className="w-full rounded-full border-0 bg-white px-5 py-3.5 text-base text-text outline-none placeholder:text-text-muted"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-text px-8 py-3.5 text-base font-medium text-white transition-transform hover:scale-[1.03] disabled:opacity-70"
            >
              {status === "loading" ? dict.newsletter.sending : dict.newsletter.cta}
            </button>
          </form>
        )}

        {status === "error" && <p className="text-sm text-white/90">{dict.newsletter.error}</p>}
      </div>
    </section>
  );
}
