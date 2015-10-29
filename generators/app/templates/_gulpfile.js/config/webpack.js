var paths = require('./')
var path = require('path');
var webpack = require('webpack')
var webpackManifest = require('../lib/webpackManifest')

module.exports = function (env) {

	var jsSrc = paths.sourceAssets + '/scripts/'
	var jsDest = paths.publicAssets + '/scripts/'
	var publicPath = '/dist/'

	var webpackConfig = {
		watch: jsSrc,
		entry: {
		},

		output: {
			path: jsDest,
			filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
			publicPath: publicPath+'scripts/'
		},

		externals: {
			'jquery': "jQuery"
		},

		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery",
				"root.jQuery": "jquery"
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: 'common',
				minChunks: 2,
				filename: env === 'production' ? '[name]-[hash].js' : '[name].js'
			})
		],

		resolve: {
			root: path.resolve('./assets/src/vendor'),
			extensions: ['', '.js'],
			moduleDirectories: ['node_modules', 'vendor']
		}
	}

	if (env === 'development') {
		webpackConfig.devtool = 'source-map'
		webpack.debug = true
	}

	if (env === 'production') {
		webpackConfig.plugins.push(
			new webpackManifest(publicPath+'scripts/', publicPath),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.NoErrorsPlugin()
		)
	}

	return webpackConfig
}
