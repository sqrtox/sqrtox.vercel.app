import pkg from "@/../package.json" with { type: "json" };
import { LogoPart } from "@/components/layout/logo-part";
import ThemeSelect from "@/components/theme/theme-select";
import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import NextLink from "next/link";
import type { ReactNode } from "react";

export default function Header(): ReactNode {
  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        paddingY: 1,
        backgroundColor: "background.default",
        background:
          "linear-gradient(var(--mui-palette-background-default) 90%, color-mix(in srgb, var(--mui-palette-background-default), transparent 100%))",
      }}
    >
      <Toolbar disableGutters variant="dense">
        <Container>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <MuiLink component={NextLink} href="/" underline="none">
              <Stack component="span" direction="row">
                <LogoPart>sqrtox</LogoPart>
                <LogoPart accent>&apos;</LogoPart>
                <LogoPart>s</LogoPart>
                <LogoPart accent>&nbsp;Blog</LogoPart>
              </Stack>
            </MuiLink>
            <Stack direction="row" spacing={1}>
              <ThemeSelect />
              <Tooltip title="リポジトリへ">
                <IconButton
                  target="_blank"
                  rel="noopener  noreferrer"
                  LinkComponent="a"
                  href={pkg.repository.url.replaceAll(/^git\+|\.git$/g, "")}
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
