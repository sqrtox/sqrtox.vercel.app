import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  type SafeArticleBase,
  type UnsafeArticleBase,
  validateArticleBase,
} from "#src/article/base";
import { CONTENTS_DIR } from "#src/dir";
import { Article } from "./article";
import type { UnsafeSlug } from "./slug";

export class ArticleManager {
  readonly #articleBase: SafeArticleBase;

  constructor(articleBase: UnsafeArticleBase = "") {
    validateArticleBase(articleBase);

    this.#articleBase = articleBase;
  }

  async slugs(): Promise<IterableIterator<UnsafeSlug>> {
    const slugs: string[] = [];

    for (const slug of await readdir(join(CONTENTS_DIR, this.#articleBase))) {
      if (existsSync(join(CONTENTS_DIR, this.#articleBase, slug, "index.md"))) {
        slugs.push(slug);
      }
    }

    return slugs.values();
  }

  async articles(): Promise<IterableIterator<Article>> {
    return [...(await this.slugs())]
      .map((slug) => new Article(slug, this.#articleBase))
      .values();
  }

  article(slug: UnsafeSlug): Article {
    return new Article(slug, this.#articleBase);
  }
}

export const articleManager = new ArticleManager("article");

export const rootArticleManager = new ArticleManager();
