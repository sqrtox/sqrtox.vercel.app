import type { MetadataRoute } from "next";
import type { ArticleTimestamp } from "#src/article/article";
import { articleManager, rootArticleManager } from "#src/article/manager";

export const dynamic = "force-static";
export const revalidate = false;

interface ArticleObject {
  slug: string;
  timestamp: ArticleTimestamp;
}

const createArticlesSitemap = (
  articles: ArticleObject[],
  priority: number,
  pathname: (article: ArticleObject) => string,
): MetadataRoute.Sitemap =>
  articles.flatMap((a) => {
    const p = pathname(a);
    const timestamp = a.timestamp.updatedAt ?? a.timestamp.createdAt;
    const lastModified =
      timestamp !== undefined ? new Date(timestamp).toISOString() : undefined;

    return [
      {
        url: `https://www.sqrtox.com${p}`,
        lastModified,
        changeFrequency: "monthly",
        priority,
      },
      {
        url: `https://www.sqrtox.com${p}/history`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];
  });

export default async function (): Promise<MetadataRoute.Sitemap> {
  const rootArticles: ArticleObject[] = await Promise.all(
    [...(await rootArticleManager.articles())].map(async (a) => ({
      ...a,
      timestamp: await a.timestamp(),
    })),
  );
  const articles: ArticleObject[] = await Promise.all(
    [...(await articleManager.articles())].map(async (a) => ({
      ...a,
      timestamp: await a.timestamp(),
    })),
  );

  return [
    {
      url: "https://www.sqrtox.com",
      lastModified: "2025-06-13",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.sqrtox.com/about",
      lastModified: "2025-06-13",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...createArticlesSitemap(rootArticles, 0.6, (a) => `/${a.slug}`),
    ...createArticlesSitemap(articles, 0.8, (a) => `/article/${a.slug}`),
  ];
}
