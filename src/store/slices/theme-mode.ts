import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'system' | 'dark';
type ThemeModeState = Readonly<{
  themeMode: ThemeMode
}>;

const initialThemeModeState: ThemeModeState = {
  themeMode: 'dark'
};

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: initialThemeModeState,
  reducers: {
    updateThemeMode: (state, { payload }: PayloadAction<ThemeMode>) => {
      state.themeMode = payload;
    }
  }
});

export {
  type ThemeMode,
  type ThemeModeState,
  initialThemeModeState,
  themeModeSlice
};
