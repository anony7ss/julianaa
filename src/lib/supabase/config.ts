export function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim());
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && isValidHttpUrl(url)),
  };
}

export function shouldEnableDemoAdmin() {
  return process.env.NEXT_PUBLIC_ENABLE_DEMO_ADMIN === "true";
}

function normalizeSupabaseUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  if (/^[a-z0-9-]+\.supabase\.co$/i.test(value)) {
    return `https://${value}`;
  }

  return value;
}

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
