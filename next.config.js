const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const redirects = require("./data/redirects");

const rewrites = require("./data/rewrites");

const nextConfig = {
  webpack: (config) => {
    config.plugins = [
      ...config.plugins,
      // mini-css-extract-plugin generates a warning when importing css as modules
      // https://github.com/zeit/next-plugins/issues/506#issuecomment-589269285
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    ];

    config.node = {
      fs: "empty",
    };

    // maplibre
    config.resolve.alias = {
      ...config.resolve.alias,
      "mapbox-gl": "maplibre-gl",
    };

    return config;
  },
  redirects: async () => redirects,
  rewrites: async () => rewrites,
  trailingSlash: true,
  env: {
    ANALYTICS_PROPERTY_ID: process.env.ANALYTICS_PROPERTY_ID,
    BITLY_TOKEN: process.env.BITLY_TOKEN,
    DEBUG: process.env.DEBUG,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    FEATURE_ENV: process.env.FEATURE_ENV,
    GOOGLE_CUSTOM_SEARCH_CX: process.env.GOOGLE_CUSTOM_SEARCH_CX,
    GOOGLE_SEARCH_API_KEY: process.env.GOOGLE_SEARCH_API_KEY,
    HW_API: process.env.HW_API,
    HW_CMS_API: process.env.HW_CMS_API,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    TWITTER_CONVERSION_ID: process.env.TWITTER_CONVERSION_ID,
    ECWMF_HRES_TIMESTAMPS_URL:process.env.ECWMF_HRES_TIMESTAMPS_URL,
  },
};

module.exports = withPlugins(
  [[withSass], [optimizedImages], [withBundleAnalyzer]],
  nextConfig
);
