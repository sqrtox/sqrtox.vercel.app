import { _cachedArticles, getArticle } from "@/utils/blog/article";
import { getHeadings } from "@/utils/blog/html";
import { existsSlug, type Slug } from "@/utils/blog/slug";
import BlogPage from "@/components/blog/blog-page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateDefaultMetadata, generateNotFoundMetadata } from "@/utils/metadata";

import "@/styles/syntax-highlighting.scss";
import "@/styles/article.scss";

export const generateMetadata = async ({ params: { slug } }: PageProps): Promise<Metadata> => {
  const exists = await existsSlug(slug);

  if (!exists) {
    return generateNotFoundMetadata();
  }

  const { title, description } = await getArticle(slug);
  const defaultMetadata = generateDefaultMetadata();

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
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

const development = process.env.NODE_ENV === "development";

export default async function Page({ params: { slug } }: PageProps) {
  const exists = await existsSlug(slug);

  if (!exists) {
    notFound();
  }

  if (development) {
    _cachedArticles.delete(slug);
  }

  const article = await getArticle(slug);
  const headings = getHeadings(article.html);

  return (
    <BlogPage
      article={article}
      headings={headings}
    />
  );
}
