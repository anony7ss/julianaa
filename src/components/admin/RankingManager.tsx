"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListOrdered, Plus } from "lucide-react";
import type { Ranking } from "@/types/content";

export function RankingManager({ rankings }: { rankings: Ranking[] }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  async function submit(endpoint: string, form: HTMLFormElement) {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Nao foi possivel salvar.");
      return;
    }

    form.reset();
    setMessage("Ranking atualizado.");
    router.refresh();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
      <section>
        <div className="border-b border-[var(--line)] pb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--wine)]">Listas editoriais</p>
          <h1 className="font-editorial mt-2 text-[clamp(3rem,6vw,4.75rem)] leading-[0.9]">Rankings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Crie listas e adicione itens posicionados para a pagina publica.
          </p>
        </div>
        <div className="mt-5 grid gap-4">
          {rankings.length > 0 ? (
            rankings.map((ranking) => (
              <section key={ranking.id} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--rose-soft)]">
                    <ListOrdered className="h-5 w-5 text-[var(--wine)]" />
                  </span>
                  <div>
                    <h2 className="font-editorial text-3xl leading-none">{ranking.title}</h2>
                    {ranking.description ? (
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{ranking.description}</p>
                    ) : null}
                  </div>
                </div>
                <ol className="mt-4 grid gap-2">
                  {ranking.items.map((item) => (
                    <li
                      key={item.id}
                      className="grid grid-cols-[2.75rem_1fr] rounded-md border border-[var(--line)] bg-[#fbfaf8] p-3"
                    >
                      <span className="font-editorial text-3xl text-[var(--wine)]">{item.position}</span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        {item.description ? <p className="text-sm text-[var(--muted)]">{item.description}</p> : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))
          ) : (
            <div className="rounded-md border border-dashed border-[var(--line-strong)] bg-white/75 p-6 text-sm text-[var(--muted)]">
              Nenhum ranking cadastrado ainda.
            </div>
          )}
        </div>
      </section>

      <aside className="grid h-fit gap-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit("/api/admin/rankings", event.currentTarget);
          }}
          className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm"
        >
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)]">
            <Plus className="h-4 w-4" />
            Novo ranking
          </p>
          <label className="grid gap-2 text-sm font-semibold">
            Titulo
            <input name="title" required className="admin-input" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold">
            Descricao
            <textarea name="description" className="admin-input min-h-24 py-3" />
          </label>
          <button className="focus-ring mt-5 h-11 w-full rounded-md bg-[var(--wine)] text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]">
            Salvar ranking
          </button>
        </form>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit("/api/admin/ranking-items", event.currentTarget);
          }}
          className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm"
        >
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)]">
            <Plus className="h-4 w-4" />
            Novo item
          </p>
          <label className="grid gap-2 text-sm font-semibold">
            Ranking
            <select name="rankingId" required className="admin-input">
              {rankings.map((ranking) => (
                <option key={ranking.id} value={ranking.id}>
                  {ranking.title}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold">
            Posicao
            <input name="position" type="number" min={1} required className="admin-input" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold">
            Titulo
            <input name="title" required className="admin-input" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold">
            Descricao
            <textarea name="description" className="admin-input min-h-24 py-3" />
          </label>
          <button className="focus-ring mt-5 h-11 w-full rounded-md bg-[var(--wine)] text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)]">
            Salvar item
          </button>
        </form>
        {message ? (
          <p className="rounded-md border border-[var(--line)] bg-white p-3 text-sm text-[var(--muted)] shadow-sm">
            {message}
          </p>
        ) : null}
      </aside>
    </div>
  );
}
