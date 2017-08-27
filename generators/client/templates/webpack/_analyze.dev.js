/**
 * webpack analyzation config
 * @type {[Object]}
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prodConfig = require('./dev.config')
let analyzeConfig = {}

analyzeConfig = merge.smartStrategy({
	plugins: 'prepend'
})({}, prodConfig, {
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '0.0.0.0',
			generateStatsFile: true
		})
	]
})

module.exports = analyzeConfig
