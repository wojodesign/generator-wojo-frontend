var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
  gulpSequence('clean', ['fonts', 'images', 'misc'], ['sass', 'html', 'webpack:development'], ['watch', 'browserSync'], cb);
});
