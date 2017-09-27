require('dotenv').config()
let ENV = process.env
module.exports = {
  development: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: '<%= moduleName %>_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+8:00',
    dialectOptions: {
      charset: 'utf8'
    },
    pool: {
      max: 10,
      min: 0,
      idle: 3000,
      handleDisconnects: true
    }
  },
  test: {
    username: 'root',
    password: null,
    database: '<%= moduleName %>_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: '<%= moduleName %>_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+8:00',
    dialectOptions: {
      charset: 'utf8'
    },
    pool: {
      max: 10,
      min: 0,
      idle: 3000,
      handleDisconnects: true
    }
  }
}
