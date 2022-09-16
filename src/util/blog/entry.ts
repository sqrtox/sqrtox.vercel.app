import { readFile, readdir } from 'node:fs/promises';
import { join as joinPath, parse as parsePath } from 'node:path';
import { markdownToHtml } from '~/util/blog/markdownToHtml';
import { type BlogEntryTag, assertIsBlogEntryTagId, getBlogEntryTagById } from '~/util/blog/tag';
import { isYamlArray, matter } from '~/util/matter';
import { type Writable } from '~/util/types/Writable';
import { type KebabCase, isKebabCase } from '~/util/types/kebab-case';

type BlogEntrySlug = KebabCase<'blogEntrySlug'>;
type BlogEntry = Readonly<{
  slug: BlogEntrySlug,
  title: string,
  description: string,
  tags: readonly BlogEntryTag[],
  html: string,
  publishedTimestamp: number,
  modifiedTimestamp?: number
}>;

const isBlogEntrySlug = (value: unknown): value is BlogEntrySlug => (
  isKebabCase(value)
);

type AssertIsBlogEntrySlug = (value: unknown) => asserts value is BlogEntrySlug;

const assertIsBlogEntrySlug: AssertIsBlogEntrySlug = value => {
  if (!isBlogEntrySlug(value)) {
    throw new TypeError();
  }
};

const BLOG_CONTENT_DIR_PATH = joinPath(process.cwd(), 'content/blog');

const slugToFilePath = (slug: BlogEntrySlug): string => (
  joinPath(BLOG_CONTENT_DIR_PATH, `${slug}.md`)
);

const fetchBlogEntryBySlug = async (slug: BlogEntrySlug): Promise<BlogEntry> => {
  const filePath = slugToFilePath(slug);
  const fileContent = await readFile(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  if (
    data === null ||
    typeof data !== 'object' ||
    isYamlArray(data) ||
    data instanceof Date
  ) {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  const {
    title,
    description,
    tagIds,
    publishedAt,
    modifiedAt
  } = data;

  if (typeof title !== 'string') {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  if (typeof description !== 'string') {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  if (!isYamlArray(tagIds)) {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  if (!(publishedAt instanceof Date)) {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  if (!(modifiedAt instanceof Date) && typeof modifiedAt !== 'undefined') {
    /**
     * @todo
     */
    throw new TypeError('');
  }

  const blogEntry: Writable<BlogEntry, 'modifiedTimestamp'> = {
    slug,
    title,
    description,
    html: await markdownToHtml(content),
    publishedTimestamp: publishedAt.getTime(),
    tags: tagIds.map(id => {
      assertIsBlogEntryTagId(id);

      return getBlogEntryTagById(id);
    })
  };

  if (modifiedAt) {
    blogEntry.modifiedTimestamp = modifiedAt.getTime();
  }

  return blogEntry;
};

const fetchBlogEntries = async (): Promise<readonly BlogEntry[]> => {
  const slugs = await getBlogEntrySlugs();
  const entries: BlogEntry[] = [];

  for (const slug of slugs) {
    entries.push(await fetchBlogEntryBySlug(slug));
  }

  return entries;
};

const getBlogEntrySlugs = async (): Promise<readonly BlogEntrySlug[]> => {
  const files = await readdir(BLOG_CONTENT_DIR_PATH);

  return files.map(file => {
    const { name } = parsePath(file);

    assertIsBlogEntrySlug(name);

    return name;
  });
};

export {
  type AssertIsBlogEntrySlug,
  BLOG_CONTENT_DIR_PATH,
  type BlogEntry,
  type BlogEntrySlug,
  assertIsBlogEntrySlug,
  fetchBlogEntries,
  fetchBlogEntryBySlug,
  getBlogEntrySlugs,
  isBlogEntrySlug,
  slugToFilePath
};
