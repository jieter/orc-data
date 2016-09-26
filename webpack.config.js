var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: 'index.js',
    resolve: {
        modulesDirectories: ['node_modules', 'site'],
    },
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
        sourceMapFile: 'bundle.js.map'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
