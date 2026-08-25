export function Reviews() {
  return (
    <section className="w-full bg-bg px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
          Radije čekamo prave recenzije
        </h2>
        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">
          Ne izmišljamo recenzije da bismo izgledali popularnije. Svaki uređaj lično testira naš
          tim prije nego što ga preporuči — prve recenzije kupaca stižu ovdje čim prvi preorderi
          stignu na adresu.
        </p>
      </div>
    </section>
  );
}
