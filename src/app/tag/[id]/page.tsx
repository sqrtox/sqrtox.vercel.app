import ArticleCardList from "@/components/article-card-list";
import type { TagId } from "@/utils/blog";
import { getAllArticles, getTag } from "@/utils/blog";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { existsTag } from "@/utils/blog/tag";
import { notFoundMetadata } from "@/utils/not-found";
import { notFound } from "next/navigation";

export type PageParams = {
  id: TagId
};

export type PageProps = {
  params: PageParams
};

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  const exists = await existsTag(id);

  if (!exists) {
    return notFoundMetadata;
  }

  const tag = await getTag(id);
  const title = `${tag.displayName}のタグがついた記事一覧`;
  const description = `${tag.displayName}のタグがついた記事一覧です。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
};

export default async function Page({ params: { id } }: PageProps) {
  const exists = await existsTag(id);

  if (!exists) {
    notFound();
  }

  const tag = await getTag(id);
  const articles = await getAllArticles();
  const filteredArticles = articles
    .filter(article => article.tags.some(tag => tag.id === id));

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h5">{tag.displayName}のタグがついた記事一覧</Typography>
      <Typography>{tag.displayName}のタグがついた記事は{filteredArticles.length}ページあります。</Typography>
      <ArticleCardList articles={filteredArticles} />
    </Stack>
  );
}
