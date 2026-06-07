"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(config.url!, config.anonKey!);
  }

  return browserClient;
}
