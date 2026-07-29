export function VideoSection() {
  return (
    <section className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            Proizvod u akciji
          </h2>
        </div>

        {/*
          Placeholder dok CGI/produkcijski video nije spreman.
          Kad video bude gotov: <video autoPlay muted loop playsInline src="..." className="h-full w-full object-cover" />
        */}
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-text to-text/80">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-text">
              <path d="M6 4.5v15l14-7.5-14-7.5Z" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
