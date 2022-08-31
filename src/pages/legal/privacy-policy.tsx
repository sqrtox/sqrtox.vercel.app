import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { type FC } from 'react';
import Link from '~/components/Link';
import Seo from '~/components/Seo';

const SmallOpenInNewIcon = styled(OpenInNewIcon)({
  width: '1.25rem',
  verticalAlign: 'middle'
});

const PrivacyPolicy: FC = () => (
  <>
    <Seo
      title='プライバシーポリシー'
      description=''
    />
    <Box sx={{ marginBottom: '5rem' }}>
      <Stack spacing={2}>
        <Typography component='h1' variant='h4' sx={{ margin: '1rem 0' }}>プライバシーポリシー</Typography>
        <Typography component='h2' variant='h5'>アクセス解析について</Typography>
        <Typography>
          当サイトでは、アクセス解析サービス「Googleアナリティクス」を使用しています。<br />
          このGoogleアナリティクスはデータの収集のためにCookieを使用しています。<br />
          このデータは匿名で収集されており、個人を特定するものではありません。
        </Typography>
        <Typography>
          この機能はCookieを無効にすることで拒否することができますので、お使いのブラウザの設定をご確認ください。<br />
          この規約に関しての詳細は
          <Link href='https://marketingplatform.google.com/about/analytics/terms/jp/' external>Google アナリティクス利用規約<SmallOpenInNewIcon /></Link>
          のページや
          <Link href='https://policies.google.com/technologies/ads?hl=ja' external>Googleポリシーと規約<SmallOpenInNewIcon /></Link>
          のページをご覧ください。
        </Typography>
      </Stack>
    </Box>
  </>
);

export default PrivacyPolicy;