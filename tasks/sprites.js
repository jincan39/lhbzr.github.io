const pkg = require('../package.json')
const gulp = require('gulp')
const svgstore = require('gulp-svgstore')

gulp.task('sprites', () => {
  gulp
    .src('./assets/sprites/*.svg')
    .pipe(svgstore())
    .pipe(gulp.dest('./sprites'))
})
