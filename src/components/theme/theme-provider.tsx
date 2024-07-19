"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { grey, orange, pink } from "@mui/material/colors";
import {
  Experimental_CssVarsProvider as CssVariablesProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

import { primaryFont } from "@/utils/font";

import type { ReactNode } from "react";

export type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = extendTheme({
    typography: primaryFont.style,
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: pink[300],
          },
          secondary: {
            main: orange[800],
          },
        },
      },
      dark: {
        palette: {
          text: {
            primary: grey[200],
          },
          primary: {
            main: pink[200],
          },
          secondary: {
            main: orange[900],
          },
        },
      },
    },
  });

  return (
    <CssVariablesProvider defaultMode="dark" theme={theme}>
      <CssBaseline />
      {children}
    </CssVariablesProvider>
  );
}
