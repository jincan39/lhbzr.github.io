var pkg = require('../package.json'),
    gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    jade = require('gulp-jade');

gulp.task('html', function() {
  gulp.src(pkg.folders.src + '/html/*.jade')
      .pipe(jade({ pretty: true }))
      .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
      .pipe(gulp.dest(''));
});
