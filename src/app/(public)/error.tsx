"use client";

export default function PublicError({ reset }: { reset: () => void }) {
  return (
    <div className="public-page public-page-narrow">
      <div className="public-panel mx-auto max-w-2xl p-8 text-center">
        <p className="public-label text-[var(--wine)]">Erro de redacao</p>
        <h1 className="font-editorial mt-4 text-[clamp(2.8rem,5vw,4.2rem)] leading-none">
          A pauta falhou por um instante.
        </h1>
        <p className="mt-4 text-[var(--muted)]">Tente carregar de novo sem expor detalhes internos.</p>
        <button
          type="button"
          onClick={reset}
          className="focus-ring mt-7 rounded-md bg-[var(--wine)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
