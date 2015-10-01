var config = require('./')
module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/scss/**/*.{sass,scss}",
  dest: config.publicAssets + '/css',
  settings: {

  	dev: {
  		outputStyle: 'expanded',
  		sourceComments: 'normal'
  	},
  	prod: {
  		outputStyle: 'compressed',
  		sourceComments: false
  	}
  },
}
