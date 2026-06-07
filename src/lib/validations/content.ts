import { z } from "zod";
import { slugify, stripHtml } from "@/lib/utils";

const imageUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value.length === 0 ||
      value.startsWith("/") ||
      z.string().url().safeParse(value).success,
    "Use uma URL valida ou um caminho interno iniciado por /.",
  )
  .optional()
  .transform((value) => value || null);

const scheduledAtSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  });

export const postSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(8, "O titulo precisa de pelo menos 8 caracteres.")
      .max(160, "O titulo ficou longo demais."),
    slug: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((value) => (value ? slugify(value) : undefined)),
    subtitle: z.string().trim().max(220).optional().transform((value) => value || null),
    content: z
      .string()
      .trim()
      .min(40, "A noticia precisa de um conteudo maior.")
      .max(12_000)
      .transform(stripHtml),
    coverImageUrl: imageUrlSchema,
    categoryId: z.string().uuid().nullable().optional(),
    authorId: z.string().uuid().nullable().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    scheduledAt: scheduledAtSchema,
    featured: z.coerce.boolean().default(false),
    breakingNews: z.coerce.boolean().default(false),
    tags: z
      .array(z.string().trim().min(1).max(32))
      .max(8)
      .default([]),
  })
  .strict()
  .transform((value) => ({
    ...value,
    slug: value.slug || slugify(value.title),
    publishedAt: value.status === "published" ? new Date().toISOString() : null,
  }));

export type PostInput = z.infer<typeof postSchema>;

export const categorySchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    slug: z.string().trim().max(90).optional(),
    description: z.string().trim().max(240).optional().transform((value) => value || null),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .transform((value) => value || "#971222"),
  })
  .strict()
  .transform((value) => ({
    ...value,
    slug: value.slug ? slugify(value.slug) : slugify(value.name),
  }));

export const authorSchema = z
  .object({
    name: z.string().trim().min(2).max(90),
    avatarUrl: imageUrlSchema,
    bio: z.string().trim().max(420).optional().transform((value) => value || null),
  })
  .strict();

export const quoteSchema = z
  .object({
    quote: z.string().trim().min(8).max(280).transform(stripHtml),
    active: z.coerce.boolean().default(true),
  })
  .strict();

export const timelineSchema = z
  .object({
    title: z.string().trim().min(3).max(100),
    description: z.string().trim().max(420).optional().transform((value) => value || null),
    eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    imageUrl: imageUrlSchema,
  })
  .strict();

export const rankingSchema = z
  .object({
    title: z.string().trim().min(3).max(120),
    description: z.string().trim().max(360).optional().transform((value) => value || null),
  })
  .strict();

export const rankingItemSchema = z
  .object({
    rankingId: z.string().uuid(),
    position: z.coerce.number().int().min(1).max(50),
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().max(360).optional().transform((value) => value || null),
  })
  .strict();
