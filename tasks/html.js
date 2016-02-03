var pkg = require('../package.json')
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var jade = require('gulp-jade')

gulp.task('html', function () {
  gulp
    .src(pkg.folders.src + '/html/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest(''))
})
