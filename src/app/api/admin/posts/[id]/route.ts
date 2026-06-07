import { NextResponse, type NextRequest } from "next/server";
import { jsonError, parseJsonWithSchema, requireAdminApi } from "@/lib/api";
import { deletePost, updatePost } from "@/lib/admin-service";
import { logAdminAction } from "@/lib/admin-audit";
import { postSchema } from "@/lib/validations/content";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const parsed = await parseJsonWithSchema(request, postSchema);
  if (parsed.response) return parsed.response;

  const { id } = await context.params;

  try {
    const post = await updatePost(id, parsed.data);
    await logAdminAction({
      admin: auth.admin!,
      action: "update",
      resourceType: "post",
      resourceId: id,
      metadata: { title: parsed.data.title },
    });
    return NextResponse.json({ post });
  } catch {
    return jsonError("Nao foi possivel atualizar a noticia.", 500);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const { id } = await context.params;

  try {
    const post = await deletePost(id);
    await logAdminAction({
      admin: auth.admin!,
      action: "delete",
      resourceType: "post",
      resourceId: id,
    });
    return NextResponse.json({ post });
  } catch {
    return jsonError("Nao foi possivel excluir a noticia.", 500);
  }
}
