"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import type { LoveQuote, Post } from "@/types/content";

export function SurpriseButton({ posts, quotes }: { posts: Post[]; quotes: LoveQuote[] }) {
  const router = useRouter();

  function openSurprise() {
    const destinations = [
      ...posts.map((post) => `/noticias/${post.slug}`),
      ...quotes.map(() => "/declaracao"),
      "/galeria",
      "/quiz",
      "/cartas",
    ];
    const target = destinations[Math.floor(Math.random() * destinations.length)] ?? "/";
    router.push(target);
  }

  return (
    <button
      type="button"
      onClick={openSurprise}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-md bg-[var(--ink)] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine)]"
    >
      <Shuffle className="h-4 w-4" />
      Modo surpresa
    </button>
  );
}
