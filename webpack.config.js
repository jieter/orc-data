var path = require('path');

module.exports = {
    entry: 'index.js',
    resolve: {
        modulesDirectories: ['node_modules', 'site'],
    },
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
        sourceMapFile: 'bundle.js.map'
    }
};
