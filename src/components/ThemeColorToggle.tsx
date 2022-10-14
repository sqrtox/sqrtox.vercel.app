import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type FC, useCallback, useContext } from 'react';
import { setThemeColorContext, themeColorContext } from '~/context/theme-color';

const ThemeColorToggle: FC = () => {
  const themeColor = useContext(themeColorContext);
  const setThemeColor = useContext(setThemeColorContext);
  const onClick = useCallback(() => {
    const nextThemeColor = (
      themeColor === 'light' ? 'system' :
        themeColor === 'system' ? 'dark' :
          'light'
    );

    setThemeColor(nextThemeColor);
    localStorage.setItem('themeColor', nextThemeColor);
  }, [themeColor, setThemeColor]);
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
