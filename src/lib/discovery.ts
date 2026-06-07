import type { Category, Post } from "@/types/content";

export function getAllTags(posts: Post[]) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function getPostsByMonth(posts: Post[]) {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return posts.reduce<Array<{ key: string; label: string; posts: Post[] }>>((groups, post) => {
    const date = new Date(post.publishedAt ?? post.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const existing = groups.find((group) => group.key === key);

    if (existing) {
      existing.posts.push(post);
      return groups;
    }

    groups.push({
      key,
      label: formatter.format(date),
      posts: [post],
    });

    return groups;
  }, []);
}

export function getDailyPost(posts: Post[], date = new Date()) {
  if (posts.length === 0) {
    return null;
  }

  const daySeed = Number(
    `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`,
  );

  return posts[daySeed % posts.length];
}

export function getCategoryCounts(posts: Post[], categories: Category[]) {
  return categories.map((category) => ({
    category,
    count: posts.filter((post) => post.categoryId === category.id).length,
  }));
}

export function getRelatedByTags(post: Post, posts: Post[], limit = 3) {
  const tags = new Set(post.tags);

  return posts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score:
        candidate.tags.filter((tag) => tags.has(tag)).length +
        (candidate.categoryId === post.categoryId ? 1 : 0),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.post);
}
