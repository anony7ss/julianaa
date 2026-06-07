import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getPostById } from "@/lib/data";
import { postSchema, type PostInput } from "@/lib/validations/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { shouldEnableDemoAdmin } from "@/lib/supabase/config";
import type { Post } from "@/types/content";

type SupabasePostMutation = {
  title: string;
  slug: string;
  subtitle: string | null;
  content: string;
  cover_image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  status: "draft" | "published";
  featured: boolean;
  breaking_news: boolean;
  tags: string[];
  published_at: string | null;
  scheduled_at: string | null;
};

export function toPostMutation(input: PostInput): SupabasePostMutation {
  return {
    title: input.title,
    slug: input.slug,
    subtitle: input.subtitle,
    content: input.content,
    cover_image_url: input.coverImageUrl,
    category_id: input.categoryId ?? null,
    author_id: input.authorId ?? null,
    status: input.status,
    featured: input.featured,
    breaking_news: input.breakingNews,
    tags: input.tags,
    published_at: input.publishedAt,
    scheduled_at: input.scheduledAt,
  };
}

export async function createPost(input: unknown) {
  const parsed = postSchema.parse(input);
  const mutation = toPostMutation(parsed);

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    if (!shouldEnableDemoAdmin()) {
      throw new Error("Supabase nao configurado.");
    }

    const demo: Post = {
      id: randomUUID(),
      title: mutation.title,
      slug: mutation.slug,
      subtitle: mutation.subtitle,
      content: mutation.content,
      coverImageUrl: mutation.cover_image_url,
      categoryId: mutation.category_id,
      authorId: mutation.author_id,
      status: mutation.status,
      views: 0,
      featured: mutation.featured,
      breakingNews: mutation.breaking_news,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: mutation.published_at,
      scheduledAt: mutation.scheduled_at,
      tags: mutation.tags,
    };

    return demo;
  }

  const { data, error } = await supabase.from("posts").insert(mutation).select("id").single();

  if (error || !data) {
    throw new Error("Nao foi possivel criar a noticia.");
  }

  revalidatePath("/");
  revalidatePath("/arquivo");
  revalidatePath("/categorias");
  revalidatePath("/hoje");
  return { id: data.id, slug: mutation.slug };
}

export async function updatePost(id: string, input: unknown) {
  const parsed = postSchema.parse(input);
  const mutation = toPostMutation(parsed);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    if (!shouldEnableDemoAdmin()) {
      throw new Error("Supabase nao configurado.");
    }

    const post = await getPostById(id);
    return { id, slug: mutation.slug, demo: Boolean(post) };
  }

  const { error } = await supabase.from("posts").update(mutation).eq("id", id);

  if (error) {
    throw new Error("Nao foi possivel atualizar a noticia.");
  }

  revalidatePath("/");
  revalidatePath("/arquivo");
  revalidatePath("/categorias");
  revalidatePath("/hoje");
  revalidatePath(`/noticias/${mutation.slug}`);
  return { id, slug: mutation.slug };
}

export async function deletePost(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    if (!shouldEnableDemoAdmin()) {
      throw new Error("Supabase nao configurado.");
    }

    return { id, demo: true };
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error("Nao foi possivel excluir a noticia.");
  }

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/arquivo");
  revalidatePath("/hoje");
  return { id };
}
