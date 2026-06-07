import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { quoteSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, quoteSchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ quote: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase
    .from("love_quotes")
    .insert({
      quote: parsed.data.quote,
      active: parsed.data.active,
    })
    .select("id")
    .single();

  if (error || !data) return jsonError("Nao foi possivel salvar a frase.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "quote",
    resourceId: data.id,
  });
  revalidatePath("/");
  return NextResponse.json({ quote: data }, { status: 201 });
}
