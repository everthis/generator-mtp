const path = require('path')
const moduleName = path.parse(module.filename).name
const db = require('../../db/model/index')
const sequelize = db.sequelize

module.exports = {
	moduleName,
	db,
	sequelize
}
