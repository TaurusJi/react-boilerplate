// config-overrides
const {
  override,
  addBabelPlugins,
  addWebpackPlugin,
  addDecoratorsLegacy
} = require("customize-cra");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const babelPlugins = ["lodash"];
const webpackPlugins = [new LodashModuleReplacementPlugin()];
const PRODCondition = ["production", "prod", "staging", "stage", "uat", "qa"];
const IS_PROD = PRODCondition.includes(process.env.NODE_ENV);

if (IS_PROD) {
  babelPlugins.push("transform-remove-console");
  babelPlugins.push("transform-remove-debugger");
  webpackPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins(babelPlugins),
  ...webpackPlugins.map(plugin => addWebpackPlugin(plugin))
  // config => {
  //   config.plugins.push(...webpackPlugins);
  //   return config;
  // }
);
