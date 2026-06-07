import { ArticleCard } from "@/components/public/ArticleCard";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getCategories, getPublishedPosts } from "@/lib/data";

export const metadata = {
  title: "Categorias",
};

export const revalidate = 3600;

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPublishedPosts()]);

  return (
    <div className="public-page">
      <PublicPageHeader
        title="Categorias"
        description="Editorias oficiais para organizar o caos bonito desse jornal: amor, saudade, crimes de fofura e declaracoes publicas."
      />

      <div className="mt-8 grid gap-10">
        {categories.map((category) => {
          const categoryPosts = posts.filter((post) => post.categoryId === category.id);

          return (
            <section key={category.id} id={category.slug} className="scroll-mt-44">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
                <div>
                  <h2 className="font-editorial text-[clamp(2.7rem,4.5vw,4.2rem)] leading-none">
                    {category.name}
                  </h2>
                  {category.description ? (
                    <p className="mt-2 text-sm text-[var(--muted)]">{category.description}</p>
                  ) : null}
                </div>
                <span className="public-label shrink-0 text-[var(--wine)]">
                  {categoryPosts.length} pautas
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {categoryPosts.length > 0 ? (
                  categoryPosts.map((post) => <ArticleCard key={post.id} post={post} variant="compact" />)
                ) : (
                  <p className="border border-dashed border-[var(--line)] p-6 text-sm text-[var(--muted)]">
                    Nenhuma noticia publicada nessa editoria ainda.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
