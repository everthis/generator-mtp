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
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: clientRoot,
                options: {
                  loaders: {
                    // typescript: 'ts-loader',
                    scss: ExtractTextPlugin.extract({
                        use: [cssLoaderConfig, 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: ExtractTextPlugin.extract({
                      use: 'css-loader',
                      fallback: 'vue-style-loader'
                    })
                  }
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: cssLoaderConfig})
            },
            {
                test: /\.scss$/,
                loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
                    cssLoaderConfig,
                    'postcss-loader',
                    'sass-loader'
                    ]
                }))
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name : 'assets/img/[name].[ext]'
                }
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    comments: false
                }
            }
        ]
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
          minChunks: 2
        })
    ]
};
module.exports.defaults = defaults;
