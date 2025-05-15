import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../");

export const DATA_DIR = join(ROOT_DIR, ".data");

export const ARTICLE_HISTORY_DIR = join(DATA_DIR, "article-history");

export const CONTENTS_DIR = join(ROOT_DIR, "src/contents");
