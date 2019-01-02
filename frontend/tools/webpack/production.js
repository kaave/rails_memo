const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
];

module.exports = {
  ...base,
  mode: 'production',
  resolve: { ...base.resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  plugins: [
    ...base.plugins,
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
