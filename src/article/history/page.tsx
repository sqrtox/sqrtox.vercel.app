import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Article } from "../article";
import ArticleHistoryList from "./history-list";
import styles from "./page.module.scss";

export interface ArticleHistoryPageProps {
  article: Article;
}

export default async function ArticleHistoryPage({
  article,
}: ArticleHistoryPageProps) {
  const history = await article.history();

  return (
    <Stack alignItems="flex-start" spacing={3} width="100%">
      <Typography component="h1" variant="h5">
        記事の履歴
      </Typography>
      <MuiLink
        href={`${article.base ? `/${article.base}` : ""}/${article.slug}`}
        display="inline-flex"
        alignItems="center"
      >
        <ChevronLeftIcon />
        <span>記事に戻る</span>
      </MuiLink>
      <Card variant="outlined" className={styles.card}>
        <CardContent>
          <ArticleHistoryList history={history} />
        </CardContent>
      </Card>
    </Stack>
  );
}
