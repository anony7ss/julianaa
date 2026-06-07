import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import type { AdminProfile } from "@/types/content";

const demoAdmin: AdminProfile = {
  id: "demo-admin",
  name: "Juliana Admin",
  role: "admin",
};

export async function getAdminSession(): Promise<AdminProfile | null> {
  if (shouldEnableDemoAdmin()) {
    return demoAdmin;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, name, role")
    .eq("id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (profileError || !profile) {
    return null;
  }

  return {
    id: profile.id,
    name: profile.name ?? user.email ?? "Admin",
    role: "admin",
  };
}

export async function requireAdmin() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
