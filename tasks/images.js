const pkg = require('../package.json')
const gulp = require('gulp')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const browser = require('browser-sync')

gulp.task('images', () => {
  gulp
    .src('./assets/images/**')
    .pipe(changed('./images'))
    .pipe(imagemin())
    .pipe(gulp.dest('./images'))
    .pipe(browser.reload({ stream: true }))
})
