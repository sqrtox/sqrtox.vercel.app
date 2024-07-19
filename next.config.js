// @ts-check

const dev = process.env.NODE_ENV === "development";

/**
 * @typedef {import("webpack").Configuration} Configuration
 */

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

  webpack: dev
    ? undefined
    : /**
       * @param {Configuration} config
       * @returns {Configuration}
       */
      (config) => {
        config.resolve ??= {};
        config.resolve.alias ??= {};

        const budouxAlias = "budoux/dist/index";

        if (Array.isArray(config.resolve.alias)) {
          config.resolve.alias.push({
            name: "budoux",
            alias: budouxAlias,
          });
        } else {
          config.resolve.alias.budoux = budouxAlias;
        }

        return config;
      },
};

export default config;
