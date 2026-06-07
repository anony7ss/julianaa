"use client";

import { useEffect, useMemo, useState } from "react";
import { Send } from "lucide-react";

type GuestbookMessage = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

const storageKey = "juu-news-guestbook";

export function GuestbookWall() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as GuestbookMessage[];
      const nextMessages = parsed.filter((item) => item.id && item.message).slice(0, 30);
      window.queueMicrotask(() => setMessages(nextMessages));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const canSubmit = useMemo(() => author.trim().length >= 2 && message.trim().length >= 4, [author, message]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const next: GuestbookMessage = {
      id: crypto.randomUUID(),
      author: author.trim().slice(0, 40),
      message: message.trim().slice(0, 280),
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...messages].slice(0, 30);

    setMessages(updated);
    window.localStorage.setItem(storageKey, JSON.stringify(updated));
    setMessage("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <form onSubmit={submit} className="public-panel h-fit p-5">
        <label className="grid gap-2 text-sm font-semibold">
          Nome
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            maxLength={40}
            className="admin-input"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-semibold">
          Recado
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={280}
            className="admin-input min-h-32 resize-y py-3"
          />
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="focus-ring mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--wine)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--wine-deep)] disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Publicar recado
        </button>
      </form>

      <section className="grid gap-3">
        {messages.length > 0 ? (
          messages.map((item) => (
            <article key={item.id} className="public-card-hover rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">{item.author}</p>
                <time className="text-xs text-[var(--muted)]">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(item.createdAt))}
                </time>
              </div>
              <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">{item.message}</p>
            </article>
          ))
        ) : (
          <div className="public-empty">
            Nenhum recado salvo neste navegador ainda.
          </div>
        )}
      </section>
    </div>
  );
}
