import { NextResponse, type NextRequest } from "next/server";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { createPost } from "@/lib/admin-service";
import { logAdminAction } from "@/lib/admin-audit";
import { postSchema } from "@/lib/validations/content";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, postSchema);
  if (parsed.response) return parsed.response;

  try {
    const post = await createPost(parsed.data);
    await logAdminAction({
      admin: auth.admin!,
      action: "create",
      resourceType: "post",
      resourceId: "id" in post ? post.id : null,
      metadata: { title: parsed.data.title },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return jsonError("Nao foi possivel criar a noticia.", 500);
  }
}
