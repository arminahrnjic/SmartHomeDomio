"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function HowItWorks({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const steps = dict.howItWorks.steps;
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {dict.howItWorks.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[auto_1fr]">
          <div className="flex flex-row gap-4 md:flex-col md:gap-2">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActive(index)}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors ${
                  active === index ? "bg-bg-alt" : "hover:bg-bg-alt/60"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    active === index ? "bg-primary text-white" : "bg-border text-text-muted"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`hidden text-base font-medium sm:inline ${
                    active === index ? "text-text" : "text-text-muted"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <div className="animate-fade-in-up flex min-h-64 flex-col justify-center gap-4 rounded-2xl bg-bg-alt p-10">
            <span className="text-sm font-semibold text-primary">
              {dict.howItWorks.stepLabel} {active + 1} / {steps.length}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-text">{steps[active].title}</h3>
            <p className="max-w-md text-base text-text-muted">{steps[active].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
