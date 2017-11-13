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
      vport: opts.vport,
      'short-prefix': opts['short-prefix'],
      s: opts['short-prefix']
    }
    const n = this.rootGeneratorName()
  }

  prompting() {}

  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }

  install() {
    this.npmInstall(
      this.props.safe ? combKeyVal(depsMap.deps) : Object.keys(depsMap.deps),
      {
        save: true
      }
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
        key: 'dev:webpack',
        val: `NODE_ENV=development nodemon -w ./client/webpack -- ./node_modules/.bin/c-webpack-dev-server --config ./client/webpack/dev.config.js --public 0.0.0.0:${this
          .props.vport ||
          8077}  --progress --inline --hot --socket shared/socket/webpack.sock`
      },
      {
        field: 'scripts',
        key: 'dev:webpack:analyze',
        val: 'webpack --config ./client/webpack/analyze.dev.js'
      },
      {
        field: 'scripts',
        key: 'prod:webpack:analyze',
        val: 'webpack --config ./client/webpack/analyze.prod.js'
      },
      {
        field: 'scripts',
        key: 'dev:start',
        val: 'npm run dev:webpack & npm run dev:node'
      },
      {
        field: 'scripts',
        key: 'build',
        val:
          'NODE_ENV=production webpack --config ./client/webpack/prod.config.js'
      }
    ])
  }
}
