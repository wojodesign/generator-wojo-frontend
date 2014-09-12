 
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
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
  scripts: ['assets/scripts/**/*.js'],
  images: 'assets/images/**/*',
  styles: ['assets/styles/**/*.scss', 'assets/styles/**/*.css' ],
  vendor: ['assets/vendor/**/*.css', 'assets/vendor/**/*.js' ]
}

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/styles/**/*.scss')
    .pipe(sass({ style: 'expanded', }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});


 
// Scripts
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('build/assets/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/images'))
    .pipe(notify({ message: 'Images task complete yo' }));
});

//be sure to update the src here
gulp.task('usemin', ['styles', 'scripts', 'images'], function() {
  gulp.src('./*.html')
    .pipe(usemin({
      css: [minifycss(), 'concat'],
      js: [uglify(), 'concat']
    }))
    .pipe(gulp.dest('build'));
});
 
// Clean
gulp.task('clean', function() {
  return gulp.src(['build/assets/styles', 'build/assets/scripts', 'build/assets/images', 'build/assets/vendor'], {read: false})
    .pipe(clean());
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Production Build
gulp.task('production', ['usemin'], function() {
    
});

 
// Watch
gulp.task('watch', function() {
 
  // Watch .scss files
  gulp.watch('assets/styles/**/*.scss', ['styles']);
 
  // Watch .js files
  //gulp.watch('src/scripts/**/*.js', ['scripts']);
 
  // Watch image files
  //gulp.watch('src/images/**/*', ['images']);
 
  // Create LiveReload server
  //var server = livereload();
 
  // Watch any files in build/assets/, reload on change
  // gulp.watch(['build/assets/**']).on('change', function(file) {
  //   server.changed(file.path);
  // });
 
});