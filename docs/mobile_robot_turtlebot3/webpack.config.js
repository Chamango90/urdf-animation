module.exports = {
	entry: __dirname + '/includes.html',

	output: {
		path: __dirname,
		filename: 'index.bundle.js'
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
