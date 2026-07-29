import { siteConfig } from "@/config/siteConfig";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-alt to-bg"
      />

      {/* Placeholder za hero fotografiju/CGI proizvoda dok ne budu spremni finalni materijali */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="animate-fade-in-up flex max-w-3xl flex-col items-center gap-6">
        <span className="rounded-full border border-border bg-bg-alt px-4 py-1 text-sm font-medium text-text-muted">
          Preorder sada dostupan
        </span>

        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-text">
          Vaš dom, pametniji od danas.
        </h1>

        <p className="max-w-xl text-lg text-text-muted sm:text-xl">
          {siteConfig.description}
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <a
            href="/proizvodi"
            className="rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-all hover:scale-[1.03] hover:bg-primary-hover"
          >
            Kupi odmah
          </a>
          <a
            href="/proizvodi/smart-curtain-robot"
            className="rounded-full border border-border px-8 py-3.5 text-base font-medium text-text transition-all hover:scale-[1.03] hover:bg-bg-alt"
          >
            Pogledaj proizvod
          </a>
        </div>
      </div>
    </section>
  );
}
