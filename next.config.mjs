// @ts-check

import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextPwa from 'next-pwa';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const isDev = process.env.NODE_ENV === 'development';
const bundleAnalyzeEnabled = process.env.BUNDLE_ANALYZE === 'true';

const withNextPwa = nextPwa({
  dest: './public/',
  disable: isDev
});

const withNextBundleAnalyzer = nextBundleAnalyzer({
  enabled: bundleAnalyzeEnabled
});

/**
 * @typedef {import('webpack').Configuration} Configuration
 */

/**
 * @type {import('next').NextConfig}
 */
const config = {
  headers: async () => ([
    {
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: BASE_URL
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
      ],
      source: '/:path*'
    }
  ]),
  poweredByHeader: false,
  trailingSlash: true,
  /**
   * @param {Configuration} config
   * @returns {Configuration}
   */
  webpack: config => {
    const webpackModule = config.module ??= {};
    const rules = webpackModule.rules ??= [];

    rules.push({
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [
        {
          loader: 'webpack-preprocessor-loader',
          options: {
            params: {
              DEVELOPMENT: isDev
            }
          }
        }
      ]
    });

    return config;
  }
};

export default withNextBundleAnalyzer(withNextPwa(config));
