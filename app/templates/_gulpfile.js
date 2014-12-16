
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'), //uncomment this line to use ruby-sass
    //sass = require('gulp-sass'), //comment this lineto use ruby-sass
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    wiredep = require('wiredep').stream,
    usemin = require('gulp-usemin'),
    livereload = require('gulp-livereload');

var paths = {
  scripts: 'assets/scripts',
  images: 'assets/images/**/*',
  scss: ['assets/scss/**/*.scss' ],
  css: 'assets/css',
  vendor: ['assets/vendor/**/*.css', 'assets/vendor/**/*.js' ]
}

gulp.task('styles', function() {
  return gulp.src(paths.scss)
  	//.pipe(sass({errLogToConsole: true})) //uncomment this line to use ruby-sass
    .pipe(sass({ style: 'expanded', lineNumbers: true})) //comment this lineto use ruby-sass
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.css))
    .pipe(notify({ message: 'Styles task complete' }));
});



// Scripts
gulp.task('scripts', function() {
  return gulp.src([paths.scripts + '/**/*.js', '!'+paths.scripts+'/**/*.min.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.images))
    .pipe(notify({ message: 'Images task complete yo' }));
});


// Default task
gulp.task('default', ['scss', 'scripts', 'images'], function() {

});

// Production Build
gulp.task('production', ['usemin'], function() {

});


// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(paths.scss, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts + '/**/*.js', ['scripts']);

  // Watch image files
  //gulp.watch('src/images/**/*', ['images']);

});
