var path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const PRODUCTION = !!JSON.parse(process.env.PRODUCTION || '0');

var plugins = [];
if (process.env.ANALYZE || false) {
    plugins.push(new(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());
}

module.exports = {
    mode: PRODUCTION ? 'production' : 'development',
    entry: 'index.js',
    resolve: {
        modules: ['node_modules', 'site'],
    },
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [
                '/node_modules/',
            ],
            options: {
                sourceType: 'unambiguous',
                babelrc: false,
                presets: [
                    ['@babel/preset-env', {
                        "useBuiltIns": "usage",
                        "corejs": 3,
                    }]
                ],
            }
        }],
    },
    optimization: {
        minimize: PRODUCTION,
        minimizer: [new TerserPlugin()],
    },
    plugins: plugins

};