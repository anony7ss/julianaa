import Link from "next/link";
import { Newspaper, ShieldCheck, Sparkles } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";

export const metadata = {
  title: "Sobre o Jornal",
};

export default function AboutPage() {
  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="O jornal oficial da Juliana."
        description="O Juu News nasceu para cobrir o assunto mais importante da redacao: Juliana, nosso amor, nossas memorias e todos os acontecimentos que merecem manchete dramatica."
      />

      <div className="paper-texture public-soft-panel mt-8 p-7">
        <p className="public-label text-[var(--wine)]">Linha editorial</p>
        <p className="font-editorial mt-5 text-[clamp(2.4rem,4vw,3.3rem)] leading-none">
          Rigor jornalistico duvidoso. Carinho 100% comprovado.
        </p>
      </div>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        {[
          [Newspaper, "Apuracao", "Toda pauta comeca em uma lembranca, uma saudade ou um sorriso suspeito."],
          [ShieldCheck, "Verificacao", "As noticias passam pelo selo oficial: verificada pelo namorado."],
          [Sparkles, "Publicacao", "O texto sai com drama controlado, humor interno e bastante amor."],
        ].map(([Icon, title, text]) => (
          <div key={String(title)} className="public-panel p-5">
            <Icon className="h-6 w-6 text-[var(--wine)]" />
            <h2 className="font-editorial mt-4 text-3xl leading-none">{String(title)}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{String(text)}</p>
          </div>
        ))}
      </section>

      <div className="border-t border-[var(--line)] pt-8">
        <Link
          href="/declaracao"
          className="focus-ring inline-flex items-center gap-3 rounded-md bg-[var(--wine)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]"
        >
          Ler declaracao especial <span aria-hidden>{"->"}</span>
        </Link>
      </div>
    </div>
  );
}
