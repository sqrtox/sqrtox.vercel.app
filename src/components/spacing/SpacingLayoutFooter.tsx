import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { type FC } from 'react';
import Spacer from '~/components/spacing/Spacer';

const SpacingLayoutFooter: FC = () => (
  <footer>
    <Stack paddingY='2rem'>
      <Spacer>
        <Stack marginX='auto' spacing={2}>
          <Stack>
            <Typography fontSize='small' color='text.secondary' textAlign='center'>
              このサイトはGoogleアナリティクスを使用しています。
            </Typography>
            <Box textAlign='center'>
              <NextLink href='/legal/privacy-policy/' passHref>
                <MuiLink fontSize='small'>プライバシーポリシー</MuiLink>
              </NextLink>
            </Box>
          </Stack>
          <Typography fontSize='small' color='text.secondary' textAlign='center'>© 2022 sqrtox</Typography>
        </Stack>
      </Spacer>
    </Stack>
  </footer>
);

export default SpacingLayoutFooter;
