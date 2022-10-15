// @ts-check

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * @type {import('next-sitemap').IConfig}
 */
const config = {
  outDir: './out/',
  siteUrl: NEXT_PUBLIC_BASE_URL
};

export default config;
