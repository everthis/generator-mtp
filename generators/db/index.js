const Generator = require('yeoman-generator');
const options = require('./partials/_options')
const writes = require('./partials/_writing')
const prompts = require('./partials/_prompting')
const yosay = require('yosay')

const $scope = {
  yosay
}

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.props = {}
    this.argument('db', {
      type: String,
      desc: 'database',
      required: true
    });

    for(let i = 0; i < options.length; i++) {
      this.option(options[i].prop, options[i].val)
    }

  }

  prompting() {
    // return prompts(Object.assign({}, $scope, {this: this}))
  }

  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }

  install() {
    this.npmInstall(['sequelize', 'sequelize-cli'], { 'save': true });
  }
  end() {
    // this.spawnCommandSync('npx', ['sequelize', 'init'], {
    //   cwd: this.destinationPath(this.destinationRoot())
    // });
  }
};