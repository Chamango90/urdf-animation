module.exports = {
	entry: __dirname + '/docs/includes.html',

	output: {
		path: __dirname,
		filename: 'docs/index.bundle.js'
	},

	module: {
        rules: [{
            test: /\.html$/,
            use: [{loader: 'wc-loader'}]
        }, {
            test: /\.js$/,
            use: [{loader: 'script-loader'}]
        }]
    }
};
