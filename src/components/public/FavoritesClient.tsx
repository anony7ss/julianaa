"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { ArticleCard } from "@/components/public/ArticleCard";
import type { Post } from "@/types/content";

export function FavoritesClient({ posts }: { posts: Post[] }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const favorites = posts.filter((post) => favoriteIds.includes(post.id));

  useEffect(() => {
    function readFavorites() {
      setFavoriteIds(getFavoriteIds(posts));
    }

    readFavorites();
    window.addEventListener("storage", readFavorites);
    window.addEventListener("juu-news-storage", readFavorites);

    return () => {
      window.removeEventListener("storage", readFavorites);
      window.removeEventListener("juu-news-storage", readFavorites);
    };
  }, [posts]);

  if (favorites.length === 0) {
    return (
      <div className="public-empty">
        <Heart className="mb-3 h-5 w-5 text-[var(--wine)]" />
        Nenhuma noticia favorita neste navegador ainda.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {favorites.map((post) => (
        <ArticleCard key={post.id} post={post} variant="compact" />
      ))}
    </div>
  );
}

function getFavoriteIds(posts: Post[]) {
  return posts
    .filter((post) => window.localStorage.getItem(`juu-news-reactions:${post.id}:favorite`) === "true")
    .map((post) => post.id);
}
