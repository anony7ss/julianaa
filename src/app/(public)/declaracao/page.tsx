import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Declaracao",
};

export default function DeclarationPage() {
  return (
    <div className="bg-[var(--ink)] text-white">
      <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1180px] place-items-center px-4 py-14 sm:px-6">
        <div className="max-w-4xl text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-md border border-white/14 bg-white/[0.06]">
            <Heart className="h-6 w-6 fill-[var(--rose)] text-[var(--rose)]" />
          </span>
          <h1 className="font-editorial mt-7 text-[clamp(3.5rem,8vw,6.8rem)] leading-[0.92] text-white">
            Juliana, voce e minha noticia favorita.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/78">
            Se este jornal publicasse uma edicao por dia, ainda faltaria espaco para
            contar tudo que eu amo em voce. Obrigado por ser meu assunto preferido,
            minha paz mais bonita e a manchete que eu escolheria para sempre.
          </p>
          <Link
            href="/"
            className="focus-ring mt-10 inline-flex items-center gap-3 rounded-md border border-white/50 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--ink)]"
          >
            Voltar para o jornal <span aria-hidden>{"->"}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
