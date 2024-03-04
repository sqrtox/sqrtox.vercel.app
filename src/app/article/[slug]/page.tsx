import { _cachedArticles, getArticle } from "@/utils/blog/article";
import { getHeadings } from "@/utils/blog/html";
import { existsSlug, type Slug } from "@/utils/blog/slug";
import BlogPage from "@/components/blog-page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { notFoundMetadata } from "@/utils/not-found";

import "@/styles/syntax-highlighting.scss";
import "@/styles/article.scss";

export const generateMetadata = async ({ params: { slug } }: PageProps): Promise<Metadata> => {
  const exists = await existsSlug(slug);

  if (!exists) {
    return notFoundMetadata;
  }

  const { title, description } = await getArticle(slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
};

export type PageParams = {
  slug: Slug
};

export type PageProps = {
  params: PageParams
};

export default async function Page({ params: { slug } }: PageProps) {
  const exists = await existsSlug(slug);

  if (!exists) {
    notFound();
  }

  _cachedArticles.clear();
  const article = await getArticle(slug);
  const headings = getHeadings(article.html);

  return (
    <BlogPage
      article={article}
      headings={headings}
    />
  );
}
