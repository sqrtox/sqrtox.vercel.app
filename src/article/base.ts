import type { Brand } from "#src/brand";

export type UnsafeArticleBase = string;

export type SafeArticleBase = Brand<string, "safeArticleBase">;

const ARTICLE_BASE = /^[^.]*$/;

type ValidateArticleBase = (
  articleBase: UnsafeArticleBase,
) => asserts articleBase is SafeArticleBase;

export const validateArticleBase: ValidateArticleBase = (articleBase) => {
  const invalidArticleBase = () => new Error("Invalid article base");

  if (typeof articleBase !== "string") throw invalidArticleBase();
  if (!ARTICLE_BASE.test(articleBase)) throw invalidArticleBase();
};
