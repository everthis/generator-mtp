const Generator = require('yeoman-generator');
const yosay = require('yosay');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'list',
      name    : 'db',
      message : 'which database would you like to use?',
      choices : ['No database', 'mysql', 'pg'],
      // store   : true,
      default : 2
    }, {
      type    : 'confirm',
      name    : 'cool',
      message : 'Would you like to enable the Cool feature?',
      default : true
    }]).then((answers) => {
      this.log('app name', answers.name);
      this.log('database', answers.db);
      this.log('cool feature', answers.cool);
    });


    if (!this.options['skip-welcome-message']) {
      this.log(yosay('project generator'));
    }

    const prompts = [{
      type: 'checkbox',
      name: 'features',     



      message: 'Which additional features would you like to include?',
      choices: [{
        name: 'CSS',
        value: 'includeSass',
        checked: true
      }, {
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }, {
      type: 'list',
      name: 'legacyBootstrap',
      message: 'Which version of Bootstrap would you like to include?',
      choices: [{
        name: 'Bootstrap 3',
        value: true
      }, {
        name: 'Bootstrap 4',
        value: false
      }],
      when: answers => answers.features.indexOf('includeBootstrap') !== -1
    }, {
      type: 'confirm',
      name: 'includeJQuery',
      message: 'Would you like to include jQuery?',
      default: true,
      when: answers => answers.features.indexOf('includeBootstrap') === -1
    }];

    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeSass = hasFeature('includeSass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.legacyBootstrap = answers.legacyBootstrap;
      this.includeJQuery = answers.includeJQuery;

    });
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