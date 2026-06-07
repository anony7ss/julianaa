import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { requireAdmin } from "@/lib/auth";
import { getAuthors } from "@/lib/data";

export default async function AdminAuthorsPage() {
  const admin = await requireAdmin();
  const authors = await getAuthors();

  return (
    <AdminShell admin={admin}>
      <CollectionManager
        title="Autores"
        description="Assinaturas ficticias que dao tom de jornal interno as materias."
        endpoint="/api/admin/authors"
        items={authors}
        variant="authors"
        fields={[
          { name: "name", label: "Nome", required: true },
          { name: "avatarUrl", label: "Avatar URL" },
          { name: "bio", label: "Bio", type: "textarea" },
        ]}
      />
    </AdminShell>
  );
}
