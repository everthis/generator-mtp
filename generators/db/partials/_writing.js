'use strict'

const path = require('path')
const partialMark = '_'
const pml = partialMark.length
const { findFiles, destFile } = require('../../../public/walk')
const copyFiles = ['_.sequelizerc', 'db/config/_config.js']

function mkpDest(filep) {
    const res = path.parse(filep)
    if (res.dir) {
        return `${res.dir}/${res.base.slice(pml)}`
    } else {
        return `${res.base.slice(pml)}`
    }
}
function filterFiles(arr, excludeFiles) {
    return arr.filter(el => excludeFiles.indexOf(el) === -1)
}
function writes($scope) {
    let writesObj = {
        _tplFiles() {
            let tp = $scope.this.templatePath()
            let tplFiles = findFiles(tp)
            tplFiles = filterFiles(tplFiles, copyFiles)
            for (let i = 0; i < tplFiles.length; i++) {
                $scope.this.fs.copyTpl(
                    $scope.this.templatePath(tplFiles[i]),
                    $scope.this.destinationPath(
                        'server/' + destFile(tplFiles[i])
                    ),
                    $scope.this.props
                )
            }
        },
        _copyFiles() {
            for (let i = 0; i < copyFiles.length; i++) {
                $scope.this.fs.copy(
                    $scope.this.templatePath(copyFiles[i]),
                    $scope.this.destinationPath(mkpDest(copyFiles[i]))
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
