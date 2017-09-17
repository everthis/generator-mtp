const path = require('path')
const api = require('../api/index')
const common = require('../common')
let controller = {
  index: async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = await common.m.njk.render('index.tpl', {
      title: '<%= moduleName %>',
      name: 'ok'
    })
  }
}

function getPathFromUrl(url) {
  return url.split(/[?#]/)[0]
}

function checkFormat(ctx) {
  let req = ctx.request
  let accept = req.header['accept']
  let urlWithPath = getPathFromUrl(req.url)
  let ext = path.extname(urlWithPath)
  let format = ''
  if (ext) {
    format = ext
  } else {
    format = accept.indexOf('text/html') !== -1 ? 'html' : 'json'
  }
  return format
}

function formatWrap(htmlFunc, jsonFunc) {
  return function(ctx, next) {
    let format = checkFormat(ctx)
    if (format === 'html') {
      if (typeof htmlFunc !== 'function') return
      return htmlFunc(ctx, next)
    } else {
      if (typeof jsonFunc !== 'function') return
      return jsonFunc(ctx, next)
    }
  }
}

const cindex = controller.index

module.exports = function(app) {
  app.get('/', formatWrap(cindex, api.service))
}
