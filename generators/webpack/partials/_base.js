/**
 * webpack base config
 * @type {[Object]}
 */
let path = require('path');
let webpack = require('webpack');
let clientRoot = path.resolve(__dirname, '../client/');

let config = require('./index');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let ManifestPlugin = require('webpack-manifest-plugin');

let autoprefixer = require('autoprefixer');

let node_modules = path.resolve(__dirname, '../node_modules');

let cssLoaderConfig = {loader: 'css-loader', options: {minimize: true}};
let indexJsPath = path.resolve(__dirname, '../client/javascripts/index.js');

let moduleName = 'skynet';

const genRules = require('./_loaders')

const $scope = {
  webpack,
  ExtractTextPlugin,
  cssLoaderConfig,
  clientRoot
}

let defaults = {
    entry: {
        vendor: ['whatwg-fetch', 'vue', 'vue-router', 'iview'],
        index: [indexJsPath]
    },
    output: {
        path: path.resolve(__dirname, '../build/'+moduleName),
        publicPath: "/static/" + moduleName + '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: ['node_modules', 'bower_components', 'web_modules'],
        alias: {
          'vue$': 'vue/dist/vue.common.js',
          'config$' : path.resolve(__dirname, './index.js')
        }
    },
    module: {
        rules: genRules($scope)
    },

    // devtool: '#eval-source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        }),
        new ManifestPlugin({
          fileName: 'manifest.json',
          basePath: '/build/'
        }),
        new webpack.ProvidePlugin({}),
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: Infinity
        })
    ]
};
module.exports.defaults = defaults;
