// @ts-check

import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextPwa from 'next-pwa';

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
 * @typedef {import('next').NextConfig} NextConfig
 */

/**
 * @typedef {import('webpack').Configuration} Configuration
 */

/**
 * @type {NextConfig}
 */
const config = {
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
          loader: 'ifdef-loader',
          options: {
            DEVELOPMENT: isDev
          }
        }
      ]
    });

    return config;
  }
};

export default withNextBundleAnalyzer(withNextPwa(config));
