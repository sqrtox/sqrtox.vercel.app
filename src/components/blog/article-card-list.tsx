import Grid from "@mui/material/Unstable_Grid2";

import ArticleCard from "@/components/blog/article-card";

import type { Article } from "@/utils/blog";

export type ArticleCardListProps = {
  articles: Article[];
};

export default function ArticleCardList({ articles }: ArticleCardListProps) {
  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid xs={12} sm={6} key={article.slug}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
