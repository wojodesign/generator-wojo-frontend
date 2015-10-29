
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
//var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var config       = require('../config/sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  var settings = process.env.NODE_ENV === 'production' ? config.settings.prod : config.settings.dev;
  console.log(settings);
  return gulp.src(config.src)
	//.pipe(sourcemaps.init())
	.pipe(sass(settings))
	.on('error', handleErrors)
	//.pipe(sourcemaps.write())
	.pipe(autoprefixer({
		browsers: ['last 2 versions', 'ie 9'],
		cascade: false
	}))
	.pipe(gulp.dest(config.dest))
	.pipe(browserSync.reload({stream:true}));
});
