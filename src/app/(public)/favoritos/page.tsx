import { FavoritesClient } from "@/components/public/FavoritesClient";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getPublishedPosts } from "@/lib/data";

export const metadata = {
  title: "Favoritos",
};

export const revalidate = 3600;

export default async function FavoritesPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="Favoritos"
        description="Noticias marcadas para voltar depois, salvas localmente neste navegador."
      />
      <div className="mt-8">
        <FavoritesClient posts={posts} />
      </div>
    </div>
  );
}
