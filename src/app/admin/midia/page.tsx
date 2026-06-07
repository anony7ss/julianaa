import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { requireAdmin } from "@/lib/auth";

export default async function AdminMediaPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell admin={admin}>
      <AdminPageHeader
        title="Midia"
        description="Biblioteca de imagens para capas, galerias e noticias com gatos fofos."
      />
      <MediaLibrary />
    </AdminShell>
  );
}
