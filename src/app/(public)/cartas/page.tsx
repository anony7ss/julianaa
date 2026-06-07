import Link from "next/link";
import { Heart } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { loveLetters } from "@/data/feature-content";

export const metadata = {
  title: "Cartas",
};

export default function LettersPage() {
  return (
    <div className="bg-[var(--ink)] text-white">
      <div className="public-page public-page-narrow">
        <PublicPageHeader
          title="Modo carta"
          description="Textos mais intimos, sem pressa de manchete, para guardar carinho em formato de bilhete."
          icon={<Heart className="h-5 w-5 fill-current" />}
          inverse
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {loveLetters.map((letter) => (
            <article key={letter.title} className="rounded-md border border-white/14 bg-white/[0.06] p-6 shadow-[0_18px_44px_rgb(0_0_0/16%)]">
              <p className="public-label text-[10px] text-[var(--rose)]">Carta</p>
              <h2 className="font-editorial mt-3 text-[clamp(2.3rem,4vw,3.2rem)] leading-none">{letter.title}</h2>
              <p className="mt-5 text-base leading-8 text-white/78">{letter.body}</p>
            </article>
          ))}
        </div>

        <Link
          href="/declaracao"
          className="focus-ring mt-10 inline-flex h-11 items-center rounded-md border border-white/40 px-4 text-xs font-bold uppercase tracking-[0.14em] transition hover:bg-white hover:text-[var(--ink)]"
        >
          Declaracao principal
        </Link>
      </div>
    </div>
  );
}
