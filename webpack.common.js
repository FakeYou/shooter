const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './index',
	cache: true,
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, './src/'), path.resolve(__dirname, './index.js')],
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src/assets/scss'),
				use: [{
					loader: 'style-loader', // creates style nodes from JS strings
				}, {
					loader: 'css-loader', // translates CSS into CommonJS
				}, {
					loader: 'sass-loader', // compiles Sass to CSS
				}]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: path.resolve(__dirname, 'src/assets'),
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
		}),

		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname, 'src'),
			manifest: require('./dist/vendor-manifest.json'),
		}),
	]
};
