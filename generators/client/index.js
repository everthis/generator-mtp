const Generator = require('yeoman-generator')
const writes = require('./partials/_writing')
const operatePackageJson = require('../../public/operatePackageJson')

const $scope = {}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    const n = this.rootGeneratorName()
  }

  prompting() {}

  writing() {
    writes(Object.assign({}, $scope, { this: this }))
  }

  install() {
    this.npmInstall(
      [
        'vue',
        'vuex',
        'vue-router',
        'whatwg-fetch',
        'node-fetch',
        'normalize.css'
      ],
      {
        save: true
      }
    )
    this.npmInstall(
      [
        'vue-loader',
        'css-loader',
        'style-loader',
        'css-hot-loader',
        'node-sass',
        'postcss-loader',
        'sass-loader',
        'vue-template-compiler',
        'webpack',
        'webpack-merge',
        'webpack-dev-server',
        'webpack-bundle-analyzer',
        'webpack-manifest-plugin',
        'compression-webpack-plugin',
        'extract-text-webpack-plugin',
        'babel-core',
        'babel-loader',
        'babel-preset-env',
        'babel-preset-es2015',
        'babel-plugin-transform-runtime',
        'babel-plugin-syntax-dynamic-import',
        'babel-plugin-transform-object-rest-spread'
      ],
      { 'save-dev': true }
    )
  }

  end() {
    operatePackageJson(this, [
      {
        field: 'scripts',
        key: 'dev:webpack',
        val:
          'webpack-dev-server --config ./client/webpack/dev.config.js --public 0.0.0.0:8053 --progress --inline --hot --socket shared/sockets/webpack.sock'
      },
      {
        field: 'scripts',
        key: 'dev:webpack:analyze',
        val: 'webpack --config ./client/webpack/analyze.dev.js'
      },
      {
        field: 'scripts',
        key: 'prod:webpack:analyze',
        val: 'webpack --config ./client/webpack/analyze.prod.js'
      }
    ])
  }
}
