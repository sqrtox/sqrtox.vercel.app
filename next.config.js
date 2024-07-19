// @ts-check

/**
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    ppr: true,
    reactCompiler: true,
    esmExternals: true,
    turbo: {
      resolveAlias: {
        budoux: "budoux/dist/index",
      },
    },
  },
};

export default config;
