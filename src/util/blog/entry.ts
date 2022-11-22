import { readFile, readdir } from 'node:fs/promises';
import { join as joinPath, parse as parsePath } from 'node:path';
import { generateSummary } from './generateSummary';
import { markdownToHtml } from '~/util/blog/markdownToHtml';
import { type BlogEntryTag, assertIsBlogEntryTagId, getBlogEntryTagById } from '~/util/blog/tag';
import { isYamlArray, matter } from '~/util/matter';
import { type Writable } from '~/util/types/Writable';
import { type KebabCase, isKebabCase } from '~/util/types/kebab-case';

export type AssertIsBlogEntrySlug = (value: unknown) => asserts value is BlogEntrySlug;
export const BLOG_CONTENT_DIR_PATH = joinPath(process.cwd(), 'content/blog');

export type BlogEntry = Readonly<{
  description: string,
  html: string,
  publishedTimestamp: number,
  slug: BlogEntrySlug,
  tags: readonly BlogEntryTag[],
  title: string,
  modifiedTimestamp?: number
}>;

export type BlogEntrySlug = KebabCase<'blogEntrySlug'>;

export const assertIsBlogEntrySlug: AssertIsBlogEntrySlug = value => {
  if (!isBlogEntrySlug(value)) {
    throw new TypeError();
  }
};

export const fetchBlogEntries = async (): Promise<readonly BlogEntry[]> => {
  const slugs = await getBlogEntrySlugs();
  const entries: BlogEntry[] = [];

  for (const slug of slugs) {
    entries.push(await fetchBlogEntryBySlug(slug));
  }

  return entries;
};

export const fetchBlogEntryBySlug = async (slug: BlogEntrySlug): Promise<BlogEntry> => {
  const filePath = slugToFilePath(slug);
  const fileContent = await readFile(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  if (
    data === null ||
    typeof data !== 'object' ||
    isYamlArray(data) ||
    data instanceof Date
  ) {
    throw new TypeError('Incorrect data type');
  }

  const {
    title,
    tagIds,
    publishedAt,
    modifiedAt
  } = data;

  if (typeof title !== 'string') {
    throw new TypeError('Title not specified');
  }

  if (!isYamlArray(tagIds)) {
    throw new TypeError('Tag id list type is invalid');
  }

  if (!(publishedAt instanceof Date)) {
    throw new TypeError('The publication date/time type is incorrect');
  }

  if (!(modifiedAt instanceof Date) && typeof modifiedAt !== 'undefined') {
    throw new TypeError('Incorrect update date/time type');
  }

  const html = await markdownToHtml(content);
  const summary = generateSummary(html);

  const blogEntry: Writable<BlogEntry, 'modifiedTimestamp'> = {
    description: summary,
    html,
    publishedTimestamp: publishedAt.getTime(),
    slug,
    tags: tagIds.map(id => {
      assertIsBlogEntryTagId(id);

      return getBlogEntryTagById(id);
    }),
    title
  };

  if (modifiedAt) {
    blogEntry.modifiedTimestamp = modifiedAt.getTime();
  }

  return blogEntry;
};

export const getBlogEntrySlugs = async (): Promise<readonly BlogEntrySlug[]> => {
  const files = await readdir(BLOG_CONTENT_DIR_PATH);

  return files.map(file => {
    const { name } = parsePath(file);

    assertIsBlogEntrySlug(name);

    return name;
  });
};

export const isBlogEntrySlug = (value: unknown): value is BlogEntrySlug => (
  isKebabCase(value)
);

export const slugToFilePath = (slug: BlogEntrySlug): string => (
  joinPath(BLOG_CONTENT_DIR_PATH, `${slug}.md`)
);
