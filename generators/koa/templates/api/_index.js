/*
 * api entry
 */
const fs = require('fs')
const path = require('path')
const common = require('../common')
const basename = path.basename(module.filename)
const apis = {}

function factoryFn(fn) {
  const isAsync = common.util.isAsyncFn(fn)
  if (isAsync) {
    return async function asyncFactory(...args) {
      return await fn(common, ...args)
    }
  }
  return function syncFactory(...args) {
    return fn(common, ...args)
  }
}

fs
  .readdirSync(common.apiDir)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    const api = require(path.join(common.apiDir, file))
    /* eslint-enable global-require */
    /* eslint-enable import/no-dynamic-require */
    if (api.name) apis[api.name] = factoryFn(api)
  })

module.exports = apis
