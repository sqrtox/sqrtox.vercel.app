//@ts-check

/**
 * @type {import('next-sitemap').IConfig}
 */
const nextSitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  outDir: './public/',
  exclude: [
    '/furage-chat',
    '/furage-chat/*'
  ]
};

export default nextSitemapConfig;
