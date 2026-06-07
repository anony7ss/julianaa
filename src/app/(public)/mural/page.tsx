import { GuestbookWall } from "@/components/public/GuestbookWall";
import { PublicPageHeader } from "@/components/public/PublicPageHeader";

export const metadata = {
  title: "Mural",
};

export default function GuestbookPage() {
  return (
    <div className="public-page public-page-narrow">
      <PublicPageHeader
        title="Mural de recados"
        description="Pequenas mensagens guardadas como bilhetes dentro da edicao."
      />
      <div className="mt-8">
        <GuestbookWall />
      </div>
    </div>
  );
}
