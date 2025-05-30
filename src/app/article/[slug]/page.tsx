import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleManager } from "#src/article/manager";
import ArticlePage from "#src/article/page";
import type { UnsafeSlug } from "#src/article/slug";

export interface MetadataProps {
  params: Promise<PageParams>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleManager.article(slug);
  const metadata = await article.getMetadata();

  return {
    title: metadata.title,
    openGraph: {
      url: `/article/${slug}`,
    },
  };
}

export interface PageParams {
  slug: UnsafeSlug;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return [...(await articleManager.slugs())].map((slug) => ({ slug }));
}

export interface PageProps {
  params: Promise<PageParams>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugs = [...(await articleManager.slugs())];

  if (!slugs.includes(slug)) notFound();

  const article = articleManager.article(slug);

  return <ArticlePage article={article} />;
}
