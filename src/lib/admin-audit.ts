import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminAuditLog, AdminProfile } from "@/types/content";

type AuditInput = {
  admin: AdminProfile;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  metadata?: Record<string, unknown>;
};

type AuditRow = {
  id: string;
  admin_id: string | null;
  admin_name: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  created_at: string;
};

export async function logAdminAction({
  admin,
  action,
  resourceType,
  resourceId = null,
  metadata = {},
}: AuditInput) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return;
  }

  await supabase.from("admin_audit_logs").insert({
    admin_id: admin.id,
    admin_name: admin.name,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    metadata,
  });
}

export async function getRecentAdminAuditLogs(limit = 8): Promise<AdminAuditLog[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("admin_audit_logs")
    .select("id, admin_id, admin_name, action, resource_type, resource_id, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return (data as AuditRow[]).map((row) => ({
    id: row.id,
    adminId: row.admin_id,
    adminName: row.admin_name,
    action: row.action,
    resourceType: row.resource_type,
    resourceId: row.resource_id,
    createdAt: row.created_at,
  }));
}
