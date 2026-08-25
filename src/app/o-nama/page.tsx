import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Zašto postojimo i šta nas pokreće — tim koji lično testira svaki uređaj prije nego što ga preporuči.",
};

export default function ONamaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="w-full bg-bg px-6 py-24">
        <div className="animate-fade-in-up mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-text">
            Mir u glavi. To gradimo.
          </h1>
          <p className="text-lg text-text-muted sm:text-xl">
            {BRAND_NAME} postoji zbog jedne jednostavne ideje: dom bi trebao brinuti manje, a
            pružati više sigurnosti i vremena. Ne prodajemo uređaje — prodajemo osjećaj da je sve
            pod kontrolom, čak i kad niste tu.
          </p>
        </div>
      </section>

      <section className="w-full bg-bg-alt px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            Zašto {BRAND_NAME} postoji
          </h2>
          <p className="text-base text-text-muted sm:text-lg">
            Previše porodica, studenata i vlasnika apartmana brine se o stvarima koje ne bi trebale
            oduzimati vrijeme — jesu li zavjese zatvorene, je li neko provjerio dom, da li gost zna
            kako da se snađe. Pravimo proizvode koji te sitne brige uklanjaju, bez skupe ugradnje i
            bez komplikovanih uputstava.
          </p>
          <p className="text-base text-text-muted sm:text-lg">
            Iza {BRAND_NAME} stoji tim koji lično testira svaki uređaj prije nego što ga preporuči —
            ne stavljamo u ponudu ništa što sami ne bismo koristili u svom domu.
          </p>
        </div>
      </section>

      <section className="w-full bg-bg px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Placeholder za fotografiju/CGI proizvoda ili scene doma — ne portret osobe */}
          <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-bg-alt to-bg">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="text-primary/40"
            >
              <path d="M4 11.5 12 4l8 7.5" />
              <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
              <path d="M10 20v-5h4v5" />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
