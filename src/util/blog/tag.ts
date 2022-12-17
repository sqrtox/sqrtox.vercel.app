import { fetchBlogEntries } from '~/util/blog/entry';
import { type KebabCase } from '~/util/types/kebab-case';

export type AssertIsBlogEntryTagId = (value: unknown) => asserts value is BlogEntryTagId;
export type BlogEntryTag = Readonly<{
  displayName: string,
  id: BlogEntryTagId
}>;

export type BlogEntryTagId = KebabCase<'blogEntryTagId'>;

export const TAG_DISPLAY_NAMES: ReadonlyMap<string, string> = new Map(Object.entries({
  'discord': 'Discord',
  'generics': 'ジェネリクス',
  'google-analytics': 'Google Analytics',
  'idb-keyval': 'IDB-Keyval',
  'javascript': 'JavaScript',
  'localforage': 'localForage',
  'mozilla-firefox': 'Mozilla Firefox',
  'next-js': 'Next.js',
  'private-browsing': 'プライベートブラウジング',
  'programming': 'プログラミング',
  'static-typing': '静的型付け',
  'typescript': 'TypeScript',
  'youtube': 'YouTube'
}));

export const assertIsBlogEntryTagId: AssertIsBlogEntryTagId = value => {
  if (!isBlogEntryTagId(value)) {
    throw new TypeError('');
  }
};

export const getBlogEntryTagById = (id: BlogEntryTagId): BlogEntryTag => {
  const displayName = TAG_DISPLAY_NAMES.get(id);

  if (typeof displayName === 'undefined') {
    throw new TypeError('');
  }

  return {
    displayName,
    id
  };
};

export const getTags = async (): Promise<readonly BlogEntryTag[]> => {
  const tagIdSet = new Set<BlogEntryTagId>();
  const tags: BlogEntryTag[] = [];
  const blogEntries = await fetchBlogEntries();

  for (const blogEntry of blogEntries) {
    for (const tag of blogEntry.tags) {
      if (!tagIdSet.has(tag.id)) {
        tags.push(tag);
      }

      tagIdSet.add(tag.id);
    }
  }

  return tags;
};

export const isBlogEntryTagId = (value: unknown): value is BlogEntryTagId => (
  typeof value === 'string' &&
  TAG_DISPLAY_NAMES.has(value)
);
