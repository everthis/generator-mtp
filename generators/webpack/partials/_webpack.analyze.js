/**
 * webpack analyzation config
 * @type {[Object]}
 */
let merge = require('webpack-merge');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let prodConfig = require('./webpack.prod');
let analyzeConfig = {};

analyzeConfig = merge.smartStrategy({
    'plugins': 'prepend'
})({}, prodConfig, {
    plugins: [
	    new BundleAnalyzerPlugin({
	        analyzerMode: 'server',
	        generateStatsFile: true
	    })
    ]
});
module.exports = analyzeConfig;