const pkg = require('../package.json')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const browser = require('browser-sync')

gulp.task('styles', () => {
  gulp
    .src('./assets/styles/main.styl')
    .pipe(stylus({ 'include css': true }))
    .pipe(autoprefixer('last 10 versions'))
    .pipe(cssnano())
    .pipe(gulp.dest('./styles'))
    .pipe(browser.reload({ stream: true }))
})
