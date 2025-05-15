import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    resolveAlias: {
      budoux: "budoux/dist/index",
    },
  },
  experimental: {
    reactCompiler: !dev,
    esmExternals: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias.budoux = "budoux/dist/index";

    return config;
  },
};

export default nextConfig;
