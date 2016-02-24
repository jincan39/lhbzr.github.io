import pkg from '../package.json'

import gulp from 'gulp'

import changed from 'gulp-changed'
import imagemin from 'gulp-imagemin'

gulp.task('img', () => {
  gulp
    .src(`${pkg.folders.src}/img/**`)
    .pipe(changed(`${pkg.folders.dist}/img`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${pkg.folders.dist}/img`))
})
