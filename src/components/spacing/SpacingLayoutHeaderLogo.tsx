import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NextLink from 'next/link';
import { type FC } from 'react';
import SvgSqrtoxLogo from '~/components/common/SvgSqrtoxLogo';

const SpacingLayoutHeaderLogo: FC = () => {
  const { palette, breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(breakpoints.down('sm'));

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
            {!isSmallScreen && (
              <Typography
                variant='h4'
                color={palette.text.primary}
                fontWeight='bold'
              >
                Sqrtox
              </Typography>
            )}
          </Stack>
        </MuiLink>
      </NextLink>
    </Box>
  );
};

export default SpacingLayoutHeaderLogo;
