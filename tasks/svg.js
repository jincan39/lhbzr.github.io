import pkg from '../package.json'

import gulp from 'gulp'

import svgstore from 'gulp-svgstore'

gulp.task('svg', () => {
  gulp
    .src(`${pkg.folders.src}/svg/*.svg`)
    .pipe(svgstore())
    .pipe(gulp.dest(`${pkg.folders.dist}/svg`))
})
