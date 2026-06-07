import {
  authors as seedAuthors,
  categories as seedCategories,
  loveQuotes as seedQuotes,
  posts as seedPosts,
  rankings as seedRankings,
  timelineEvents as seedTimeline,
} from "@/data/seed";
import {
  mapAuthor,
  mapCategory,
  mapPost,
  mapQuote,
  mapRanking,
  mapRankingItem,
  mapTimelineEvent,
} from "@/lib/content-mappers";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Author, Category, LoveQuote, Post, Ranking, TimelineEvent } from "@/types/content";

const postSelect = `
  id,
  title,
  slug,
  subtitle,
  content,
  cover_image_url,
  category_id,
  author_id,
  status,
  views,
  featured,
  breaking_news,
  created_at,
  updated_at,
  published_at,
  scheduled_at,
  tags,
  categories(id, name, slug, description, color, created_at),
  authors(id, name, avatar_url, bio, created_at)
`;

function isPubliclyVisible(post: Post, now = new Date()) {
  return post.status === "published" && (!post.scheduledAt || new Date(post.scheduledAt) <= now);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedPosts.filter((post) => isPubliclyVisible(post));
  }

  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("status", "published")
    .or(`scheduled_at.is.null,scheduled_at.lte.${new Date().toISOString()}`)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return seedPosts.filter((post) => isPubliclyVisible(post));
  }

  return data.map((row) => mapPost(row));
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedPosts;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return seedPosts;
  }

  return data.map((row) => mapPost(row));
}

export async function getPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostById(id: string) {
  const posts = await getAllPostsForAdmin();
  return posts.find((post) => post.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedCategories;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, color, created_at")
    .order("name");

  if (error || !data) {
    return seedCategories;
  }

  return data.map((row) => mapCategory(row));
}

export async function getAuthors(): Promise<Author[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedAuthors;
  }

  const { data, error } = await supabase
    .from("authors")
    .select("id, name, avatar_url, bio, created_at")
    .order("name");

  if (error || !data) {
    return seedAuthors;
  }

  return data.map((row) => mapAuthor(row));
}

export async function getLoveQuotes(): Promise<LoveQuote[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedQuotes.filter((quote) => quote.active);
  }

  const { data, error } = await supabase
    .from("love_quotes")
    .select("id, quote, active, created_at")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return seedQuotes.filter((quote) => quote.active);
  }

  return data.map((row) => mapQuote(row));
}

export async function getAllLoveQuotesForAdmin(): Promise<LoveQuote[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return seedQuotes;
  }

  const { data, error } = await supabase
    .from("love_quotes")
    .select("id, quote, active, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return seedQuotes;
  }

  return data.map((row) => mapQuote(row));
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedTimeline;
  }

  const { data, error } = await supabase
    .from("timeline_events")
    .select("id, title, description, event_date, image_url, created_at")
    .order("event_date", { ascending: true });

  if (error || !data) {
    return seedTimeline;
  }

  return data.map((row) => mapTimelineEvent(row));
}

export async function getRankings(): Promise<Ranking[]> {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return seedRankings;
  }

  const [{ data: rankingRows, error: rankingError }, { data: itemRows, error: itemError }] =
    await Promise.all([
      supabase.from("rankings").select("id, title, description, created_at").order("created_at"),
      supabase
        .from("ranking_items")
        .select("id, ranking_id, position, title, description")
        .order("position"),
    ]);

  if (rankingError || itemError || !rankingRows || !itemRows) {
    return seedRankings;
  }

  const itemsByRanking = itemRows.reduce<Record<string, ReturnType<typeof mapRankingItem>[]>>(
    (acc, row) => {
      const item = mapRankingItem(row);
      acc[item.rankingId] = [...(acc[item.rankingId] ?? []), item];
      return acc;
    },
    {},
  );

  return rankingRows.map((row) => mapRanking(row, itemsByRanking[row.id] ?? []));
}
