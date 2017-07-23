'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
class MainGenerator extends Generator {

  prompting() {

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('project generator'));
    }

    const prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type: 'checkbox',
      name: 'features',     
      message: 'Which additional features would you like to include?',
      choices: [{
        name: 'CSS-preprocessor',
        value: 'includeCSSPreprocessor',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }, {
      type    : 'list',
      name    : 'db',
      message : 'which database would you like to use?',
      choices : ['No database', 'mysql', 'pg'],
      // store   : true,
      default : 2
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
      // this.log('app name', answers.name);
      // this.log('database', answers.db);
      // this.log('cool feature', answers.cool);
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
}

module.exports = MainGenerator