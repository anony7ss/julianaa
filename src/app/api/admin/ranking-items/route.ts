import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rankingItemSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, rankingItemSchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ item: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase
    .from("ranking_items")
    .insert({
      ranking_id: parsed.data.rankingId,
      position: parsed.data.position,
      title: parsed.data.title,
      description: parsed.data.description,
    })
    .select("id")
    .single();

  if (error || !data) return jsonError("Nao foi possivel salvar o item.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "ranking_item",
    resourceId: data.id,
    metadata: { title: parsed.data.title, rankingId: parsed.data.rankingId },
  });
  revalidatePath("/ranking");
  revalidatePath("/admin/rankings");
  return NextResponse.json({ item: data }, { status: 201 });
}
