//@ts-check

/**
 * @type {import('next-sitemap').IConfig}
 */
const nextSitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  outDir: './out/'
};

export default nextSitemapConfig;