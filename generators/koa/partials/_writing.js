'use strict'

const { findFiles, destFile } = require('../../../public/walk')
const partialMark = '_'
const pml = partialMark.length
const copyFiles = []

function writes($scope) {
  let writesObj = {
    _tplFiles() {
      let tp = $scope.this.templatePath()
      let tplFiles = findFiles(tp)
      for (let i = 0; i < tplFiles.length; i++) {
        $scope.this.fs.copyTpl(
          $scope.this.templatePath(tplFiles[i]),
          $scope.this.destinationPath('server/' + destFile(tplFiles[i])),
          $scope.this.props
        )
      }
    },
    _copyFiles() {
      for (let i = 0; i < copyFiles.length; i++) {
        $scope.this.fs.copy(
          $scope.this.templatePath(copyFiles[i]),
          $scope.this.destinationPath('server/' + copyFiles[i].slice(pml))
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
