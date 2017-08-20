const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')

const $scope = {}

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    let n = this.rootGeneratorName()
    console.log(n)
  }

  prompting() {
  }

  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }

  install() {
    this.npmInstall([
      'vue',
      'vuex',
      'vue-router'
    ], { 'save': true });
  }
  end() {
  }
};