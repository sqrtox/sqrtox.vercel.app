"use client";

import type { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVariablesProvider } from "@mui/material/styles";
import { orange, pink, grey } from "@mui/material/colors";

export type ThemeProviderProps = {
  children: ReactNode
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = extendTheme({
    typography: {
      fontFamily: ["Noto Sans JP", "Helvetica", "Arial", "sans-serif"].join(",")
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: pink[300]
          },
          secondary: {
            main: orange[800]
          }
        }
      },
      dark: {
        palette: {
          text: {
            primary: grey[200]
          },
          primary: {
            main: pink[200]
          },
          secondary: {
            main: orange[900]
          }
        }
      }
    }
  });

  return (
    <CssVariablesProvider defaultMode="dark" theme={theme}>
      <CssBaseline />
      {children}
    </CssVariablesProvider>
  );
}
