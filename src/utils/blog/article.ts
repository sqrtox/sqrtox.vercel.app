import type { Slug } from "@/utils/blog/slug";
import { getAllSlugs, slugToFilePath } from "@/utils/blog/slug";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { $object, $string, $array, $opt } from "lizod";
import type { Tag } from "@/utils/blog/tag";
import { getTag } from "@/utils/blog/tag";
import type { Html } from "@/utils/blog/html";
import { markdownToHtml } from "@/utils/blog/html";
import { summarize } from "../summarize";

export const ArticleFrontMatter = $object({
  title: $string,
  tagIds: $array($string),
  publishedAt: $object({}, false),
  modifiedAt: $opt($object({}, false))
});

export type Article = {
  slug: Slug,
  title: string,
  html: Html,
  tags: Tag[],
  description: string,
  publishedTimestamp: number,
  modifiedTimestamp?: number
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

  const { title, tagIds, publishedAt, modifiedAt } = file.data;
  const html = await markdownToHtml(file.content);
  const article: Article = {
    slug,
    html,
    title,
    description: summarize(html, { maxLength: 100 }),
    tags: tagIds.map(id => getTag(id)),
    publishedTimestamp: (publishedAt as Date).getTime(),
    modifiedTimestamp: (modifiedAt as Date | undefined)?.getTime()
  };

  _cachedArticles.set(slug, article);

  return article;
};

export const getAllArticles = async (): Promise<Article[]> => {
  const slugs = await getAllSlugs();

  return await Promise.all(slugs.map(slug => getArticle(slug)));
};
