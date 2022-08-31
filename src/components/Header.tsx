import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { forwardRef } from 'react';
import HeaderLogo from '~/components/HeaderLogo';
import Spacer from '~/components/Spacer';
import ThemeModeToggle from '~/components/ThemeModeToggle';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const Header = forwardRef<HTMLDivElement>(function Header(_props, ref) {
  return (
    <>
      <AppBar
        ref={ref}
        elevation={0}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Toolbar>
          <Spacer>
            <Stack direction='row'>
              <HeaderLogo />
              <ThemeModeToggle />
            </Stack>
          </Spacer>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default Header;
