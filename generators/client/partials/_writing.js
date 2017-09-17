'use strict'

const { findFiles, destFile } = require('../../../public/walk')

function writes($scope) {
  let writesObj = {
    _tplFiles() {
      let tp = $scope.this.templatePath()
      let tplFiles = findFiles(tp)
      for (let i = 0; i < tplFiles.length; i++) {
        $scope.this.fs.copyTpl(
          $scope.this.templatePath(tplFiles[i]),
          $scope.this.destinationPath('client/' + destFile(tplFiles[i])),
          $scope.this.props
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
