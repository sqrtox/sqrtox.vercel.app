import { type Dispatch, type SetStateAction, createContext } from 'react';

type ComputedThemeColor = 'dark' | 'light';
type ThemeColor = ComputedThemeColor | 'system';

const isThemeColor = (value: unknown): value is ThemeColor => (
  value === 'system' ||
  value === 'light' ||
  value === 'dark'
);

const defaultThemeColor = 'dark';
const themeColorContext = createContext<ThemeColor>(defaultThemeColor);
const setThemeColorContext = createContext<Dispatch<SetStateAction<ThemeColor>>>(
  () => undefined
);

export {
  type ComputedThemeColor,
  type ThemeColor,
  defaultThemeColor,
  isThemeColor,
  setThemeColorContext,
  themeColorContext
};
