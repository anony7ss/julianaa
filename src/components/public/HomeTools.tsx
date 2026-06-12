"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import type { DailyEdition, LoveQuote } from "@/types/content";

type HomeToolsProps = {
  quotes: LoveQuote[];
  dailyEdition: DailyEdition;
};

export function HomeTools({ quotes, dailyEdition }: HomeToolsProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = dailyEdition.headlinePool.length > 0 ? dailyEdition.headlinePool : [dailyEdition.headline];
  const quote = useMemo(
    () =>
      quotes[(dailyEdition.issueNumber + headlineIndex) % Math.max(1, quotes.length)]?.quote ??
      "Toda noticia boa me lembra voce.",
    [dailyEdition.issueNumber, headlineIndex, quotes],
  );

  return (
    <div className="grid gap-5">
      <section className="paper-texture public-soft-panel p-5">
        <p className="public-label mb-4 text-[var(--wine)]">
          Manchete diaria
        </p>
        <h3 className="font-editorial text-3xl leading-none">{headlines[headlineIndex % headlines.length]}</h3>
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{dailyEdition.label}</p>
        <button
          type="button"
          onClick={() => setHeadlineIndex((current) => (current + 1) % headlines.length)}
          className="public-button focus-ring mt-5"
        >
          <RefreshCw className="h-4 w-4" />
          Trocar manchete
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
