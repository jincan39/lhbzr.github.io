const pkg = require('../package.json')
const gulp = require('gulp')
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')

gulp.task('html', () => {
  gulp
    .src(`${pkg.folders.src}/html/*.jade`)
    .pipe(pug({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest(''))
})
