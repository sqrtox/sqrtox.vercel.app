import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import { LogoPart } from "@/components/layout/logo-part";
import ThemeSelect from "@/components/theme/theme-select";

export default function Header() {
  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        paddingY: 1,
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)"
      }}
    >
      <Toolbar
        disableGutters
        variant="dense"
      >
        <Container>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <MuiLink
              component={NextLink}
              href="/"
              underline="none"
            >
              <Stack
                component="span"
                direction="row"
              >
                <LogoPart>sqrtox</LogoPart>
                <LogoPart accent>&apos;</LogoPart>
                <LogoPart>s</LogoPart>
                <LogoPart accent>&nbsp;Blog</LogoPart>
              </Stack>
            </MuiLink>
            <ThemeSelect />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
