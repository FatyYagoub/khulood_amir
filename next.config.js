/** @type {import('next').NextConfig} */

const nextConfig = {
  //...
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: false,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== "UglifyJsPlugin"
    );

    return config;
  },
};

module.exports = nextConfig;
