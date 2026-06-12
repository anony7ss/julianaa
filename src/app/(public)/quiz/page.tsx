import { QuizGame } from "@/components/public/QuizGame";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";
import { quizQuestions } from "@/data/feature-content";
import { getDailyEdition, getDailyQuizQuestions } from "@/lib/daily-edition";

export const metadata = {
  title: "Quiz da Juliana",
};

export const dynamic = "force-dynamic";

export default function QuizPage() {
  const dailyEdition = getDailyEdition();
  const dailyQuestions = getDailyQuizQuestions(quizQuestions);

  return (
    <div className="public-page max-w-[1040px]">
      <PublicPageHeader
        title="Quiz da Juliana"
        description="Uma rodada rapida com pergunta nova e ordem atualizada todo dia."
        meta={`${dailyEdition.label} - ${dailyEdition.category}`}
      />
      <div className="mt-8">
        <QuizGame questions={dailyQuestions} />
      </div>
    </div>
  );
}
