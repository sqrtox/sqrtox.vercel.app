import { rootArticleManager } from "#src/article/manager";
import ArticlePage from "#src/article/page";

export default function Page() {
  const article = rootArticleManager.article("acknowledgments");

  return <ArticlePage article={article} />;
}
