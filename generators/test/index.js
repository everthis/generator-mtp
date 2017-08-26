const Generator = require('yeoman-generator');
const jsonfile = require('jsonfile')
const path = require('path')
const writes = require('./partials/_writing')
const operatePackageJson = require('../../public/operatePackageJson')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
  }
  prompting() {
  }
  install() {
    this.npmInstall(['jest'], { 'save-dev': true })
  }
  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }
  end() {
    operatePackageJson(this, {
      field: 'scripts',
      key: 'test',
      val: 'jest',
      cb: function() {
        this.spawnCommandSync('npm', ['test'], {
          cwd: this.destinationRoot()
        })
      }
    })
  }
};