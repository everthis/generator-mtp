'use strict'

const Generator = require('yeoman-generator')
const yosay = require('yosay')
const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

const options = require('./partials/_options')
const prompts = require('./partials/_prompting')
const writes = require('./partials/_writing')

const $scope = {
  yosay
}

module.exports = class Mtpg extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.props = {}
    this.argument('appname', {
      type: String,
      desc: 'app name',
      required: true,
      validate: str => {
        return str.length > 0
      }
    })

    this.props.appname = this.options.appname
    const appnameArr = (this.options.appname || 'app').split('-')
    const default_s = appnameArr[appnameArr.length - 1]
    this.props.s = opts.s || default_s

    for (let i = 0; i < options.length; i++) {
      this.option(options[i].prop, options[i].val)
    }
  }

  initializing() {
    if (this.options.database !== 'none') {
      this.composeWith(require.resolve('../db'), {
        arguments: [
          {
            db: this.options.database
          }
        ],
        moduleName: this.options.appname,
        orm: this.options.orm,
        safe: this.options.safe
      })
    }
    if (this.options['back-end-framework'] !== 'none') {
      this.composeWith(require.resolve('../koa'), {
        db: this.options.db,
        moduleName: this.options.appname,
        safe: this.options.safe,
        'short-prefix': this.options['short-prefix']
      })
    }
    this.composeWith(require.resolve('../client'), {
      moduleName: this.options.appname,
      safe: this.options.safe,
      vport: this.options.vport,
      'short-prefix': this.options['short-prefix']
    })
    this.composeWith(require.resolve('../shared'))
    this.composeWith(require.resolve('../test'), {
      moduleName: this.options.appname,
      safe: this.options.safe,
      vport: this.options.vport,
      'short-prefix': this.options['short-prefix']
    })
    this.composeWith(require.resolve('../bin'))
  }

  install() {}

  default() {
    if (path.basename(this.destinationPath()) !== this.props.appname) {
      this.log(
        'Your app must be inside a folder named ' +
          chalk.yellow(this.props.appname) +
          '\n' +
          "I'll automatically create this folder."
      )
      mkdirp(this.props.appname)
      this.destinationRoot(this.destinationPath(this.props.appname))
    }
  }

  prompting() {
    if (!this.options['skip-prompt']) {
      return prompts(Object.assign($scope, { this: this }))
    } else {
      this.props.description = 'description of this app'
    }
  }
  configuring() {}
  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }
  end() {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath(this.destinationRoot())
    })
  }
}
