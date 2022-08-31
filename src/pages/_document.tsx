import { Head, Html, Main, NextScript } from 'next/document';
import { type FC } from 'react';
import GoogleAnalytics from '~/components/GoogleAnalytics';

const Document: FC = () => (
  <Html lang='ja'>
    <Head>
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
      <meta name='theme-color' content='#29b9f6' />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
        integrity='sha512-h7nl+xz8wgDlNM4NqKEM4F1NkIRS17M9+uJwIGwuo8vGqIl4BhuCKdxjWEINm+xyrUjNCnK5dCrhM0sj+wTIXw=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <GoogleAnalytics />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
