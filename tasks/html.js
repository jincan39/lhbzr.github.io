import pkg from '../package.json'

import gulp from 'gulp'

import jade from 'gulp-jade'
import htmlmin from 'gulp-htmlmin'

gulp.task('html', () => {
  gulp
    .src(`${pkg.folders.src}/html/*.jade`)
    .pipe(jade({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest(''))
})
