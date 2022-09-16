import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type FC, useCallback } from 'react';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { updateThemeMode } from '~/store/slices/theme-mode';

const ThemeModeToggle: FC = () => {
  const themeModeState = useAppSelector(({ themeMode }) => themeMode);
  const { themeMode } = themeModeState;
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    const nextThemeMode = (
      themeMode === 'light' ? 'system' :
        themeMode === 'system' ? 'dark' :
          'light'
    );

    dispatch(updateThemeMode(nextThemeMode));
  }, [themeMode]);
  const nextThemeModeName = (
    themeMode === 'light' ? 'システム' :
      themeMode === 'system' ? 'ダーク' :
        'ライト'
  );

  return (
    <Tooltip title={`${nextThemeModeName}テーマに切り替える`}>
      <IconButton onClick={onClick}>
        {themeMode === 'light' && <Brightness4Icon color='secondary' />}
        {themeMode === 'system' && <DarkModeIcon color='secondary' />}
        {themeMode === 'dark' && <LightModeIcon color='secondary' />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeToggle;
