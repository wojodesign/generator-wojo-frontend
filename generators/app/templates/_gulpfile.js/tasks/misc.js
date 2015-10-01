var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var config      = require('../config/misc');
var gulp        = require('gulp');
var using 		= require('gulp-using');

gulp.task('misc', function() {
  return gulp.src(config.src, {base: config.base})
  	.pipe(using())
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
