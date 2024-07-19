import { readFile } from "node:fs/promises";

import matter from "gray-matter";
import { $array, $const, $object, $opt, $string, $union } from "lizod";

import { markdownToHtml } from "@/utils/blog/html";
import { getAllSlugs, slugToFilePath } from "@/utils/blog/slug";
import { getTag } from "@/utils/blog/tag";
import { summarize } from "@/utils/summarize";

import type { Html } from "@/utils/blog/html";
import type { Slug } from "@/utils/blog/slug";
import type { Tag } from "@/utils/blog/tag";

export const ArticleVisibility = {
  Public: "public",
  Unlisted: "unlisted",
} as const;

export type ArticleVisibility =
  (typeof ArticleVisibility)[keyof typeof ArticleVisibility];

export const ArticleFrontMatter = $object({
  title: $string,
  visibility: $opt(
    $union([
      $const(ArticleVisibility.Public),
      $const(ArticleVisibility.Unlisted),
    ]),
  ),
  tagIds: $opt($array($string)),
  publishedAt: $object({}, false),
  modifiedAt: $opt($object({}, false)),
});

export type Article = {
  slug: Slug;
  title: string;
  html: Html;
  visibility: ArticleVisibility;
  tags?: Tag[];
  description: string;
  publishedTimestamp: number;
  modifiedTimestamp?: number;
};

export const _cachedArticles = new Map<Slug, Readonly<Article>>();

export const getArticle = async (slug: string): Promise<Readonly<Article>> => {
  const cached = _cachedArticles.get(slug);

  if (cached) {
    return cached;
  }

  const filePath = slugToFilePath(slug);
  const fileContent = await readFile(filePath, "utf8");
  const file = matter(fileContent);
  const context = { errors: [] };

  if (!ArticleFrontMatter(file.data, context)) {
    throw new TypeError(JSON.stringify(context));
  }

  const { title, tagIds, visibility, publishedAt, modifiedAt } = file.data;
  const html = await markdownToHtml(file.content);
  const article: Article = {
    slug,
    html,
    title,
    visibility: visibility ?? ArticleVisibility.Public,
    description: summarize(html, { maxLength: 100 }),
    tags: tagIds?.map((id) => getTag(id)),
    publishedTimestamp: (publishedAt as Date).getTime(),
    modifiedTimestamp: (modifiedAt as Date | undefined)?.getTime(),
  };

  _cachedArticles.set(slug, article);

  return article;
};

export const getAllArticles = async (): Promise<Article[]> => {
  const slugs = await getAllSlugs();

  return await Promise.all(slugs.map((slug) => getArticle(slug)));
};
