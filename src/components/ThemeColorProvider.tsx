import { ThemeProvider, createTheme } from '@mui/material/styles';
import { type FC, type ReactNode, useEffect } from 'react';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useComputedThemeColor } from '~/hooks/useComputedThemeColor';
import { themeColorThunks } from '~/slices/theme-color';

const PRIMARY_MAIN_COLOR = process.env.NEXT_PUBLIC_PRIMARY_MAIN_COLOR;

type ThemeColorProviderProps = Readonly<Partial<{
  children: ReactNode
}>>;

const ThemeColorProvider: FC<ThemeColorProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const computedThemeColor = useComputedThemeColor();
  const theme = createTheme({
    palette: {
      mode: computedThemeColor,
      primary: {
        main: PRIMARY_MAIN_COLOR
      }
    }
  });

  useEffect(() => {
    dispatch(themeColorThunks.loadThemeColor());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeColorProvider;
export { type ThemeColorProviderProps };
