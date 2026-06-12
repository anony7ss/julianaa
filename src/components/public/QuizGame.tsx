"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { quizQuestions as defaultQuizQuestions } from "@/data/feature-content";
import type { QuizQuestion } from "@/types/content";

type QuizGameProps = {
  questions?: QuizQuestion[];
};

export function QuizGame({ questions = defaultQuizQuestions }: QuizGameProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const quizQuestions = questions.length > 0 ? questions : defaultQuizQuestions;
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
        0,
      ),
    [answers, quizQuestions],
  );
  const finished = Object.keys(answers).length === quizQuestions.length;

  function choose(index: number, option: string) {
    setAnswers((current) => ({ ...current, [index]: option }));
  }

  return (
    <div className="grid gap-5">
      {quizQuestions.map((question, index) => (
        <section key={question.question} className="public-panel p-5">
          <p className="public-label text-[10px] text-[var(--muted)]">
            Pergunta {index + 1}
          </p>
          <h2 className="font-editorial mt-2 text-[clamp(2.2rem,4vw,3.2rem)] leading-[0.98]">
            {question.question}
          </h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {question.options.map((option) => {
              const selected = answers[index] === option;
              const correct = selected && option === question.answer;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(index, option)}
                  className={`focus-ring min-h-12 rounded-md border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? correct
                        ? "border-[var(--sage)] bg-[#f1f6f2] text-[var(--sage)]"
                        : "border-[var(--wine)] bg-[var(--rose-soft)] text-[var(--wine)]"
                      : "border-[var(--line)] bg-[#fbfaf8] text-[var(--ink-soft)] hover:border-[var(--wine)] hover:bg-[var(--rose-soft)]"
                  }`}
                  aria-pressed={selected}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <div className="rounded-md border border-white/10 bg-[var(--ink)] p-6 text-white shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Resultado</p>
            <p className="font-editorial mt-2 text-5xl leading-none">
              {score}/{quizQuestions.length}
            </p>
          </div>
          {finished ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--rose)]">
              <CheckCircle2 className="h-4 w-4" />
              Quiz completo
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-md border border-white/30 px-4 text-xs font-bold uppercase tracking-[0.14em] transition hover:bg-white hover:text-[var(--ink)]"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
