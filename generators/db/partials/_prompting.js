'use strict';

function prompts($scope) {
    if (!$scope.this.options['skip-welcome-message']) {
        $scope.this.log($scope.yosay('project db generator'));
    }
    const promptsArr = [{
        type: 'input',
        name: 'dbname',
        message: 'This db name',
        default: $scope.this.appname
    }];
    return $scope.this.prompt(promptsArr).then(answers => {
        const features = answers.features;
        const hasFeature = feat => features && features.indexOf(feat) !== -1;
        const fields = Object.keys(answers)
        for (let i = 0; i < fields.length; i++) {
            if(!$scope.this.props[fields[i]]) {
                $scope.this.props[fields[i]] = answers[fields[i]] || ''
            }
        }
        return $scope.this.props
    });
}
module.exports = prompts