/**
 * webpack production config
 * @type {[Object]}
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./base.config').defaults;
let prodConfig = {};

prodConfig = merge.smartStrategy({
  entry: 'prepend',
  'module.loaders': 'prepend'
})({}, baseConfig, {
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[id]-[chunkhash].chunk.js'
  },

  performance: {
    hints: false
  },

  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|less)$/,
      threshold: 10240,
      deleteOriginalAssets: true,
      minRatio: 0.6
    }),
    new webpack.BannerPlugin('banner'),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new ExtractTextPlugin('[name]-[contenthash:20].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
});
module.exports = prodConfig;
