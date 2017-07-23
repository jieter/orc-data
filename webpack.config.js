var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: 'index.js',
    resolve: {
        modules: ['node_modules', 'site'],
    },
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
