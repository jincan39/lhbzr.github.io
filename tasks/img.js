var pkg = require('../package.json');

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');

gulp.task('img', function() {
  return gulp.src(pkg.folders.src + '/img/**')
             .pipe(changed(pkg.folders.dist + '/img'))
             .pipe(imagemin())
             .pipe(gulp.dest(pkg.folders.dist + '/img'));
});
