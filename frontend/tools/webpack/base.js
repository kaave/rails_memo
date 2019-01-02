const globby = require('globby');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const packs = path.join(process.cwd(), 'frontend', 'scripts');

const targets = globby.sync(path.join(packs, '*.{ts,tsx}'));
const entry = targets.reduce((tmp, target) => {
  const bundle = path.relative(packs, target);
  const ext = path.extname(bundle);
  const key = bundle.replace(ext, '');
  tmp[key] = `./${bundle}`;

  return tmp;
}, {});
const publicPath = '/packs/';

module.exports = {
  entry,
  context: packs,
  output: {
    publicPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name].bundle-[hash].js',
    path: path.join(process.cwd(), 'public', 'packs'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['json', '.tsx', '.ts', '.css', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new ManifestPlugin({
      publicPath,
      fileName: 'manifest.json',
      writeToFileEmit: true,
    }),
  ],
  module: {
    rules: [],
  },
  optimization: {
    splitChunks: {
      name: 'vendor.bundle',
      chunks: 'initial',
    },
  },
};
