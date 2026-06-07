import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { authorSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, authorSchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ author: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase
    .from("authors")
    .insert({
      name: parsed.data.name,
      avatar_url: parsed.data.avatarUrl,
      bio: parsed.data.bio,
    })
    .select("id")
    .single();

  if (error || !data) return jsonError("Nao foi possivel salvar o autor.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "author",
    resourceId: data.id,
    metadata: { name: parsed.data.name },
  });
  revalidatePath("/");
  return NextResponse.json({ author: data }, { status: 201 });
}
