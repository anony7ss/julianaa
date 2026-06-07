import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { logAdminAction } from "@/lib/admin-audit";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { timelineSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, timelineSchema);
  if (parsed.response) return parsed.response;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    if (shouldEnableDemoAdmin()) {
      return NextResponse.json({ event: parsed.data, demo: true }, { status: 201 });
    }
    return jsonError("Supabase nao configurado.", 503);
  }

  const { data, error } = await supabase
    .from("timeline_events")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      event_date: parsed.data.eventDate,
      image_url: parsed.data.imageUrl,
    })
    .select("id")
    .single();

  if (error || !data) return jsonError("Nao foi possivel salvar o evento.", 500);
  await logAdminAction({
    admin: auth.admin!,
    action: "create",
    resourceType: "timeline_event",
    resourceId: data.id,
    metadata: { title: parsed.data.title },
  });
  revalidatePath("/linha-do-tempo");
  return NextResponse.json({ event: data }, { status: 201 });
}
