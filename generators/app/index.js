'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class Mtpg extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.generator = {}
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      desc: 'app name',
      required: true 
    });

    // And you can then access it later; e.g.
    this.log(this.options.appname);

    // This method adds support for a `--coffee` flag
    this.option('database', {
      alias: 'db',
      desc: 'Set database used in this app',
      type: String,
      default: '0'
    });

    // And you can then access it later; e.g.
    this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");

  }

  initializing() {
    this.composeWith(require.resolve('./partials/_prompting'));
    this.composeWith(require.resolve('../koa'));
    this.composeWith(require.resolve('../webpack'));
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }

  installingLodash() {
    this.npmInstall(['lodash'], { 'save-dev': true });
  }

  paths() {
    let r = this.destinationRoot();
    // returns '~/projects'
    this.log(r)

    let s = this.sourceRoot();
    this.log(s)

    this.destinationPath('index.js');
    // returns '~/projects/index.js'
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
  }

  prompting() {
  }

  writing() {
    this._writingPackageJSON()
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        includeSass: this.includeSass,
        includeBabel: this.options['babel'],
        includeJQuery: this.includeJQuery,
      }
    );
  }

};