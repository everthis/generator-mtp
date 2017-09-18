const jsonfile = require('jsonfile')
const path = require('path')
function loopParams(pjObj, paramsArr, cbArr) {
  for (let i = 0; i < paramsArr.length; i++) {
    if (!pjObj[paramsArr[i].field]) {
      pjObj[paramsArr[i].field] = {
        [paramsArr[i].key]: paramsArr[i].val
      }
    } else {
      pjObj[paramsArr[i].field][paramsArr[i].key] = paramsArr[i].val
    }
    if (paramsArr[i].cb) cbArr.push(paramsArr[i].cb)
  }
}

function operatePackageJson(ctx, params) {
  const rootPath = ctx.destinationRoot()
  const pjPath = path.resolve(rootPath, 'package.json')
  const pjObj = jsonfile.readFileSync(pjPath)
  let callbackArr = []
  if (Array.isArray(params)) {
    loopParams(pjObj, params, callbackArr)
  } else {
    loopParams(pjObj, [params], callbackArr)
  }
  try{
    jsonfile.writeFileSync(pjPath, pjObj, {spaces: 2})
  } catch(err) {
      ctx.log(err)
      return
  }
  if (callbackArr && callbackArr.length) {
    for (let i = 0; i < callbackArr.length; i++) {
      callbackArr[i].call(ctx)
    }
  }
}

module.exports = operatePackageJson