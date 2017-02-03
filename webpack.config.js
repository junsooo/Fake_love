const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'src')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src')
                ],
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [['resolver', { resolveDirs: ['src'] }], "transform-async-to-generator"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
                ),
                include: path.join(__dirname, 'src')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        })
    ],
    resolve: {
        alias: {
            commonCss: path.join(__dirname, 'src', 'common')
        }
    },
    devServer: {
        proxy: {
            '/api/**': {
                target: 'http://localhost:8000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    devtool: 'source-map'
}