import Link from "next/link";
import { Heart, Mail, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { relationshipStartLabel } from "@/data/seed";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/hoje", label: "Hoje" },
  { href: "/buscar", label: "Busca" },
  { href: "/arquivo", label: "Arquivo" },
  { href: "/categorias", label: "Categorias" },
  { href: "/linha-do-tempo", label: "Linha do tempo" },
  { href: "/ranking", label: "Ranking" },
  { href: "/galeria", label: "Gatos" },
  { href: "/mural", label: "Mural" },
  { href: "/quiz", label: "Quiz" },
  { href: "/cartas", label: "Cartas" },
  { href: "/declaracao", label: "Declaracao" },
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  const now = new Date();
  const today = formatDate(now);
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(now);

  return (
    <div className="min-h-screen text-[var(--ink)]">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--ink-soft)] sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="rounded-md bg-[var(--wine)] px-2.5 py-1 font-semibold text-white">Plantao</span>
            <span className="truncate normal-case tracking-normal">
              {today}: nossa historia comecou em {relationshipStartLabel}. Sem dia exato, mas oficial.
            </span>
          </div>
          <Link
            href="/declaracao"
            className="hidden items-center gap-2 font-semibold text-[var(--wine)] transition hover:text-[var(--wine-deep)] md:flex"
          >
            Ler mais <span aria-hidden>{"->"}</span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:py-4">
          <div className="hidden text-sm text-[var(--ink-soft)] lg:block">
            <p className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
              <Heart className="h-3.5 w-3.5 fill-[var(--wine)] text-[var(--wine)]" />
              Edicao diaria
            </p>
            <p>{today}</p>
            <p className="capitalize">{weekday}</p>
          </div>

          <Link href="/" className="text-center">
            <span className="font-editorial block text-[clamp(2.9rem,7vw,6.25rem)] leading-none text-[var(--wine)]">
              Juu News
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--ink-soft)]">
              Noticias do nosso amor, todos os dias
            </span>
          </Link>

          <div className="hidden justify-end gap-5 text-sm text-[var(--ink-soft)] lg:flex">
            <Link href="/declaracao" className="flex items-center gap-2 transition hover:text-[var(--wine)]">
              <Mail className="h-4 w-4" />
              Cartas para Juu
            </Link>
            <Link href="/sobre" className="flex items-center gap-2 transition hover:text-[var(--wine)]">
              <Heart className="h-4 w-4" />
              Sobre nos
            </Link>
            <Link href="/buscar" className="flex items-center gap-2 transition hover:text-[var(--wine)]">
              <Search className="h-4 w-4" />
              Buscar
            </Link>
          </div>
        </div>

        <nav aria-label="Principal" className="public-nav-scroll mx-auto max-w-[1500px] overflow-x-auto px-4 sm:px-6">
          <div className="flex min-w-max items-center justify-center gap-1 border-t border-[var(--line)] py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3.5 py-2 transition hover:bg-[var(--rose-soft)] hover:text-[var(--wine)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-9 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-editorial text-5xl leading-none">Juu News</p>
            <p className="mt-3 max-w-sm text-sm text-white/82">
              Noticias do nosso amor, todos os dias. Verificadas pelo namorado e
              arquivadas com carinho.
            </p>
          </div>
          <FooterColumn
            title="Navegue"
            links={[
              ["/", "Inicio"],
              ["/hoje", "Hoje"],
              ["/buscar", "Busca"],
              ["/arquivo", "Arquivo"],
            ]}
          />
          <FooterColumn
            title="Coisas nossas"
            links={[
              ["/declaracao", "Cartas para Juu"],
              ["/cartas", "Modo carta"],
              ["/ranking", "Rankings"],
              ["/mural", "Mural"],
            ]}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em]">Extras</p>
            <Link
              href="/galeria"
              className="mt-4 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold"
            >
              Galeria de gatos <span aria-hidden>{"->"}</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em]">{title}</p>
      <div className="mt-4 grid gap-2 text-sm text-white/82">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
