import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, readingTime } from "@/lib/utils";
import type { Post } from "@/types/content";
import { ReactionBar } from "@/components/public/ReactionBar";

export function ArticleCard({
  post,
  variant = "list",
}: {
  post: Post;
  variant?: "lead" | "list" | "compact";
}) {
  if (variant === "lead") {
    return (
      <article className="grid gap-6 border-b border-[var(--line)] py-6 xl:grid-cols-[1fr_0.92fr] xl:items-center">
        <div className="order-2 xl:order-1">
          <p className="public-label text-[var(--wine)]">
            {post.category?.name ?? "Juu News"}
          </p>
          <h1 className="font-editorial mt-4 max-w-3xl text-[clamp(2.45rem,3.8vw,4.05rem)] leading-[0.94] text-[var(--ink)]">
            {post.title}
          </h1>
          {post.subtitle ? (
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">{post.subtitle}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--wine)]" />
            <span>{post.author?.name ?? "Redacao Juu News"}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--wine)]" />
            <span>{readingTime(post.content)} min</span>
          </div>
          <Link
            href={`/noticias/${post.slug}`}
            className="public-button focus-ring mt-7"
          >
            Ler materia completa <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Link
          href={`/noticias/${post.slug}`}
          className="public-card-hover group order-1 block overflow-hidden rounded-md border border-[var(--line)] bg-white shadow-[var(--shadow)] xl:order-2"
        >
          <div className="relative aspect-[1.25] w-full overflow-hidden">
            <Image
              src={post.coverImageUrl ?? "/images/cat-love-letters.png"}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="public-card-hover rounded-md border border-[var(--line)] bg-white p-3 shadow-sm">
        <Link href={`/noticias/${post.slug}`} className="group grid grid-cols-[5.25rem_1fr] gap-4">
          <div className="relative aspect-[1.25] overflow-hidden rounded-md bg-[var(--rose-soft)]">
            <Image
              src={post.coverImageUrl ?? "/images/cat-love-letters.png"}
              alt=""
              fill
              sizes="120px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <p className="public-label text-[10px] text-[var(--wine)]">
              {post.category?.name ?? "Juu News"}
            </p>
            <h3 className="font-editorial mt-1 text-[1.65rem] leading-[1.02] transition group-hover:text-[var(--wine)]">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-[var(--muted)]">
              {formatDate(post.publishedAt ?? post.createdAt)}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="public-card-hover group rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
      <Link href={`/noticias/${post.slug}`} className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <div className="relative aspect-[1.45] overflow-hidden rounded-md bg-[var(--rose-soft)]">
          <Image
            src={post.coverImageUrl ?? "/images/cat-love-letters.png"}
            alt=""
            fill
            sizes="220px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div>
          <p className="public-label text-[10px] text-[var(--wine)]">
            {post.category?.name ?? "Juu News"}
          </p>
          <h2 className="font-editorial mt-2 text-[clamp(2rem,3.2vw,2.7rem)] leading-[0.98] transition group-hover:text-[var(--wine)]">
            {post.title}
          </h2>
          {post.subtitle ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--ink-soft)]">{post.subtitle}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
            <span>{post.author?.name}</span>
          </div>
        </div>
      </Link>
      <ReactionBar postId={post.id} />
    </article>
  );
}
