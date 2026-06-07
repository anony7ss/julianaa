"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import { catGallery } from "@/data/feature-content";
import { compressImageFile } from "@/lib/image-client";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type MediaItem = {
  src: string;
  title: string;
  source: "local" | "upload";
};

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>(() =>
    catGallery.map((item) => ({ src: item.src, title: item.title, source: "local" as const })),
  );
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const localItems = useMemo(() => items.filter((item) => item.source === "local"), [items]);
  const uploadedItems = useMemo(() => items.filter((item) => item.source === "upload"), [items]);

  async function copyPath(path: string) {
    await navigator.clipboard.writeText(path);
    setCopied(path);
    window.setTimeout(() => setCopied(null), 1400);
  }

  async function upload(file: File) {
    setMessage(null);

    if (!supabase) {
      setMessage("Configure Supabase para enviar imagens novas. Os assets locais ja podem ser copiados.");
      return;
    }

    const optimized = await compressImageFile(file);
    const ext = optimized.name.split(".").pop() ?? "webp";
    const path = `media/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("post-covers").upload(path, optimized, {
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) {
      setMessage("Nao foi possivel enviar a imagem.");
      return;
    }

    const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
    setItems((current) => [
      { src: data.publicUrl, title: optimized.name, source: "upload" },
      ...current,
    ]);
    setMessage("Imagem otimizada e enviada.");
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <label className="focus-ring inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-[var(--line-strong)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]">
          <Upload className="h-4 w-4" />
          Enviar imagem
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void upload(file);
              }
            }}
          />
        </label>
        {message ? <p className="mt-3 text-sm text-[var(--muted)]">{message}</p> : null}
      </section>

      <MediaGrid title="Assets locais" items={localItems} copied={copied} onCopy={copyPath} />
      <MediaGrid title="Uploads desta sessao" items={uploadedItems} copied={copied} onCopy={copyPath} />
    </div>
  );
}

function MediaGrid({
  title,
  items,
  copied,
  onCopy,
}: {
  title: string;
  items: MediaItem[];
  copied: string | null;
  onCopy: (path: string) => void;
}) {
  return (
    <section>
      <h2 className="font-editorial mb-4 text-4xl leading-none">{title}</h2>
      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.src} className="overflow-hidden rounded-md border border-[var(--line)] bg-white shadow-sm">
              <div className="relative aspect-[1.2] bg-[var(--rose-soft)]">
                <Image src={item.src} alt="" fill sizes="280px" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold">{item.title}</p>
                <button
                  type="button"
                  onClick={() => void onCopy(item.src)}
                  className="focus-ring mt-3 inline-flex h-9 items-center gap-2 rounded-md border border-[var(--line)] px-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wine)] transition hover:bg-[var(--rose-soft)]"
                >
                  {copied === item.src ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied === item.src ? "Copiado" : "Copiar URL"}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-[var(--line-strong)] bg-white/75 p-6 text-sm text-[var(--muted)]">
          Nenhum upload nesta sessao.
        </div>
      )}
    </section>
  );
}
