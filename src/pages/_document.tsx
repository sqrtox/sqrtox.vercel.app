import { Head, Html, Main, NextScript } from 'next/document';
import { type FC } from 'react';
import GoogleSiteVerification from '~/components/GoogleSiteVerification';
import KatexStyleSheetLoader from '~/components/KatexStyleSheetLoader';

const PRIMARY_MAIN_COLOR = process.env.NEXT_PUBLIC_PRIMARY_MAIN_COLOR;

const Document: FC = () => (
  <Html lang='ja'>
    <Head>
      <link rel='preconnect' href='https://www.google-analytics.com' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='194x194' href='/favicons/favicon-194x194.png' />
      <link rel='icon' type='image/png' sizes='192x192' href='/favicons/android-chrome-192x192.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
      <link rel='manifest' href='/favicons/site.webmanifest' />
      <link rel='shortcut icon' href='/favicons/favicon.ico' />
      <meta name='msapplication-TileColor' content='#2d89ef' />
      <meta name='msapplication-TileImage' content='/favicons/mstile-144x144.png' />
      <meta name='msapplication-config' content='/favicons/browserconfig.xml' />
      <meta name='theme-color' content={PRIMARY_MAIN_COLOR} />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <KatexStyleSheetLoader />
      <GoogleSiteVerification />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
