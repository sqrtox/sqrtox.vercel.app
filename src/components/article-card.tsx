import type { Article } from "@/utils/blog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TagChipList from "@/components/tag-chip-list";
import Link from "next/link";
import BlogTime from "@/components/blog-time";
import { summarize } from "@/utils/summarize";

export type ArticleCardProps = {
  article: Article
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const shortDescription = summarize(article.html, { maxLength: 50 });

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
      component="article"
    >
      <CardActionArea
        sx={{ flex: 1 }}
        LinkComponent={Link}
        href={`/article/${article.slug}`}
      >
        <CardContent>
          <BlogTime {...article} />
          <Typography component="h1" variant="h6">{article.title}</Typography>
          <Typography color="text.secondary">
            {shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      {article.tags && (
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TagChipList tags={article.tags} />
        </CardActions>
      )}
    </Card>
  );
}
