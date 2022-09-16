import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

type ThemeMode = 'dark' | 'light' | 'system';
type ThemeModeState = Readonly<{
  fulfilled: boolean,
  themeMode: ThemeMode
}>;

const initialThemeModeState: ThemeModeState = {
  fulfilled: false,
  themeMode: 'dark'
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
  extraReducers: builder => {
    builder.addCase(updateThemeMode.fulfilled, (state, { payload }) => ({
      ...state,
      themeMode: payload
    }));
    builder.addCase(initThemeMode.fulfilled, (state, { payload }) => ({
      ...state,
      fulfilled: true,
      themeMode: payload
    }));
  },
  initialState: initialThemeModeState,
  name: 'themeMode',
  reducers: {}
});

export {
  type ThemeMode,
  initThemeMode,
  initialThemeModeState,
  themeModeSlice,
  updateThemeMode
};
