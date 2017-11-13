const Generator = require('yeoman-generator')
const jsonfile = require('jsonfile')
const path = require('path')
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
      s: opts['short-prefix']
    }
  }

  initializing() {}
  prompting() {}
  install() {
    this.npmInstall(
      this.props.safe
        ? combKeyVal(depsMap.devDeps)
        : Object.keys(depsMap.devDeps),
      { 'save-dev': true }
    )
  }
  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }
  end() {
    operatePackageJson(this, [
      {
        field: 'scripts',
        key: 'dev:test',
        val: 'jest --watch'
      },
      {
        field: 'jest',
        key: 'testRegex',
        val: '/test/.*\\.test\\.(ts|tsx|js)$'
      },
      {
        field: 'jest',
        key: 'moduleFileExtensions',
        val: ['ts', 'tsx', 'js', 'json']
      },
      {
        field: 'scripts',
        key: 'test',
        val: 'jest',
        cb: function() {
          this.spawnCommandSync('npm', ['test'], {
            cwd: this.destinationRoot()
          })
        }
      }
    ])
  }
}
