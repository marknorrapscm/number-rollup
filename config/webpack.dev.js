const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIRECTORY = process.cwd();

module.exports = {
	mode: "development",
	stats: "minimal",
	entry: {
		main: path.resolve(ROOT_DIRECTORY, "test/dev.js"),
	},
	output: {
		path: path.resolve(ROOT_DIRECTORY, "build"),
		filename: "index.js",
	},
	devServer: {
		contentBase: path.resolve(ROOT_DIRECTORY, "build"),
		compress: true,
		port: 3000,
		overlay: true,
	},
	devtool: "cheap-module-eval-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						configFile: path.resolve(ROOT_DIRECTORY, "config/babel.config.js"),
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(ROOT_DIRECTORY, "test/index.html"),
			filename: "index.html",
		}),
	],
};
