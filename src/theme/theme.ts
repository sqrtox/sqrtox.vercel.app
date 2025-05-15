"use client";

import { blue, grey, lightBlue, orange, yellow } from "@mui/material/colors";
import { createTheme, emphasize } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import {
  dark,
  light,
} from "node_modules/@mui/material/esm/styles/createPalette";

declare module "@mui/material/styles" {
  interface SkyPalette {
    default: string;
    light: string;
  }

  interface PaletteOptions {
    sky: SkyPalette;
    wave: string;
  }

  interface Palette {
    sky: SkyPalette;
    wave: string;
  }

  interface TypeBackground {
    paperSecondary: string;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "var(--primaryFont)",
    fontSize: 15,
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "dark",
  colorSchemes: {
    dark: {
      palette: {
        background: {
          paperSecondary: emphasize(dark.background.default, 0.1),
        },
        sky: {
          default: blue[800],
          light: yellow[800],
        },
        wave: blue[500],
        primary: {
          main: lightBlue[400],
        },
      },
    },
    light: {
      palette: {
        background: {
          paper: grey[100],
          paperSecondary: emphasize(light.background.default, 0.1),
        },
        primary: {
          main: blue[600],
        },
        sky: {
          default: blue[300],
          light: orange[600],
        },
        wave: blue.A200,
      },
    },
  },
});
