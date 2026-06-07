import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div className="public-panel max-w-2xl p-8">
        <p className="public-label text-[var(--wine)]">404</p>
        <h1 className="font-editorial mt-5 text-[clamp(3rem,8vw,5.8rem)] leading-[0.92]">
          Essa noticia sumiu igual minha sanidade quando fico com saudade da Juliana.
        </h1>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex items-center gap-3 rounded-md bg-[var(--wine)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]"
        >
          Voltar para capa <span aria-hidden>{"->"}</span>
        </Link>
      </div>
    </main>
  );
}
