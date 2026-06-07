"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type Resolver, useForm, useWatch } from "react-hook-form";
import { Clock, ImagePlus, RotateCcw, Save, Send, Upload } from "lucide-react";
import { catGallery } from "@/data/feature-content";
import { compressImageFile } from "@/lib/image-client";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { postSchema } from "@/lib/validations/content";
import type { Author, Category, Post } from "@/types/content";

type FormValues = {
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  coverImageUrl: string;
  categoryId: string | null;
  authorId: string | null;
  status: "draft" | "published";
  scheduledAt: string;
  featured: boolean;
  breakingNews: boolean;
  tags: string[];
};

export function PostEditor({
  categories,
  authors,
  post,
}: {
  categories: Category[];
  authors: Author[];
  post?: Post | null;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [savedDraft, setSavedDraft] = useState<FormValues | null>(null);
  const [autosaveMessage, setAutosaveMessage] = useState("Autosave ativo");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const autosaveKey = useMemo(() => `juu-news-admin-autosave:${post?.id ?? "new"}`, [post?.id]);
  const mediaPaths = useMemo(() => catGallery.map((item) => item.src), []);

  const defaults = useMemo<FormValues>(
    () => ({
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      subtitle: post?.subtitle ?? "",
      content: post?.content ?? "",
      coverImageUrl: post?.coverImageUrl ?? "",
      categoryId: post?.categoryId ?? categories[0]?.id ?? null,
      authorId: post?.authorId ?? authors[0]?.id ?? null,
      status: post?.status ?? "draft",
      scheduledAt: toDateTimeLocal(post?.scheduledAt),
      featured: post?.featured ?? false,
      breakingNews: post?.breakingNews ?? false,
      tags: post?.tags ?? [],
    }),
    [authors, categories, post],
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema) as unknown as Resolver<FormValues>,
    defaultValues: defaults,
  });

  const watchedValues = useWatch({ control });
  const watchedValuesJson = JSON.stringify(watchedValues);

  useEffect(() => {
    const raw = window.localStorage.getItem(autosaveKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as FormValues;
      window.queueMicrotask(() => setSavedDraft(parsed));
    } catch {
      window.localStorage.removeItem(autosaveKey);
    }
  }, [autosaveKey]);

  useEffect(() => {
    const currentValues = JSON.parse(watchedValuesJson) as Partial<FormValues>;
    const hasContent = Boolean(currentValues.title || currentValues.content || currentValues.subtitle);

    if (!hasContent) {
      return;
    }

    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(autosaveKey, watchedValuesJson);
      setAutosaveMessage(`Autosave: ${new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())}`);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [autosaveKey, watchedValuesJson]);

  async function uploadCover(file: File) {
    setMessage(null);
    const optimized = await compressImageFile(file);

    if (!supabase) {
      setValue("coverImageUrl", URL.createObjectURL(optimized), { shouldDirty: true });
      setMessage("Preview local otimizado aplicado. Configure Supabase para upload real.");
      return;
    }

    setUploading(true);
    try {
      const ext = optimized.name.split(".").pop() ?? "webp";
      const path = `posts/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("post-covers").upload(path, optimized, {
        cacheControl: "31536000",
        upsert: false,
      });

      if (error) {
        setMessage("Nao foi possivel enviar a imagem.");
        return;
      }

      const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
      setValue("coverImageUrl", data.publicUrl, { shouldDirty: true });
      setMessage("Imagem enviada com sucesso.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(values: FormValues) {
    setSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
        method: post ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setMessage(payload?.error ?? "Nao foi possivel salvar.");
        return;
      }

      setMessage("Noticia salva com sucesso.");
      window.localStorage.removeItem(autosaveKey);
      setSavedDraft(null);
      router.refresh();
      if (!post) {
        router.push("/admin/posts");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const previewTitle = useWatch({ control, name: "title" }) || "Titulo da noticia";
  const previewSubtitle =
    useWatch({ control, name: "subtitle" }) || "Subtitulo da materia em tom romantico e divertido.";
  const previewCover = useWatch({ control, name: "coverImageUrl" }) || "/images/cat-love-letters.png";
  const previewStatus = useWatch({ control, name: "status" });
  const previewScheduledAt = useWatch({ control, name: "scheduledAt" });

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-6 xl:grid-cols-[1fr_24rem]">
      <div className="grid gap-5">
        <Field label="Titulo" error={errors.title?.message}>
          <input className="admin-input" {...register("title")} />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Slug" error={errors.slug?.message}>
            <input className="admin-input" {...register("slug")} placeholder="gerado pelo titulo se vazio" />
          </Field>
          <Field label="Status">
            <select className="admin-input" {...register("status")}>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </Field>
        </div>
        <Field label="Agendar publicacao">
          <input className="admin-input" type="datetime-local" {...register("scheduledAt")} />
        </Field>
        <Field label="Subtitulo" error={errors.subtitle?.message}>
          <input className="admin-input" {...register("subtitle")} />
        </Field>
        <Field label="Conteudo" error={errors.content?.message}>
          <textarea className="admin-input min-h-72 resize-y py-3 leading-7" {...register("content")} />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Categoria">
            <select className="admin-input" {...register("categoryId")}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Autor">
            <select className="admin-input" {...register("authorId")}>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <Field label="Tags">
              <input
                className="admin-input"
                value={field.value.join(", ")}
                onChange={(event) => {
                  field.onChange(
                    event.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  );
                }}
                placeholder="fofo, urgente, verificada"
              />
            </Field>
          )}
        />
        <div className="grid gap-3 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Imagem</p>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              className="admin-input"
              {...register("coverImageUrl")}
              list="juu-media-paths"
              placeholder="/images/cat-love-letters.png"
            />
            <datalist id="juu-media-paths">
              {mediaPaths.map((path) => (
                <option key={path} value={path} />
              ))}
            </datalist>
            <label className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--line-strong)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]">
              <Upload className="h-4 w-4" />
              {uploading ? "Enviando..." : "Upload"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadCover(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <label className="flex items-center gap-2 rounded-md border border-[var(--line)] bg-[#fbfaf8] px-3 py-2 text-sm">
            <input type="checkbox" className="accent-[var(--wine)]" {...register("featured")} />
            Destaque
          </label>
          <label className="flex items-center gap-2 rounded-md border border-[var(--line)] bg-[#fbfaf8] px-3 py-2 text-sm">
            <input type="checkbox" className="accent-[var(--wine)]" {...register("breakingNews")} />
            Ultima hora
          </label>
        </div>
      </div>

      <aside className="h-fit rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)]">
          <ImagePlus className="h-4 w-4" />
          Preview
        </p>
        <div className="paper-texture rounded-md border border-[var(--line)] p-5">
          <div
            className="mb-5 aspect-[1.35] rounded-md border border-[var(--line)] bg-cover bg-center"
            style={{ backgroundImage: `url("${previewCover}")` }}
          />
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            <Clock className="h-3.5 w-3.5" />
            {previewStatus === "published"
              ? previewScheduledAt
                ? "Agendada"
                : "Publicada"
              : "Rascunho"}
          </p>
          <h2 className="font-editorial text-4xl leading-none">{previewTitle}</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">{previewSubtitle}</p>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">{autosaveMessage}</p>
        {savedDraft ? (
          <button
            type="button"
            onClick={() => {
              reset(savedDraft);
              setMessage("Autosave restaurado.");
            }}
            className="focus-ring mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[var(--line-strong)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]"
          >
            <RotateCcw className="h-4 w-4" />
            Restaurar autosave
          </button>
        ) : null}
        {message ? (
          <p className="mt-4 rounded-md border border-[var(--line)] bg-[#fbfaf8] p-3 text-sm text-[var(--ink-soft)]">
            {message}
          </p>
        ) : null}
        <div className="mt-5 grid gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--wine)] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--wine-deep)] disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("status", "draft");
              void handleSubmit(submit)();
            }}
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--line-strong)] px-5 text-sm font-bold uppercase tracking-[0.14em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]"
          >
            <Save className="h-4 w-4" />
            Salvar rascunho
          </button>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-[var(--wine)]">{error}</span> : null}
    </label>
  );
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}
