'use strict'

const partialMark = '_'
const pml = partialMark.length
const copyFiles = ['_.editorconfig', '_.gitignore', '_.babelrc', '_.env']
const tplFiles = ['_package.json', '_README.md']

function writes($scope) {
  let writesObj = {
    _tplFiles() {
      for (let i = 0; i < tplFiles.length; i++) {
        $scope.this.fs.copyTpl(
          $scope.this.templatePath(tplFiles[i]),
          $scope.this.destinationPath(tplFiles[i].slice(pml)),
          $scope.this.props
        )
      }
    },
    _copyFiles() {
      for (let i = 0; i < copyFiles.length; i++) {
        $scope.this.fs.copy(
          $scope.this.templatePath(copyFiles[i]),
          $scope.this.destinationPath(copyFiles[i].slice(pml))
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
