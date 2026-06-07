import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { requireAdmin } from "@/lib/auth";
import { getAllLoveQuotesForAdmin } from "@/lib/data";

export default async function AdminQuotesPage() {
  const admin = await requireAdmin();
  const quotes = await getAllLoveQuotesForAdmin();

  return (
    <AdminShell admin={admin}>
      <CollectionManager
        title="Frases romanticas"
        description="Frases exibidas aleatoriamente na capa do jornal."
        endpoint="/api/admin/quotes"
        items={quotes}
        variant="quotes"
        fields={[
          { name: "quote", label: "Frase", type: "textarea", required: true },
          { name: "active", label: "Ativa", type: "checkbox" },
        ]}
      />
    </AdminShell>
  );
}
