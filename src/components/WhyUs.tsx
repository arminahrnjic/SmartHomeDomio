import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

// Icons are language-independent — matched by index to dict.whyUs.reasons.
const ICONS: React.ReactNode[] = [
  <path key="control" d="M12 18h.01M8 21h8M6.6 3h10.8A2.6 2.6 0 0 1 20 5.6v10.8a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 16.4V5.6A2.6 2.6 0 0 1 6.6 3Z" />,
  <path key="install" d="M14.7 6.3a4 4 0 0 1 5.4 5.4l-8.4 8.4a2 2 0 0 1-2.8 0l-2.6-2.6a2 2 0 0 1 0-2.8l8.4-8.4Zm-1.4 3 3.4 3.4" />,
  <path key="warranty" d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Zm-2.2 8.2 1.7 1.7 3.4-3.4" />,
  <path key="delivery" d="M3 7h11v8H3V7Zm11 3h4l3 3v2h-7v-5ZM6.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm11 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />,
  <path key="support" d="M4 5h16v10H8l-4 4V5Z" />,
];

export function WhyUs({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="zasto-mi" className="w-full bg-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            {dict.whyUs.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {dict.whyUs.reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="flex flex-col items-center gap-4 text-center transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-alt text-primary">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[index]}
                </svg>
              </span>
              <h3 className="text-base font-semibold text-text">{reason.title}</h3>
              <p className="text-sm text-text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
