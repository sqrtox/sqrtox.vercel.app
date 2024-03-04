import type { Metadata } from "next";

const title = "ページが見つかりませんでした";
const description = "ページが見つかりませんでした";

export const notFoundMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  }
};
