const Generator = require('yeoman-generator')
const options = require('./partials/_options')
const writes = require('./partials/_writing')
const prompts = require('./partials/_prompting')
const yosay = require('yosay')
const combKeyVal = require('../../public/combKeyVal')
const depsMap = require('./deps')

const $scope = {
  yosay
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.props = {
      orm: opts.orm,
      db: opts.arguments[0].db,
      moduleName: opts.moduleName,
      safe: opts.safe
    }
    this.argument('db', {
      type: String,
      desc: 'database',
      required: true
    })

    for (let i = 0; i < options.length; i++) {
      this.option(options[i].prop, options[i].val)
    }
  }

  prompting() {
    // return prompts(Object.assign({}, $scope, {this: this}))
  }

  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }
  configuring() {}
  _filterOrm(arr) {
    return arr.filter(el => el.indexOf('sequelize') === -1)
  }

  install() {
    const deps = this.props.safe
      ? combKeyVal(depsMap.deps)
      : Object.keys(depsMap.deps)
    const insDeps = this.props.orm === 'none' ? this._filterOrm(deps) : deps
    this.npmInstall(insDeps, {
      save: true
    })
  }
  end() {
    if (this.props.orm === 'none') return
    this.spawnCommandSync(
      'node',
      ['./node_modules/.bin/sequelize', 'init:models'],
      {
        cwd: this.destinationPath(this.destinationRoot())
      }
    )
    this.spawnCommandSync(
      'node',
      ['./node_modules/.bin/sequelize', 'init:migrations'],
      {
        cwd: this.destinationPath(this.destinationRoot())
      }
    )
    this.spawnCommandSync(
      'node',
      ['./node_modules/.bin/sequelize', 'init:seeders'],
      {
        cwd: this.destinationPath(this.destinationRoot())
      }
    )
  }
}
