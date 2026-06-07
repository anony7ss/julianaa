import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/auth";
import { getAuthors, getCategories } from "@/lib/data";

export default async function NewPostPage() {
  const admin = await requireAdmin();
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  return (
    <AdminShell admin={admin}>
      <AdminPageHeader title="Nova noticia" description="Criar materia com validacao Zod e upload controlado." />
      <PostEditor categories={categories} authors={authors} />
    </AdminShell>
  );
}
