import { join, parse } from "node:path";
import { readdir } from "node:fs/promises";

export type Slug = string;

export const contentsDirectory = join(process.cwd(), "src/contents");

export const slugToFilePath = (slug: Slug): string => join(
  contentsDirectory,
  `${slug}.md`
);

export let _cachedSlugs: Slug[] | undefined;

export const getAllSlugs = async (): Promise<Slug[]> => {
  if (_cachedSlugs) {
    return _cachedSlugs;
  }

  const files = await readdir(contentsDirectory);
  const slugs = files.map(file => parse(file).name);

  _cachedSlugs = slugs;

  return slugs;
};

export const existsSlug = async (slug: Slug): Promise<boolean> => {
  const slugs = await getAllSlugs();

  return slugs.includes(slug);
};
