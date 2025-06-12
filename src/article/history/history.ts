import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { $array, $number, $object, $string, type Infer } from "lizod";
import simpleGit, { type SimpleGit } from "simple-git";
import { ARTICLE_HISTORY_DIR, CONTENTS_DIR } from "#src/dir";
import {
  type SafeArticleBase,
  type UnsafeArticleBase,
  validateArticleBase,
} from "../base";
import { type SafeSlug, type UnsafeSlug, validateSlug } from "../slug";

type ArticleLocator = (slug: SafeSlug, articleBase: SafeArticleBase) => string;

const RELATIVE_CONTENTS_DIR = relative(
  join(CONTENTS_DIR, "../../"),
  CONTENTS_DIR,
);

const ARTICLE_LOCATORS: ArticleLocator[] = [
  // src/contents/[...base]/[slug]/index.md
  (slug, base) => join(RELATIVE_CONTENTS_DIR, base, slug, "index.md"),
  // src/contents/[slug].md
  (slug) => {
    let slug_: string = slug;

    if (slug_ === "acknowledgments") {
      slug_ = "acknowledgements";
    }

    return join(RELATIVE_CONTENTS_DIR, `${slug_}.md`);
  },
];

export const ArticleLog = $object({
  commit: $string,
  timestamp: $number,
  message: $string,
  filePathHash: $string,
});
export type ArticleLog = Infer<typeof ArticleLog>;

export const ArticleHistory = $array(ArticleLog);
export type ArticleHistory = Infer<typeof ArticleHistory>;

let git: SimpleGit | undefined;

export const getLogs = async (
  slug: UnsafeSlug,
  articleBase: UnsafeArticleBase = "",
): Promise<ArticleLog[]> => {
  validateSlug(slug);
  validateArticleBase(articleBase);

  git ??= simpleGit();

  const logs: Map<string, ArticleLog> = new Map();

  for (const locate of ARTICLE_LOCATORS) {
    const loc = locate(slug, articleBase);
    const result = await git.log(["--follow", "--name-status", "--", loc]);

    for (const log of result.all) {
      const path = log.diff?.files[0]?.file.replaceAll("\\", "/");

      if (path === undefined) {
        throw new TypeError(`Commit ${log.hash} file location unknown`);
      }

      logs.set(log.hash, {
        message: log.message,
        commit: log.hash,
        timestamp: new Date(log.date).getTime(),
        filePathHash: createHash("sha256").update(path, "utf8").digest("hex"),
      });
    }
  }

  return [...logs.values()];
};

export const readLogs = async (
  slug: UnsafeSlug,
  articleBase: UnsafeArticleBase = "",
): Promise<ArticleLog[]> => {
  validateSlug(slug);
  validateArticleBase(articleBase);

  let base = "";

  if (articleBase) {
    base += `/${articleBase.replaceAll(/[\\/]/g, "_")}_`;
  }

  const historyFile = `${ARTICLE_HISTORY_DIR}/${base}${slug}.json`;
  const logs = JSON.parse(await readFile(historyFile, "utf8"));

  // TODO
  if (!ArticleHistory(logs)) throw new Error("Invalid log");

  return logs;
};
