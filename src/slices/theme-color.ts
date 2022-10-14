import { type PaletteMode } from '@mui/material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

type ComputedThemeColor = PaletteMode;
type ThemeColor = ComputedThemeColor | 'system';
type ThemeColorState = Readonly<{
  themeColor: ThemeColor
}>;

const initialThemeColorState: ThemeColorState = {
  themeColor: 'dark'
};

const themeColorThunks = {
  loadThemeColor: createAsyncThunk('themeColor/loadThemeColor', async () => {
    const themeColor: ThemeColor = (
      await localforage.getItem<ThemeColor>('themeColor/themeColor') ??
      await localforage.setItem<ThemeColor>('themeColor/themeColor', initialThemeColorState.themeColor)
    );

    return themeColor;
  }),
  updateThemeColor: createAsyncThunk<ThemeColor, ThemeColor>('themeColor/updateThemeColor', async themeColor => (
    await localforage.setItem<ThemeColor>('themeColor/themeColor', themeColor)
  ))
} as const;

const themeColorSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(themeColorThunks.updateThemeColor.fulfilled, (state, { payload }) => ({
      ...state,
      themeColor: payload
    }));
    builder.addCase(themeColorThunks.loadThemeColor.fulfilled, (state, { payload }) => ({
      ...state,
      themeColor: payload
    }));
  },
  initialState: initialThemeColorState,
  name: 'themeColor',
  reducers: {}
});

export {
  type ComputedThemeColor,
  type ThemeColor,
  type ThemeColorState,
  initialThemeColorState,
  themeColorSlice,
  themeColorThunks
};
