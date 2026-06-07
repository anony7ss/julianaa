import Link from "next/link";
import { Archive } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getPublishedPosts } from "@/lib/data";
import { getAllTags, getPostsByMonth } from "@/lib/discovery";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Arquivo",
};

export const revalidate = 3600;

export default async function ArchivePage() {
  const posts = await getPublishedPosts();
  const groups = getPostsByMonth(posts);
  const tags = getAllTags(posts);

  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="Arquivo editorial"
        description="Todas as edicoes organizadas por mes, com tags para reencontrar cada clima."
        icon={<Archive className="h-5 w-5" />}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/buscar?tag=${encodeURIComponent(tag)}`} className="public-chip">
            #{tag}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-8">
        {groups.map((group) => (
          <section key={group.key} className="grid gap-4 border-l border-[var(--line)] pl-5">
            <h2 className="font-editorial text-[clamp(2.8rem,5vw,4.4rem)] leading-none capitalize">
              {group.label}
            </h2>
            <div className="grid gap-3">
              {group.posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/noticias/${post.slug}`}
                  className="public-card-hover group grid gap-3 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm sm:grid-cols-[9rem_1fr]"
                >
                  <time className="public-label text-[10px] text-[var(--muted)]">
                    {formatDate(post.publishedAt ?? post.createdAt)}
                  </time>
                  <span>
                    <span className="font-editorial block text-[clamp(2rem,3vw,2.8rem)] leading-[0.98] transition group-hover:text-[var(--wine)]">
                      {post.title}
                    </span>
                    <span className="mt-2 block text-sm text-[var(--muted)]">
                      {post.category?.name ?? "Juu News"} | {post.tags.map((tag) => `#${tag}`).join(" ")}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
