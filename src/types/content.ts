export type ContentStatus = "draft" | "published";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  createdAt: string;
};

export type Author = {
  id: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  content: string;
  coverImageUrl: string | null;
  categoryId: string | null;
  authorId: string | null;
  status: ContentStatus;
  views: number;
  featured: boolean;
  breakingNews: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  scheduledAt: string | null;
  category?: Pick<Category, "id" | "name" | "slug" | "color"> | null;
  author?: Pick<Author, "id" | "name" | "avatarUrl" | "bio"> | null;
  tags: string[];
};

export type LoveQuote = {
  id: string;
  quote: string;
  active: boolean;
  createdAt: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type DailyEdition = {
  dateKey: string;
  issueNumber: number;
  label: string;
  mood: string;
  headline: string;
  subtitle: string;
  note: string;
  category: string;
  tags: string[];
  generatedPost: {
    title: string;
    subtitle: string;
    body: string[];
  };
  quizQuestion: QuizQuestion;
  headlinePool: string[];
};

export type TimelineEvent = {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  imageUrl: string | null;
  createdAt: string;
};

export type RankingItem = {
  id: string;
  rankingId: string;
  position: number;
  title: string;
  description: string | null;
};

export type Ranking = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  items: RankingItem[];
};

export type AdminProfile = {
  id: string;
  name: string;
  role: "admin";
};

export type AdminAuditLog = {
  id: string;
  adminId: string | null;
  adminName: string | null;
  action: string;
  resourceType: string;
  resourceId: string | null;
  createdAt: string;
};
