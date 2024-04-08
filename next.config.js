// @ts-check

import bundleAnalzer from "@next/bundle-analyzer";

const plugins = [
  bundleAnalzer({
    enabled: process.env.ANALYZE === "1"
  })
];

/**
 * @typedef {import("webpack").Configuration} Configuration
 */

/**
 * @type {import("next").NextConfig}
 */
let config = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  },
  /**
   * @param {Configuration} config
   * @returns {Configuration}
   */
  webpack: config => {
    config.resolve ??= {};
    config.resolve.alias ??= {};

    const budouxAlias = "budoux/dist/index";

    if (Array.isArray(config.resolve.alias)) {
      config.resolve.alias.push({
        name: "budoux",
        alias: budouxAlias
      });
    } else {
      config.resolve.alias.budoux = budouxAlias;
    }

    return config;
  }
};

for (const plugin of plugins) {
  config = plugin(config);
}

export default config;
