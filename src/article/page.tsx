import "remark-github-alerts/styles/github-colors-light.css";
import "remark-github-alerts/styles/github-colors-dark-class.css";
import "remark-github-alerts/styles/github-base.css";

import HistoryIcon from "@mui/icons-material/History";
import RefreshIcon from "@mui/icons-material/Refresh";
import TagIcon from "@mui/icons-material/Tag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { Article } from "#src/article/article";
import { formatDate } from "#src/date";
import Content from "./content";
import ArticleHistoryButton from "./history-button";

export interface ArticlePageProps {
  article: Article;
}

export default async function ArticlePage({ article }: ArticlePageProps) {
  const metadata = await article.getMetadata();
  const element = await article.element();
  const history = await article.history();
  const timestamp = await article.timestamp();

  return (
    <Stack spacing={3} width="100%">
      <Stack spacing={4}>
        <Stack direction="row" alignItems="center">
          <Typography component="h1" variant="h4">
            {metadata.title}
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            columnGap={4}
            rowGap={2}
            flexWrap="wrap"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
            >
              {timestamp.createdAt !== undefined && (
                <Tooltip title="作成日時">
                  <Chip
                    variant="outlined"
                    icon={<VisibilityIcon fontSize="small" />}
                    label={
                      <Typography
                        component="time"
                        dateTime={new Date(timestamp.createdAt).toISOString()}
                        fontSize="small"
                        color="textSecondary"
                      >
                        {formatDate(timestamp.createdAt)}
                      </Typography>
                    }
                  />
                </Tooltip>
              )}
              {timestamp.updatedAt !== undefined && (
                <Tooltip title="最終更新">
                  <Chip
                    variant="outlined"
                    icon={<RefreshIcon fontSize="small" />}
                    label={
                      <Typography
                        component="time"
                        dateTime={new Date(timestamp.updatedAt).toISOString()}
                        fontSize="small"
                        color="textSecondary"
                      >
                        {formatDate(timestamp.updatedAt)}
                      </Typography>
                    }
                  />
                </Tooltip>
              )}
            </Stack>
            <Box>
              <Chip
                icon={<HistoryIcon />}
                label="履歴"
                clickable
                component="a"
                // TODO: relは本当に正しい？綴りはあってる？
                // TODO: あとでリポジトリのリンク変えるかも
                href={`${article.base ? `/${article.base}` : ""}/${article.slug}/history`}
              />
            </Box>
          </Stack>
          {metadata.tags.length > 0 && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>タグ:</Typography>
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {metadata.tags
                  .slice()
                  .sort((a, b) => Intl.Collator().compare(a.id, b.id))
                  .map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.label}
                      icon={<TagIcon fontSize="small" />}
                    />
                  ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Divider />
      <Content>{element}</Content>
      <Box marginTop={10}>
        <ArticleHistoryButton
          slug={article.slug}
          base={article.base}
          history={history}
        />
      </Box>
    </Stack>
  );
}
