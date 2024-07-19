"use client";

import type { SvgIconComponent } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DevicesIcon from "@mui/icons-material/Devices";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import { orange, yellow } from "@mui/material/colors";
import { useColorScheme } from "@mui/material/styles";
import {
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useState,
} from "react";

type Mode = "light" | "dark" | "system";

const modeToIcon = (mode: Mode): SvgIconComponent => {
  switch (mode) {
    case "light":
      return LightModeIcon;
    case "dark":
      return DarkModeIcon;
    case "system":
      return DevicesIcon;
  }
};

const colorSchemeToHtmlColor = (mode: Exclude<Mode, "system">): string => {
  switch (mode) {
    case "light":
      return orange[900];
    case "dark":
      return yellow[800];
  }
};

const modeToLabel = (mode: Mode): string => {
  switch (mode) {
    case "light":
      return "ライト";
    case "dark":
      return "ダーク";
    case "system":
      return "システム";
  }
};

export default function ThemeSelect(): ReactNode {
  const { mode: currentMode, colorScheme, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (currentMode === undefined || colorScheme === undefined || !hydrated) {
    return <Box width={40} height={40} />;
  }

  const open = anchorEl !== undefined;
  const Icon = modeToIcon(colorScheme);
  const htmlColor = colorSchemeToHtmlColor(colorScheme);
  const handlePopperOpen: MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopperClose = (): void => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Tooltip title="テーマを切り替え">
        <IconButton onClick={handlePopperOpen}>
          <Icon htmlColor={htmlColor} />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handlePopperClose}>
            <MenuList>
              {(["light", "dark", "system"] as const).map((mode) => {
                const selected = mode === currentMode;
                const Icon = modeToIcon(mode);
                const colorProps =
                  mode === "system"
                    ? ({
                        color: selected ? "secondary" : undefined,
                      } as const)
                    : ({
                        htmlColor: selected
                          ? colorSchemeToHtmlColor(mode)
                          : undefined,
                      } as const);
                const label = modeToLabel(mode);
                const handleClick = (): void => {
                  setMode(mode);
                };

                return (
                  <MenuItem
                    key={mode}
                    selected={selected}
                    onClick={handleClick}
                  >
                    <ListItemIcon>
                      <Icon {...colorProps} />
                    </ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                  </MenuItem>
                );
              })}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
