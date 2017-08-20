'use strict';

const fs = require('fs')
const path = require('path')
const partialMark = '_'
const pml = partialMark.length
const copyFiles = [
  '_javascript/index.js',
  '_stylesheet/index.scss',
]

function walkSync(dir, filelist = []) {
 let tmpPath = ''
 fs.readdirSync(dir).forEach(file => {
   tmpPath = path.join(dir, file)
   filelist = fs.statSync(tmpPath).isDirectory()
     ? walkSync(tmpPath, filelist)
     : (typeCheck(tmpPath) ? filelist.concat(tmpPath) : filelist)
 })
 return filelist
}

function genRelativePath(list = [], p) {
  return list.map(el => el.slice(p.length + 1))
}

function typeCheck(filePath) {
    console.log(filePath)
  const types = ['js', 'scss', 'vue', 'gitkeep']
  for (let i = types.length - 1; i >= 0; i--) {
    if(types.indexOf(path.extname(filePath).slice(1)) !== -1) {
      return true
    }
  }
  return false
}

function writes($scope) {
    let writesObj = {
        _copyFiles() {
            let tp = $scope.this.templatePath()
            let copyFiles = genRelativePath(walkSync(tp), tp)
            console.log(copyFiles)
            for (let i = 0; i < copyFiles.length; i++) {
                $scope.this.fs.copy(
                    $scope.this.templatePath(copyFiles[i]),
                    $scope.this.destinationPath('client/' + copyFiles[i].slice(pml))
                )
            }
        }
    }

    for (let el in writesObj) {
        if (writesObj.hasOwnProperty(el)) {
            writesObj[el]()
        }
    }
}

module.exports = writes