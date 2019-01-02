const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const base = require('./base');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
];

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  entry: Object.values(base.entry).reduce((tmp, { key, value }) => {
    tmp[key] = [`webpack-dev-server/client?http://localhost:13000`, 'webpack/hot/only-dev-server', value];
    return tmp;
  }, {}),
  plugins: [...base.plugins, new webpack.NamedModulesPlugin(), new ForkTsCheckerWebpackPlugin()],
  module: {
    rules: [...base.module.rules ...appendRules],
  },
  devServer: {
    publicPath: base.output.publicPath,
    port: 13000,
  },
};
