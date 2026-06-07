import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/data";

export default async function AdminCategoriesPage() {
  const admin = await requireAdmin();
  const categories = await getCategories();

  return (
    <AdminShell admin={admin}>
      <CollectionManager
        title="Categorias"
        description="Editorias do jornal com slug unico e cor de apoio para organizacao visual."
        endpoint="/api/admin/categories"
        items={categories}
        variant="categories"
        fields={[
          { name: "name", label: "Nome", required: true },
          { name: "slug", label: "Slug" },
          { name: "description", label: "Descricao", type: "textarea" },
          { name: "color", label: "Cor", type: "color" },
        ]}
      />
    </AdminShell>
  );
}
