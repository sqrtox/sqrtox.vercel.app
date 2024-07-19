"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import type { Heading } from "@/utils/blog/html";

export type TableOfContentsProps = {
  headings: Heading[];
};

const TableOfContentsInner = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  width: "15rem",
  padding: 0,
  margin: 0,
  listStyle: "none",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [intersectedId, setIntersectedId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (records) => {
        const record = records.at(-1);

        if (!record) {
          return;
        }

        if (!record.isIntersecting) {
          return;
        }

        if (!(record.target instanceof HTMLHeadingElement)) {
          return;
        }

        setIntersectedId(record.target.id);
      },
      {
        rootMargin: "0% 0px -80% 0px",
        threshold: 1,
      },
    );

    for (const heading of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
      observer.observe(heading);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h6" component="span">
        目次
      </Typography>
      <TableOfContentsInner>
        {headings.map((heading, index) => (
          <Box component="li" key={`${heading.id}_${index}`}>
            <Link
              underline="hover"
              color={
                intersectedId === heading.id ? "text.primary" : "text.secondary"
              }
              sx={{
                ":hover": {
                  color: "text.primary",
                },
              }}
              display="block"
              // Minimum level is h2, so subtract 2
              paddingLeft={2 * (heading.level - 2)}
              width="100%"
              href={`#${encodeURIComponent(heading.id)}`}
            >
              {heading.textContent}
            </Link>
          </Box>
        ))}
      </TableOfContentsInner>
    </Stack>
  );
}
