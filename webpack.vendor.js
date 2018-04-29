const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		vendor: [
			'react', 
			'react-dom', 
			'mobx-react', 
			'mobx',
			'three',
			'orbit-controls-es6',
			'stats-js'
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
		library: '[name]_[hash]',
	},
	plugins: [new webpack.DllPlugin({
		name: '[name]_[hash]',
		path: path.resolve(__dirname, 'dist/[name]-manifest.json'),
	})]
};
