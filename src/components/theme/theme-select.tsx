"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MonitorIcon from "@mui/icons-material/Monitor";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Skeleton from "@mui/material/Skeleton";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";

import { useMounted } from "@/hooks/mount";

import type { MouseEvent } from "react";

export default function ThemeSelect() {
  const { mode, setMode } = useColorScheme();
  const [anchorElement, setAnchorElement] = useState<HTMLElement>();
  const open = Boolean(anchorElement);
  const themes = [
    {
      id: "light",
      label: "ライト",
      Icon: LightModeIcon
    },
    {
      id: "dark",
      label: "ダーク",
      Icon: DarkModeIcon
    },
    {
      id: "system",
      label: "システム",
      Icon: MonitorIcon
    }
  ] as const;
  const theme = themes.find(theme => theme.id === mode);
  const mounted = useMounted();

  if (!mounted || !theme) {
    return (
      <Skeleton
        variant="circular"
        width={40}
        height={40}
      />
    );
  }

  const closePopper = () => {
    setAnchorElement(undefined);
  };

  const togglePopper = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    if (open) {
      closePopper();
    } else {
      setAnchorElement(event.currentTarget);
    }
  };

  return (
    <>
      <IconButton
        onClick={togglePopper}
        aria-label="テーマ変更"
      >
        {<theme.Icon color="primary" />}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorElement}
        placement="bottom-start"
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={closePopper}>
            <MenuList>
              {themes.map(({ id, label, Icon }) => {
                const changeTheme = () => {
                  setMode(id);
                };
                const selected = id === mode;

                return (
                  <MenuItem
                    key={id}
                    selected={selected}
                    onClick={changeTheme}
                  >
                    <ListItemIcon>
                      <Icon color={selected ? "primary" : "action"} />
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
