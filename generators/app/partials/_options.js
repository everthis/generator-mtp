const options = [{
	prop: 'database',
	val: {
	  alias: 'db',
	  desc: 'Set database used in this app',
	  type: String,
	  default: 'mysql'
	}
}, {
	prop: 'fe-framework',
	val: {
	  alias: 'fef',
	  desc: 'Set front end framework used in this app',
	  type: String,
	  default: 'vue'
	}
}, {
	prop: 'backend-framework',
	val: {
	  alias: 'bef',
	  desc: 'Set back end framework used in this app',
	  type: String,
	  default: 'koa'
	}
}, {
	prop: 'orm',
	val: {
	  desc: 'Set ORM framework used in this app',
	  type: String,
	  default: 'sequelize'
	}
}, {
	prop: 'skip-orm',
	val: {
	  desc: 'Don\'t use ORM framework in this app',
	  type: Boolean,
	  default: false
	}
}, {
	prop: 'connection-method',
	val: {
	  alias: 'cm',
	  desc: 'Set connection method of Nodejs app',
	  type: String,
	  default: 'socket'
	}
}, {
	prop: 'description',
	val: {
	  alias: 'desc',
	  desc: 'Set description of this app',
	  type: String,
	  default: ''
	}
}]

module.exports = options