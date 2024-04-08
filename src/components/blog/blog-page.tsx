"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import BlogTime from "@/components/blog/blog-time";
import TableOfContents from "@/components/blog/table-of-contents";
import TagChipList from "@/components/blog/tag-chip-list";
import { isExternalLink } from "@/utils/link";

import type { Article } from "@/utils/blog";
import type { Heading } from "@/utils/blog/html";

export type BlogPageProps = {
  article: Article,
  headings: Heading[]
};

const BlogContentContainer = styled(Stack)(({ theme }) => ({
  gap: "1rem",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse"
  }
}));

const BlogContent = styled(Box)({
  flex: 1,
  ".budoux-breaked": {
    wordBreak: "keep-all"
  },
  "h1, h2, h3, h4, h5, h6": {
    marginTop: "3rem",
    "::before": {
      color: "var(--mui-palette-primary-main)",
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
});

const TableOfContentsContainer = styled(Paper)(({ theme }) => ({
  position: "sticky",
  top: "5rem",
  [theme.breakpoints.up("md")]: {
    border: "none"
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.5rem"
  }
}));

export default function BlogPage({ article, headings }: BlogPageProps) {
  const router = useRouter();

  useEffect(() => {
    const navigate = (event: Event): void => {
      if (!(event.target instanceof HTMLAnchorElement)) {
        return;
      }

      if (isExternalLink(event.target.href)) {
        return;
      }

      event.preventDefault();
      router.push(event.target.href);
    };
    const controller = new AbortController();

    for (const element of document.querySelectorAll(".markdown-link")) {
      element.addEventListener("click", navigate, {
        signal: controller.signal
      });
    }

    return () => {
      controller.abort();
    };
  }, [router]);

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h5">{article.title}</Typography>
      <BlogTime
        label
        publishedTimestamp={article.publishedTimestamp}
        modifiedTimestamp={article.modifiedTimestamp}
      />
      {article.tags && <TagChipList tags={article.tags} />}
      <Divider />
      <BlogContentContainer>
        <BlogContent
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: article.html
          }}
        />
        {headings.length > 0 && (
          <Box>
            <TableOfContentsContainer variant="outlined">
              <TableOfContents headings={headings} />
            </TableOfContentsContainer>
          </Box>
        )}
      </BlogContentContainer>
    </Stack>
  );
}
