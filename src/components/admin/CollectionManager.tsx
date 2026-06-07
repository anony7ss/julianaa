"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Circle, Palette, Plus, Quote, UserRound } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Author, Category, LoveQuote, TimelineEvent } from "@/types/content";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "color" | "checkbox";
  required?: boolean;
};

type CollectionVariant = "categories" | "authors" | "quotes" | "timeline";
type CollectionItem = Category | Author | LoveQuote | TimelineEvent;

export function CollectionManager({
  title,
  description,
  endpoint,
  items,
  fields,
  variant,
}: {
  title: string;
  description: string;
  endpoint: string;
  items: CollectionItem[];
  fields: FieldConfig[];
  variant: CollectionVariant;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.type === "checkbox" ? formData.get(field.name) === "on" : formData.get(field.name),
      ]),
    );

    try {
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

      event.currentTarget.reset();
      setMessage("Registro salvo.");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
      <section>
        <div className="border-b border-[var(--line)] pb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--wine)]">Conteudo auxiliar</p>
          <h1 className="font-editorial mt-2 text-[clamp(3rem,6vw,4.75rem)] leading-[0.9]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        <div className="mt-5 grid gap-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
                {renderCollectionItem(item, variant)}
              </div>
            ))
          ) : (
            <div className="rounded-md border border-dashed border-[var(--line-strong)] bg-white/70 p-6 text-sm text-[var(--muted)]">
              Nenhum registro cadastrado ainda.
            </div>
          )}
        </div>
      </section>

      <form onSubmit={submit} className="h-fit rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)]">
          <Plus className="h-4 w-4" />
          Novo registro
        </p>
        <div className="grid gap-4">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-semibold">
              <span>
                {field.label}
                {field.required ? <span className="text-[var(--wine)]"> *</span> : null}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  className="admin-input min-h-28 resize-y py-3"
                />
              ) : field.type === "checkbox" ? (
                <span className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-[#fbfaf8] px-3 py-2.5 text-sm font-normal text-[var(--ink-soft)]">
                  <input name={field.name} type="checkbox" className="h-4 w-4 accent-[var(--wine)]" defaultChecked />
                  Ativado por padrao
                </span>
              ) : (
                <input
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  defaultValue={field.type === "color" ? "#971222" : undefined}
                  className={field.type === "color" ? "admin-input h-12 p-1.5" : "admin-input"}
                />
              )}
            </label>
          ))}
        </div>
        {message ? (
          <p className="mt-4 rounded-md border border-[var(--line)] bg-[#fbfaf8] p-3 text-sm text-[var(--muted)]">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-[var(--wine)] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)] disabled:opacity-60"
        >
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

function renderCollectionItem(item: CollectionItem, variant: CollectionVariant) {
  if (variant === "categories") {
    const category = item as Category;

    return (
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            <Palette className="h-3.5 w-3.5" />
            /{category.slug}
          </div>
          <h2 className="font-editorial mt-2 text-3xl leading-none">{category.name}</h2>
          {category.description ? (
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
          ) : null}
        </div>
        <span
          className="h-8 w-8 shrink-0 rounded-md border border-[var(--line)]"
          style={{ backgroundColor: category.color ?? "#971222" }}
        />
      </div>
    );
  }

  if (variant === "authors") {
    const author = item as Author;

    return (
      <div className="flex gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[var(--rose-soft)] text-[var(--wine)]">
          <UserRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-editorial text-3xl leading-none">{author.name}</h2>
          {author.bio ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{author.bio}</p> : null}
        </div>
      </div>
    );
  }

  if (variant === "quotes") {
    const quote = item as LoveQuote;
    const Icon = quote.active ? CheckCircle2 : Circle;

    return (
      <div className="grid gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
          <Icon className={quote.active ? "h-3.5 w-3.5 text-[var(--sage)]" : "h-3.5 w-3.5"} />
          {quote.active ? "Ativa" : "Inativa"}
        </div>
        <blockquote className="font-editorial text-3xl italic leading-tight">
          <Quote className="mb-2 h-5 w-5 text-[var(--wine)]" />
          &quot;{quote.quote}&quot;
        </blockquote>
      </div>
    );
  }

  const event = item as TimelineEvent;

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--wine)]">
        <CalendarDays className="h-3.5 w-3.5" />
        {formatDate(event.eventDate)}
      </p>
      <h2 className="font-editorial mt-2 text-3xl leading-none">{event.title}</h2>
      {event.description ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{event.description}</p> : null}
    </div>
  );
}
