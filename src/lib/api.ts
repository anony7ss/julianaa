import { NextResponse, type NextRequest } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { getAdminSession } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdminApi(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const limited = checkRateLimit(`admin:${ip}`, 80, 60_000);

  if (!limited.allowed) {
    return { admin: null, response: jsonError("Muitas tentativas. Tente novamente em instantes.", 429) };
  }

  const admin = await getAdminSession();

  if (!admin) {
    return { admin: null, response: jsonError("Nao autenticado.", 401) };
  }

  return { admin, response: null };
}

export async function parseJsonWithSchema<T>(request: NextRequest, schema: ZodSchema<T>) {
  try {
    const payload = await request.json();
    return { data: schema.parse(payload), response: null };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: null,
        response: NextResponse.json(
          {
            error: "Dados invalidos.",
            issues: error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          },
          { status: 400 },
        ),
      };
    }

    return { data: null, response: jsonError("Payload invalido.", 400) };
  }
}
