const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    for(let i = 0; i < opts.length; i++) {
      this.option(opts[i].prop, opts[i].val)
    }

  }

  initializing() {
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