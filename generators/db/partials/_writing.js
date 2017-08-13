'use strict';

const partialMark = '_'
const pml = partialMark.length
const copyFiles = [
  '_.sequelizerc'
]

function writes($scope) {
    let writesObj = {
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