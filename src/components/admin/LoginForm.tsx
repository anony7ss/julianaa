"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        setError("Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para login real.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Credenciais invalidas ou usuario sem permissao.");
        return;
      }

      router.replace(searchParams.get("next") ?? "/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="admin-input h-12 font-normal"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Senha
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="admin-input h-12 font-normal"
        />
      </label>
      {error ? (
        <p className="rounded-md border border-[var(--wine)] bg-[var(--rose-soft)] p-3 text-sm text-[var(--wine)]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--wine)] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)] disabled:opacity-60"
      >
        <LockKeyhole className="h-4 w-4" />
        {loading ? "Entrando..." : "Entrar no admin"}
      </button>
    </form>
  );
}
