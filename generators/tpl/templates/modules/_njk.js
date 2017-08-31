const path = require('path')
const njk = require('nunjucks')
const moduleName = path.parse(module.filename).name
njk.configure('tpl', {
  trimBlocks: true,
  lstripBlocks: true,
  autoescape: true,
  trimBlocks: true
})

module.exports = Object.assign({ moduleName }, njk)
