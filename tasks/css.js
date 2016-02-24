import pkg from '../package.json'

import gulp from 'gulp'

import stylus from 'gulp-stylus'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'

gulp.task('css', () => {
  gulp
    .src(`${pkg.folders.src}/css/main.styl`)
    .pipe(stylus({ 'include css': true }))
    .pipe(autoprefixer('ie >= 8', 'ff >= 3', 'safari >= 4', 'opera >= 12', 'chrome >= 4'))
    .pipe(cssnano())
    .pipe(gulp.dest(`${pkg.folders.dist}/css`))
})
