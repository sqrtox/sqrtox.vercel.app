import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import styles from "#src/layouts/common/header.module.scss";
import Logo from "#src/layouts/common/logo";
import ThemeSwitch from "#src/theme/theme-switch";

export default function Header() {
  return (
    <AppBar
      elevation={0}
      color="inherit"
      position="sticky"
      className={styles.appBar}
    >
      <Toolbar disableGutters variant="dense">
        <Stack
          width="100%"
          paddingY={1}
          spacing={1}
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Logo />
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <ThemeSwitch />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
