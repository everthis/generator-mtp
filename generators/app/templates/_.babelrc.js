module.exports = function(context) {
	const env = context.cache(() => process.env.BABEL_ENV)

	const targets = {
		'build.chrome': { chrome: 52 },
		'build.edge': { edge: 14 },
		'build.safari': { safari: 10 },
		'build.firefox': { firefox: 45 },
		'build.fallback': {
			browsers: ['last 2 versions', 'ie >= 11', 'safari >= 7']
		}
	}

	return {
		presets: [
			[
				'env',
				{
					targets: targets[env]
				}
			]
		],
		plugins: ['transform-object-rest-spread', 'syntax-dynamic-import']
	}
}
