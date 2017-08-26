const genRules = function($scope) {
    return [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: $scope.clientRoot,
            options: {
                loaders: {
                    scss: $scope.ExtractTextPlugin.extract({
                        use: [$scope.cssLoaderConfig, 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: $scope.ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        },
        {
            test: /\.html$/,
            loader: 'vue-html-loader'
        },
        {
            test: /\.css$/,
            loader: $scope.ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: $scope.cssLoaderConfig
            })
        },
        {
            test: /\.scss$/,
            loader: ['css-hot-loader'].concat(
                $scope.ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        $scope.cssLoaderConfig,
                        {
                          loader: 'postcss-loader',
                          options: {
                            plugins: (loader) => [
                              $scope.autoprefixer({browsers: ['last 3 versions', 'iOS 9']}),
                            ]
                          }
                        },
                        'sass-loader'
                    ]
                })
            )
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff2?|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'assets/img/[name].[ext]'
            }
        },
        {
            test: /\.eot$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                comments: false
            }
        }
    ]
}

module.exports = genRules
