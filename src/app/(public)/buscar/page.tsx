import { SearchExperience } from "@/components/public/SearchExperience";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getCategories, getLoveQuotes, getPublishedPosts, getTimelineEvents } from "@/lib/data";

export const metadata = {
  title: "Busca",
};

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ q?: string; tag?: string }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [posts, categories, quotes, events] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getLoveQuotes(),
    getTimelineEvents(),
  ]);

  return (
    <div className="public-page">
      <PublicPageHeader
        title="Busca global"
        description="Noticias, frases, categorias e momentos reunidos na mesma mesa editorial."
      />
      <div className="mt-8">
        <SearchExperience
          posts={posts}
          categories={categories}
          quotes={quotes}
          events={events}
          initialQuery={params.q ?? ""}
          initialTag={params.tag ?? "all"}
        />
      </div>
    </div>
  );
}
