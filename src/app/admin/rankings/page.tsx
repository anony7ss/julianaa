import { AdminShell } from "@/components/admin/AdminShell";
import { RankingManager } from "@/components/admin/RankingManager";
import { requireAdmin } from "@/lib/auth";
import { getRankings } from "@/lib/data";

export default async function AdminRankingsPage() {
  const admin = await requireAdmin();
  const rankings = await getRankings();

  return (
    <AdminShell admin={admin}>
      <RankingManager rankings={rankings} />
    </AdminShell>
  );
}
