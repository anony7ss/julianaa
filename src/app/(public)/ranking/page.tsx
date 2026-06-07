import { Trophy } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getRankings } from "@/lib/data";

export const metadata = {
  title: "Ranking",
};

export const revalidate = 3600;

export default async function RankingPage() {
  const rankings = await getRankings();

  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="Rankings oficiais"
        description="Listas importantissimas, feitas com criterios tecnicos como amor, saudade, memoria afetiva e nenhuma neutralidade."
        icon={<Trophy className="h-5 w-5" />}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {rankings.map((ranking) => (
          <section key={ranking.id} className="public-panel p-6">
            <div className="mb-6 flex items-start gap-4">
              <Trophy className="mt-1 h-6 w-6 text-[var(--wine)]" />
              <div>
                <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.25rem)] leading-none">
                  {ranking.title}
                </h2>
                {ranking.description ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{ranking.description}</p>
                ) : null}
              </div>
            </div>
            <ol className="grid gap-0">
              {ranking.items.map((item) => (
                <li key={item.id} className="grid grid-cols-[3.2rem_1fr] border-t border-[var(--line)] py-5">
                  <span className="font-editorial text-5xl leading-none text-[var(--wine)]">{item.position}</span>
                  <div>
                    <h3 className="font-editorial text-[clamp(2rem,3vw,2.6rem)] leading-none">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{item.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
