import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Login Admin",
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen bg-[#f7f4f0] lg:grid-cols-[1fr_0.86fr]">
      <section className="paper-texture flex items-center px-6 py-12 lg:px-14">
        <div className="max-w-2xl">
          <Link href="/" className="focus-ring rounded-md text-xs font-bold uppercase tracking-[0.22em] text-[var(--wine)]">
            Voltar ao jornal
          </Link>
          <h1 className="font-editorial mt-8 text-[clamp(4rem,9vw,8rem)] leading-[0.86]">Sala segura.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            Acesso exclusivo para administrar noticias, categorias, autores,
            frases, timeline e rankings do Juu News.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-md border border-[var(--line)] bg-white p-7 shadow-[var(--shadow)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--wine)]">Admin</p>
          <h2 className="font-editorial mt-3 text-5xl leading-none">Entrar</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Use o usuario criado no Supabase Auth e marcado como administrador no perfil.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-[var(--muted)]">Carregando...</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
