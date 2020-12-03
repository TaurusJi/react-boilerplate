const {
  override,
  addLessLoader,
  addBabelPlugins,
  addWebpackPlugin,
  addBundleVisualizer,
  addDecoratorsLegacy,
  overrideDevServer,
} = require("customize-cra");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const PRODCondition = ["production", "prod", "staging", "stage", "uat", "qa"];
const IS_PROD = PRODCondition.includes(process.env.NODE_ENV);

const babelPlugins = ["lodash", "ramda"];

const webpackPlugins = [
  new LodashModuleReplacementPlugin({
    collections: true,
    paths: true,
    cloning: true,
    shorthands: true,
  }),
];

if (IS_PROD) {
  babelPlugins.push("transform-remove-console");
  babelPlugins.push("transform-remove-debugger");
  webpackPlugins.push(
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$/,
      threshold: 10240,
    })
  );
}

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    addBundleVisualizer({}, true),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      }
    }),
    ...addBabelPlugins(...babelPlugins),
    ...webpackPlugins.map((plugin) => addWebpackPlugin(plugin)),
  ),
  devServer: overrideDevServer((config) => {
    config.proxy = {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false, // 不验证SSL Certs
        xfwd: false, // 不添加x-forward标头
        pathRewrite: {
          "^/api": "/",
        },
      },
    };

    return config;
  }),
};
