import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import Link from './Link';
import Spacer from '~/components/Spacer';

const Footer: FC = () => (
  <footer>
    <Stack paddingY='2rem'>
      <Spacer>
        <Stack marginX='auto' spacing={2}>
          <Typography fontSize='small' color='text.secondary' textAlign='center'>
            このサイトはGoogleアナリティクスを使用しています。
            <Link fontSize='small' href='/legal/privacy-policy/'>詳しく見る</Link>
          </Typography>
          <Typography fontSize='small' color='text.secondary' textAlign='center'>© 2022 sqrtox</Typography>
        </Stack>
      </Spacer>
    </Stack>
  </footer>
);

export default Footer;
