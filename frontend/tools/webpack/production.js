const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sassPackageImporter = require('node-sass-package-importer');

const base = require('./base');

const tsconfigPath = path.join(process.cwd(), 'tsconfig.production.json');
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
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          importer: sassPackageImporter({ extensions: ['.scss', '.css'] }),
          sourceMap: true,
        },
      },
    ],
  },
];

module.exports = {
  ...base,
  mode: 'production',
  resolve: { ...base.resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[hash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
    }),
  ],
  module: {
    rules: [...base.module.rules, ...appendRules],
  },
  optimization: {
    ...base.optimization,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          filename: 'licenses.txt',
        },
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/,
          },
        },
      }),
    ],
  },
};
