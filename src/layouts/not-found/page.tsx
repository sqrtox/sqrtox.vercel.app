"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useCallback, useEffect, useState } from "react";
import DelButton from "#src/layouts/not-found/del";
import NekoButton from "#src/layouts/not-found/neko";
import { SlButton } from "#src/layouts/not-found/sl";
import styles from "./page.module.scss";

const SECRET_BUTTONS = [DelButton, NekoButton, SlButton];

export default function NotFoundPage() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement>();
  const [secretButton, setSecretButton] = useState<number>();
  const reroll = useCallback((): void => {
    setSecretButton(Math.floor(Math.random() * SECRET_BUTTONS.length));
  }, []);

  useEffect(() => {
    reroll();
  }, [reroll]);

  const SecretButton =
    secretButton !== undefined && SECRET_BUTTONS[secretButton];
  const button = SecretButton && containerEl && (
    <SecretButton containerEl={containerEl} />
  );

  return (
    <Stack
      overflow="visible"
      alignItems="center"
      justifyContent="center"
      width="100%"
      position="relative"
      ref={(elem) => {
        if (!elem) return;

        setContainerEl(elem);
      }}
    >
      <Paper variant="outlined" className={styles.paper}>
        <Stack spacing={3} padding={5}>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <SearchOffIcon fontSize="inherit" />
              <span>404:</span>
              <span>Not Found</span>
            </Typography>
          </Box>
          <Stack spacing={2}>
            <Box>
              <Typography>
                ページが見つかりませんでした。🍝コードの海に溺れてしまったようです
              </Typography>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              minHeight="2rem"
            >
              <MuiLink
                component={NextLink}
                href="/"
                display="flex"
                alignItems="center"
                fontSize="large"
              >
                <ChevronLeftIcon />
                ホームに戻る
              </MuiLink>
              {button && (
                <Fade in>
                  <Box>{button}</Box>
                </Fade>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
