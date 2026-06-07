"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-4 text-center">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)]">Erro seguro</p>
        <h1 className="font-editorial mt-4 text-5xl leading-none">Nao foi possivel carregar o admin.</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">A mensagem foi mantida generica para nao expor detalhes internos.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 bg-[var(--wine)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
