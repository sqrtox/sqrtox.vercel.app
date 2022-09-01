import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NextLink from 'next/link';
import { type FC, type MouseEvent, useState } from 'react';

const HeaderNavMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>();
  const open = typeof anchorEl !== 'undefined';
  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => setAnchorEl(undefined);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem sx={{ padding: '0' }}>
          <NextLink passHref href='/blog/'>
            <MuiLink
              width='100%'
              color='text.primary'
              underline='none'
              paddingX='1rem'
              paddingY='0.375rem'
            >
              ブログ
            </MuiLink>
          </NextLink>
        </MenuItem>
        <MenuItem sx={{ padding: '0' }}>
          <NextLink passHref href='/legal/privacy-policy/'>
            <MuiLink
              width='100%'
              color='text.primary'
              underline='none'
              paddingX='1rem'
              paddingY='0.375rem'
            >
              プライバシーポリシー
            </MuiLink>
          </NextLink>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderNavMenu;
