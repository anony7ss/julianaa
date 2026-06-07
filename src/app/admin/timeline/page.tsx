import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { requireAdmin } from "@/lib/auth";
import { getTimelineEvents } from "@/lib/data";

export default async function AdminTimelinePage() {
  const admin = await requireAdmin();
  const events = await getTimelineEvents();

  return (
    <AdminShell admin={admin}>
      <CollectionManager
        title="Timeline"
        description="Eventos importantes do relacionamento exibidos na linha do tempo publica."
        endpoint="/api/admin/timeline"
        items={events}
        variant="timeline"
        fields={[
          { name: "title", label: "Titulo", required: true },
          { name: "description", label: "Descricao", type: "textarea" },
          { name: "eventDate", label: "Data", type: "date", required: true },
          { name: "imageUrl", label: "Imagem URL" },
        ]}
      />
    </AdminShell>
  );
}
