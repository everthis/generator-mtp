const options = [
	{
		prop: 'database',
		val: {
			alias: 'db',
			desc: 'database used in this app. (none, mysql, postgresql)',
			type: String,
			default: 'mysql'
		}
	},
	{
		prop: 'front-end-framework',
		val: {
			alias: 'fef',
			desc: 'front end framework used in this app',
			type: String,
			default: 'vue'
		}
	},
	{
		prop: 'back-end-framework',
		val: {
			alias: 'bef',
			desc: 'back end framework used in this app. (none, koa)',
			type: String,
			default: 'koa'
		}
	},
	{
		prop: 'orm',
		val: {
			desc: 'orm framework used in this app. (none, sequelize)',
			type: String,
			default: 'sequelize'
		}
	},
	{
		prop: 'communication-method',
		val: {
			alias: 'cm',
			desc:
				'communication method of Nodejs app. (tcp_ip_sockets, unix_sockets)',
			type: String,
			default: 'unix_sockets'
		}
	},
	{
		prop: 'css',
		val: {
			desc: 'css preprocessor usage. (plain, sass, less, stylus)',
			type: String,
			default: 'sass'
		}
	},
	{
		prop: 'description',
		val: {
			alias: 'desc',
			desc: 'description of this app',
			type: String,
			default: 'description of this app'
		}
	},
	{
		prop: 'skip-prompt',
		val: {
			alias: 'y',
			desc: 'skip prompting',
			type: Boolean,
			default: false
		}
	},
	{
		prop: 'safe',
		val: {
			desc: 'use tested version of dependencies',
			type: Boolean,
			default: false
		}
	}
]

module.exports = options
