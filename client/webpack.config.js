let path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'main.js',
		publicPath: '/'
	},


	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
			// directory: path.join(__dirname, 'public')
		},
		historyApiFallback: true,
		port: 8081,

		proxy: {
			"/api": {
				target: 'http://bel_go-api.dvl.to/',
				// target: 'http://localhost:8080',
				changeOrigin: true
			}
		}

	},

	resolve: {
		extensions: ['.js', '.jsx', '.mjs', '.json']
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.m\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /^((?!\.m).)*css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			},

			{
				test: /\.m\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /^((?!\.m).)*less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},

			{
				test: /\.(png|jpg|jpeg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(ttf|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css'
		}),
		new HtmlWebpackPlugin({
			// template: 'index.html'
			// template: path.resolve(__dirname, 'index.html'),
			template: path.resolve(__dirname, 'public/index.html'),
		})
	]
};

module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';

	return conf;
};