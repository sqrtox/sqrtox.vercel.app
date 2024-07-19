"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { blue, grey, indigo, orange, pink } from "@mui/material/colors";
import {
  Experimental_CssVarsProvider as CssVariablesProvider,
  alpha,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

import { primaryFont } from "@/utils/font";

import type { ReactNode } from "react";

export type ThemeProviderProps = {
  children: ReactNode;
};

declare module "@mui/material/styles" {
  interface PaletteOptions {
    link: string;
  }

  interface Palette {
    link: string;
  }
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = extendTheme({
    typography: {
      ...primaryFont.style,
      fontSize: 16,
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            textDecorationColor: alpha(theme.palette.link, 0.4),
            color: theme.vars.palette.link,
          }),
        },
      },
    },
    colorSchemes: {
      light: {
        palette: {
          link: indigo.A400,
          primary: {
            main: pink[300],
          },
          secondary: {
            main: orange[800],
          },
          background: {
            paper: grey[50],
          },
        },
      },
      dark: {
        palette: {
          link: blue[300],
          text: {
            primary: grey[200],
          },
          primary: {
            main: pink[200],
          },
          secondary: {
            main: orange[900],
          },
          background: {
            default: grey[900],
            paper: grey[800],
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
