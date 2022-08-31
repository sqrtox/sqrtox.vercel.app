import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import Link from '~/components/Link';
import Seo from '~/components/Seo';

const NotFoundPage: FC = () => (
  <>
    <Seo
      title='ページが見つかりません'
      description='ページが見つかりません'
    />
    <Box sx={{ margin: '0 1rem' }}>
      <Stack
        width='fit-content'
        marginTop='7rem'
        marginX='auto'
      >
        <Typography fontSize='2rem' component='h1'>ページが見つかりません</Typography>
        <Typography>
          <Typography component='span' sx={{ whiteSpace: 'nowrap' }}>ページ</Typography>
          <Typography
            suppressHydrationWarning
            component='span'
            sx={{
              padding: '0 0.25rem',
              margin: '0 0.25rem',
              borderRadius: '5px',
              backgroundColor: ({ palette }) => alpha(palette.getContrastText(palette.background.paper), 0.25)
            }}
          >
            {useRouter().asPath}
          </Typography>
          が見つかりませんでした。
        </Typography>
        <Link href='/'>ホームページに戻る</Link>
      </Stack>
    </Box>
  </>
);

export default NotFoundPage;