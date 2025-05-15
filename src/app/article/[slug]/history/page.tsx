import type { Metadata } from "next";
import NotFound from "#src/app/not-found";
import ArticleHistoryPage from "#src/article/history/page";
import { articleManager } from "#src/article/manager";
import type { UnsafeSlug } from "#src/article/slug";

export interface MetadataProps extends PageProps {}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleManager.article(slug);
  const metadata = await article.getMetadata();

  return {
    title: `\`${metadata.title}\` の更新履歴`,
    description: `\`${metadata.title}\` の更新履歴ページ。`,
    openGraph: {
      type: "article",
      url: `/article/${slug}/history`,
    },
  };
}

export interface PageParams {
  slug: UnsafeSlug;
}

export interface PageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return [...(await articleManager.slugs())].map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugs = [...(await articleManager.slugs())];

  if (!slugs.includes(slug)) NotFound();

  const article = articleManager.article(slug);

  return <ArticleHistoryPage article={article} />;
}
