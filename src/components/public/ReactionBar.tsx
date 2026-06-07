"use client";

import { useEffect, useState } from "react";
import { BellRing, Heart, Laugh, MessageCircleHeart } from "lucide-react";

const reactions = [
  { key: "fofo", label: "fofo", icon: Heart },
  { key: "ri-muito", label: "ri muito", icon: Laugh },
  { key: "saudade", label: "saudade", icon: MessageCircleHeart },
  { key: "urgente", label: "noticia urgente", icon: BellRing },
];

export function ReactionBar({ postId }: { postId: string }) {
  const storageKey = `juu-news-reactions:${postId}`;
  const [selected, setSelected] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    function readStorage() {
      setSelected(window.localStorage.getItem(storageKey));
      setFavorite(window.localStorage.getItem(`${storageKey}:favorite`) === "true");
    }

    readStorage();
    window.addEventListener("storage", readStorage);
    window.addEventListener("juu-news-storage", readStorage);

    return () => {
      window.removeEventListener("storage", readStorage);
      window.removeEventListener("juu-news-storage", readStorage);
    };
  }, [storageKey]);

  function chooseReaction(key: string) {
    const next = selected === key ? null : key;
    if (next) {
      window.localStorage.setItem(storageKey, next);
    } else {
      window.localStorage.removeItem(storageKey);
    }
    window.dispatchEvent(new Event("juu-news-storage"));
  }

  function toggleFavorite() {
    window.localStorage.setItem(`${storageKey}:favorite`, String(!favorite));
    window.dispatchEvent(new Event("juu-news-storage"));
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
      {reactions.map((reaction) => {
        const Icon = reaction.icon;
        const active = selected === reaction.key;

        return (
          <button
            key={reaction.key}
            type="button"
            onClick={() => chooseReaction(reaction.key)}
            className={`focus-ring inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 transition ${
              active
                ? "scale-[1.02] border-[var(--wine)] bg-[var(--wine)] text-white shadow-sm"
                : "border-[var(--line)] bg-white text-[var(--ink-soft)] hover:border-[var(--wine)]"
            }`}
            aria-pressed={active}
          >
            <Icon className="h-3.5 w-3.5" />
            {reaction.label}
          </button>
        );
      })}
      <button
        type="button"
        onClick={toggleFavorite}
        className={`focus-ring inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 transition ${
          favorite
            ? "border-[var(--wine)] bg-[var(--rose-soft)] text-[var(--wine)]"
            : "border-[var(--line)] bg-white text-[var(--ink-soft)] hover:border-[var(--wine)]"
        }`}
        aria-pressed={favorite}
      >
        <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-[var(--wine)]" : ""}`} />
        favorito
      </button>
    </div>
  );
}
