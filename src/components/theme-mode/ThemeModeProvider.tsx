import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC, type ReactNode, useEffect } from 'react';
import Loading from '~/components/common/Loading';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { initThemeMode } from '~/store/slices/theme-mode';

const PRIMARY_MAIN_COLOR = process.env.NEXT_PUBLIC_PRIMARY_MAIN_COLOR;

type ThemeModeProviderProps = Readonly<Partial<{
  children: ReactNode
}>>;

const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { themeMode, fulfilled } = useAppSelector(({ themeMode }) => themeMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = (themeMode === 'system' && prefersDarkMode) || themeMode === 'dark';
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: PRIMARY_MAIN_COLOR
      }
    }
  });

  useEffect(() => {
    dispatch(initThemeMode());
  }, []);

  return (
    <>
      {!fulfilled && <Loading />}
      {fulfilled && (
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      )}
    </>
  );
};

export default ThemeModeProvider;
export { type ThemeModeProviderProps };
