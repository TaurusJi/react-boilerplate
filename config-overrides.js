// config-overrides
const {
  override,
  addLessLoader,
  fixBabelImports,
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
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  }),
  ...addBabelPlugins(...babelPlugins),
  ...webpackPlugins.map(plugin => addWebpackPlugin(plugin)),
  config => {
    config.module.rules[2].oneOf[6].use.push({
      loader: "style-resources-loader",
      options: {
        patterns: ["./src/styles/variable.scss", "./src/styles/mixin.scss"]
      }
    });
    return config;
  }
);
