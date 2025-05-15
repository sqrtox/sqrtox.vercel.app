import { TZDate } from "@date-fns/tz";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import NextLink from "next/link";
import styles from "#src/app/page.module.scss";
import type { ArticleMetadata } from "#src/article/article";
import { articleManager } from "#src/article/manager";
import type { SafeSlug } from "#src/article/slug";
import { formatDate } from "#src/date";

export const metadata = {
  openGraph: {
    type: "website",
    url: "/",
  },
};

interface TimestampedArticleData {
  metadata: ArticleMetadata;
  timestamp: {
    createdAt: number;
    updatedAt?: number;
  };
  slug: SafeSlug;
}

export default async function Page() {
  const articles = await Promise.all(
    [...(await articleManager.articles())].map(async (article) => ({
      metadata: await article.getMetadata(),
      timestamp: await article.timestamp(),
      slug: article.slug,
    })),
  );
  const timestampedArticles = articles
    .filter(
      (article): article is TimestampedArticleData =>
        article.timestamp.createdAt !== undefined,
    )
    .sort(
      (a, b) =>
        (b.timestamp.createdAt as number) - (a.timestamp.createdAt as number),
    )
    .reduce((acc, x) => {
      const date = new TZDate(x.timestamp.createdAt, "Asia/Tokyo");
      const year = date.getFullYear();
      let articles = acc.get(year);

      if (!articles) {
        articles = [];
        acc.set(year, articles);
      }

      articles.push(x);

      return acc;
    }, new Map<number, TimestampedArticleData[]>());
  const noTimestampArticles = articles.filter(
    (article) => article.timestamp.createdAt === undefined,
  );

  return (
    <Stack spacing={5} alignItems="flex-start">
      <Stack direction="row" alignItems="flex-end" spacing={1} flexWrap="wrap">
        <Typography component="h1" variant="h4" className={styles.title}>
          備忘録的な
          <wbr />
          技術ブログ
        </Typography>
        <Typography color="textSecondary">
          技術を中心にいろいろかきます📝
        </Typography>
      </Stack>
      <Button
        startIcon={<EmojiPeopleRoundedIcon />}
        endIcon={<ArrowRightAltRoundedIcon />}
        variant="outlined"
        href="/about"
        LinkComponent={NextLink}
      >
        About me
      </Button>
      <Stack alignItems="flex-start" component="section">
        <Typography component="h2" variant="h6">
          記事
        </Typography>
        <Box>
          <Timeline className={styles.timeline}>
            {[...timestampedArticles].map(([year, articles]) => (
              <TimelineItem key={year}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Stack alignItems="flex-start">
                    <Badge badgeContent={articles.length} color="primary">
                      <Typography>{year}年</Typography>
                    </Badge>
                    <Timeline className={styles.timeline}>
                      {articles.map((article, i, arr) => {
                        const createdAt = new Date(article.timestamp.createdAt);

                        return (
                          <TimelineItem key={article.slug}>
                            <TimelineSeparator>
                              <TimelineDot />
                              {i + 1 < arr.length && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                              <Stack alignItems="flex-start">
                                <MuiLink
                                  fontWeight="500"
                                  fontSize="large"
                                  component={NextLink}
                                  href={`/article/${encodeURIComponent(article.slug)}`}
                                >
                                  {article.metadata.title}
                                </MuiLink>
                                <Typography
                                  color="textSecondary"
                                  component="time"
                                  dateTime={createdAt.toISOString()}
                                >
                                  {formatDate(createdAt)}
                                </Typography>
                              </Stack>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                    </Timeline>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            ))}
            {noTimestampArticles.length > 0 && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Stack alignItems="flex-start" spacing={2}>
                    <Typography>公開年不明</Typography>
                    <Stack
                      alignItems="flex-start"
                      spacing={1}
                      paddingBottom={4}
                    >
                      {noTimestampArticles.map((article) => (
                        <MuiLink
                          key={article.slug}
                          fontWeight="500"
                          fontSize="large"
                          component={NextLink}
                          href={`/article/${encodeURIComponent(article.slug)}`}
                        >
                          {article.metadata.title}
                        </MuiLink>
                      ))}
                    </Stack>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            )}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack alignItems="flex-start">
                  <MoreHorizIcon />
                </Stack>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <Stack alignItems="flex-start">
                  <MuiLink
                    href="https://github.com/sqrtox/sqrtox.vercel.app/commit/a8a3e623f4b5a035ff8845c2bda4cfaec5f1077e"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography fontSize="1.25rem" component="span">
                      💥🌌
                    </Typography>
                  </MuiLink>
                  <Typography color="textSecondary" fontStyle="italic">
                    {new Intl.NumberFormat("en").format(138.2 * 100_000_000)}{" "}
                    years ago
                  </Typography>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </Stack>
    </Stack>
  );
}
