import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import localforage from 'localforage';
import { type FC, type ReactNode, useEffect } from 'react';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { type ThemeMode, initialThemeModeState, themeModeSlice } from '~/store/slices/theme-mode';

type ThemeModeProviderProps = Readonly<{
  children?: ReactNode
}>;

const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const { themeMode } = useAppSelector(({ themeMode }) => themeMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      const itemKey = `${themeModeSlice.name}/themeMode`;
      const themeMode = (
        await localforage.getItem<ThemeMode>(itemKey) ??
        await localforage.setItem<ThemeMode>(itemKey, initialThemeModeState.themeMode)
      );

      dispatch(themeModeSlice.actions.updateThemeMode(themeMode));
    })();
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = (themeMode === 'system' && prefersDarkMode) || themeMode === 'dark';
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#29b9f6'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeModeProvider;
export { type ThemeModeProviderProps };
