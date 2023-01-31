const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const redirects = require("./data/redirects");

const rewrites = require("./data/rewrites");

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  redirects: async () => redirects,
  rewrites: async () => rewrites,
  trailingSlash: true,
};

module.exports = withPlugins(
  [[optimizedImages], [withBundleAnalyzer]],
  nextConfig
);
