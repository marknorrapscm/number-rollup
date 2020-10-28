const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const ROOT_DIRECTORY = process.cwd();

module.exports = {
	mode: "production",
	entry: {
		main: path.resolve(ROOT_DIRECTORY, "src/index.js"),
	},
	output: {
		path: path.resolve(ROOT_DIRECTORY, "dist"),
		filename: "index.js",
		library: "number-rollup",
		libraryTarget: "amd",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CompressionPlugin({
			algorithm: "gzip",
			compressionOptions: { level: 9 },
			filename: "[path].gz[query]",
			minRatio: 0.8,
			test: /\.(js|css|html|svg)$/,
		}),
		new CompressionPlugin({
			algorithm: "brotliCompress",
			compressionOptions: { level: 11 },
			filename: "[path].br[query]",
			minRatio: 0.8,
			test: /\.(js|css|html|svg)$/,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						comparisons: false,
						ecma: 5,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ascii_only: true,
						comments: false,
						ecma: 5,
					},
				},
			}),
		],
	},
};
