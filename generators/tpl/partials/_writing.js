'use strict'

const path = require('path')
const { findFiles, destFile } = require('../../../public/walk')
const partialMark = '_'
const pml = partialMark.length

function fc(fn, tpfn, dpfn, fp) {
    let type = path.parse(fp).ext
    switch (type) {
        case '.tpl':
            fn(tpfn(fp), dpfn('tpl/' + destFile(fp)))
            break
        default:
            fn(tpfn(fp), dpfn('server/' + destFile(fp)))
    }
}
function writes($scope) {
    const cpfn = $scope.this.fs.copy.bind($scope.this.fs)
    const tpfn = $scope.this.templatePath.bind($scope.this)
    const dpfn = $scope.this.destinationPath.bind($scope.this)

    let writesObj = {
        _copyFiles() {
            const tp = $scope.this.templatePath()
            const copyFiles = findFiles(tp)
            for (let i = 0; i < copyFiles.length; i++) {
                fc(cpfn, tpfn, dpfn, copyFiles[i])
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
