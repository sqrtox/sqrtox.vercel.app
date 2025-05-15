import type { Brand } from "#src/brand";

const SLUG = /^[a-z\d-]+$/;

export type UnsafeSlug = string;

export type SafeSlug = Brand<string, "safeSlug">;

type ValidateSlug = (slug: UnsafeSlug) => asserts slug is SafeSlug;

export const validateSlug: ValidateSlug = (slug) => {
  const invalidSlug = () => new Error("Invalid slug");

  if (typeof slug !== "string") throw invalidSlug();
  if (!SLUG.test(slug)) throw invalidSlug();
};
