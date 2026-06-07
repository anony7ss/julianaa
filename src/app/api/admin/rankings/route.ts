import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rankingSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, rankingSchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ ranking: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase.from("rankings").insert(parsed.data).select("id").single();

  if (error || !data) return jsonError("Nao foi possivel salvar o ranking.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "ranking",
    resourceId: data.id,
    metadata: { title: parsed.data.title },
  });
  revalidatePath("/ranking");
  return NextResponse.json({ ranking: data }, { status: 201 });
}
