/**
 * webpack development config
 * @type {[Object]}
 */
let merge = require('webpack-merge')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let baseConfig = require('./base.config').defaults
let devConfig = {}

/**
 * find out which loader is causing deprecation warning.
 */
process.traceDeprecation = true

devConfig = merge.smartStrategy({
  entry: 'prepend',
  'module.loaders': 'prepend'
})({}, baseConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  performance: {
    hints: false
  },
  devServer: {
    /*
       * process invalid host header.
       */
    disableHostCheck: true,
    sockjsPrefix: '/ws/webpack/<%= s || moduleName -%>'
  },
  plugins: [new ExtractTextPlugin('[name].css')]
})
module.exports = devConfig
