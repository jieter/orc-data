var path = require('path');
var webpack = require('webpack');

var PRODUCTION = JSON.parse(process.env.PRODUCTION || '0');
var plugins = [];
if (PRODUCTION) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}
if (process.env.ANALYZE || false) {
    plugins.push(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());
}

module.exports = {
    entry: 'index.js',
    resolve: {
        modules: ['node_modules', 'site'],
    },
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015'],
                }
            }
        ],
    },
    plugins: plugins
};
