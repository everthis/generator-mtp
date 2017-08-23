'use strict'

const Generator = require('yeoman-generator')
const yosay = require('yosay')
const path = require('path')
const chalk = require('chalk');
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
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      desc: 'app name',
      required: true,
      validate: str => {
        return str.length > 0
      }
    })

    this.props.name = this.options.appname
    // And you can then access it later; e.g.
    this.log(this.options.appname)

    for (let i = 0; i < options.length; i++) {
      this.option(options[i].prop, options[i].val)
    }

    // this.log(this.options)
    // And you can then access it later; e.g.
    // this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
  }

  initializing() {
    if (!this.options || this.options.database || !this.options['no-db']) {
      this.composeWith(require.resolve('../db'), {
        arguments: [
          {
            db: this.options.db
          }
        ]
      })
    }
    if (!this.options['skip-node']) {
      this.composeWith(require.resolve('../koa'), {
        db: this.options.db
      })
    }
    this.composeWith(require.resolve('../client'))
    this.composeWith(require.resolve('../shared'))
    this.composeWith(require.resolve('../test'))
    this.composeWith(require.resolve('../bin'))
  }

  method1() {
    // this.log('method 1 just ran')
  }

  method2() {
    // this.log('method 2 just ran')
  }

  installingLodash() {
    this.npmInstall(['babel-preset-env', 'babel-plugin-transform-object-rest-spread'], { 'save-dev': true })
    this.npmInstall(['lodash'], { save: true })
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your app must be inside a folder named ' +
          chalk.yellow(this.props.name) +
          '\n' +
          "I'll automatically create this folder."
      )
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  paths() {
    let r = this.destinationRoot()
    // returns '~/projects'
    // this.log(r)

    let s = this.sourceRoot()
    // this.log(s)

    this.destinationPath('index.js')
    // returns '~/projects/index.js'
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    )
  }

  prompting() {
    return prompts(Object.assign({}, $scope, { this: this }))
  }

  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }
}
