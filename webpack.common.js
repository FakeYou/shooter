const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'docs'),
		publicPath: '/',
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
			{
				type: 'javascript/auto',
				test: /\.json$/,
				include: path.resolve(__dirname, 'src/assets'),
				use: {
					loader: 'file-loader'
				}
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'index.html'),
		}),
	]
};
