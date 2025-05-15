"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Switch from "@mui/material/Switch";
import { useColorScheme, useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { classes } from "#src/classes";
import ThemeSwitchThumb from "#src/theme/theme-switch-thumb";
import styles from "./theme-switch.module.scss";

export default function ThemeSwitch(): ReactNode {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isNotInitialized = colorScheme === undefined;
  const theme = useTheme();

  return (
    <Switch
      slotProps={{
        input: {
          "aria-label": "change theme",
        },
      }}
      disabled={isNotInitialized}
      checked={isNotInitialized || colorScheme === "dark"}
      onChange={(_event, checked) => {
        setColorScheme(checked ? "dark" : "light");
      }}
      className={classes(
        isNotInitialized && styles.switchHidden,
        styles.switch,
      )}
      disableRipple
      icon={
        <ThemeSwitchThumb bgcolor={theme.vars.palette.sky.default}>
          <LightModeIcon
            fontSize="small"
            htmlColor={theme.vars.palette.sky.light}
          />
        </ThemeSwitchThumb>
      }
      checkedIcon={
        <ThemeSwitchThumb bgcolor={theme.vars.palette.sky.default}>
          <DarkModeIcon
            fontSize="small"
            htmlColor={theme.vars.palette.sky.light}
          />
        </ThemeSwitchThumb>
      }
    />
  );
}
