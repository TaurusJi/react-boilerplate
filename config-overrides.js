// config-overrides
const { override, addBabelPlugins } = require("customize-cra");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = override(
  ...addBabelPlugins([
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ]),
  config => {
    if (config.mode === "production") {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  }
);
