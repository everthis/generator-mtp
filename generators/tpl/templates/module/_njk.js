const path = require('path')
const nunjucks = require('nunjucks')
const { xscriptExtension, xstyleExtension } = require('../extension/njk.ext')
const moduleName = path.parse(module.filename).name
const njk = nunjucks.configure('tpl', {
  trimBlocks: true,
  lstripBlocks: true,
  autoescape: true,
  trimBlocks: true,
  watch: true
})

njk.addExtension('xscriptExtension', xscriptExtension)
njk.addExtension('xstyleExtension', xstyleExtension)

module.exports = Object.assign(njk, { moduleName })
