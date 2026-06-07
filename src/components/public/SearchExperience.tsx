"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, FileText, Search, Tags } from "lucide-react";
import { getAllTags } from "@/lib/discovery";
import { formatDate, formatTimelineDate } from "@/lib/utils";
import type { Category, LoveQuote, Post, TimelineEvent } from "@/types/content";

type SearchResult =
  | { id: string; type: "noticia"; title: string; href: string; description: string; meta: string }
  | { id: string; type: "categoria"; title: string; href: string; description: string; meta: string }
  | { id: string; type: "frase"; title: string; href: string; description: string; meta: string }
  | { id: string; type: "timeline"; title: string; href: string; description: string; meta: string };

export function SearchExperience({
  posts,
  categories,
  quotes,
  events,
  initialQuery = "",
  initialTag = "all",
}: {
  posts: Post[];
  categories: Category[];
  quotes: LoveQuote[];
  events: TimelineEvent[];
  initialQuery?: string;
  initialTag?: string;
}) {
  const tags = useMemo(() => getAllTags(posts), [posts]);
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState("all");
  const [tag, setTag] = useState(tags.includes(initialTag) ? initialTag : "all");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const candidates: SearchResult[] = [
      ...posts
        .filter((post) => categoryId === "all" || post.categoryId === categoryId)
        .filter((post) => tag === "all" || post.tags.includes(tag))
        .map((post) => ({
          id: post.id,
          type: "noticia" as const,
          title: post.title,
          href: `/noticias/${post.slug}`,
          description: post.subtitle ?? post.content.slice(0, 180),
          meta: `${post.category?.name ?? "Juu News"} | ${formatDate(post.publishedAt ?? post.createdAt)}`,
        })),
      ...categories.map((category) => ({
        id: category.id,
        type: "categoria" as const,
        title: category.name,
        href: `/categorias#${category.slug}`,
        description: category.description ?? "Editoria oficial do Juu News.",
        meta: "Categoria",
      })),
      ...quotes.map((quote) => ({
        id: quote.id,
        type: "frase" as const,
        title: quote.quote,
        href: "/declaracao",
        description: "Frase romantica salva no jornal.",
        meta: "Frase",
      })),
      ...events.map((event) => ({
        id: event.id,
        type: "timeline" as const,
        title: event.title,
        href: "/linha-do-tempo",
        description: event.description ?? "Evento da linha do tempo.",
        meta: formatTimelineDate(event.eventDate),
      })),
    ];

    if (!normalized) {
      return candidates.slice(0, 12);
    }

    return candidates.filter((item) =>
      `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(normalized),
    );
  }, [categories, categoryId, events, posts, query, quotes, tag]);

  return (
    <div className="grid gap-6 lg:grid-cols-[19rem_1fr]">
      <aside className="public-panel h-fit p-5">
        <label className="grid gap-2 text-sm font-semibold">
          Buscar
          <span className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="admin-input pl-10"
              placeholder="noticia, frase, tag..."
            />
          </span>
        </label>

        <label className="mt-4 grid gap-2 text-sm font-semibold">
          Categoria
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="admin-input">
            <option value="all">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-4 grid gap-2 text-sm font-semibold">
          Tag
          <select value={tag} onChange={(event) => setTag(event.target.value)} className="admin-input">
            <option value="all">Todas</option>
            {tags.map((item) => (
              <option key={item} value={item}>
                #{item}
              </option>
            ))}
          </select>
        </label>
      </aside>

      <section className="grid gap-3">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <p className="text-sm font-semibold">{results.length} resultados</p>
          <p className="text-xs text-[var(--muted)]">Noticias, frases, categorias e memorias</p>
        </div>
        {results.length > 0 ? (
          results.map((item) => <ResultRow key={`${item.type}-${item.id}`} item={item} />)
        ) : (
          <div className="public-empty">
            Nenhum resultado encontrado.
          </div>
        )}
      </section>
    </div>
  );
}

function ResultRow({ item }: { item: SearchResult }) {
  const iconClass = "h-4 w-4";
  const Icon = item.type === "timeline" ? CalendarDays : item.type === "categoria" ? Tags : FileText;

  return (
    <Link
      href={item.href}
      className="public-card-hover group grid gap-3 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm sm:grid-cols-[2.75rem_1fr]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--rose-soft)] text-[var(--wine)]">
        <Icon className={iconClass} />
      </span>
      <span>
        <span className="public-label text-[10px] text-[var(--muted)]">{item.meta}</span>
        <span className="font-editorial mt-1 block text-[clamp(2rem,3vw,2.8rem)] leading-[0.98] transition group-hover:text-[var(--wine)]">
          {item.title}
        </span>
        <span className="mt-2 block text-sm leading-6 text-[var(--ink-soft)]">{item.description}</span>
      </span>
    </Link>
  );
}
