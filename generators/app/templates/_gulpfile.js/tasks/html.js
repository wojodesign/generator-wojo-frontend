var browserSync  = require('browser-sync');
var config       = require('../config/html');
var gulp         = require('gulp');
var handleErrors = require('../lib/handleErrors');
var using 		= require('gulp-using');
var minifyHTML = require('gulp-minify-html');

gulp.task('html', function() {
	if (process.env.NODE_ENV === 'production'){
		return gulp.src(config.src)
		  .pipe(minifyHTML(config.options))
		  .pipe(gulp.dest(config.dest))
	} else{
		return gulp.src(config.src)
		  .pipe(gulp.dest(config.dest))
		  .pipe(browserSync.reload({stream:true}));
	}
  
});
