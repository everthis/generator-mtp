/**
 * webpack base config
 * @type {[Object]}
 */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const autoprefixer = require('autoprefixer')

let node_modules = path.resolve(__dirname, '../node_modules')

let indexJsPath = path.resolve(__dirname, '../javascript/entry/index.js')
const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProd = nodeEnv === 'production' ? true : false
const $scope = {
    cssLoaderConfig: { loader: 'css-loader', options: { minimize: isProd ? true : false} },
    nodeEnv,
    isProd,
    ExtractTextPlugin,
    autoprefixer
}
const rules = require('./loader')($scope)

const shortPrefix = '<%= s || "" -%>'
let moduleName = '<%= moduleName -%>'
let defaults = {
    entry: {
        vendor: ['whatwg-fetch', 'vue', 'vue-router'],
        index: [indexJsPath]
    },
    output: {
        path: path.resolve(__dirname, '../build/' + moduleName),
        publicPath: '/static/' + (shortPrefix || moduleName) + '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: ['node_modules', 'bower_components', 'web_modules'],
        alias: {
            // 'vue$': 'vue/dist/vue.runtime.esm.js',
            config$: path.resolve(__dirname, './index.js')
        }
    },
    module: {
        rules
    },
    // devtool: '#eval-source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin(),
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: '/build/'
        }),
        new webpack.ProvidePlugin({}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2
        })
    ]
}
module.exports.defaults = defaults
