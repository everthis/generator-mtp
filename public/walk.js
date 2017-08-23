const fs = require('fs')
const path = require('path')
const partialMark = '_'
const pml = partialMark.length

function walkSync(dir, filelist = []) {
  let tmpPath = ''
  fs.readdirSync(dir).forEach(file => {
    tmpPath = path.join(dir, file)
    filelist = fs.statSync(tmpPath).isDirectory()
      ? walkSync(tmpPath, filelist)
      : typeCheck(tmpPath) ? filelist.concat(tmpPath) : filelist
  })
  return filelist
}

function genRelativePath(list = [], p) {
  return list.map(el => el.slice(p.length + 1))
}

function typeCheck(filePath, defaultTypes) {
  const types = defaultTypes || ['js', 'scss', 'vue', 'gitkeep', 'tpl', 'sh']
  for (let i = types.length - 1; i >= 0; i--) {
    if (types.indexOf(path.extname(filePath).slice(1)) !== -1) {
      return true
    }
  }
  return false
}

function findFiles(dir, filelist = []) {
  let list = walkSync(dir, filelist)
  return genRelativePath(list, dir)
}

function destFile(fp) {
  const po = path.parse(fp)
  return po.dir + '/' + po.base.slice(pml)
}
module.exports = { findFiles, destFile, walkSync }
