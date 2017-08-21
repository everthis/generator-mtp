'use strict'

const { findFiles, destFile } = require('../../../public/walk')
const partialMark = '_'
const pml = partialMark.length

function writes($scope) {
  let writesObj = {
    _copyFiles() {
      let tp = $scope.this.templatePath()
      let copyFiles = findFiles(tp)
      for (let i = 0; i < copyFiles.length; i++) {
        $scope.this.fs.copy(
          $scope.this.templatePath(copyFiles[i]),
          $scope.this.destinationPath('test/' + destFile(copyFiles[i]))
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