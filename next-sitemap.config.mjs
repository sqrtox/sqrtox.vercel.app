//@ts-check

/**
 * @type {import('next-sitemap').IConfig}
 */
const nextSitemapConfig = {
  outDir: './public/',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL
};

export default nextSitemapConfig;
