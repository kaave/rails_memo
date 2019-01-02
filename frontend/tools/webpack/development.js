const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const sassPackageImporter = require('node-sass-package-importer');

require('dotenv').config();

const ports = {
  rails: parseInt(process.env.PORT, 10) || 13000,
  wds: parseInt(process.env.PORT_WDS, 10) || 3000,
};

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
  {
    test: /\.scss$/,
    use: [
      'style-loader',
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
  context,
  output,
  resolve: { ...resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  mode: 'development',
  devtool: 'inline-source-map',
  entry: Object.entries(entry).reduce((tmp, [key, value]) => {
    tmp[key] = [`webpack-dev-server/client?http://localhost:${ports.wds}`, 'webpack/hot/only-dev-server', value];
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
    port: ports.wds,
    proxy: {
      '/': {
        target: `http://localhost:${ports.rails}`,
        bypass(req, res, proxyOptions) {
          const isPacksRequest = /^\/packs\//.test(req.url);
          if (isPacksRequest) {
            console.log('Skipping proxy for packs request.');
            return req.url;
          }
        },
      },
    },
  },
};
