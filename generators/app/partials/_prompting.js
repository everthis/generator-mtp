'use strict'

function prompts($scope) {
    if (!$scope.this.options['skip-welcome-message']) {
        $scope.this.log($scope.yosay('project generator'))
    }
    const promptsArr = [
        {
            type: 'input',
            name: 'name',
            message: 'This project name',
            /**
             * Default to current folder name
             */
            default: $scope.this.props.appname
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: `Description of ${$scope.this.props.appname}`,
            when: answers => !$scope.this.options.description
        }
    ]
    return $scope.this.prompt(promptsArr).then(answers => {
        // console.log(answers)
        const features = answers.features
        // const hasFeature = feat => features && features.indexOf(feat) !== -1
        const fields = Object.keys(answers)
        for (let i = 0; i < fields.length; i++) {
            if (!$scope.this.props[fields[i]]) {
                $scope.this.props[fields[i]] = answers[fields[i]] || ''
            }
        }
        return $scope.this.props
    })
}
module.exports = prompts
