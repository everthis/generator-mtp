const Generator = require('yeoman-generator');
const writes = require('./partials/_writing')
const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
  }
  prompting() {
  }

  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }

  installingLodash() {
  }
};