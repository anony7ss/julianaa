import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { getTimelineEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Linha do Tempo",
};

export const revalidate = 3600;

export default async function TimelinePage() {
  const events = await getTimelineEvents();

  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="Linha do tempo"
        description="Um arquivo de acontecimentos importantes, pequenos detalhes e cenas que ganharam status de patrimonio sentimental."
        icon={<CalendarDays className="h-5 w-5" />}
      />

      <ol className="mt-10 grid gap-8">
        {events.map((event, index) => (
          <li
            key={event.id}
            className="public-card-hover grid gap-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm md:grid-cols-[9rem_1fr_15rem]"
          >
            <div>
              <span className="font-editorial text-5xl text-[var(--wine)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="public-label mt-2 text-[10px] text-[var(--muted)]">
                {formatDate(event.eventDate)}
              </p>
            </div>
            <div>
              <h2 className="font-editorial text-[clamp(2.4rem,4vw,3.35rem)] leading-none">{event.title}</h2>
              {event.description ? (
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">
                  {event.description}
                </p>
              ) : null}
            </div>
            <div className="relative aspect-[1.35] overflow-hidden rounded-md bg-[var(--rose-soft)]">
              <Image
                src={event.imageUrl ?? "/images/cat-love-letters.png"}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
