const path = require('path');

module.exports = {
    entry: './src/includes.html',

    output: {
        path: path.resolve(__dirname, 'result'),
        filename: 'index.bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'result'),
        compress: true,
        port: 9000
    },

    module: {
        rules: [{
            test: /\.html$/,
            use: [{ loader: 'wc-loader' }]
        }, {
            test: /\.js$/,
            use: [{ loader: 'script-loader' }]
        }]
    }
};
