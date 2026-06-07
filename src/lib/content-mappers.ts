import type {
  Author,
  Category,
  ContentStatus,
  LoveQuote,
  Post,
  Ranking,
  RankingItem,
  TimelineEvent,
} from "@/types/content";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  created_at: string;
};

type AuthorRow = {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

type PostRow = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  content: string;
  cover_image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  status: ContentStatus;
  views: number;
  featured: boolean;
  breaking_news: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  scheduled_at?: string | null;
  tags?: string[] | null;
  categories?: CategoryRow | CategoryRow[] | null;
  authors?: AuthorRow | AuthorRow[] | null;
};

type QuoteRow = {
  id: string;
  quote: string;
  active: boolean;
  created_at: string;
};

type TimelineRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  image_url: string | null;
  created_at: string;
};

type RankingRow = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
};

type RankingItemRow = {
  id: string;
  ranking_id: string;
  position: number;
  title: string;
  description: string | null;
};

export function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    color: row.color,
    createdAt: row.created_at,
  };
}

export function mapAuthor(row: AuthorRow): Author {
  return {
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    createdAt: row.created_at,
  };
}

export function mapPost(row: PostRow): Post {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const author = Array.isArray(row.authors) ? row.authors[0] : row.authors;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    categoryId: row.category_id,
    authorId: row.author_id,
    status: row.status,
    views: row.views,
    featured: row.featured,
    breakingNews: row.breaking_news,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    scheduledAt: row.scheduled_at ?? null,
    category: category ? mapCategory(category) : null,
    author: author ? mapAuthor(author) : null,
    tags: row.tags ?? [],
  };
}

export function mapQuote(row: QuoteRow): LoveQuote {
  return {
    id: row.id,
    quote: row.quote,
    active: row.active,
    createdAt: row.created_at,
  };
}

export function mapTimelineEvent(row: TimelineRow): TimelineEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    eventDate: row.event_date,
    imageUrl: row.image_url,
    createdAt: row.created_at,
  };
}

export function mapRanking(row: RankingRow, items: RankingItem[]): Ranking {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    items,
  };
}

export function mapRankingItem(row: RankingItemRow): RankingItem {
  return {
    id: row.id,
    rankingId: row.ranking_id,
    position: row.position,
    title: row.title,
    description: row.description,
  };
}
