import ArticleHistoryPage from "#src/article/history/page";
import { rootArticleManager } from "#src/article/manager";

export const metadata = {
  title: "`acknowledgments` の更新履歴",
  description: "`acknowledgments` の更新履歴ページ。",
  openGraph: {
    type: "article",
    url: "/article/acknowledgments/history",
  },
};

export default function Page() {
  const article = rootArticleManager.article("acknowledgments");

  return <ArticleHistoryPage article={article} />;
}
