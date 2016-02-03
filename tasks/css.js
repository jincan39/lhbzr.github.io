var pkg = require('../package.json')
var gulp = require('gulp')
var stylus = require('gulp-stylus')
var autoPrefixer = require('gulp-autoprefixer')
var cssNano = require('gulp-cssnano')

gulp.task('css', function () {
  gulp
    .src(pkg.folders.src + '/css/main.styl')
    .pipe(stylus({ 'include css': true }))
    .pipe(autoPrefixer('ie >= 8', 'ff >= 3', 'safari >= 4', 'opera >= 12', 'chrome >= 4'))
    .pipe(cssNano())
    .pipe(gulp.dest(pkg.folders.dist + '/css'))
})
