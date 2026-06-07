"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="focus-ring inline-flex h-9 items-center gap-2 border border-[var(--line)] px-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </button>
  );
}
