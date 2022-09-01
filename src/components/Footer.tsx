import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { type FC } from 'react';
import Spacer from '~/components/Spacer';

const Footer: FC = () => (
  <footer>
    <Stack paddingY='2rem'>
      <Spacer>
        <Stack marginX='auto' spacing={2}>
          <Typography fontSize='small' color='text.secondary' textAlign='center'>
            このサイトはGoogleアナリティクスを使用しています。
            <NextLink href='/legal/privacy-policy/' passHref>
              <MuiLink fontSize='small'>詳しく見る</MuiLink>
            </NextLink>
          </Typography>
          <Typography fontSize='small' color='text.secondary' textAlign='center'>© 2022 sqrtox</Typography>
        </Stack>
      </Spacer>
    </Stack>
  </footer>
);

export default Footer;
