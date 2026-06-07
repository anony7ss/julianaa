import Image from "next/image";
import { Cat } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { catGallery } from "@/data/feature-content";
import { getPublishedPosts } from "@/lib/data";

export const metadata = {
  title: "Galeria de Gatos",
};

export const revalidate = 3600;

export default async function CatGalleryPage() {
  const posts = await getPublishedPosts();
  const usedImages = Array.from(
    new Set(posts.map((post) => post.coverImageUrl).filter((src): src is string => Boolean(src))),
  );

  return (
    <div className="public-page">
      <PublicPageHeader
        title="Galeria de gatos"
        description="O banco visual oficial das noticias fofas, dramaticas, urgentes e romanticas."
        icon={<Cat className="h-5 w-5" />}
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {catGallery.map((cat) => (
          <article key={cat.src} className="public-card-hover overflow-hidden rounded-md border border-[var(--line)] bg-white shadow-sm">
            <div className="relative aspect-[1.08] bg-[var(--rose-soft)]">
              <Image src={cat.src} alt="" fill sizes="320px" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="public-label text-[10px] text-[var(--wine)]">{cat.mood}</p>
              <h2 className="font-editorial mt-2 text-3xl leading-none">{cat.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{cat.description}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="public-panel mt-10 p-6">
        <h2 className="font-editorial text-4xl leading-none">Imagens usadas nas noticias</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {usedImages.map((src) => (
            <span key={src} className="public-chip">
              {src}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
