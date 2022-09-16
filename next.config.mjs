//@ts-check

import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextPwa from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withNextPwa = nextPwa({
  disable: isDev,
  dest: './public/'
});

const withNextBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  poweredByHeader: false,
  trailingSlash: true,
  headers: async () => ([
    {
      source: '/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.NEXT_PUBLIC_BASE_URL
        },
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp'
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin'
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'same-origin'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'no-referrer'
        },
        {
          key: 'Permissions-Policy',
          value: (
            'accelerometer=(), ' +
            'autoplay=(), ' +
            'camera=(), ' +
            'cross-origin-isolated=(), ' +
            'display-capture=(), ' +
            'document-domain=(), ' +
            'encrypted-media=(), ' +
            'fullscreen=(), ' +
            'geolocation=(), ' +
            'gyroscope=(), ' +
            'keyboard-map=(), ' +
            'magnetometer=(), ' +
            'microphone=(), ' +
            'midi=(), ' +
            'payment=(), ' +
            'picture-in-picture=(), ' +
            'publickey-credentials-get=(), ' +
            'screen-wake-lock=(), ' +
            'sync-xhr=(), ' +
            'usb=(), ' +
            'web-share=(), ' +
            'xr-spatial-tracking=(), ' +
            'clipboard-read=(), ' +
            'clipboard-write=(), ' +
            'gamepad=(), ' +
            'hid=(), ' +
            'idle-detection=(), ' +
            'interest-cohort=(), ' +
            'serial=(), ' +
            'trust-token-redemption=(), ' +
            'window-placement=()'
          )
        }
      ]
    }
  ])
};

export default withNextBundleAnalyzer(withNextPwa(config));
