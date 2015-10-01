//Misc files to move from src to dist.
//Various vendor libraries, and anything needed that isn't js/images/css/fonts/etc.
var config = require('./')

module.exports = {
  src: ['./favicon.ico'],
  dest: config.publicAssets,
  base: config.sourceAssets
}
