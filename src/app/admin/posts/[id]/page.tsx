import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/auth";
import { getAuthors, getCategories, getPostById } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const admin = await requireAdmin();
  const [post, categories, authors] = await Promise.all([
    getPostById(id),
    getCategories(),
    getAuthors(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell admin={admin}>
      <AdminPageHeader title="Editar noticia" description={post.title} />
      <PostEditor categories={categories} authors={authors} post={post} />
    </AdminShell>
  );
}
