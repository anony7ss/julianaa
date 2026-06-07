"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import type { LoveQuote } from "@/types/content";

const generatedHeadlines = [
  "Exclusivo: Juliana sorri e previsao do dia melhora imediatamente",
  "Fontes afirmam que saudade aumentou apos foto antiga reaparecer",
  "Namorado promete cafe, carinho e elogios sem limite de caracteres",
  "Departamento de Fofura confirma: Juu segue sendo assunto principal",
];

export function HomeTools({ quotes }: { quotes: LoveQuote[] }) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const quote = useMemo(
    () => quotes[headlineIndex % Math.max(1, quotes.length)]?.quote ?? "Toda noticia boa me lembra voce.",
    [headlineIndex, quotes],
  );

  return (
    <div className="grid gap-5">
      <section className="paper-texture public-soft-panel p-5">
        <p className="public-label mb-4 text-[var(--wine)]">
          Gerador de manchete
        </p>
        <h3 className="font-editorial text-3xl leading-none">{generatedHeadlines[headlineIndex]}</h3>
        <button
          type="button"
          onClick={() => setHeadlineIndex((current) => (current + 1) % generatedHeadlines.length)}
          className="public-button focus-ring mt-5"
        >
          <RefreshCw className="h-4 w-4" />
          Gerar noticia
        </button>
      </section>

      <section className="public-panel p-5">
        <p className="public-label mb-4 flex items-center gap-2 text-[var(--wine)]">
          <Sparkles className="h-4 w-4" />
          Frase do dia
        </p>
        <blockquote className="font-editorial rounded-md bg-[var(--rose-soft)] px-5 py-6 text-3xl italic leading-tight text-[var(--ink)]">
          &quot;{quote}&quot;
        </blockquote>
      </section>
    </div>
  );
}
