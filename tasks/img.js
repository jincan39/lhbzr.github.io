var pkg = require('../package.json')
var gulp = require('gulp')
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')

gulp.task('img', function () {
  gulp
    .src(pkg.folders.src + '/img/**')
    .pipe(changed(pkg.folders.dist + '/img'))
    .pipe(imagemin())
    .pipe(gulp.dest(pkg.folders.dist + '/img'))
})
