const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')
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

  installingLodash() {
    this.npmInstall([
      'koa',
      'koa-router',
      'koa-session'
    ], { 'save': true });
  }
};