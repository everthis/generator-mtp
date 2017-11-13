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

function factoryApiFn(fn) {
  const isAsync = common.isAsyncFn(fn)
  if (isAsync) {
    return async function asyncFactory(...args) {
      return await fn(common, ...args)
    }
  }
  return function syncFactory(...args) {
    return fn(common, ...args)
  }
}

/**
 * [processBeforeAction description]
 * every item of beforeAction must be a promise.
 * the return value of every item of beforeAction must be an object which
 * contains bool and msg property.
 * @param  {[Object]} obj [description]
 * @return {[Boolean]}     [description]
 */
async function processBeforeAction(obj, ...args) {
  const beforeActionArr = Array.isArray(obj.beforeAction)
    ? obj.beforeAction
    : [obj.beforeAction]
  // beforeActionArr.forEach(el => (typeof el === 'string' ? helper[el] : el))
  const pArr = beforeActionArr.map(el => {
    if (typeof el === 'string') {
      return helper[el](common, ...args)
    } else if (Object.prototype.toString.call(el) === '[object Object]') {
      const fn = typeof el.fn === 'string' ? helper[el.fn] : el.fn
      return fn(common, el.params, ...args)
    } else {
      return el(common, ...args)
    }
  })
  return await Promise.all(pArr)
}

function processApiObj(obj) {
  if (obj.beforeAction) {
    return async function(...args) {
      const pbar = await processBeforeAction(obj, ...args)
      if (pbar.findIndex(el => el.bool === false) === -1) {
        return obj.fn(common, ...args)
      } else {
        return (args[0].body = common.jsonStr({
          status: 'error',
          msg: pbar.filter(el => el.bool === false).map(el => el.msg)
        }))
      }
    }
  } else {
    return factoryApiFn(obj.fn)
  }
}

const cindex = controller.index
module.exports = function(app) {
  app.get('/', cindex)
  for (let el in api) {
    if (api.hasOwnProperty(el)) {
      const apiPath = common.camelCaseToSlash(el)
      if (Object.prototype.toString.call(api[el]) === '[object Object]') {
        app[api[el].method.toLowerCase()](
          `/${apiPath}`,
          formatWrap(cindex, processApiObj(api[el]))
        )
      } else {
        app.get(`/${apiPath}`, formatWrap(cindex, factoryApiFn(api[el])))
      }
    }
  }
}
