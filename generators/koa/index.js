const Generator = require('yeoman-generator')
const writes = require('./partials/_writing')
const operatePackageJson = require('../../public/operatePackageJson')
const combKeyVal = require('../../public/combKeyVal')
const depsMap = require('./deps')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.props = {
      moduleName: opts.moduleName,
      safe: opts.safe,
      'short-prefix': opts['short-prefix'],
      s: opts['short-prefix']
    }
  }

  initializing() {
    this.composeWith(require.resolve('../tpl'), {
      moduleName: this.props.moduleName,
      safe: this.props.safe
    })
    this.composeWith(require.resolve('../public'))
  }
  prompting() {}

  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }

  install() {
    this.npmInstall(
      this.props.safe ? combKeyVal(depsMap.deps) : Object.keys(depsMap.deps),
      { save: true }
    )

    this.npmInstall(
      this.props.safe
        ? combKeyVal(depsMap.devDeps)
        : Object.keys(depsMap.devDeps),
      { 'save-dev': true }
    )
  }

  end() {
    operatePackageJson(this, [
      {
        field: 'scripts',
        key: 'dev:node',
        val:
          'NODE_ENV=development nodemon -w ./server -w package.json -e js,json ./server/index.js'
      },
      {
        field: 'scripts',
        key: 'prod:node',
        val: 'NODE_ENV=production node ./server/index.js'
      }
    ])
  }
}
