const Generator = require('yeoman-generator');
const jsonfile = require('jsonfile')
const path = require('path')
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
  install() {
    this.npmInstall(['jest'], { 'save-dev': true })
  }
  writing() {
    writes(Object.assign({}, $scope, {this: this}))
  }
  end() {
    const rootPath = this.destinationRoot()
    const pjPath = path.resolve(rootPath, 'package.json')
    const pjObj = jsonfile.readFileSync(pjPath)
    if (!pjObj.scripts) {
      pjObj.scripts = {
        test: 'jest'
      }
    } else {
      pjObj.scripts.test = 'jest'
    }
    jsonfile.writeFile(pjPath, pjObj, {spaces: 2}, (err) => {
      if (err) {
        this.log(err)
      } else {
        this.spawnCommandSync('npm', ['test'], {
          cwd: this.destinationRoot()
        });
      }
    })
  }
};