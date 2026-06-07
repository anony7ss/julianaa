import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostTable } from "@/components/admin/PostTable";
import { requireAdmin } from "@/lib/auth";
import { getAllPostsForAdmin } from "@/lib/data";

export default async function AdminPostsPage() {
  const admin = await requireAdmin();
  const posts = await getAllPostsForAdmin();

  return (
    <AdminShell admin={admin}>
      <AdminPageHeader
        title="Noticias"
        description="Editar, publicar, despublicar e excluir conteudos do jornal."
        action={
          <Link
            href="/admin/posts/novo"
            className="focus-ring inline-flex h-11 items-center rounded-md bg-[var(--wine)] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]"
          >
            Nova noticia
          </Link>
        }
      />
      <PostTable posts={posts} />
    </AdminShell>
  );
}
