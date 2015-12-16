var pkg = require('../package.json');

var gulp = require('gulp'),
    minify = require('gulp-minify-html'),
    inline = require('gulp-minify-inline'),
    jade = require('gulp-jade');

gulp.task('html', function() {
  return gulp.src(pkg.folders.src + '/html/*.jade')
             .pipe(jade({ pretty: true }))
             .pipe(minify())
             .pipe(inline())
             .pipe(gulp.dest(''));
});
