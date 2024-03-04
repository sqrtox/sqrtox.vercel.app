// @ts-check

import bundleAnalzer from "@next/bundle-analyzer";

const plugins = [
  bundleAnalzer({
    enabled: process.env.ANALYZE === "1"
  })
];

/**
 * @type {import("next").NextConfig}
 */
let config = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  }
};

for (const plugin of plugins) {
  config = plugin(config);
}

export default config;
