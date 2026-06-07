import { NextResponse, type NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/api";
import {
  getAllPostsForAdmin,
  getAllLoveQuotesForAdmin,
  getAuthors,
  getCategories,
  getRankings,
  getTimelineEvents,
} from "@/lib/data";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const [posts, categories, authors, quotes, timeline, rankings] = await Promise.all([
    getAllPostsForAdmin(),
    getCategories(),
    getAuthors(),
    getAllLoveQuotesForAdmin(),
    getTimelineEvents(),
    getRankings(),
  ]);

  return NextResponse.json(
    {
      exportedAt: new Date().toISOString(),
      posts,
      categories,
      authors,
      quotes,
      timeline,
      rankings,
    },
    {
      headers: {
        "Content-Disposition": `attachment; filename="juu-news-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    },
  );
}
