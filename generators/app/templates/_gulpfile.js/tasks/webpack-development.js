var assign       = require('object-assign')
var config       = require('../config/webpack')('development')
var gulp         = require('gulp')
var logger       = require('../lib/compileLogger')
var webpack      = require('webpack')
var browserSync  = require('browser-sync')
var gutil        = require("gulp-util")

gulp.task('webpack:development', function(callback) {
	var built = false

	webpack(config, function(err, stats) {
		logger(err, stats)
		browserSync.reload()
    	// On the initial compile, let gulp know the task is done
    	if(!built) { built = true; callback() }
	})
})

gulp.task('webpack:devdeploy', function(callback) {
	webpack(config, function(err, stats) {
		logger(err, stats)
		callback()
	})
})
