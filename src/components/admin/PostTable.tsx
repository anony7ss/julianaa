"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/content";

export function PostTable({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [author, setAuthor] = useState("all");
  const categories = useMemo(
    () => Array.from(new Map(posts.map((post) => [post.categoryId ?? "none", post.category?.name ?? "Sem categoria"])).entries()),
    [posts],
  );
  const authors = useMemo(
    () => Array.from(new Map(posts.map((post) => [post.authorId ?? "none", post.author?.name ?? "Sem autor"])).entries()),
    [posts],
  );
  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return posts.filter((post) => {
      const postStatus = getPostStatusLabel(post).key;
      const matchesQuery =
        !normalized ||
        `${post.title} ${post.subtitle ?? ""} ${post.slug} ${post.tags.join(" ")}`.toLowerCase().includes(normalized);
      const matchesStatus = status === "all" || postStatus === status;
      const matchesCategory = category === "all" || (post.categoryId ?? "none") === category;
      const matchesAuthor = author === "all" || (post.authorId ?? "none") === author;

      return matchesQuery && matchesStatus && matchesCategory && matchesAuthor;
    });
  }, [author, category, posts, query, status]);

  async function removePost(id: string, title: string) {
    const confirmed = window.confirm(`Excluir "${title}"? Essa acao nao pode ser desfeita.`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      window.alert("Nao foi possivel excluir a noticia.");
      return;
    }

    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[var(--line-strong)] bg-white/75 p-8 text-sm text-[var(--muted)]">
        Nenhuma noticia cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 rounded-md border border-[var(--line)] bg-white p-4 shadow-sm md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="admin-input"
          placeholder="Buscar por titulo, slug ou tag"
        />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input">
          <option value="all">Todos status</option>
          <option value="published">Publicadas</option>
          <option value="scheduled">Agendadas</option>
          <option value="draft">Rascunhos</option>
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="admin-input">
          <option value="all">Todas categorias</option>
          {categories.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select value={author} onChange={(event) => setAuthor(event.target.value)} className="admin-input">
          <option value="all">Todos autores</option>
          {authors.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-md border border-dashed border-[var(--line-strong)] bg-white/75 p-8 text-sm text-[var(--muted)]">
          Nenhuma noticia encontrada com esses filtros.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-[var(--line)] bg-white shadow-sm">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] bg-[#fbfaf8] text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            <th className="px-5 py-4">Titulo</th>
            <th className="px-5 py-4">Categoria</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Publicado</th>
            <th className="px-5 py-4 text-right">Acoes</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => {
            const statusLabel = getPostStatusLabel(post);

            return (
            <tr key={post.id} className="border-b border-[var(--line)] transition hover:bg-[#fbfaf8] last:border-b-0">
              <td className="px-5 py-4">
                <div className="grid grid-cols-[5rem_1fr] gap-4">
                  <div className="relative aspect-[1.4] overflow-hidden rounded-md bg-[var(--rose-soft)]">
                    <Image
                      src={post.coverImageUrl ?? "/images/cat-love-letters.png"}
                      alt=""
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-editorial text-2xl leading-none">{post.title}</p>
                    <p className="mt-2 text-xs text-[var(--muted)]">/{post.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-[var(--ink-soft)]">{post.category?.name ?? "-"}</td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                    statusLabel.key === "published"
                      ? "border-[var(--sage)] bg-[#f1f6f2] text-[var(--sage)]"
                      : statusLabel.key === "scheduled"
                        ? "border-[var(--blue-ink)] bg-[#eef3f8] text-[var(--blue-ink)]"
                        : "border-[var(--gold)] bg-[#fff8ee] text-[var(--gold)]"
                  }`}
                >
                  {statusLabel.label}
                </span>
              </td>
              <td className="px-5 py-4 text-[var(--muted)]">
                {post.publishedAt ? formatDate(post.publishedAt) : "-"}
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  {post.status === "published" ? (
                    <Link
                      href={`/noticias/${post.slug}`}
                      className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] text-[var(--ink-soft)] transition hover:border-[var(--wine)] hover:text-[var(--wine)]"
                      aria-label="Ver noticia"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  ) : null}
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] text-[var(--ink-soft)] transition hover:border-[var(--wine)] hover:text-[var(--wine)]"
                    aria-label="Editar noticia"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => removePost(post.id, post.title)}
                    className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] text-[var(--ink-soft)] transition hover:border-[var(--wine)] hover:text-[var(--wine)]"
                    aria-label="Excluir noticia"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
        </div>
      )}
    </div>
  );
}

function getPostStatusLabel(post: Post) {
  if (post.status === "published" && post.scheduledAt) {
    return { key: "scheduled", label: "Agendada" };
  }

  if (post.status === "published") {
    return { key: "published", label: "Publicado" };
  }

  return { key: "draft", label: "Rascunho" };
}
