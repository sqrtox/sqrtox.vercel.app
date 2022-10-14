import { type PaletteMode } from '@mui/material';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type ComputedThemeColor = PaletteMode;
type ThemeColor = ComputedThemeColor | 'system';
type ThemeColorState = Readonly<{
  themeColor: ThemeColor
}>;

const isThemeColor = (value: unknown): value is ThemeColor => (
  value === 'system' ||
  value === 'light' ||
  value === 'dark'
);

const initialThemeColorState: ThemeColorState = {
  themeColor: 'dark'
};

const themeColorSlice = createSlice({
  initialState: initialThemeColorState,
  name: 'themeColor',
  reducers: {
    updateThemeColor: (state, { payload }: PayloadAction<ThemeColor>) => {
      state.themeColor = payload;
    }
  }
});

export {
  type ComputedThemeColor,
  type ThemeColor,
  type ThemeColorState,
  initialThemeColorState,
  isThemeColor,
  themeColorSlice
};
