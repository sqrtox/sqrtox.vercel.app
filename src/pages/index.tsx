import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import Link from '~/components/Link';

const SITE_SHORT_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;

const Home: FC = () => (
  <>
    <Typography component='h1' variant='h4' marginY='1rem'>{SITE_SHORT_DESCRIPTION}</Typography>
    <Typography>{SITE_DESCRIPTION}</Typography>
    <Stack marginTop='2rem' spacing={1}>
      <Link href='/blog/'>ブログ記事一覧</Link>
      <Link href='/legal/privacy-policy/'>プライバシーポリシー</Link>
    </Stack>
  </>
);

export default Home;
