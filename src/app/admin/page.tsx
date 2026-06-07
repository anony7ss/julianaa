import Link from "next/link";
import { Clock, Download, FileText, Layers3, Newspaper, Tags, TrendingUp } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { PostTable } from "@/components/admin/PostTable";
import { getRecentAdminAuditLogs } from "@/lib/admin-audit";
import { requireAdmin } from "@/lib/auth";
import { getAllPostsForAdmin, getAuthors, getCategories } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const [posts, categories, authors, auditLogs] = await Promise.all([
    getAllPostsForAdmin(),
    getCategories(),
    getAuthors(),
    getRecentAdminAuditLogs(),
  ]);

  const published = posts.filter((post) => post.status === "published").length;
  const drafts = posts.filter((post) => post.status === "draft").length;
  const scheduled = posts.filter((post) => post.status === "published" && post.scheduledAt).length;
  const totalViews = posts.reduce((acc, post) => acc + post.views, 0);
  const mostViewed = [...posts].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <AdminShell admin={admin}>
      <div className="grid gap-6">
        <AdminPageHeader
          title="Dashboard"
          description="Resumo editorial, indicadores rapidos e criacao de noticia em um unico lugar."
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                href="/api/admin/export"
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-md border border-[var(--line-strong)] bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]"
              >
                <Download className="h-4 w-4" />
                Exportar
              </Link>
              <Link
                href="/admin/posts/novo"
                className="focus-ring inline-flex h-11 items-center rounded-md bg-[var(--wine)] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]"
              >
                Criar noticia
              </Link>
            </div>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Stat icon={Newspaper} label="Total noticias" value={posts.length} note="+ seed inicial" />
          <Stat icon={FileText} label="Publicadas" value={published} note="visiveis no site" />
          <Stat icon={Clock} label="Agendadas" value={scheduled} note="com data futura" />
          <Stat icon={Layers3} label="Rascunhos" value={drafts} note="aguardando revisao" />
          <Stat icon={Tags} label="Categorias" value={categories.length} note="editorias ativas" />
          <Stat icon={TrendingUp} label="Visualizacoes" value={totalViews} note="ficticias" />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Panel title="Mais vistas">
            {mostViewed.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--line)] py-3 text-sm last:border-b-0"
              >
                <span className="font-semibold">{post.title}</span>
                <span className="text-[var(--muted)]">{post.views.toLocaleString("pt-BR")}</span>
              </Link>
            ))}
          </Panel>
          <Panel title="Ultimas alteracoes">
            {auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <div key={log.id} className="border-b border-[var(--line)] py-3 text-sm last:border-b-0">
                  <p className="font-semibold">
                    {log.action} · {log.resourceType}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {log.adminName ?? "Admin"} · {formatDate(log.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--muted)]">Sem eventos recentes registrados.</p>
            )}
          </Panel>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-editorial text-4xl leading-none">Posts recentes</h2>
              <Link href="/admin/posts" className="focus-ring rounded-md text-sm font-semibold text-[var(--wine)]">
                Ver todos
              </Link>
            </div>
            <PostTable posts={posts.slice(0, 5)} />
          </div>
          <div>
            <h2 className="font-editorial mb-4 text-4xl leading-none">Criacao rapida</h2>
            <PostEditor categories={categories} authors={authors} />
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <h2 className="font-editorial text-4xl leading-none">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--rose-soft)]">
        <Icon className="h-5 w-5 text-[var(--wine)]" />
      </span>
      <p className="font-editorial mt-4 text-5xl leading-none">{value.toLocaleString("pt-BR")}</p>
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs text-[var(--muted)]">{note}</p>
    </div>
  );
}
