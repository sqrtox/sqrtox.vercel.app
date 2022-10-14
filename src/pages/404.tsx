import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import Seo from '~/components/Seo';
import SpacingLayout from '~/layouts/spacing';

const NotFoundPage: FC = () => {
  const { asPath } = useRouter();

  return (
    <>
      <Seo
        title='ページが見つかりません'
        description='ページが見つかりません'
      />
      <SpacingLayout>
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
                  backgroundColor: ({ palette }) => alpha(palette.getContrastText(palette.background.paper), 0.25),
                  borderRadius: '5px',
                  margin: '0 0.25rem',
                  padding: '0 0.25rem'
                }}
              >
                {asPath}
              </Typography>
              が見つかりませんでした。
            </Typography>
            <NextLink passHref href='/'>
              <MuiLink>
                ホームページに戻る
              </MuiLink>
            </NextLink>
          </Stack>
        </Box>
      </SpacingLayout>
    </>
  );
};

export default NotFoundPage;
