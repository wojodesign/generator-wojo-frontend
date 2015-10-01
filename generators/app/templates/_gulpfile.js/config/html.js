var config = require('./')

module.exports = {
  watch: config.sourceAssets + '/*.html',
  src: [config.sourceAssets + '/*.html'],
  dest: config.publicDirectory,
  options: {
  	conditionals: true,
  	spare:true,
  	loose: true,
  	empty: false
  }
}
