const pkg = require('../package.json')

const gulp = require('gulp')

const svgstore = require('gulp-svgstore')

gulp.task('svg', () => {
  gulp
    .src(`${pkg.folders.src}/svg/*.svg`)
    .pipe(svgstore())
    .pipe(gulp.dest(`${pkg.folders.dist}/svg`))
})
