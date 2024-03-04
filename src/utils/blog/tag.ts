export type TagId = string;

export type TagDisplayName = string;

export type Tag = {
  id: TagId,
  displayName: TagDisplayName
};

export const _definedTags: ReadonlyMap<TagId, TagDisplayName> = new Map(Object.entries({
  "discord": "Discord",
  "generics": "ジェネリクス",
  "google-analytics": "Google Analytics",
  "idb-keyval": "IDB-Keyval",
  "javascript": "JavaScript",
  "localforage": "localForage",
  "mozilla-firefox": "Mozilla Firefox",
  "next-js": "Next.js",
  "private-browsing": "プライベートブラウジング",
  "programming": "プログラミング",
  "static-typing": "静的型付け",
  "typescript": "TypeScript",
  "youtube": "YouTube"
}));

export const _cachedTags = new Map<TagId, Readonly<Tag>>();

export const getTag = (id: TagId): Readonly<Tag> => {
  const cached = _cachedTags.get(id);

  if (cached) {
    return cached;
  }

  const displayName = _definedTags.get(id);

  if (!displayName) {
    throw new TypeError(`"${id}" is an undefined tag`);
  }

  const tag: Tag = {
    id,
    displayName
  };

  _cachedTags.set(id, tag);

  return tag;
};

export const existsTag = async (id: TagId): Promise<boolean> => _definedTags.has(id);
