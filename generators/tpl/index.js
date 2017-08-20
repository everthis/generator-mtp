const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')

const $scope = {}

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
  }

  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }

  install() {
    this.npmInstall(['nunjucks'], { 'save': true });
  }
  end() {
  }
};