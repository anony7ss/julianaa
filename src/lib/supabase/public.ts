import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";

let publicClient: SupabaseClient | null = null;

export function getPublicSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return null;
  }

  if (!publicClient) {
    publicClient = createClient(config.url!, config.anonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return publicClient;
}
