const path = require('path')
const moduleName = path.parse(module.filename).name
const db = require('../../db/models/index')
const sequelize = db.sequelize

module.exports = {
  moduleName,
  db,
  sequelize
}
