import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const posts = await getPublishedPosts();
  const staticRoutes = [
    "",
    "/hoje",
    "/buscar",
    "/arquivo",
    "/categorias",
    "/linha-do-tempo",
    "/ranking",
    "/galeria",
    "/mural",
    "/quiz",
    "/cartas",
    "/declaracao",
    "/favoritos",
    "/sobre",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/noticias/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
