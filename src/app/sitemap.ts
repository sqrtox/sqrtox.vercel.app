import { getAllArticles } from "@/utils/blog";
import { ArticleVisibility } from "@/utils/blog/article";
import { _definedTags } from "@/utils/blog/tag";

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    ...articles.filter(article => article.visibility === ArticleVisibility.Public).map(article => ({
      url: new URL(`/article/${article.slug}`, process.env.NEXT_PUBLIC_BASE_URL).href,
      lastModified: new Date(article.modifiedTimestamp ?? article.publishedTimestamp)
    })),
    ...[..._definedTags.keys()].map(tagId => ({
      url: new URL(`/tag/${tagId}`, process.env.NEXT_PUBLIC_BASE_URL).href
    })),
    {
      url: process.env.NEXT_PUBLIC_BASE_URL as string,
    }
  ];
}
