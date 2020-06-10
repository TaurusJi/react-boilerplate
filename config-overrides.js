const {
  override,
  addLessLoader,
  addBabelPlugins,
  addWebpackAlias,
  addWebpackPlugin,
  addBundleVisualizer,
  addDecoratorsLegacy,
  overrideDevServer,
} = require("customize-cra");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const RewireReactHotLoader = require("react-app-rewire-hot-loader");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const PRODCondition = ["production", "prod", "staging", "stage", "uat", "qa"];
const IS_PROD = PRODCondition.includes(process.env.NODE_ENV);

const babelPlugins = [
  "lodash",
  [
    "import",
    {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    },
    "antd",
  ],
  [
    "import",
    {
      libraryName: "react-use",
      libraryDirectory: "lib",
      camel2DashComponentName: false,
    },
    "react-use",
  ],
];

const webpackPlugins = [
  new LodashModuleReplacementPlugin({
    collections: true,
    paths: true,
    cloning: true,
    shorthands: true,
  }),
];

const rewiredMap = () => (config) => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;

  config = RewireReactHotLoader(config, process.env.NODE_ENV);

  return config;
};

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
      javascriptEnabled: true,
    }),
    addWebpackAlias({
      "react-dom$": "@hot-loader/react-dom",
    }),
    ...addBabelPlugins(...babelPlugins),
    ...webpackPlugins.map((plugin) => addWebpackPlugin(plugin)),
    rewiredMap()
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
