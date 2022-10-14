import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppSelector } from '~/hooks/useAppSelector';
import { type ComputedThemeColor } from '~/slices/theme-color';

const useComputedThemeColor = (): ComputedThemeColor => {
  const { themeColor } = useAppSelector(({ themeColor }) => themeColor);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = (themeColor === 'system' && prefersDark) || themeColor === 'dark';
  const computed = isDark ? 'dark' : 'light';

  return computed;
};

export { useComputedThemeColor };
