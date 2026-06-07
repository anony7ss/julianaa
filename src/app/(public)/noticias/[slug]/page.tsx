import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/public/ArticleCard";
import { ReactionBar } from "@/components/public/ReactionBar";
import { ShareButton } from "@/components/public/ShareButton";
import { ShareImageButton } from "@/components/public/ShareImageButton";
import { getPostBySlug, getPublishedPosts } from "@/lib/data";
import { getRelatedByTags } from "@/lib/discovery";
import { formatDate, readingTime } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.subtitle ?? post.content.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.subtitle ?? undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getPublishedPosts()]);

  if (!post) {
    notFound();
  }

  const related = getRelatedByTags(post, posts, 3);
  const fallbackRelated = posts
    .filter((candidate) => candidate.id !== post.id && candidate.categoryId === post.categoryId)
    .slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;
  const paragraphs = post.content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="public-page public-page-narrow">
      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        <header>
          <Link
            href="/categorias"
            className="public-label text-[var(--wine)]"
          >
            {post.category?.name ?? "Juu News"}
          </Link>
          <h1 className="font-editorial mt-5 text-[clamp(3.35rem,7vw,6.25rem)] leading-[0.9]">
            {post.title}
          </h1>
          {post.subtitle ? (
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--ink-soft)]">{post.subtitle}</p>
          ) : null}
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--wine)]" />
            <span>{post.author?.name ?? "Redacao Juu News"}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--wine)]" />
            <span>{readingTime(post.content)} min de leitura</span>
          </div>
        </header>

        <aside className="public-panel h-fit p-5">
          <p className="public-label text-[var(--wine)]">Tags</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="public-chip">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <div className="flex flex-wrap gap-2">
              <ShareButton title={post.title} />
              <ShareImageButton title={post.title} category={post.category?.name ?? "Juu News"} />
            </div>
          </div>
          <div className="mt-7 rounded-md border border-[var(--line)] bg-[var(--paper)] p-5">
            <p className="public-label text-[var(--wine)]">Resumo</p>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-[var(--ink-soft)]">
              {paragraphs.slice(0, 3).map((paragraph, index) => (
                <li key={`${post.id}-summary-${index}`} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span className="font-editorial text-2xl leading-none text-[var(--wine)]">{index + 1}</span>
                  <span>{paragraph.slice(0, 118)}{paragraph.length > 118 ? "..." : ""}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-md border border-[var(--line)] bg-[var(--rose-soft)] shadow-[var(--shadow)]">
        <Image
          src={post.coverImageUrl ?? "/images/cat-love-letters.png"}
          alt=""
          fill
          priority
          sizes="1180px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="public-prose grid gap-7">
          {paragraphs.map((paragraph, index) => (
            <p key={`${post.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
        <ReactionBar postId={post.id} />
      </div>

      {relatedPosts.length > 0 ? (
        <section className="mt-14 border-t border-[var(--line)] pt-8">
          <h2 className="font-editorial text-[clamp(2.6rem,4vw,3.6rem)] leading-none">
            Mais noticias desse sentimento
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {relatedPosts.map((item) => (
              <ArticleCard key={item.id} post={item} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
