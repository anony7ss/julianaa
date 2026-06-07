import Link from "next/link";
import { Heart, PenLine, ShieldCheck } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { initials } from "@/lib/utils";
import type { AdminProfile } from "@/types/content";

export function AdminShell({
  admin,
  children,
}: {
  admin: AdminProfile;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f4f0] text-[var(--ink)] lg:grid lg:grid-cols-[18rem_1fr]">
      <aside className="border-b border-[var(--line)] bg-[#fdfbf8]/95 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="border-b border-[var(--line)] p-5">
          <Link href="/admin" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--wine)] font-editorial text-2xl text-white">
              JN
            </span>
            <span>
              <span className="block font-editorial text-3xl leading-none">Juu News</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Redacao privada
              </span>
            </span>
          </Link>
        </div>
        <AdminNav />
        <div className="mx-4 mt-4 hidden rounded-md border border-[var(--line)] bg-white p-4 text-xs leading-5 text-[var(--muted)] lg:block">
          <ShieldCheck className="mb-3 h-5 w-5 text-[var(--sage)]" />
          Rotas, paginas e APIs revalidam permissao de administrador no servidor.
        </div>
        <div className="mx-4 mt-3 hidden rounded-md border border-[var(--line)] bg-[var(--rose-soft)] p-4 text-xs leading-5 text-[var(--ink-soft)] lg:block">
          <Heart className="mb-3 h-5 w-5 text-[var(--wine)]" />
          Conteudo editorial leve, com publicacao controlada e rascunhos separados.
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--line)] bg-[#f7f4f0]/88 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] bg-white">
              <PenLine className="h-4 w-4 text-[var(--wine)]" />
            </span>
            <div>
              <p className="text-sm font-semibold">Redacao administrativa</p>
              <p className="text-xs text-[var(--muted)]">Controle editorial do portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{admin.name}</p>
              <p className="text-xs text-[var(--muted)]">Administrador</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--blue-ink)] text-sm font-bold text-white">
              {initials(admin.name)}
            </div>
            <LogoutButton />
          </div>
        </header>
        <main className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
