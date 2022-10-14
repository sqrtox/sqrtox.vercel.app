import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type FC, useCallback } from 'react';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { themeColorSlice } from '~/slices/theme-color';

const ThemeColorToggle: FC = () => {
  const themeColorState = useAppSelector(({ themeColor }) => themeColor);
  const { themeColor } = themeColorState;
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    const nextThemeColor = (
      themeColor === 'light' ? 'system' :
        themeColor === 'system' ? 'dark' :
          'light'
    );

    dispatch(themeColorSlice.actions.updateThemeColor(nextThemeColor));
  }, [themeColor, dispatch]);
  const nextThemeColorName = (
    themeColor === 'light' ? 'システム' :
      themeColor === 'system' ? 'ダーク' :
        'ライト'
  );

  return (
    <Tooltip title={`${nextThemeColorName}テーマに切り替える`}>
      <IconButton onClick={onClick}>
        {themeColor === 'light' && <Brightness4Icon color='secondary' />}
        {themeColor === 'system' && <DarkModeIcon color='secondary' />}
        {themeColor === 'dark' && <LightModeIcon color='secondary' />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeColorToggle;
