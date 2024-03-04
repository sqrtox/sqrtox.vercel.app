"use client";

import type { Article } from "@/utils/blog";
import type { Heading } from "@/utils/blog/html";
import TableOfContents from "@/components/table-of-contents";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import BlogTime from "@/components/blog-time";
import TagChipList from "@/components/tag-chip-list";

export type BlogPageProps = {
  article: Article,
  headings: Heading[]
};

const BlogPageContainer = styled(Stack)(({ theme }) => ({
  gap: "1rem",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse"
  }
}));

export default function BlogPage({ article, headings }: BlogPageProps) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const toc = (
    <TableOfContents headings={headings} />
  );

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h5">{article.title}</Typography>
      <BlogTime
        label
        publishedTimestamp={article.publishedTimestamp}
        modifiedTimestamp={article.modifiedTimestamp}
      />
      <TagChipList tags={article.tags} />
      <Divider />
      <BlogPageContainer>
        <Box
          sx={{
            ".heading-anchor": {
              verticalAlign: "middle",
              color: "var(--mui-palette-text-secondary)",
              visibility: "hidden",
              fontSize: "1rem",
              marginLeft: "0.3rem"
            },
            "h1, h2, h3, h4, h5, h6": {
              ":hover .heading-anchor": {
                visibility: "visible"
              },
              "::before": {
                color: "primary.main",
                marginRight: "0.25rem"
              }
            },
            "h1::before": {
              content: "'^_^'"
            },
            "h2::before": {
              content: "'#'"
            },
            "h3::before": {
              content: "'##'"
            },
            "h4::before": {
              content: "'###'"
            },
            "h5::before": {
              content: "'####'"
            },
            "h6::before": {
              content: "'#####'"
            }
          }}
          dangerouslySetInnerHTML={{
            __html: article.html
          }}
        />
        <Box>
          {largeScreen && toc}
          {!largeScreen && (
            <Paper
              sx={{ padding: 1 }}
              variant="outlined"
            >
              {toc}
            </Paper>
          )}
        </Box>
      </BlogPageContainer>
    </Stack>
  );
}
