import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { type FC } from 'react';
import SvgSqrtoxLogo from '~/components/SvgSqrtoxLogo';

const HeaderLogo: FC = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ marginRight: 'auto' }}>
      <NextLink href='/' passHref>
        <MuiLink
          aria-label='ホームに戻る'
          underline='none'
          sx={{ display: 'flex' }}
        >
          <Stack direction='row' spacing={1}>
            <SvgSqrtoxLogo
              color={palette.primary.main}
              width={40}
              height={40}
            />
            <Typography
              variant='h4'
              color={palette.text.primary}
              fontWeight='bold'
            >
              Sqrtox
            </Typography>
          </Stack>
        </MuiLink>
      </NextLink>
    </Box>
  );
};

export default HeaderLogo;
