const Generator = require('yeoman-generator');
const options = require('./partials/_options')
module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

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
  }

  writing() {
  }

  install() {
    // this.npmInstall(['sequelize', 'sequelize-cli'], { 'save': true });
  }
};