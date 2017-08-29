/*
 * app config.
 */
const path = require('path')
const isDev = process.env.NODE_ENV === 'development' || false
const isProd = process.env.NODE_ENV === 'production' || false
const nodeDevSocket = path.resolve(
    __dirname,
    '../../shared/socket/node.dev.sock'
)
const nodeProdSocket = path.resolve(
    __dirname,
    '../../shared/socket/node.prod.sock'
)
const nodeSocket = isProd ? nodeProdSocket : nodeDevSocket
const nodePidPath = path.resolve(__dirname, '../../shared/pid/node.pid')
const moduleName = '<%= moduleName %>'
const assetsPublicPrefix = '/static/' + moduleName + '/'
const assetsPathPrefix = '/build/'
const logDir = path.join(__dirname, '..', '..', 'shared', 'log')
const xtplRootDir = path.join(__dirname, '..', 'server')
const xtplViewDir = 'templates'
const xtplLayoutsDir = './templates/layouts'
const xtplPartialsDir = './templates/partials'
const appPrefix = '/<%= moduleName %>'
module.exports = {
    isDev,
    isProd,
    appPrefix,
    nodeSocket,
    nodePidPath,
    assetsPublicPrefix,
    assetsPathPrefix,
    xtplViewDir,
    xtplRootDir,
    xtplLayoutsDir,
    xtplPartialsDir,
    logDir
}
