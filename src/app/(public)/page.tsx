import Link from "next/link";
import { ArrowRight, CalendarHeart, Cat, Radio, Search, ShieldCheck } from "lucide-react";
import { ArticleCard } from "@/components/public/ArticleCard";
import { HomeTools } from "@/components/public/HomeTools";
import { SectionTitle } from "@/components/public/SectionTitle";
import { SurpriseButton } from "@/components/public/SurpriseButton";
import { relationshipStartDate } from "@/data/seed";
import { getCategories, getLoveQuotes, getPublishedPosts } from "@/lib/data";
import { getAllTags, getCategoryCounts, getDailyPost } from "@/lib/discovery";
import { daysSince } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, categories, quotes] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getLoveQuotes(),
  ]);

  const lead = posts.find((post) => post.breakingNews) ?? posts[0];
  const recent = posts.filter((post) => post.id !== lead?.id).slice(0, 4);
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const dailyPost = getDailyPost(posts);
  const tags = getAllTags(posts).slice(0, 8);
  const categoryCounts = getCategoryCounts(posts, categories);
  const days = daysSince(relationshipStartDate);

  return (
    <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 2xl:grid-cols-[16rem_minmax(0,1fr)_18rem] 2xl:py-7">
      <aside className="order-2 grid min-w-0 content-start gap-5 2xl:order-1">
        <section className="public-panel min-w-0 p-5">
        <div className="mb-4 border-b border-[var(--line)] pb-3">
          <h2 className="font-editorial text-[clamp(2.15rem,2.6vw,2.7rem)] leading-none text-[var(--ink)]">
            Categorias
          </h2>
        </div>
        <div className="grid gap-3">
          {categoryCounts.map(({ category, count }) => (
            <Link
              key={category.id}
              href={`/categorias#${category.slug}`}
              className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-[var(--rose-soft)] hover:text-[var(--wine)]"
            >
              <span>{category.name}</span>
              <span className="rounded-full bg-[var(--paper-soft)] px-2 py-0.5 text-xs text-[var(--muted)]">
                {count}
              </span>
            </Link>
          ))}
        </div>
        </section>

        <section className="paper-texture public-soft-panel p-5">
          <p className="public-label mb-5 flex items-center gap-2 text-[var(--wine)]">
            <Radio className="h-4 w-4" />
            Plantao Juu
          </p>
          <p className="public-label text-[var(--muted)]">Agora ha pouco</p>
          <h2 className="font-editorial mt-3 text-[2rem] leading-[0.98]">Alerta de saudade nivel maximo!</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
            Causada por distancia bobinha e pensamentos em voce.
          </p>
          <Link
            href="/declaracao"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wine)]"
          >
            Ver detalhes <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </aside>

      <section className="order-1 min-w-0 2xl:order-2">
        <div className="public-panel mb-5 grid gap-3 p-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/buscar"
              className="public-button focus-ring"
            >
              <Search className="h-4 w-4" />
              Busca global
            </Link>
            <Link
              href="/arquivo"
              className="public-button focus-ring"
            >
              Arquivo
            </Link>
            <Link
              href="/hoje"
              className="public-button focus-ring"
            >
              Hoje
            </Link>
          </div>
          <SurpriseButton posts={posts} quotes={quotes} />
        </div>

        {lead ? <ArticleCard post={lead} variant="lead" /> : null}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 border-b border-[var(--line)] py-5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/buscar?tag=${encodeURIComponent(tag)}`}
                className="public-chip"
              >
                #{tag}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="grid gap-8 py-7 2xl:grid-cols-[1.15fr_0.85fr]">
          <section>
            <SectionTitle
              title="Ultimas noticias"
              action={
                <Link href="/categorias" className="text-sm font-semibold text-[var(--wine)]">
                  Ver todas {"->"}
                </Link>
              }
            />
            <div className="grid gap-4">
              {recent.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Em alta" />
            <ol className="grid gap-3">
              {featured.map((post, index) => (
                <li key={post.id} className="public-card-hover grid grid-cols-[2.5rem_1fr] rounded-md border border-[var(--line)] bg-white p-4">
                  <span className="font-editorial text-3xl text-[var(--wine)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link href={`/noticias/${post.slug}`} className="group">
                    <h3 className="font-editorial text-2xl leading-none transition group-hover:text-[var(--wine)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-[var(--muted)]">{post.category?.name}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <aside className="order-3 grid min-w-0 content-start gap-5">
        <section className="public-panel p-5 text-center">
          <p className="public-label text-[var(--wine)]">Dias juntos</p>
          <p className="font-editorial mt-3 text-6xl leading-none">{days.toLocaleString("pt-BR")}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">desde 14.08.2016</p>
        </section>

        <HomeTools quotes={quotes} />

        {dailyPost ? (
          <section className="public-panel p-5">
            <p className="public-label mb-4 flex items-center gap-2 text-[var(--wine)]">
              <CalendarHeart className="h-4 w-4" />
              Noticia do dia
            </p>
            <Link href={`/noticias/${dailyPost.slug}`} className="group">
              <h2 className="font-editorial text-3xl leading-none transition group-hover:text-[var(--wine)]">
                {dailyPost.title}
              </h2>
              {dailyPost.subtitle ? (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{dailyPost.subtitle}</p>
              ) : null}
            </Link>
          </section>
        ) : null}

        <section className="public-panel p-5">
          <p className="public-label mb-4 flex items-center gap-2 text-[var(--wine)]">
            <ShieldCheck className="h-4 w-4" />
            Noticia verificada
          </p>
          <p className="text-sm leading-6 text-[var(--ink-soft)]">
            Todo post publicado aqui recebe o selo oficial: confirmado pelo namorado,
            revisado pela saudade e aprovado pelo carinho.
          </p>
        </section>

        <section className="public-panel p-5">
          <p className="public-label mb-4 flex items-center gap-2 text-[var(--wine)]">
            <Cat className="h-4 w-4" />
            Gatos da redacao
          </p>
          <p className="font-editorial text-3xl leading-none">Galeria oficial</p>
          <p className="mt-3 text-sm text-[var(--muted)]">Fotos fofas e dramaticas usadas nas materias.</p>
          <Link href="/galeria" className="mt-4 inline-flex text-sm font-semibold text-[var(--wine)]">
            Abrir galeria
          </Link>
        </section>
      </aside>
    </div>
  );
}
