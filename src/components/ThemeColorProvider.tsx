import { ThemeProvider, createTheme } from '@mui/material/styles';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { type ThemeColor, defaultThemeColor, isThemeColor, setThemeColorContext, themeColorContext } from '~/context/theme-color';
import { useComputedThemeColor } from '~/hooks/useComputedThemeColor';
// #!if DEVELOPMENT
import { useLogger } from '~/hooks/useLogger';
// #!endif

const PRIMARY_MAIN_COLOR = process.env.NEXT_PUBLIC_PRIMARY_MAIN_COLOR;

type ThemeColorProviderProps = Readonly<Partial<{
  children: ReactNode
}>>;

const ThemeColorProvider: FC<ThemeColorProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(defaultThemeColor);
  const computedThemeColor = useComputedThemeColor(themeColor);
  const theme = createTheme({
    palette: {
      mode: computedThemeColor,
      primary: {
        main: PRIMARY_MAIN_COLOR
      }
    }
  });

  useEffect(() => {
    const loadedThemeColor = localStorage.getItem('themeColor');

    if (!loadedThemeColor || !isThemeColor(loadedThemeColor)) {
      localStorage.setItem('themeColor', defaultThemeColor);
    }

    const themeColor = (
      isThemeColor(loadedThemeColor)
        ? loadedThemeColor
        : defaultThemeColor
    );

    setThemeColor(themeColor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // #!if DEVELOPMENT
  useLogger('themeColor', themeColor);
  // #!endif

  return (
    <ThemeProvider theme={theme}>
      <themeColorContext.Provider value={themeColor}>
        <setThemeColorContext.Provider value={setThemeColor}>
          {children}
        </setThemeColorContext.Provider>
      </themeColorContext.Provider>
    </ThemeProvider>
  );
};

export default ThemeColorProvider;
export { type ThemeColorProviderProps };
