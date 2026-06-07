import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, categorySchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ category: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description,
      color: parsed.data.color,
    })
    .select("id")
    .single();

  if (error || !data) return jsonError("Nao foi possivel salvar a categoria.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "category",
    resourceId: data.id,
    metadata: { name: parsed.data.name },
  });
  revalidatePath("/");
  revalidatePath("/categorias");
  return NextResponse.json({ category: data }, { status: 201 });
}
