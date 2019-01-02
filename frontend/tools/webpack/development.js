const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {
  entry,
  context,
  output,
  resolve,
  plugins,
  module: { rules },
} = require('./base');

const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: tsconfigPath,
          transpileOnly: true,
        },
      },
    ],
  },
  { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
];

module.exports = {
  context,
  output,
  resolve: { ...resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  mode: 'development',
  devtool: 'inline-source-map',
  entry: Object.entries(entry).reduce((tmp, [key, value]) => {
    tmp[key] = [`webpack-dev-server/client?http://localhost:13000`, 'webpack/hot/only-dev-server', value];
    return tmp;
  }, {}),
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
    }),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  devServer: {
    publicPath: output.publicPath,
    port: 13000,
  },
};
