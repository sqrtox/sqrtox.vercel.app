"use client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";

const Flow = styled(Stack)(({ theme }) => ({
  gap: "1rem",
  flexDirection: "row",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));

const MessageContainer = styled(Stack)(({ theme }) => ({
  gap: 1,
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    alignItems: "center"
  }
}));

export default function NotFound() {
  return (
    <Stack
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Flow>
        <Typography component="h1" variant="h1">404</Typography>
        <MessageContainer>
          <Typography component="span" fontSize="large">ページが見つかりませんでした</Typography>
          <MuiLink
            component={NextLink}
            href="/"
          >
            ホームに戻る
          </MuiLink>
        </MessageContainer>
      </Flow>
    </Stack>
  );
}
