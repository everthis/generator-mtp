'use strict'

const path = require('path')
const { findFiles, destFile } = require('../../../public/walk')
const partialMark = '_'
const pml = partialMark.length

function fc(fn, tpfn, dpfn, fp, props) {
    let type = path.parse(fp).ext
    switch (type) {
        case '.tpl':
            fn(tpfn(fp), dpfn('tpl/' + destFile(fp)), props)
            break
        default:
            fn(tpfn(fp), dpfn('server/' + destFile(fp)), props)
    }
}
function writes($scope) {
    const cpTplFn = $scope.this.fs.copyTpl.bind($scope.this.fs)
    const tpfn = $scope.this.templatePath.bind($scope.this)
    const dpfn = $scope.this.destinationPath.bind($scope.this)
    const props = $scope.this.props

    let writesObj = {
        _copyFiles() {
            const tp = $scope.this.templatePath()
            const copyFiles = findFiles(tp)
            for (let i = 0; i < copyFiles.length; i++) {
                fc(cpTplFn, tpfn, dpfn, copyFiles[i], props)
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
