import type { ArticleMetadata } from "#src/article/article";
import { articleManager, rootArticleManager } from "#src/article/manager";
import Search from "./search";

interface PlainArticle {
  slug: string;
  metadata: ArticleMetadata;
  text: string;
  base: string;
}

export default async function Page() {
  const articles = await Promise.all(
    [
      ...(await articleManager.articles()),
      ...(await rootArticleManager.articles()),
    ].map(
      async (article): Promise<PlainArticle> => ({
        slug: article.slug,
        metadata: await article.getMetadata(),
        text: await article.text(),
        base: article.base,
      }),
    ),
  );

  return <Search articles={articles} />;
}
