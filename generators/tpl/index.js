const Generator = require('yeoman-generator')
const writes = require('./partials/_writing')
const combKeyVal = require('../../public/combKeyVal')
const depsMap = require('./deps')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.props = {
      moduleName: opts.moduleName,
      safe: opts.safe,
      s: opts['short-prefix']
    }
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
  }
  end() {}
}
