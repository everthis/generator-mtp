let fs = require('fs')
let path = require('path')
let config = require('../config')

let moduleName = '<%= s || moduleName %>'
let manifestFilePath = path.resolve(
    __dirname,
    '../build/' + moduleName + '/manifest.json'
)
let manifestContent
let assetsPathPrefixLen = config.assetsPathPrefix.length
let assetsMap = {
    styles: {},
    scripts: {}
}

if (fs.existsSync(manifestFilePath)) {
    manifestContent = JSON.parse(fs.readFileSync(manifestFilePath, 'utf8'))
    let objKeys = Object.keys(manifestContent)
    let ext
    let mapKey
    let mapVal
    for (var i = objKeys.length - 1; i >= 0; i--) {
        ext = objKeys[i].substr(objKeys[i].lastIndexOf('.') + 1)
        mapKey = objKeys[i].slice(assetsPathPrefixLen).replace(/\.[^/.]+$/, '')
        mapVal = manifestContent[objKeys[i]].slice(assetsPathPrefixLen)
        if (ext === 'css') {
            assetsMap.styles[mapKey] = mapVal
        } else if (ext === 'js') {
            assetsMap.scripts[mapKey] = mapVal
        }
    }
} else {
}

module.exports = assetsMap
