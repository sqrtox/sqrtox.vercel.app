import useMediaQuery from '@mui/material/useMediaQuery';
import { type ComputedThemeColor, type ThemeColor } from '~/context/theme-color';

const useComputedThemeColor = (themeColor: ThemeColor): ComputedThemeColor => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = (themeColor === 'system' && prefersDark) || themeColor === 'dark';
  const computed = isDark ? 'dark' : 'light';

  return computed;
};

export { useComputedThemeColor };
