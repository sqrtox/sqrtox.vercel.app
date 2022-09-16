import { fetchBlogEntries } from '~/util/blog/entry';
import { type KebabCase } from '~/util/types/kebab-case';

type BlogEntryTagId = KebabCase<'blogEntryTagId'>;
type BlogEntryTag = Readonly<{
  id: BlogEntryTagId,
  displayName: string
}>;

const isBlogEntryTagId = (value: unknown): value is BlogEntryTagId => (
  typeof value === 'string' &&
  TAG_DISPLAY_NAMES.has(value)
);

type AssertIsBlogEntryTagId = (value: unknown) => asserts value is BlogEntryTagId;

const assertIsBlogEntryTagId: AssertIsBlogEntryTagId = value => {
  if (!isBlogEntryTagId(value)) {
    throw new TypeError('');
  }
};

const TAG_DISPLAY_NAMES: ReadonlyMap<string, string> = new Map(Object.entries({
  'programming': 'プログラミング',
  'javascript': 'JavaScript',
  'mozilla-firefox': 'Mozilla Firefox',
  'private-browsing': 'プライベートブラウジング',
  'idb-keyval': 'IDB-Keyval',
  'localforage': 'localForage',
  'generics': 'ジェネリクス',
  'static-typing': '静的型付け',
  'typescript': 'TypeScript',
  'google-analytics': 'Google Analytics',
  'next-js': 'Next.js'
}));

const getBlogEntryTagById = (id: BlogEntryTagId): BlogEntryTag => {
  const displayName = TAG_DISPLAY_NAMES.get(id);

  if (typeof displayName === 'undefined') {
    throw new TypeError('');
  }

  return {
    id,
    displayName
  };
};

const getTags = async (): Promise<readonly BlogEntryTag[]> => {
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

export {
  type AssertIsBlogEntryTagId,
  type BlogEntryTag,
  type BlogEntryTagId,
  TAG_DISPLAY_NAMES,
  assertIsBlogEntryTagId,
  getBlogEntryTagById,
  getTags,
  isBlogEntryTagId
};
