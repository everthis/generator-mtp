const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')
const operatePackageJson = require('../../public/operatePackageJson')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.composeWith(require.resolve('../tpl'));
    this.composeWith(require.resolve('../public'));
  }
  prompting() {
  }

  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }

  install() {
    this.npmInstall([
      'koa',
      'koa-router',
      'koa-session'
    ], { 'save': true });

    this.npmInstall([
      'nodemon'
    ], { 'save-dev': true });

  }

  end() {
    operatePackageJson(this, {
      field: 'scripts',
      key: 'dev:node',
      val: 'NODE_ENV=development nodemon -w ./server -w package.json -e js,json -- node ./server/index.js'
    })
  }
};