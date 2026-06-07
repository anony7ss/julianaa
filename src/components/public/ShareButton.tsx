"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="public-button focus-ring"
    >
      <Share2 className="h-4 w-4" />
      {copied ? "Link copiado" : "Compartilhar"}
    </button>
  );
}
