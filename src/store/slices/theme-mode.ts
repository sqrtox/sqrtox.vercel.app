import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

type ThemeMode = 'dark' | 'light' | 'system';
type ThemeModeState = Readonly<{
  themeMode: ThemeMode,
  fulfilled: boolean
}>;

const initialThemeModeState: ThemeModeState = {
  themeMode: 'dark',
  fulfilled: false
};

const updateThemeMode = createAsyncThunk<ThemeMode, ThemeMode>('themeMode/updateThemeMode', async themeMode => {
  await localforage.setItem<ThemeMode>('themeMode/themeMode', themeMode);

  return themeMode;
});

const initThemeMode = createAsyncThunk('themeMode/initThemeMode', async () => {
  const themeMode = (
    await localforage.getItem<ThemeMode>('themeMode/themeMode') ??
    await localforage.setItem<ThemeMode>('themeMode/themeMode', initialThemeModeState.themeMode)
  );

  return themeMode;
});

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: initialThemeModeState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateThemeMode.fulfilled, (state, { payload }) => ({
      ...state,
      themeMode: payload
    }));
    builder.addCase(initThemeMode.fulfilled, (state, { payload }) => ({
      ...state,
      themeMode: payload,
      fulfilled: true
    }));
  }
});

export {
  type ThemeMode,
  initThemeMode,
  initialThemeModeState,
  themeModeSlice,
  updateThemeMode
};
