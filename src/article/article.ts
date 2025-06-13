import { readFile } from "node:fs/promises";
import { join } from "node:path";
import fm from "front-matter";
import tagLabels from "#src/article/tag.json";
import { CONTENTS_DIR } from "#src/dir";
import {
  type SafeArticleBase,
  type UnsafeArticleBase,
  validateArticleBase,
} from "./base";
import {
  type ArticleHistory,
  type ArticleLog,
  readLogs,
} from "./history/history";
import { type CompileResult, compile } from "./markdown";
import { type SafeSlug, type UnsafeSlug, validateSlug } from "./slug";
import type { ArticleTag } from "./tag";

const WHITESPACES = /\s+/;

export interface ArticleMetadata {
  title: string;
  tags: ArticleTag[];
}

export interface ArticleTimestamp {
  createdAt?: number;
  updatedAt?: number;
}

export class Article {
  readonly slug: SafeSlug;
  readonly base: SafeArticleBase;
  readonly #dir: string;

  constructor(slug: UnsafeSlug, articleBase: UnsafeArticleBase = "") {
    validateSlug(slug);
    validateArticleBase(articleBase);

    this.slug = slug;
    this.base = articleBase;
    this.#dir = join(CONTENTS_DIR, articleBase, slug);
  }

  #contents?: string;

  async #getContents(): Promise<string> {
    if (this.#contents === undefined) {
      this.#contents = await readFile(join(this.#dir, "index.md"), "utf8");
    }

    return this.#contents;
  }

  #markdown?: string;
  #attributes?: unknown;

  async #matter(): Promise<[markdown: string, attributes: unknown]> {
    if (this.#markdown === undefined || this.#attributes === undefined) {
      const contents = await this.#getContents();
      const result = fm(contents);

      this.#markdown = result.body;
      this.#attributes = result.attributes;
    }

    return [this.#markdown, this.#attributes];
  }

  #metadata?: ArticleMetadata;

  async getMetadata(): Promise<ArticleMetadata> {
    if (this.#metadata === undefined) {
      const matter = await this.#matter();
      const attrs = matter[1];

      // TODO
      if (typeof attrs !== "object" || attrs === null)
        throw new TypeError("error");

      if (!("title" in attrs) || typeof attrs.title !== "string")
        throw new TypeError("error");

      // TODO: validation
      this.#metadata = {
        title: attrs.title,
        tags:
          "tags" in attrs && typeof attrs.tags === "string"
            ? attrs.tags
                .split(WHITESPACES)
                .map((id) => ({
                  id,
                  label: tagLabels[id as keyof typeof tagLabels],
                }))
                .filter((tag) => tag.label !== undefined)
            : [],
      };
    }

    return this.#metadata;
  }

  #compiled?: CompileResult;

  async #getCompiled(): Promise<CompileResult> {
    if (!this.#compiled) {
      const matter = await this.#matter();
      const markdown = matter[0];

      this.#compiled = await compile(markdown);
    }

    return this.#compiled;
  }

  async html(): Promise<string> {
    return (await this.#getCompiled()).html;
  }

  async text(): Promise<string> {
    return (await this.#getCompiled()).text;
  }

  #history?: ArticleHistory;

  async history(): Promise<ArticleHistory> {
    if (!this.#history) {
      this.#history = await readLogs(this.slug, this.base);
      this.#history.sort((a, b) => b.timestamp - a.timestamp);
    }

    return this.#history;
  }

  #timestamp?: ArticleTimestamp;

  async timestamp(): Promise<ArticleTimestamp> {
    if (!this.#timestamp) {
      const history = await this.history();

      let oldest: ArticleLog | undefined;
      let latest: ArticleLog | undefined;

      for (const log of history) {
        oldest ??= log;
        latest ??= log;

        if (oldest.timestamp > log.timestamp) {
          oldest = log;
        }

        if (latest.timestamp < log.timestamp) {
          latest = log;
        }
      }

      if (oldest?.commit === latest?.commit) {
        latest = undefined;
      }

      this.#timestamp = {
        createdAt: oldest?.timestamp,
        updatedAt: latest?.timestamp,
      };
    }

    return this.#timestamp;
  }
}
