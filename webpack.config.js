var path = require('path')
var webpack = require('webpack')
//const ElectronPackager = require("webpack-electron-packager");

module.exports = {
	entry:'./app/main.js',
	output:{
		path:path.resolve(__dirname, './dist'),
		filename:'build.js'
	},
	module:{
		loaders:[
			{
				test:/\.vue$/,
				loader:'vue'
			},
			{
				test:/\.js$/,
				loader:'babel',
				exclude:/node_modules/
			}
		]
	},
	babel:{
		"presets":["es2015"],
		"plugins":["transform-runtime"]
	},
	plugins:[
		new webpack.ExternalsPlugin('commonjs', [
			'electron'
		]),
		//new ElectronPackager({
		//	dir: "D:/source/BRS-BBS-OffLine",
		//	arch: "x64",
		//	platform: "win32",
		//  }) 
	],
	resolve:{
		alias:{
			'vue$': 'vue/dist/vue.js'
		}
	}
}
