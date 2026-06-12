import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, Cat, Newspaper, Sparkles } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { catGallery } from "@/data/feature-content";
import { relationshipStartLabel } from "@/data/seed";
import { getLoveQuotes, getPublishedPosts } from "@/lib/data";
import { getDailyEdition, getDailyPostOrder } from "@/lib/daily-edition";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Hoje no Juu News",
};

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const [posts, quotes] = await Promise.all([getPublishedPosts(), getLoveQuotes()]);
  const today = new Date();
  const dailyEdition = getDailyEdition(today);
  const dailyPost = getDailyPostOrder(posts, today, "today-posts")[0] ?? null;
  const quote =
    quotes[dailyEdition.issueNumber % Math.max(1, quotes.length)]?.quote ?? "Toda noticia boa me lembra voce.";
  const cat = getDailyPostOrder(catGallery, today, "today-cats")[0];

  return (
    <div className="public-page">
      <PublicPageHeader
        title="Hoje no Juu News"
        description="Um resumo vivo com noticia recomendada, gato do dia, frase e contador especial."
        meta={formatDate(today)}
      />

      <section className="paper-texture public-soft-panel mt-8 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--wine)]" />
          <p className="public-label text-[var(--wine)]">{dailyEdition.label}</p>
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            {dailyEdition.category}
          </span>
        </div>
        <h2 className="font-editorial mt-5 max-w-4xl text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92]">
          {dailyEdition.generatedPost.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ink-soft)]">
          {dailyEdition.generatedPost.subtitle}
        </p>
        <div className="mt-6 grid gap-4 border-t border-[var(--line)] pt-5 text-base leading-8 text-[var(--ink-soft)] md:grid-cols-3">
          {dailyEdition.generatedPost.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {dailyPost ? (
          <Link
            href={`/noticias/${dailyPost.slug}`}
            className="public-card-hover group rounded-md border border-[var(--line)] bg-white p-6 shadow-sm"
          >
            <Newspaper className="h-6 w-6 text-[var(--wine)]" />
            <p className="public-label mt-5 text-[var(--muted)]">Noticia do dia</p>
            <h2 className="font-editorial mt-3 text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.92] transition group-hover:text-[var(--wine)]">
              {dailyPost.title}
            </h2>
            {dailyPost.subtitle ? (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">{dailyPost.subtitle}</p>
            ) : null}
          </Link>
        ) : null}

        <section className="grid gap-6">
          <div className="public-panel p-6">
            <CalendarHeart className="h-6 w-6 text-[var(--wine)]" />
            <p className="font-editorial mt-4 text-[clamp(3rem,5vw,4.6rem)] leading-none">
              Nossa historia
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">desde {relationshipStartLabel}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">primeiro encontro ainda sem data marcada</p>
          </div>

          <div className="paper-texture public-soft-panel p-6 shadow-sm">
            <p className="public-label text-[var(--wine)]">Frase de hoje</p>
            <blockquote className="font-editorial mt-4 text-4xl italic leading-tight">&quot;{quote}&quot;</blockquote>
          </div>
        </section>
      </div>

      <section className="public-panel mt-6 grid gap-5 p-6 md:grid-cols-[18rem_1fr]">
        <div className="relative aspect-[1.1] overflow-hidden rounded-md bg-[var(--rose-soft)]">
          <Image src={cat.src} alt="" fill sizes="320px" className="object-cover" />
        </div>
        <div className="self-center">
          <Cat className="h-6 w-6 text-[var(--wine)]" />
          <p className="public-label mt-4 text-[var(--muted)]">Gato do dia</p>
          <h2 className="font-editorial mt-2 text-5xl leading-none">{cat.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{cat.description}</p>
        </div>
      </section>
    </div>
  );
}
