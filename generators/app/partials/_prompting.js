'use strict';

function prompts($scope) {
    if (!$scope.this.options['skip-welcome-message']) {
        $scope.this.log($scope.yosay('project generator'));
    }
    const promptsArr = [{
        type: 'input',
        name: 'name',
        message: 'This project name',
        default: $scope.this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: `Description of ${$scope.this.appname}`,
      when: answers => !$scope.this.options.description
    }, {
        type: 'checkbox',
        name: 'features',
        message: 'Which features would you like to include?',
        choices: [{
            name: 'CSS-preprocessor',
            value: 'includeCSSPreprocessor',
            checked: true
        }, {
            name: 'Nodejs',
            value: 'includeNodejs',
            checked: true
        }, {
            name: 'Database',
            value: 'includeDatabase',
            checked: true
        }]
    }, {
        type: 'list',
        name: 'CSS-preprocessor',
        message: 'Which CSS preprocessor would you like to use?',
        choices: ['Sass', 'Less', 'Stylus'],
        default: 0,
        when: answers => answers.features.indexOf('includeCSSPreprocessor') !== -1
    }, {
        type: 'list',
        name: 'Nodejs',
        message: 'Which Nodejs framework would you like to use?',
        choices: ['Express', 'Koa'],
        default: 1,
        when: answers => answers.features.indexOf('includeNodejs') !== -1
    }, {
        type: 'list',
        name: 'db',
        message: 'which database would you like to use?',
        choices: ['No database', 'mysql', 'pg'],
        default: 2,
        when: answers => answers.features.indexOf('includeDatabase') !== -1
    }, {
        type: 'list',
        name: 'NodejsMode',
        message: 'Nodejs connection method',
        choices: ['HTTP', 'Unix domain socket'],
        default: 2,
        when: answers => answers.features.indexOf('includeNodejs') !== -1
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
        when: answers => answers.features.indexOf('includeLegacyBootstrap') !== -1
    }];
    return $scope.this.prompt(promptsArr).then(answers => {
        // $scope.this.log('app name', answers.name);
        // $scope.this.log('database', answers.db);
        // $scope.this.log('cool feature', answers.cool);
        const features = answers.features;
        const hasFeature = feat => features && features.indexOf(feat) !== -1;
        // manually deal with the response, get back and store the results.
        // we change a bit $scope.this way of doing to automatically do $scope.this in the self.prompt() method.
        const fields = ['description']
        for (let i = 0; i < fields.length; i++) {
            if(!$scope.this.props[fields[i]]) {
                $scope.this.props[fields[i]] = answers[fields[i]] || ''
            }
        }
        $scope.this.includeSass = hasFeature('includeSass');
        $scope.this.includeBootstrap = hasFeature('includeBootstrap');
        $scope.this.includeModernizr = hasFeature('includeModernizr');
        $scope.this.legacyBootstrap = answers.legacyBootstrap;
        $scope.this.includeJQuery = answers.includeJQuery;
    });
}
module.exports = prompts