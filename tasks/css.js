const pkg = require('../package.json')

const gulp = require('gulp')

const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

gulp.task('css', () => {
  gulp
    .src(`${pkg.folders.src}/css/main.styl`)
    .pipe(stylus({ 'include css': true }))
    .pipe(autoprefixer('ie >= 8', 'ff >= 3', 'safari >= 4', 'opera >= 12', 'chrome >= 4'))
    .pipe(cssnano())
    .pipe(gulp.dest(`${pkg.folders.dist}/css`))
})
