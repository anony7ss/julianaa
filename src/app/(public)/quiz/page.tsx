import { QuizGame } from "@/components/public/QuizGame";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";

export const metadata = {
  title: "Quiz da Juliana",
};

export default function QuizPage() {
  return (
    <div className="public-page max-w-[1040px]">
      <PublicPageHeader
        title="Quiz da Juliana"
        description="Uma rodada rapida para testar conhecimentos oficialmente afetivos."
      />
      <div className="mt-8">
        <QuizGame />
      </div>
    </div>
  );
}
